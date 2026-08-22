import logging #logging library
from typing import List #shows expected output of a function, in this case a list

import faiss #vector db
import numpy as np #handles array efficently
from langchain_core.documents import Document

#to remove
import os
import pickle

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
        documents: List[Document], #input from splitter
        vectors: List[List[float]] #input from embedding
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

        self.documents = documents #self.documents is a list of Document objects, which are stored in the vector store memory for later retrieval.

        logger.info(
            "Embeddings stored successfully."
        )

        #to remove function
    def save_index(
    self,
    folder_path: str,
    ) -> None:
        """
        Save the FAISS index and associated documents to disk.
        """

        if self.index is None:

            logger.error(
            "Cannot save an empty FAISS index."
            )

            raise RuntimeError(
            "Vector index has not been created."
            )

        os.makedirs(
            folder_path,
            exist_ok=True,
        )

        faiss.write_index(
            self.index,
            os.path.join(
                folder_path,
                "index.faiss",
            ),
        )

        with open(
            os.path.join(
                folder_path,
                "documents.pkl",
            ),
            "wb",
        ) as file:

            pickle.dump(
                self.documents,
                file,
            )

        logger.info(
            "Vector store saved successfully."
        )

        #remove function
    def load_index(
    self,
    folder_path: str,
) -> None:
        """
        Load a previously saved vector store.
        """

        index_path = os.path.join(
            folder_path,
            "index.faiss",
        )

        documents_path = os.path.join(
            folder_path,
            "documents.pkl",
        )

        if (
            not os.path.exists(index_path)
            or
            not os.path.exists(documents_path)
        ):

            logger.error(
                "Saved vector store not found."
            )

            raise RuntimeError(
                "Vector store files are missing."
            )

        self.index = faiss.read_index(
            index_path
        )

        with open(
            documents_path,
            "rb",
        ) as file:

            self.documents = pickle.load(
                file
            )

        logger.info(
            "Vector store loaded successfully."
        )