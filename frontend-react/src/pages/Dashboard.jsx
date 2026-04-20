import { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import RecentQueries from "../components/RecentQueries";
import useChat from "../hooks/useChat";
import ExpenseChart from "../components/ExpenseChart";

export default function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [personalization, setPersonalization] = useState("");
  const [language, setLanguage] = useState("Auto Detect");

  // ✅ Chat Hook
  const { messages, sendMessage, loading } = useChat();

  // ✅ Load saved expenses + settings for current user
  useEffect(() => {
    if (!user?.gmail) return;

    const savedExpenses = localStorage.getItem(`expenses_${user.gmail}`);
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }

    const savedPersonalization = localStorage.getItem(
      `personalization_${user.gmail}`
    );
    if (savedPersonalization) {
      setPersonalization(savedPersonalization);
    }

    const savedLanguage = localStorage.getItem(`language_${user.gmail}`);
    if (savedLanguage) {
      setLanguage(savedLanguage);
    } else {
      setLanguage(navigator.language || "Auto Detect");
    }
  }, [user]);

  // ✅ Add Expense and save per user
  const addExpense = () => {
    if (!amount || !category) {
      alert("Please fill all fields");
      return;
    }

    const newExpense = {
      id: Date.now(),
      amount: Number(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);

    if (user?.gmail) {
      localStorage.setItem(
        `expenses_${user.gmail}`,
        JSON.stringify(updatedExpenses)
      );
    }

    setAmount("");
    setCategory("");
  };

  // ✅ Save personalization
  const savePersonalization = () => {
    if (user?.gmail) {
      localStorage.setItem(
        `personalization_${user.gmail}`,
        personalization
      );
      alert("Personalization saved");
    }
  };

  // ✅ Save language
  const handleLanguageChange = (value) => {
    setLanguage(value);
    if (user?.gmail) {
      localStorage.setItem(`language_${user.gmail}`, value);
    }
  };

  return (
    <div className="flex h-screen">
      {/* 🔹 Sidebar */}
      <div className="w-64 bg-blue-900 text-white p-5 flex flex-col">
        <h2 className="text-2xl font-bold mb-8">Finance AI</h2>

        <p
          className={`cursor-pointer mb-3 ${active === "dashboard" ? "font-bold" : ""}`}
          onClick={() => setActive("dashboard")}
        >
          Dashboard
        </p>

        <p
          className={`cursor-pointer mb-3 ${active === "expenses" ? "font-bold" : ""}`}
          onClick={() => setActive("expenses")}
        >
          Expenses
        </p>

        <p
          className={`cursor-pointer mb-3 ${active === "settings" ? "font-bold" : ""}`}
          onClick={() => setActive("settings")}
        >
          Settings
        </p>

        <button
          onClick={onLogout}
          className="mt-auto bg-red-500 px-3 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>

      {/* 🔹 Main */}
      <div className="flex-1 p-6 bg-gray-100 overflow-y-auto">
        {/* ================= DASHBOARD ================= */}
        {active === "dashboard" && (
          <div>
            <div className="bg-white p-6 rounded shadow mb-6">
              <h2 className="text-2xl font-bold">
                Welcome {user?.username}
              </h2>
              <p className="text-gray-600 mt-1">
                Your smart finance assistant is ready.
              </p>
            </div>

            {/* 💬 Chat Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded shadow h-[400px] overflow-y-auto">
                <h3 className="font-semibold mb-2">Recent Queries</h3>
                <RecentQueries messages={messages} />
              </div>

              <div className="bg-white p-4 rounded shadow h-[400px] flex flex-col">
                <h3 className="font-semibold mb-2">Chat Assistant</h3>
                <ChatBox
                  messages={messages}
                  sendMessage={sendMessage}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}

        {/* ================= EXPENSES ================= */}
        {active === "expenses" && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Expenses</h2>

            {/* Add Expense */}
            <div className="bg-white p-4 rounded shadow mb-4">
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border p-2 mr-2 rounded"
              />
              <input
                placeholder="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border p-2 mr-2 rounded"
              />
              <button
                onClick={addExpense}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>

            {/* 📊 Chart */}
            <ExpenseChart expenses={expenses} />

            {/* Expense Cards */}
            <div className="grid grid-cols-3 gap-4 mt-6">
              {expenses.length === 0 ? (
                <p>No expenses yet</p>
              ) : (
                expenses.map((e) => (
                  <div key={e.id} className="bg-white p-4 rounded shadow">
                    <p className="text-lg font-bold">₹{e.amount}</p>
                    <p className="text-gray-600">{e.category}</p>
                    <p className="text-sm text-gray-400 mt-1">{e.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* ================= SETTINGS ================= */}
        {active === "settings" && (
          <div className="bg-white p-6 rounded shadow max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Settings</h2>

            {/* Personalization */}
            <div className="mb-4">
              <label className="block font-medium mb-1">
                Personalization
              </label>
              <textarea
                className="w-full border p-3 rounded"
                placeholder="Describe your financial goals..."
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value)}
              />
              <button
                onClick={savePersonalization}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
            </div>

            {/* Language */}
            <div>
              <label className="block font-medium mb-1">
                Language
              </label>
              <select
                className="w-full border p-2 rounded"
                value={language}
                onChange={(e) => handleLanguageChange(e.target.value)}
              >
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