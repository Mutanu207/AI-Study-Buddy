import logging
from typing import List #tell future devs the return of a function

from langchain_core.documents import Document #receive Documents from splitter
from sentence_transformers import SentenceTransformer #imports the embed models that run locally

logger = logging.getLogger(__name__)

#every req would download the model again that would be very slow, in class we load it once and use it forever
class EmbeddingManager:
    """
    Handles loading the embedding model and generating
    embeddings for documents and queries.
    """

    def __init__( #runs once when we create the object
        self,
        model_name: str = "BAAI/bge-small-en-v1.5"
    ) -> None:

        logger.info(
            "Loading embedding model: %s",
            model_name
        )

        self.model = SentenceTransformer(
            model_name
        ) #downloads and loads model to memory

        logger.info(
            "Embedding model loaded successfully."
        )

    def embed_documents(
        self,
        documents: List[Document]
    ) -> List[List[float]]:
        """
        Generate embeddings for document chunks.
        """

        if not documents: #validation
            logger.error(
                "No documents received."
            )

            raise ValueError(
                "Document list is empty."
            )

        logger.info(
            "Generating embeddings for %d chunks.",
            len(documents)
        )

        texts = [
            doc.page_content
            for doc in documents
        ] #loops through document using for loop and grabs the page_contnet for every Document model, and places it the list

        embeddings = self.model.encode(

            texts,

            convert_to_numpy=False,

            show_progress_bar=False,

            normalize_embeddings=True

        ) #transforming text to vector

        logger.info(
            "Successfully generated embeddings."
        )

        return embeddings

   