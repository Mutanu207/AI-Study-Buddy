from typing import List #explain the output or input

from langchain_core.documents import Document #for the document objecyt

def build_question_prompt(
    chunk: str,
    number_of_questions: int = 1,
) -> str:
    """
    Build the prompt for generating study questions
    from document chunks.
    """
    return f"""
You are an expert educator.

Generate exactly {number_of_questions} high-quality study questions using ONLY the supplied context.

Rules

1. Never invent information.

2. Use only the supplied document.

3. Every question must have exactly one correct reference answer.

4. Generate questions that test understanding instead of memorization.

5. Assign one topic describing the concept being tested.

6. Assign one difficulty level:
Easy
Medium
Hard

Return ONLY valid JSON.

Example

[
    {{
        "question": "...",

        "reference_answer": "...",

        "topic": "...",

        "difficulty": "Medium"
    }}
]

Document Context

{chunk} 
"""
#LLM receives one chunk at a time