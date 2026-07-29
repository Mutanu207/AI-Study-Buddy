from fastapi import APIRouter
from RAG.pipeline import QuestionGenerationPipeline
from pydantic import BaseModel

router = APIRouter()

class GenerateRequest(BaseModel):
    file_path: str
    session_id: int

# Create one pipeline instance when FastAPI starts
question_pipeline = QuestionGenerationPipeline()


@router.post("/generate")
async def generate_questions(
    request: GenerateRequest,
): #do this so that the fast api is able to receive json transfer from the express server

    questions = question_pipeline.process_document(
        file_path=request.file_path,
        session_id=request.session_id,
    )

    return questions

