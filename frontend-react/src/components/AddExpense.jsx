import { useState } from "react";

export default function AddExpense({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!amount || !category) return;

    const newExpense = {
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    onAdd(newExpense);
    setAmount("");
    setCategory("");
  };

  return (
    <div className="card">
      <h3 className="mb-3 font-semibold">➕ Add Expense</h3>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-2 p-2 border rounded"
      />

      <input
        type="text"
        placeholder="Category (Food, Travel...)"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-3 p-2 border rounded"
      />

      <button onClick={handleAdd} className="button-primary w-full">
        Add
      </button>
    </div>
  );
}