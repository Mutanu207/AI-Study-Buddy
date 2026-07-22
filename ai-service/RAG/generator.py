import json #Support the data type we get from the LLM
import logging #Used for logging
from typing import List, Dict, Any #used for type hinting

from groq import Groq #llm we are using

from langchain_core.documents import Document

from config import (
    GROQ_API_KEY,
    LLM_MODEL,
    LLM_TEMPERATURE,
    LLM_MAX_TOKENS,
)
from prompts.system_prompt import (
    QUESTION_SYSTEM_PROMPT
)
from prompts.question_prompt import (build_question_prompt)
logger = logging.getLogger(__name__)


class Generator:
    """
    Handles all interactions with the Large Language Model (LLM).

    Responsibilities:
    - Generate questions and reference answers.
    - Generate feedback for student answers.

    """
    def __init__(self) -> None:
        """
        Initialize the Groq client once.

        The client is reused for every request instead of
        reconnecting to Groq each time.
        """

        logger.info(
            "Initializing Groq client."
        )

        self.client = Groq(
            api_key=GROQ_API_KEY
        ) #creating groq client

        logger.info(
            "Groq client initialized successfully."
        )
        
#private function that is called only insde this file
    def _call_llm(
        self,
        prompt: str #input is prompt in the form of astring
    ) -> Dict[str, Any] | List[Dict[str, Any]]:
        """
        Send a prompt to the LLM and return the parsed JSON response.

        Args:
            prompt:
                Fully constructed prompt sent to the model.

        Returns:
            Parsed JSON returned by the LLM.

        Raises:
            RuntimeError:
                If the model response is invalid or cannot
                be parsed into JSON.
        """

        logger.info(
            "Sending request to Groq model."
        )

        try:
#call the groq api stating the model,temp and max tokens
            response = self.client.chat.completions.create(

                model=LLM_MODEL,

                temperature=LLM_TEMPERATURE,

                max_completion_tokens=LLM_MAX_TOKENS,

                messages=[

                    {
                        "role": "system",
                        "content": (
                             QUESTION_SYSTEM_PROMPT
                        ),
                    },

                    {
                        "role": "user",
                        "content": prompt,
                    },

                ],

            )

            logger.info(
                "Response received from Groq."
            )
#grab response from LLM
            content = (
                response
                .choices[0]
                .message
                .content
            )
#Parse the response into JSON format and return it
            parsed_response = json.loads(
                content
            )

            logger.info(
                "Successfully parsed JSON response."
            )

            return parsed_response
#runs if the response is not in JSON format
        except json.JSONDecodeError as error:

            logger.exception(
                "Failed to parse LLM JSON response."
            )

            raise RuntimeError(
                "LLM returned invalid JSON."
            ) from error
#runs if the request to the LLM fails
        except Exception as error:

            logger.exception(
                "LLM request failed."
            )

            raise RuntimeError(
                "Failed to communicate with the LLM."
            ) from error
        

    def generate_questions(
        self,
        document: Document, #Input is one Document object
        number_of_questions: int = 2,
        )  -> List[Dict[str, Any]]:
        """
        Generate study questions from a single document chunk.

        Args:
            document:
                A LangChain Document containing one chunk.

            number_of_questions:
                Number of questions to generate
                from this chunk.

         Returns:
            A list of generated question dictionaries.
        """

        logger.info(
            "Generating questions from chunk %d.",
            document.metadata["chunk_index"]
         )

        prompt = build_question_prompt(
            chunk=document.page_content,
            number_of_questions=number_of_questions,
        ) #get the prompt from the prompt file,by calling the function on the file and passing over the inputs

        questions = self._call_llm(
            prompt
        )   #send prompt to llm and get questions back

        if not isinstance(questions, list): #questions should be a list, the LLM returns a list

            logger.error(
           "Expected a list of questions."
            )

            raise RuntimeError(
            "LLM returned an invalid response."
            )

        for question in questions:

            question["chunk_index"] = (
                document.metadata["chunk_index"]
        ) #loop through the item in the list and add the chunk_index gotten from the current Document object being worked on

        logger.info(
            "Successfully generated %d questions.",
             len(questions)
            )

        return questions #return a list of questions, inside the list every {} holds question,ref answer,chunk_index,difficulty and topic to be saved in db