from fastapi import APIRouter
from RAG.pipeline import QuestionGenerationPipeline
from Evaluation.pipeline import AnswerEvaluationPipeline
from pydantic import BaseModel

router = APIRouter()
#fast api can receive json transfer from the express server using pydantic models
class GenerateRequest(BaseModel):
    file_path: str
    session_id: int

class EvaluateRequest(BaseModel):
    payload: dict

# Create one pipeline instance when FastAPI starts
question_pipeline = QuestionGenerationPipeline()

evaluation_pipeline = AnswerEvaluationPipeline()


@router.post("/generate")
async def generate_questions(
    request: GenerateRequest,
): #do this so that the fast api is able to receive json transfer from the express server

    questions = question_pipeline.process_document(
        file_path=request.file_path,
        session_id=request.session_id,
    )

    return questions

@router.post("/evaluate")
async def evaluate_answers(
    request: EvaluateRequest, #We do this so that fast api is able to receive json transfer from the express server
):
    evaluation_results = evaluation_pipeline.evaluate_answers(
        payload=request.payload
    )

    return evaluation_results

