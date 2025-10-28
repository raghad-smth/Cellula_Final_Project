from langchain.tools import Tool
from dotenv import load_dotenv
import requests
import os

load_dotenv()
tavily_api_key = os.getenv("TAVILY_API_KEY")

def web_search(query):
    res = requests.post(
        "https://api.tavily.com/search",
        headers={"Authorization": f"Bearer {tavily_api_key}"},
        json={"query": query}, 
        timeout=10
    )
    return res.json()["results"][0]["content"]


WebSearchTool = Tool.from_function(
    func=web_search,
    name="WebSearchTool",
    description="Searches the web to retrieve missing context"
)

