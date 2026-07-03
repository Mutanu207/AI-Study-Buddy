import logging #LOGGING LIBRARY
from pathlib import Path #creates object that allows us to use methods to manipulate file paths

import fitz


logger = logging.getLogger(__name__) #creates a logger that i will use in the code


def load_pdf(file_path: str) -> str: #file_path is a string and the output is a string
    """
    Load a PDF document and extract all readable text.

    Args:
        file_path: Absolute or relative path to the PDF.

    Returns:
        A string containing all extracted text.

    Raises:
        FileNotFoundError:
            If the PDF file does not exist.

        RuntimeError:
            If the PDF cannot be opened or read.
    """

    pdf_path = Path(file_path) #creates a Path object for the PDF file

    if not pdf_path.exists(): #check if file path exists
        logger.error("PDF file does not exist: %s", pdf_path)
        raise FileNotFoundError(f"PDF not found: {pdf_path}")

    logger.info("Loading PDF: %s", pdf_path)

    extracted_text = [] #create list to store the text,much easier since of its methods

    try:
        with fitz.open(pdf_path) as document: #open the file and store it in the variable document and close it after the block is done automatically

            logger.info("PDF loaded successfully.")

            logger.info("Number of pages: %d", document.page_count)

            for page in document: #each page is made an object and stored in the variable page by pymupdf

                extracted_text.append(page.get_text()) # loop through each page and extract the text and add them to the list

    except Exception as error:

        logger.exception("Failed to load PDF.")

        raise RuntimeError("Unable to extract text from PDF.") from error

    final_text = "\n".join(extracted_text)  #join the pages

    logger.info("Successfully extracted text from PDF.")

    return final_text