from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.init_db import init_db

from app.routes import finance
from app.routes import expenses

app = FastAPI()

# CORS (for frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(finance.router)

@app.get("/")
def home():
    return {"message": "AI Finance Advisor Running 🚀"}

@app.on_event("startup")
def startup():
    init_db()

app.include_router(expenses.router)