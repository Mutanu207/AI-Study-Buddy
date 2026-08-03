import logging

from RAG.vector_store import VectorStoreManager #from folder RAG, file vector_store.py import the class

logger = logging.getLogger(__name__) #for logging


class Retriever:
    """
    Retrieves the original chunk that generated a question.

    Input:
        session_id
        chunk_index

    Output:
        Retrieved chunk text
    """

    def __init__(self, vector_store: VectorStoreManager):
        self.vector_store = vector_store

    def retrieve_context(self, chunk_index: int) -> str: #we will use session_id when we switch to pgvector for retrieval
        """
        Returns the page content of the chunk that generated the question.
        """

        try:

            logger.info(
                "Retrieving context for chunk %s",
                chunk_index
            )

            # Get all stored documents from the vector store
            documents = self.vector_store.documents 

            # Loop through each document grabiing the metadata opf the Document() wobject we are looping over
            for document in documents:

                metadata = document.metadata

                # Find the matching chunk
                if metadata.get("chunk_index") == chunk_index:

                    logger.info(
                        "Chunk %s retrieved successfully.",
                        chunk_index
                    )

                    return document.page_content #return the page content of the document that matches the chunk_index

            logger.warning(
                "Chunk %s was not found.",
                chunk_index
            )

            return ""

        except Exception:

            logger.exception(
                "Error retrieving context."
            )

            raise