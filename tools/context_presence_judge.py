from langchain.tools import Tool
from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate


def build_context_presence_tool(llm):
    prompt = PromptTemplate.from_template(open("prompts/context_judge_prompt.txt").read())
    chain = LLMChain(llm=llm, prompt=prompt)
    return Tool.from_function(
        func=chain.run,
        name="ContextPresenceJudge",
        description="Always use this function after every user query to check if context is present in user input, if not you should use the web search tool to find relevant context."
    )

