import logging

from typing import List, Dict, Any

from .loader import load_pdf
from .cleaner import clean_text
from .splitter import split_text

from .embeddings import EmbeddingManager
from .vector_store import VectorStoreManager

from .generator import Generator
from .validator import QuestionValidator
import random

logger = logging.getLogger(__name__)
SKIP_KEYWORDS = [
   "table of contents",

    "contents",

    "references",

    "bibliography",

    "course evaluation",

    "mode of delivery",

    "lecturer contact",

    "assessment",

    "email",

    "e-mail",

    "contact",

    "exercise tag",

    "green exercise tag",

    "suggested corrections",

    "elearning@"]
TARGET_QUESTIONS=15

class QuestionGenerationPipeline:
    """
    Orchestrates the complete RAG Question Generation pipeline.

    Pipeline Flow

    PDF
        ↓
    Loader
        ↓
    Cleaner
        ↓
    Splitter
        ↓
    Embeddings
        ↓
    Vector Store
        ↓
    Question Generator
        ↓
    Question Validator
        ↓
    Validated Questions
    """

    def __init__(self) -> None:
        """
        Initialize reusable pipeline components.

        These objects are created once and reused
        throughout the lifetime of the pipeline.
        """

        logger.info(
            "Initializing Question Generation Pipeline."
        )

        self.embedding_manager = EmbeddingManager()

        self.vector_store = VectorStoreManager()

        self.generator = Generator()

        self.validator = QuestionValidator()

        logger.info(
            "Question Generation Pipeline initialized successfully."
        )
   
    def process_document(
        self,
        file_path: str,
        session_id: int,
        ) -> List[Dict[str, Any]]:
        """
        Execute the complete Question Generation pipeline.

        Args:
            file_path:
                Path to the uploaded PDF.

            session_id:
                Current study session identifier.

            Returns:
                A validated list of generated questions.
            """

        logger.info(
                "Starting Question Generation Pipeline."
            )

    # Extract raw text from the uploaded PDF
        try:
            raw_text = load_pdf(
                file_path=file_path
            )

            logger.info(
                "Raw text extracted successfully."
            )

    # Clean extracted text
            cleaned_text = clean_text(
                raw_text
            )

            logger.info(
                "Text cleaned successfully."
            )

    # Split cleaned text into semantic chunks

            documents = split_text(

                clean_text=cleaned_text,

                session_id=session_id,

            )

            logger.info(

            "Generated %d document chunks.",

                len(documents)

            )

    # Convert text chunks to vectors
            vectors = self.embedding_manager.embed_documents(
                documents
            )

            logger.info(
                "Generated embeddings for %d chunks.",
                len(vectors)
            )

    # Store embeddings inside the vector database
   
            self.vector_store.store_embeddings(

                documents=documents,

                vectors=vectors

                )

            logger.info(
            "Embeddings stored successfully."
            )
        #before generating questions, filter out chunks that contain administrative content
            filtered_documents = []

            for document in documents:

                text = document.page_content.lower()

                if any(keyword in text for keyword in SKIP_KEYWORDS):

                    logger.info(
                        "Skipping chunk because it contains administrative content."
                    )

                    continue

                filtered_documents.append(document)

            #getting to know the number of chunks to know the number of questions to generate
            chunk_count = len(filtered_documents)

            if chunk_count <= 7:
                questions_per_chunk = 3

            elif chunk_count <= 15:
                questions_per_chunk = 2

            else:
                questions_per_chunk = 1
    # Generate questions from every document chunk
            questions = []
            selected_documents = filtered_documents.copy() #create a copy of fileterd_documents na dput it in the selected_documents list
            random.shuffle(selected_documents)
            while len(questions)< TARGET_QUESTIONS and selected_documents: #loop this code while the questions are not yet 15 and selected_documets has chunks left
                document=selected_documents.pop(0)
                generated_questions = (
                self.generator.generate_questions(
                    document=document,
                    number_of_questions= questions_per_chunk

                )
                )
                if(generated_questions):
                    questions.extend(generated_questions) 
                                     
                if len(questions) >=TARGET_QUESTIONS: #if the number of objects in the ist is 15 or greater than 15 then break the loop
                    break     
                    

            logger.info(
  
            "Generated %d questions.",

            len(questions)

            )
    # Validate generated questions, the first 15 generated questions
            if len(questions)> TARGET_QUESTIONS:
                questions = questions[:TARGET_QUESTIONS]
            validated_questions = (
            self.validator.validate_questions(
                questions
            )
            )

            logger.info(
            "Validated %d questions successfully.",
            len(validated_questions)
            )

            logger.info(
            "Question Generation Pipeline completed successfully."
            )

            return validated_questions
        except Exception as error:
            logger.exception("Pipeline failed.")
            raise