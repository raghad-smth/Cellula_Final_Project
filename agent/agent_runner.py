from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain.prompts import PromptTemplate
from langchain.chains import LLMChain
import os, sys
from dotenv import load_dotenv

# ---- Load environment variables ----
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
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

# ---- Import Tools ----
from tools.context_presence_judge import *
from tools.web_search_tool import *

ContextPresenceJudge= build_context_presence_tool(llm)
tools = [ContextPresenceJudge, WebSearchTool]

# ---- Create the Prompt Template ----
template = """
You are an AI research assistant. Use the following information to answer clearly and concisely:
{context}
Now, summarize the key point as a clean final answer:
"""
prompt = PromptTemplate(
    input_variables=["context"],
    template=template
)

# ---- Create ReAct Agent ----
react_agent = create_react_agent(llm, tools)

# ---- Run the Agent ----
response = react_agent.invoke(
    {"messages": [{"role": "user", "content": "Search the web for the latest news about LangChain"}]},
    config={"recursion_limit": 50}
)

# ---- Use LLMChain to Clean the Output ----
chain = LLMChain(llm=llm, prompt=prompt)

# Sometimes response is a dict or has nested content
context_text = str(response.get("messages", response))

clean_output = chain.run(context=context_text)

print("\n---- FINAL SUMMARY ----\n")
print(clean_output)
