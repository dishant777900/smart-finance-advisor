from app.database.db import get_connection

def add_expense(amount, category, description):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO expenses (amount, category, description) VALUES (?, ?, ?)",
        (amount, category, description)
    )

    conn.commit()
    conn.close()


def get_expenses():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("SELECT * FROM expenses ORDER BY date DESC")
    rows = cursor.fetchall()

    conn.close()

    return [dict(row) for row in rows]