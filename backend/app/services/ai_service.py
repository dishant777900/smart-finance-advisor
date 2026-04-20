import requests
import os
import json
import re
from dotenv import load_dotenv

from app.services.memory_service import get_memory

load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def format_response(text):
    """
    Clean AI output for chatbox.
    Keeps natural paragraph + bullet style formatting.
    """
    if not text:
        return "Sorry, I could not generate a proper response."

    text = text.replace("<think>", "").replace("</think>", "").strip()

    cleaned_lines = []
    for line in text.split("\n"):
        line = line.strip()
        if not line:
            continue

        # Remove numbering like 1. / 2. / 3.
        if len(line) > 1 and line[0].isdigit() and "." in line:
            parts = line.split(".", 1)
            if len(parts) > 1:
                line = parts[1].strip()

        # Replace "they" with "you" for direct advice
        line = line.replace("they", "you")

        cleaned_lines.append(line)

    if not cleaned_lines:
        return "Sorry, I could not generate a proper response."

    return "\n\n".join(cleaned_lines)


def extract_json(content):
    """
    Safely extract JSON even if model wraps it in markdown/code fences.
    """
    content = content.strip()

    # Remove markdown code blocks if present
    content = re.sub(r"^```json", "", content, flags=re.IGNORECASE).strip()
    content = re.sub(r"^```", "", content).strip()
    content = re.sub(r"```$", "", content).strip()

    # Try direct parse first
    try:
        return json.loads(content)
    except Exception:
        pass

    # Try extracting first {...} block
    match = re.search(r"\{.*\}", content, re.DOTALL)
    if match:
        try:
            return json.loads(match.group(0))
        except Exception:
            pass

    return None


def get_ai_response(user_input):
    """
    Main chat response for finance assistant.
    """
    past = get_memory()

    context = ""
    for item in past:
      context += f"User: {item.get('input', '')}\nAI: {item.get('response', '')}\n"

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
                "content": """
You are a smart AI finance advisor.

Strict rules:
- Do not include thining, reasoning, explanation
- Talk directly to the user using "you"
- Give clear, practical, easy-to-understand advice
- Explain naturally like ChatGPT
- Use simple English
- Do not include hidden reasoning, tags, or <think>
- Keep the response useful and readable
- Start with a short explanation if needed
- Then give practical steps or bullet points if useful
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
        res = requests.post(url, headers=headers, json=data, timeout=30)

        if res.status_code != 200:
            return f"Error: AI service not responding ({res.status_code})"

        result = res.json()
        answer = result["choices"][0]["message"]["content"]

        return format_response(answer)

    except Exception:
        return "Error generating response"


def get_ai_insights_and_tasks(expenses, personalization="", language="Auto Detect"):
    """
    Generate AI-powered insights and tasks from expense data.
    Returns JSON:
    {
      "insights": [...],
      "tasks": [...]
    }
    """
    if not expenses:
        return {
            "insights": [
                "Add a few expenses to unlock smart insights."
            ],
            "tasks": [
                "Add your first 3 expenses",
                "Track spending for this week",
                "Set one savings goal",
                "Review your daily expenses"
            ]
        }

    expense_summary = ", ".join(
        [f"{e.get('category', 'unknown')}: ₹{e.get('amount', 0)}" for e in expenses]
    )

    url = "https://api.groq.com/openai/v1/chat/completions"

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }

    prompt = f"""
You are a smart finance assistant.

Generate:
1. 4 short financial insights
2. 4 short daily action tasks

User expense data:
{expense_summary}

User personalization:
{personalization}

Preferred language:
{language}

Rules:
- Keep each point short and clear
- Use practical finance advice
- Talk directly using "you"
- Do not include <think> or hidden reasoning
- Return ONLY valid JSON in this exact format:

{{
  "insights": ["...", "...", "...", "..."],
  "tasks": ["...", "...", "...", "..."]
}}
"""

    data = {
        "model": "qwen/qwen3-32b",
        "messages": [
            {
                "role": "system",
                "content": "You are a helpful finance AI. Return only JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.5
    }

    try:
        res = requests.post(url, headers=headers, json=data, timeout=30)

        if res.status_code != 200:
            return {
                "insights": [f"AI service not responding ({res.status_code})"],
                "tasks": [
                    "Try again later",
                    "Review your recent expenses",
                    "Track spending this week",
                    "Set one savings goal"
                ]
            }

        result = res.json()
        content = result["choices"][0]["message"]["content"].strip()

        parsed = extract_json(content)

        if not parsed:
            return {
                "insights": [
                    "Your spending data is available but AI insights could not be generated.",
                    "Track your recent expenses more consistently.",
                    "Focus on your highest spending category.",
                    "Review your weekly budget."
                ],
                "tasks": [
                    "Track expenses for 7 days",
                    "Avoid one unnecessary purchase",
                    "Set a weekly budget",
                    "Save ₹100 today"
                ]
            }

        return {
            "insights": parsed.get("insights", []),
            "tasks": parsed.get("tasks", [])
        }

    except Exception:
        return {
            "insights": [
                "Your spending data is available but AI insights could not be generated.",
                "Track your recent expenses more consistently.",
                "Focus on your highest spending category.",
                "Review your weekly budget."
            ],
            "tasks": [
                "Track expenses for 7 days",
                "Avoid one unnecessary purchase",
                "Set a weekly budget",
                "Save ₹100 today"
            ]
        }