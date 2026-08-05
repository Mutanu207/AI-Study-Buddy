import logging
from typing import Dict, Any

from RAG.generator import Generator

from .prompts.system_prompt import (
    EVALUATION_SYSTEM_PROMPT,
)

from .prompts.feedback_prompt import (
    build_evaluation_prompt,
)

logger = logging.getLogger(__name__)

#this is an inheritence concept by calling class generator this file has acess to all its methods and attributes
class EvaluationGenerator(Generator):
    """
    Generates AI feedback for a single student answer.
    """
#the inputs to the llm
    def evaluate_answer(
        self,
        question: str,
        reference_answer: str,
        retrieved_context: str,
        user_answer: str,
    ) -> Dict[str, Any]:
        """
        Evaluate one student answer using the LLM.

        Returns:
            {
                "is_correct": bool,
                "feedback": str,
                "concept": str
            }
        """

        logger.info(
            "Generating evaluation feedback."
        )
        #building the prompt to send to llm
        prompt = build_evaluation_prompt(
            question=question,
            reference_answer=reference_answer,
            retrieved_context=retrieved_context,
            user_answer=user_answer,
        )

        evaluation = self._call_llm(
            system_prompt=EVALUATION_SYSTEM_PROMPT,
            prompt=prompt,
        )

        logger.info(
            "Evaluation feedback generated successfully."
        )

        return evaluation