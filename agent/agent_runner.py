import os
import sys
from dotenv import load_dotenv

from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory
from langsmith import Client
from langchain_core.messages import AIMessage

# ---- Import Tools ----
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from tools.context_presence_judge import *
from tools.web_search_tool import *
from tools.context_relevance_checker import *
from tools.context_splitter import *

# ---- Setup LangSmith Tracing ----
client = Client()
client.create_project("Agent-Debug-Project-11")

# ---- Load Environment Variables ----
load_dotenv()
openrouter_api_key = os.getenv("OPENROUTER_API_KEY")

# ---- Initialize LLM ----
llm = ChatOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=openrouter_api_key,
    model="gpt-4o-mini",
    temperature=0.25,
    max_tokens=2048
).with_config({"verbose": True})

# ---- Initialize Tools ----
ContextPresenceJudge = build_context_presence_tool(llm)
ContextSplitter = build_context_splitter_tool(llm)

tools = [
    ContextPresenceJudge,
    WebSearchTool,
    ContextRelevanceTool,
    ContextSplitter
]

# ---- Initialize Memory ----
memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

# ---- Create ReAct Agent ----
react_agent = create_react_agent(llm, tools)

# ---- Create the Cleanup LLMChain ----
template = """
You are an AI research assistant. Use the following information to answer clearly and concisely:
{context}

Now, summarize the key point as a clean final answer:
"""
prompt = PromptTemplate(
    input_variables=["context"],
    template=template
)
cleanup_chain = LLMChain(llm=llm, prompt=prompt)


# ---- Helper Function to Extract Last AI Message ----
def extract_last_ai_message(response):
    """
    Extracts the text content of the last AI (assistant) message from a LangGraph or LangChain response.
    Handles both dict and BaseMessage object formats.
    """
    # Safety: if the agent response is dict-like
    if isinstance(response, dict) and "messages" in response:
        messages = response["messages"]
    else:
        # fallback if it's already a list or a single message
        messages = response if isinstance(response, list) else [response]

    last_ai_message = None

    # Iterate backwards to find the most recent assistant message
    for msg in reversed(messages):
        role = None
        content = None

        # Handle LangChain Message objects
        if isinstance(msg, AIMessage):
            role = "assistant"
            content = msg.content

        # Handle dict-based messages
        elif isinstance(msg, dict):
            role = msg.get("role")
            content = msg.get("content")

        # Stop at the first assistant message found
        if role == "assistant" and content:
            last_ai_message = content
            break

    # Fallback if no assistant message found
    return last_ai_message or str(response)


# ---- Chat Loop ----
print("\n🧠 Agent ready! Type 'exit' to stop chatting.\n")

while True:
    user_input = input("🧍 You: ").strip()
    if user_input.lower() == "exit":
        print("👋 Goodbye!")
        break

    # Combine memory context + new user message
    past_convo = "\n".join([f"{m.type.capitalize()}: {m.content}" for m in memory.chat_memory.messages])
    full_input = f"{past_convo}\nUser: {user_input}"

    # ---- Run the Agent ----
    response = react_agent.invoke(
        {"messages": [{"role": "user", "content": full_input}]},
        config={
            "recursion_limit": 50,
            "verbose": True,
            "run_name": "Chat Session"
        }
    )

    # # ---- Clean and Summarize Output ----
    # context_text = str(response.get("messages", response))
    # clean_output = cleanup_chain.run(context=context_text)

    clean_output = extract_last_ai_message(response)

    # ---- Save to Memory ----
    memory.chat_memory.add_user_message(user_input)
    memory.chat_memory.add_ai_message(clean_output)

    print("\n🤖 Agent:", clean_output)
    print("-" * 80)
