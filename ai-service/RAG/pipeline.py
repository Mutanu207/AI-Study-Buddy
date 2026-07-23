import logging

from typing import List, Dict, Any

from loader import load_pdf
from cleaner import clean_text
from splitter import split_text

from embeddings import EmbeddingManager
from vector_store import VectorStoreManager

from generator import Generator
from validator import QuestionValidator
import random

logger = logging.getLogger(__name__)

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

    # Generate questions from every document chunk
        questions = []

        selected_documents = random.sample(

        documents,

        k=min(15, len(documents))

        )

        for document in selected_documents:

            generated_questions = (
            self.generator.generate_questions(
                document=document
            )
            )

            questions.extend(
                generated_questions
            )

        logger.info(

        "Generated %d questions.",

        len(questions)

        )
    # Validate generated questions

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
        