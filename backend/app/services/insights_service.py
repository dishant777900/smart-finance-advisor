import json
from pathlib import Path

DATA_DIR = Path(__file__).resolve().parent.parent / "data"
DATA_DIR.mkdir(exist_ok=True)

STORE_FILE = DATA_DIR / "insights_tasks_store.json"


def load_store():
    if not STORE_FILE.exists():
        return {}

    try:
        with open(STORE_FILE, "r", encoding="utf-8") as f:
            return json.load(f)
    except Exception:
        return {}


def save_store(data):
    with open(STORE_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


def get_saved_user_ai_data(gmail):
    store = load_store()
    return store.get(gmail, {"insights": [], "tasks": []})


def save_user_ai_data(gmail, insights, tasks):
    store = load_store()
    store[gmail] = {
        "insights": insights,
        "tasks": tasks
    }
    save_store(store)
    return store[gmail]