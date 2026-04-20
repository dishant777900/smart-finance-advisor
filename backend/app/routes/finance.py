from fastapi import APIRouter
from app.services.ai_service import get_ai_response, get_ai_insights_and_tasks
from app.services.insights_service import get_saved_user_ai_data, save_user_ai_data

router = APIRouter()

@router.get("/ask")
def ask(query: str):
    return {"response": get_ai_response(query)}


@router.post("/ai-insights-tasks")
def generate_ai_insights_tasks(data: dict):
    gmail = data.get("gmail")
    expenses = data.get("expenses", [])
    personalization = data.get("personalization", "")
    language = data.get("language", "Auto Detect")

    result = get_ai_insights_and_tasks(expenses, personalization, language)

    if gmail:
        save_user_ai_data(gmail, result["insights"], result["tasks"])

    return result


@router.get("/saved-ai-data")
def get_saved_ai_data(gmail: str):
    return get_saved_user_ai_data(gmail)