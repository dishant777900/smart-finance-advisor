import requests
import os
from dotenv import load_dotenv

from app.services.memory_service import get_memory
from app.services.expense_service import get_expenses

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


# 🔥 FORCE CLEAN BULLET OUTPUT
def format_response(text):
    lines = text.split("\n")
    clean = []

    for line in lines:
        line = line.strip()

        if not line:
            continue

        # Remove numbering (1. 2. etc.)
        if line[0].isdigit():
            parts = line.split(".", 1)
            if len(parts) > 1:
                line = parts[1].strip()

        # Ensure bullet format
        if not line.startswith("-"):
            line = "- " + line

        # Replace "they" with "you"
        line = line.replace("they", "you")

        clean.append(line)

    # If AI returns paragraph → convert to bullets
    if len(clean) < 2:
        sentences = text.replace("\n", " ").split(".")
        clean = []
        for s in sentences:
            s = s.strip()
            if s:
                clean.append("- " + s.replace("they", "you"))

    return "\n".join(clean[:4])


def get_ai_response(user_input):
    # 🧠 Get memory
    past = get_memory()

    context = ""
    for item in past:
        context += f"User: {item.get('input','')}\nAI: {item.get('response','')}\n"

    # 💸 Get expenses
    expenses = get_expenses()

    expense_summary = ""
    for e in expenses[:5]:
        expense_summary += f"{e['category']}: {e['amount']}, "

    # 🌐 API call
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

STRICT RULES:
- DO NOT include any thinking, reasoning, or explanations
- DO NOT use <think> or any tags
- ONLY return 4 to 6 short bullet points
- keep each point under 15 words
- Each line must start with "-"
- Each line must be a clear actionable tip
- DO NOT write paragraphs
- Use simple English
- Talk directly using "you"
- Use this expense data: {expense_summary}
"""
            },
            {
                "role": "user",
                "content": context + "\nUser: " + user_input
            }
        ]
    }

    try:
        res = requests.post(url, headers=headers, json=data)

        if res.status_code != 200:
            return "Error: AI service not responding"

        result = res.json()
        answer = result["choices"][0]["message"]["content"]

        # 🔥 Clean & format output
        return format_response(answer)

    except Exception as e:
        return "Error generating response"