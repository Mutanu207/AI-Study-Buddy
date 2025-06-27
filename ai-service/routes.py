from fastapi import APIRouter

router = APIRouter()


@router.post("/generate")
async def generate(session_id,document_id,file_path: dict):

    print(session_id,document_id,file_path)

    return {
        "message": "Hello from FastAPI"
    }