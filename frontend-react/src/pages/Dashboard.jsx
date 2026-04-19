import { useState } from "react";
import ChatBox from "../components/ChatBox";
import RecentQueries from "../components/RecentQueries";
import useChat from "../hooks/useChat";

export default function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
 

  // ✅ Chat Hook
  const { messages, sendMessage, loading } = useChat();

  const addExpense = () => {
    if (!amount || !category) return;

    const newExpense = { amount, category };
    setExpenses([...expenses, newExpense]);

    setAmount("");
    setCategory("");
  };

  return (
    <div className="flex h-screen">
      
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-4">
        <h2 className="text-xl mb-6">Finance AI</h2>

        <p className="cursor-pointer mb-3" onClick={() => setActive("dashboard")}>
          Dashboard
        </p>
        <p className="cursor-pointer mb-3" onClick={() => setActive("expenses")}>
          Expenses
        </p>
        <p className="cursor-pointer mb-3" onClick={() => setActive("settings")}>
          Settings
        </p>

        <button
          onClick={onLogout}
          className="mt-6 bg-red-500 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 bg-gray-100">

        {/* DASHBOARD */}
        {active === "dashboard" && (
          <div>
            <div className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-xl font-bold">
                Welcome {user?.username}
              </h2>
              <p className="text-gray-600">
                Your smart finance assistant is ready.
              </p>
            </div>

            {/* 💬 Chat Section */}
            <div className="grid grid-cols-2 gap-6">
              
              {/* Recent Queries */}
              <div className="bg-white p-4 rounded shadow">
                <RecentQueries messages={messages} />
              </div>

              {/* Chat Box */}
              <div className="bg-white p-4 rounded shadow">
                <ChatBox
                  messages={messages}
                  sendMessage={sendMessage}
                  loading={loading}
                />
              </div>

            </div>
          </div>
        )}

        {/* EXPENSES */}
        {active === "expenses" && (
          <div>
            <h2 className="text-xl font-bold mb-4">Expenses</h2>

            {/* Add Expense */}
            <div className="bg-white p-4 rounded shadow mb-4">
              <input
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 mr-2"
              />
              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 mr-2"
              />
              <button
                onClick={addExpense}
                className="bg-blue-500 text-white px-4 py-2"
              >
                Add
              </button>
            </div>

            {/* Expense List */}
            <div className="bg-white p-4 rounded shadow">
              {expenses.length === 0 ? (
                <p>No expenses yet</p>
              ) : (
                expenses.map((e, i) => (
                  <div key={i} className="border-b py-2">
                    ₹{e.amount} - {e.category}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* SETTINGS */}
        {active === "settings" && (
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Settings</h2>

            {/* Personalization */}
            <div className="mb-4">
              <label className="block mb-1">Personalization</label>
              <textarea
                className="w-full border p-2"
                placeholder="Tell us your preferences..."
              />
            </div>

            {/* Language */}
            <div>
              <label className="block mb-1">Language</label>
              <select className="border p-2">
                <option>Auto Detect</option>
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}