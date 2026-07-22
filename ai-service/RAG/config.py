from pathlib import Path
from dotenv import load_dotenv
import os

load_dotenv()


# PROJECT PATHS
BASE_DIR = Path(__file__).resolve().parent

VECTOR_DB_DIR = BASE_DIR / "vector_db"

VECTOR_DB_DIR.mkdir(parents=True, exist_ok=True)

# TEXT SPLITTING

CHUNK_SIZE = 1000

CHUNK_OVERLAP = 200


# EMBEDDING MODEL

EMBEDDING_MODEL = "BAAI/bge-base-en-v1.5"


# RETRIEVAL SETTINGS
TOP_K = 6

SEARCH_TYPE = "similarity"

#LLM CONFIG
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

LLM_MODEL = os.getenv(
    "LLM_MODEL",
    "llama-3.3-70b-versatile"
)

LLM_TEMPERATURE = float(
    os.getenv(
        "LLM_TEMPERATURE",
        0.3
    )
)

LLM_MAX_TOKENS = int(
    os.getenv(
        "LLM_MAX_TOKENS",
        2000
    )
)


# FUTURE SETTINGS

#ENABLE_PARENT_DOCUMENT_RETRIEVAL = False

#ENABLE_HYBRID_SEARCH = False

#ENABLE_METADATA_FILTERING = False