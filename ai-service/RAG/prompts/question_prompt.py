from typing import List #explain the output or input

from langchain_core.documents import Document #for the document objecyt

def build_question_prompt(
    chunk: str,
    number_of_questions: int = 2,
) -> str:
    """
    Build the prompt for generating study questions
    from document chunks.
    """
    return f"""
You are an expert educator.

 Generate  {number_of_questions} university-level, exam-style study questions suitable for revision.

The questions should resemble those set by university lecturers in continuous assessments (CATs) and end-of-semester examinations.


Rules

1. Every question and reference answer must be fully supported by the supplied document chunk.
   Never introduce outside knowledge or make assumptions.

2. Use only the supplied document chunk as your source of truth.

3. Every question must have exactly one correct reference answer.Reference answers should be complete enough that a lecturer could use them as the marking scheme.
Do not return one-word or overly brief answers when the document provides a fuller explanation. Keep answers concise but complete.

4. Prioritize conceptual understanding, application, comparison, interpretation, and reasoning whenever the document supports it.
   Use simple recall questions only when necessary.

5. Generate questions from different concepts found in the chunk whenever possible.
   Avoid asking multiple questions that test the exact same fact.

6. Assign one topic that best describes the concept being tested.

7. Assign exactly one difficulty level: Easy, Medium, or Hard.

Difficulty Levels

Easy
• Definitions
• Terminology
• Simple facts
• Direct recall

Medium
• Explain concepts
• Compare ideas
• Apply knowledge
• Interpret information

Hard
• Analyze scenarios
• Solve problems
• Draw conclusions
• Evaluate alternatives
• Multi-step reasoning

8. Generate questions only from the teaching material contained in the supplied chunk.

Ignore chunks that are primarily composed of:

• Table of Contents
• Bibliography
• References
• Administrative information
• Lecturer details
• Marks distribution
• Course schedules
• Contact information
• Blank pages

9. Only return an empty JSON array:

[]

if the supplied chunk contains no meaningful teaching material or does not contain enough information to create even one high-quality study question.

If the chunk contains enough information to create at least one good study question, generate the requested number of questions.

10. Return ONLY valid JSON.

Do NOT include:
• Markdown
• Explanations
• Code fences
• Additional text
Example

[
    {{
        "question": "...",

        "reference_answer": "...",

        "topic": "...",

        "difficulty": "Medium"
    }}
]


11. Every question should be answerable directly from the supplied chunk without requiring external knowledge.

12. Make the questions as diverse as possible while remaining faithful to the supplied content.

13.When generating multiple questions from the same chunk:

• Cover different concepts whenever possible.
• Do not ask two questions that assess the same learning objective.
• Avoid rewording the same question.

Document Context

{chunk} 
"""
#LLM receives one chunk at a time