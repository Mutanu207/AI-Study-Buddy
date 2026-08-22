import logging

from typing import Dict, Any

from .retriever import Retriever
from .generator import EvaluationGenerator
from .validator import FeedbackValidator


logger = logging.getLogger(__name__)


class AnswerEvaluationPipeline:
    """
    Orchestrates the complete Answer Evaluation Pipeline.
    """

    def __init__(self):

        logger.info(
            "Initializing Answer Evaluation Pipeline."
        )


        self.retriever = Retriever()

        self.generator = EvaluationGenerator()

        self.validator = FeedbackValidator()

        logger.info(
            "Answer Evaluation Pipeline initialized successfully."
        )

    def evaluate_answers(
        self,
        payload: Dict[str, Any],
    ) -> Dict[str, Any]:

        logger.info(
            "Starting Answer Evaluation Pipeline."
        )

        session_id = payload["sessionId"]

        answers = payload["answers"]

        evaluated_answers = []
#Loop through every answer object,reteive the contenxt, semd to llm, validate and send output
        for answer in answers:

            logger.info(
                "Evaluating answer_id=%s",
                answer["answer_id"],
            )

            retrieved_context = (
                self.retriever.retrieve_context(
                    session_id=session_id,
                    chunk_index=answer["chunk_index"]
                )
            )

            evaluation = (
                self.generator.evaluate_answer(
                    question=answer["question"],
                    reference_answer=answer["reference_answer"],
                    retrieved_context=retrieved_context,
                    user_answer=answer["user_answer"],
                )
            )

            validated_feedback = (
                self.validator.validate_feedback(
                    evaluation
                )
            )

            evaluation_result = {

                "answer_id": answer["answer_id"],

                "is_correct":
                    validated_feedback["is_correct"],

                "concept":
                    validated_feedback["concept"],

                "feedback":
                    validated_feedback["feedback"],

                "retrieved_context":
                    retrieved_context,

            }

            evaluated_answers.append(
                evaluation_result
            )

        logger.info(
            "Successfully evaluated %d answers.",
            len(evaluated_answers),
        )
        print("Evaluated Answers:", evaluated_answers)

        return {

            "session_id": session_id,

            "feedback": evaluated_answers,

        }