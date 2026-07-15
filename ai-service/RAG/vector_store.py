import logging #logging library
from typing import List #shows expected output of a function, in this case a list

import faiss #vector db
import numpy as np #handles array efficently
from langchain_core.documents import Document

logger = logging.getLogger(__name__)


class VectorStoreManager:
    """
    Stores document chunks together with their embeddings
    inside a FAISS vector index.
    """

    def __init__(self) -> None: #runs automatically when we do vector_store = VectorStoreManager()
        """
        Initialize an empty vector store.
        """

        self.index = None
        self.documents = []

    def store_embeddings( #public function that receives the chunks and vectors
        self,
        documents: List[Document], #inputs
        vectors: List[List[float]]
    ) -> None:
        """
        Store precomputed embeddings in a FAISS index.
        """
            #do validation to check if the chunks,vectors exists or if the number of chunks is the same as number of vectors sent ove
        if not documents:
            logger.error("Document list is empty.")
            raise ValueError("No documents provided.")

        if not vectors:
            logger.error("Embedding list is empty.")
            raise ValueError("No embeddings provided.")

        if len(documents) != len(vectors):
            logger.error(
                "Documents and embeddings count mismatch."
            )
            raise ValueError(
                "Each document must have one embedding."
            )

        logger.info(
            "Creating vector index for %d document chunks.",
            len(documents)
        )
        #convert the data type to arrays
        embeddings = np.array(
            vectors,
            dtype=np.float32
        )

        #tells FAISS how many values are inside a vector
        dimension = embeddings.shape[1]
        #create an empty vector database with the dimension of the vector, and store the embeddings inside it
        self.index = faiss.IndexFlatIP(
            dimension
        )
        #store the vectors and the documents
        self.index.add(
            embeddings
        )

        self.documents = documents

        logger.info(
            "Embeddings stored successfully."
        )