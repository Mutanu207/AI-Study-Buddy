import os
import logging

import psycopg2
from psycopg2.extras import RealDictCursor

from dotenv import load_dotenv

load_dotenv()

logger = logging.getLogger(__name__)


def get_connection():
    """
    Create a PostgreSQL connection.

    Returns:
        psycopg2 connection
    """

    try:

        connection = psycopg2.connect(

            host=os.getenv("PG_HOST"),

            database=os.getenv("PG_DATABASE"),

            user=os.getenv("PG_USER"),

            password=os.getenv("PG_PASSWORD"),

            port=os.getenv("PG_PORT"),

            cursor_factory=RealDictCursor, #we use this so that the results are returned as dictionaries instead of tuples

        )

        logger.info(
            "Connected to PostgreSQL."
        )

        return connection

    except Exception as error:

        logger.exception(
            "Failed to connect to PostgreSQL."
        )

        raise