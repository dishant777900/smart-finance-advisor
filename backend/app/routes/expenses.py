from fastapi import APIRouter
from app.services.expense_service import add_expense, get_expenses

router = APIRouter()

@router.get("/add-expense")
def add(amount: float, category: str, description: str):
    add_expense(amount, category, description)
    return {"message": "Expense added"}

@router.get("/get-expenses")
def get():
    return {"expenses": get_expenses()}