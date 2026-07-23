from fastapi import APIRouter

from RAG.pipeline import QuestionGenerationPipeline

router = APIRouter()

# Create one pipeline instance when FastAPI starts
question_pipeline = QuestionGenerationPipeline()


@router.post("/generate")
async def generate_questions(
    file_path: str,
    session_id: int,
):

    questions = question_pipeline.process_document(

        file_path=file_path,

        session_id=session_id

    )

    return questions