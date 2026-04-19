import { useEffect, useState } from "react";
import ExpenseChart from "../components/ExpenseChart";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/expenses")
      .then(res => res.json())
      .then(setExpenses);
  }, []);

  return (
    <div>
      <h2 className="text-xl mb-4">Expenses</h2>

      <ExpenseChart expenses={expenses} />

      {expenses.map(e => (
        <div key={e.id} className="bg-white p-2 mt-2 rounded shadow">
          ₹{e.amount} - {e.category}
        </div>
      ))}
    </div>
  );
}