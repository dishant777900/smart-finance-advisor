import requests
import os
from dotenv import load_dotenv

load_dotenv()

HINDSIGHT_API_KEY = os.getenv("HINDSIGHT_API_KEY")
BASE_URL = os.getenv("HINDSIGHT_BASE_URL")

headers = {
    "Authorization": f"Bearer {HINDSIGHT_API_KEY}",
    "Content-Type": "application/json"
}

# 🔥 Store conversation
def store_memory(user_input, ai_response):
    try:
        data = {
            "input": user_input,
            "response": ai_response
        }

        requests.post(f"{BASE_URL}/memory", json=data, headers=headers)

    except Exception as e:
        print("Memory store error:", e)


# 🔥 Get past memory
fallback_memory = []
def get_memory():
    try:
        res = requests.get(f"{BASE_URL}/memory", headers=headers)

        if res.status_code == 200:
            return res.json()
        return []

    except Exception as e:
        print("Memory fetch error:", e)
        return fallback_memory[-4:]