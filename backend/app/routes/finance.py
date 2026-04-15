from fastapi import APIRouter
from app.services.ai_service import get_ai_response
from app.services.memory_service import store_memory

router = APIRouter()

@router.get("/ask")
def ask(query: str):
    response = get_ai_response(query)
    store_memory(query, response)
    return {"response": response}