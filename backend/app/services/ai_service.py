import requests
import os
from dotenv import load_dotenv

from app.services.memory_service import get_memory
from app.services.expense_service import get_expenses

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def format_response(text):
    """
    Clean AI output without over-restricting it.
    Keeps paragraphs and bullets readable.
    """
    text = text.replace("<think>", "").replace("</think>", "").strip()

    lines = []
    for line in text.split("\n"):
        line = line.strip()
        if not line:
            continue

        # Remove numbering like 1. 2. if present
        if len(line) > 1 and line[0].isdigit() and "." in line:
            parts = line.split(".", 1)
            if len(parts) > 1:
                line = parts[1].strip()

        # Replace "they" with "you"
        line = line.replace("they", "you")

        lines.append(line)

    if not lines:
        return "Sorry, I could not generate a proper response."

    return "\n\n".join(lines)


def get_ai_response(user_input):
    # Memory
    past = get_memory()

    context = ""
    for item in past:
        context += f"User: {item.get('input', '')}\nAI: {item.get('response', '')}\n"

    # Expenses
    try:
        expenses = get_expenses()
    except Exception:
        expenses = []

    expense_summary = ""
    if isinstance(expenses, list) and expenses:
        for e in expenses[:5]:
            category = e.get("category", "unknown")
            amount = e.get("amount", 0)
            expense_summary += f"{category}: {amount}, "
    else:
        expense_summary = "No expense data available."

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "qwen/qwen3-32b",
        "messages": [
            {
                "role": "system",
                "content": f"""
You are a smart AI finance advisor.

Rules:
- Talk directly to the user using "you"
- Give clear, practical, easy-to-understand advice
- Explain in a natural way like a helpful assistant
- Use simple English
- Avoid robotic or overly short answers
- Do not include hidden reasoning, tags, or <think>
- If useful, use short bullet points
- If useful, use a short paragraph followed by bullet points
- Keep the response concise but meaningful
- Use this expense data when relevant: {expense_summary}
"""
            },
            {
                "role": "user",
                "content": context + "\nUser: " + user_input
            }
        ],
        "temperature": 0.7
    }

    try:
        res = requests.post(url, headers=headers, json=data)

        if res.status_code != 200:
            return f"Error: AI service not responding ({res.status_code})"

        result = res.json()
        answer = result["choices"][0]["message"]["content"]

        return format_response(answer)

    except Exception:
        return "Error generating response"