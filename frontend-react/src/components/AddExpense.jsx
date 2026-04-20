import { useState } from "react";

export default function AddExpense({ onAdd }) {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleAdd = () => {
    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(), // ✅ unique id
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(), // ✅ used for charts later
    };

    onAdd(newExpense);

    // reset fields
    setAmount("");
    setCategory("");
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="mb-3 font-semibold text-lg">➕ Add Expense</h3>

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

      <button
        onClick={handleAdd}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Add Expense
      </button>
    </div>
  );
}