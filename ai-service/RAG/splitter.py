import logging
from typing import List #py let us describe the type of function return

from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document
from config import CHUNK_SIZE, CHUNK_OVERLAP

logger = logging.getLogger(__name__)


def split_text( #input params
    clean_text: str,
    session_id: int,
    document_id: int,
    source: str,
) -> List[Document]:
    """
    Split cleaned text into overlapping semantic chunks and attach metadata.

    Args:
        clean_text: Cleaned document text.
        session_id: Study session identifier.
        document_id: Database document identifier.
        source: Original PDF filename or file path.

    Returns:
        List of LangChain Document objects.
    """

    if not clean_text or not clean_text.strip(): #check if we get input data
        logger.error("No text available for splitting.")
        raise ValueError("Clean text is empty.")

    logger.info("Splitting cleaned text into semantic chunks.")

    splitter = RecursiveCharacterTextSplitter( #create an objec splitter

        chunk_size= CHUNK_SIZE, #max size 1000 char

        chunk_overlap=CHUNK_OVERLAP, #repeats the last 200 char of one chunk at the start of the next chunk

        length_function=len,

        separators=[
            "\n\n", #paragraph
            "\n", #lines
            ". ", #sentences
            " ", #words
            ""#characters
        ]
    )

    text_chunks = splitter.split_text(clean_text) #splitting the clean_text input and storing them in text_chunk

    documents = [] #create a list

    for index, chunk in enumerate(text_chunks): #loop through every text chunk,giving it the 
        #Document object, enumarate gives us the value and postion,which is index

        documents.append(

            Document(

                page_content=chunk,

                metadata={

                    "chunk_index": index,

                    "session_id": session_id,

                    "document_id": document_id,

                    "source": source

                }

            )

        )

    logger.info("Generated %d document chunks.", len(documents))

    return documents #return the list document with Documents object inside that contains chunks and metadata