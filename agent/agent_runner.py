from langchain_openai import ChatOpenAI
from langchain.agents import create_react_agent
from langchain.agents import AgentExecutor
from langchain import hub
import os, sys
sys.path.append(os.path.dirname(os.path.dirname(__file__)))
from dotenv import load_dotenv

from tools.context_presence_judge import *
from tools.web_search_tool import *

# ---- Load environment variables ----
load_dotenv()
openrouter_api_key = os.getenv("LLM_ID")
openai_api_key = os.getenv("OPENAI_API_KEY")
os.environ["OPENAI_API_KEY"] = openai_api_key

# ---- Initialize LLM ----
llm = ChatOpenAI(
    base_url="https://openrouter.ai/api/v1",
    api_key=openrouter_api_key,
    model="mistralai/mistral-7b-instruct:free",
    temperature=0.25,
    max_tokens=2048
)

# ---- Initialize Tools ----
ContextPresenceJudge = build_context_presence_tool(llm)
# WebSearchTool = build_web_search_tool(llm)

# ---- Create ReAct Agent and Executor ----
# Load a ReAct prompt from LangChain Hub
prompt = hub.pull("hwchase17/react")
tools = [ContextPresenceJudge]
# Build ReAct agent
react_agent = create_react_agent(llm, tools, prompt)
# Create an executor to run it
agent = AgentExecutor(agent=react_agent, tools=tools, verbose=True)

response = agent.invoke({"input": "What is LangChain used for?"})
print(response["output"])