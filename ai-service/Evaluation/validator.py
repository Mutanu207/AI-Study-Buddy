import logging

from typing import Dict, Any

logger = logging.getLogger(__name__)


class FeedbackValidator:
    """
    Validates the feedback returned by the LLM.
    """

    REQUIRED_FIELDS = {
#Fields sent back from llm
        "is_correct",

        "concept",

        "feedback",

    }

    def validate_feedback(
        self,
        feedback: Dict[str, Any],
    ) -> Dict[str, Any]:

        logger.info(
            "Validating evaluation feedback."
        )
#check if output form llm is a dict
        if not isinstance(feedback, dict):

            logger.error(
                "LLM output is not a dictionary."
            )

            raise RuntimeError(
                "Invalid LLM output."
            )
#check if there is any missing field,and tell which one it is
        missing_fields = (
            self.REQUIRED_FIELDS
            - feedback.keys()
        )

        if missing_fields:

            logger.error(
                "Missing fields: %s",
                missing_fields,
            )

            raise RuntimeError(
                f"Missing required fields: {missing_fields}"
            )
#check if the data types are correct
        if not isinstance(
            feedback["is_correct"],
            bool,
        ):

            raise RuntimeError(
                "'is_correct' must be a boolean."
            )

        if not isinstance(
            feedback["feedback"],
            str,
        ):

            raise RuntimeError(
                "'feedback' must be a string."
            )

        if not isinstance(
            feedback["concept"],
            str,
        ):

            raise RuntimeError(
                "'concept' must be a string."
            )
#remove leading and trailing whitespace from the feedback and concept fields
        feedback["feedback"] = (
            feedback["feedback"].strip()
        )

        feedback["concept"] = (
            feedback["concept"].strip()
        )

        logger.info(
            "Feedback validated successfully."
        )

        return feedback