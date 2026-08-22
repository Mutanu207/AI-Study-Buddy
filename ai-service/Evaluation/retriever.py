import logging

from database.chunk_model import get_chunk

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


    def retrieve_context(self,
        session_id: int,
        chunk_index: int,
    ) -> str: #input is is session id and chunk index since we neeed this to grab the text
        """
        Returns the page content of the chunk that generated the question.
        """

        try:

            logger.info(
                "Retrieving context for chunk %s",
                chunk_index
            )


            return get_chunk(
                session_id=session_id,
                chunk_index=chunk_index,
                ) #this function retunrs the text chunk it grabs from pgsql


        except Exception:

            logger.exception(
                "Error retrieving context."
            )

            raise