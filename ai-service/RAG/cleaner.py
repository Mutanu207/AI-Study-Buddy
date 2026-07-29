import logging
import re # Regular expressions library for text cleaning, that can match patterns


logger = logging.getLogger(__name__)


def clean_text(raw_text: str) -> str:
    """
    Clean extracted PDF text before chunking.

    Args:
        raw_text: Raw text extracted from the PDF.

    Returns:
        A cleaned string ready for text splitting.

    Raises:
        ValueError:
            If the extracted text is empty.
    """

    if not raw_text or not raw_text.strip():#check if the raw text is empty or only whitespace
        logger.error("No text available for cleaning.")
        raise ValueError("Extracted text is empty.")

    logger.info("Cleaning extracted text.")

    cleaned_text = raw_text # Initialize the cleaned text with the raw text

    # Replace tabs with spaces
    cleaned_text = cleaned_text.replace("\t", " ")

    # r is the raw string, [] symbolizes space,{2,} means 2 or more spaces, replace with a single space
    cleaned_text = re.sub(r"[ ]{2,}", " ", cleaned_text)

    # remove excess blank lines
    cleaned_text = re.sub(r"\n{3,}", "\n\n", cleaned_text)

    # Remove trailing and leading whitespace
    cleaned_text = cleaned_text.strip()

    #logging
    logger.info("Text cleaning completed successfully.")

    return cleaned_text