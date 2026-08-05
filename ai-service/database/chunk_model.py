import logging
from typing import List

from langchain_core.documents import Document
from pgvector.psycopg2 import register_vector

from .database import get_connection

logger = logging.getLogger(__name__)

#saves one row of data in the chunk table whose col are ses_id,text chunk,chunk index and embeddings
def save_chunk(
    session_id: int,
    chunk_index: int,
    text: str,
    embedding: List[float],
) -> None:
    """
    Save one chunk and its embedding into PostgreSQL.
    """

    connection = None

    try:

        connection = get_connection()

        register_vector(connection)

        cursor = connection.cursor()

        query = """
        INSERT INTO chunks (
            session_id,
            chunk_index,
            text,
            embedding
        )
        VALUES (%s, %s, %s, %s);
        """

        cursor.execute(
            query,
            (
                session_id,
                chunk_index,
                text,
                embedding,
            ),
        )

        connection.commit()

        logger.info(
            "Saved chunk %d for session %d.",
            chunk_index,
            session_id,
        )

    except Exception:

        if connection:
            connection.rollback()

        logger.exception(
            "Failed to save chunk."
        )

        raise

    finally:

        if connection:
            connection.close()

#loops through documents and embeddings and saves them one by one using save_chunk function
def save_chunks(
    session_id: int,
    documents: List[Document],
    embeddings: List[List[float]],
) -> None:
    """
    Save all chunks belonging to one study session.

    Every Document already contains:

    - page_content
    - metadata["chunk_index"]

    Therefore we use the existing chunk index 
    """

    logger.info(
        "Saving %d chunks.",
        len(documents),
    )
    #loops through documents and embedding takes one object and saves them in db using save_chunk
    if len(documents) != len(embeddings):
        raise RuntimeError(
        "Number of documents and embeddings do not match."
        )
    for document, embedding in zip(documents, embeddings):

        save_chunk(

            session_id=session_id,

            chunk_index=document.metadata["chunk_index"],

            text=document.page_content,

            embedding=embedding,

        )

    logger.info(
        "All chunks saved successfully."
    )

#retrieve the chukn for evaluation pipeline, for one answe at a time we will loop through this function
def get_chunk(
    session_id: int,
    chunk_index: int,
) -> str:
    """
    Retrieve one chunk using its session_id and chunk_index.

    This chunk becomes the retrieved context during
    answer evaluation.
    """

    connection = None

    try:

        connection = get_connection()

        cursor = connection.cursor()

        query = """
        SELECT text
        FROM chunks
        WHERE session_id = %s
        AND chunk_index = %s;
        """

        cursor.execute(
            query,
            (
                session_id,
                chunk_index,
            ),
        )

        result = cursor.fetchone()

        if result is None:

            raise RuntimeError(
                f"No chunk found for session {session_id} "
                f"and chunk {chunk_index}."
            )

        logger.info(
            "Retrieved chunk %d for session %d.",
            chunk_index,
            session_id,
        )

        return result["text"]

    except Exception:

        logger.exception(
            "Failed to retrieve chunk."
        )

        raise

    finally:

        if connection:
            connection.close()