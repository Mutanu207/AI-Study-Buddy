from fastapi import APIRouter

router = APIRouter()


@router.post("/generate")
async def generate(file_path: dict):

    print(file_path)

    return {
        "message": "Hello from FastAPI"
    }