# tools/context_splitter.py
from langchain.tools import StructuredTool
from langchain.prompts import PromptTemplate
from pydantic import BaseModel, Field

class ContextSplitInput(BaseModel):
    text: str = Field(..., description="The user's full message or context to analyze.")

def build_context_splitter_tool(llm):
    """
    Build a tool that splits user input into background context and actual question.
    """

    def split_context(text: str) -> str:
        prompt_text = """
You will separate the following user message into two parts:
1. The **background information or context** the user provided.
2. The **actual question or task** they are asking.

Return the answer in this **plain text** format (not JSON!):

Background:
<summary of background>

Question:
<the user's actual question>

---
Message:
{text}
        """.strip()

        prompt = PromptTemplate.from_template(prompt_text)
        formatted = prompt.format(text=text)
        response = llm.invoke(formatted)

        # Return plain text directly
        return response.content if hasattr(response, "content") else str(response)

    return StructuredTool.from_function(
        func=split_context,
        name="ContextSplitter",
        description=(
            "Use this tool **whenever a user's message mixes background information with a specific question or task**. "
            "This often happens when the user explains what they have read, done, or observed before asking something. "
            "The tool will separate the background context from the actual question, returning both clearly separated. "
            "You should run this before checking for context presence or performing a web search, "
            "so that later tools can focus on the precise question."
        ),
        args_schema=ContextSplitInput,
    )




# class ContextSplitInput(BaseModel):
#     text: str = Field(..., description="The user's full message or context to analyze.")

# def build_context_splitter_tool(llm):
#     """
#     Build a tool that splits user input into background context and actual question.
#     """

#     def split_context(text: str) -> str:
#         prompt = PromptTemplate.from_template(open("prompts/context_splitter_prompt.txt").read())
#         prompt = prompt.format(text=text)
#         response = llm.invoke(prompt)
#         return response.content if hasattr(response, "content") else str(response)

#     return StructuredTool.from_function(
#         func=split_context,
#         name="ContextSplitter",
#         description=(
#             "Use this tool **whenever a user's message mixes background information with a specific question or task**. "
#             "This often happens when the user explains what they have read, done, or observed before asking something. "
#             "The tool will separate the background context from the actual question, returning both clearly separated. "
#             "You should run this before checking for context presence or performing a web search, "
#             "so that later tools can focus on the precise question."
#         ),
#         args_schema=ContextSplitInput
#     )
