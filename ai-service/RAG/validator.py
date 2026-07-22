import logging
from typing import List, Dict, Any


logger = logging.getLogger(__name__)


class QuestionValidator: #use class to group all the functions together
    """
    Validates questions returned by the LLM before
    they are stored in the database.
    """

    VALID_DIFFICULTIES = {
        "Easy",
        "Medium",
        "Hard",
    } #state the difficuties

    REQUIRED_FIELDS = {
        "question",
        "reference_answer",
        "difficulty",
        "chunk_index",
    } #state the fields that we are sending back

    def validate_questions(
        self,
        questions: List[Dict[str, Any]], #input is the questions list that has {} we get from generator
    ) -> List[Dict[str, Any]]: #output
        """
        Validate an entire list of generated questions.

        Args:
            questions:
                Questions returned by the LLM.

        Returns:
            The validated question list.

        Raises:
            ValueError:
                If validation fails.
        """

        logger.info(
            "Validating %d generated questions.",
            len(questions)
        )

        if not isinstance(
            questions,
            list,
        ): #if the questions list is not in List data type do
            logger.error(
                "Questions must be returned as a list."
            )

            raise ValueError(
                "Questions must be a list."
            )

        if not questions:

            logger.error(
                "Question list is empty."
            )

            raise ValueError(
                "No questions generated."
            ) #if list is empty

        for question in questions: #loop through the list and we go through every object inside

            self._validate_question( #call this function to validate the objects
            )

        logger.info(
            "Question validation completed successfully."
        )

        return questions


    def _validate_question(
        self,
        question: Dict[str, Any],
    ) -> None:
        """
        Validate a single question dictionary.
        """

        if not isinstance(
            question,
            dict,
        ): #check if objects are dict

            logger.error(
                "Question is not a dictionary."
            )

            raise ValueError(
                "Each question must be a dictionary."
            )

        missing_fields = (
            self.REQUIRED_FIELDS
            - question.keys()
        )
#check ift there missing fileds and which are the missing fileds
        if missing_fields:

            logger.error(
                "Missing fields: %s",
                missing_fields,
            )

            raise ValueError(
                f"Missing fields: {missing_fields}"
            ) #check the missing field

        if not question["question"].strip():

            raise ValueError(
                "Question cannot be empty."
            ) #check if the question is there
#check if the reference answer is there
        if not question[
            "reference_answer"
        ].strip():

            raise ValueError(
                "Reference answer cannot be empty."
            )
#check if any of the difficulties placed dont belong to the assigned difficulties
        if (
            question["difficulty"]
            not in self.VALID_DIFFICULTIES
        ):

            raise ValueError(
                "Invalid difficulty level."
            )

        if not isinstance(
            question["chunk_index"],
            int,
        ): #check if chunk_index is there and its a integer

            raise ValueError(
                "Chunk index must be an integer."
            )