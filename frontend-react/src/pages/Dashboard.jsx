import { useState, useEffect } from "react";
import ChatBox from "../components/ChatBox";
import RecentQueries from "../components/RecentQueries";
import useChat from "../hooks/useChat";
import ExpenseChart from "../components/ExpenseChart";
import InsightsCard from "../components/InsightsCard";
import AITasksCard from "../components/AITasksCard";

export default function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState("dashboard");
  const [expenses, setExpenses] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [personalization, setPersonalization] = useState("");
  const [language, setLanguage] = useState("Auto Detect");
  const [insights, setInsights] = useState([]);
  const [tasks, setTasks] = useState([]);

  const { messages, sendMessage, loading } = useChat();

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

    fetch(
      `http://127.0.0.1:8000/saved-ai-data?gmail=${encodeURIComponent(
        user.gmail
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInsights(data.insights || []);
        setTasks(data.tasks || []);
      })
      .catch(() => {});
  }, [user]);

  useEffect(() => {
    if (!user?.gmail) return;

    fetch("http://127.0.0.1:8000/ai-insights-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        gmail: user.gmail,
        expenses,
        personalization,
        language,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setInsights(data.insights || []);
        setTasks(data.tasks || []);
      })
      .catch(() => {});
  }, [expenses, personalization, language, user]);

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

  const savePersonalization = () => {
    if (user?.gmail) {
      localStorage.setItem(
        `personalization_${user.gmail}`,
        personalization
      );
      alert("Personalization saved");
    }
  };

  const handleLanguageChange = (value) => {
    setLanguage(value);
    if (user?.gmail) {
      localStorage.setItem(`language_${user.gmail}`, value);
    }
  };

  const totalSpent = expenses.reduce((sum, e) => sum + Number(e.amount), 0);

  return (
    <div className="flex h-screen bg-slate-100">
      <div className="w-64 bg-gradient-to-b from-blue-900 to-blue-700 text-white p-5 flex flex-col shadow-xl">
        <h2 className="text-2xl font-bold mb-8">Finance AI</h2>

        <button
          onClick={() => setActive("dashboard")}
          className={`text-left mb-3 px-3 py-2 rounded-lg transition ${
            active === "dashboard" ? "bg-white/20 font-bold" : "hover:bg-white/10"
          }`}
        >
          Dashboard
        </button>

        <button
          onClick={() => setActive("expenses")}
          className={`text-left mb-3 px-3 py-2 rounded-lg transition ${
            active === "expenses" ? "bg-white/20 font-bold" : "hover:bg-white/10"
          }`}
        >
          Expenses
        </button>

        <button
          onClick={() => setActive("settings")}
          className={`text-left mb-3 px-3 py-2 rounded-lg transition ${
            active === "settings" ? "bg-white/20 font-bold" : "hover:bg-white/10"
          }`}
        >
          Settings
        </button>

        <button
          onClick={onLogout}
          className="mt-auto bg-red-500 px-3 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {active === "dashboard" && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h2 className="text-2xl font-bold">
                Welcome {user?.username}
              </h2>
              <p className="text-gray-600 mt-1">
                Your smart finance assistant is ready.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-2xl shadow-sm border">
                <p className="text-sm text-gray-500">Total Expenses</p>
                <h3 className="text-2xl font-bold mt-2">₹{totalSpent}</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border">
                <p className="text-sm text-gray-500">Expenses Added</p>
                <h3 className="text-2xl font-bold mt-2">{expenses.length}</h3>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-sm border">
                <p className="text-sm text-gray-500">Language</p>
                <h3 className="text-2xl font-bold mt-2">{language}</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <InsightsCard insights={insights} />
              <AITasksCard tasks={tasks} />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-2xl shadow-sm border h-[420px] overflow-y-auto">
                <h3 className="font-semibold mb-3 text-lg">Recent Queries</h3>
                <RecentQueries messages={messages} />
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-sm border h-[420px] flex flex-col">
                <h3 className="font-semibold mb-3 text-lg">Chat Assistant</h3>
                <ChatBox
                  messages={messages}
                  sendMessage={sendMessage}
                  loading={loading}
                />
              </div>
            </div>
          </div>
        )}

        {active === "expenses" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Expenses</h2>

            <div className="bg-white p-4 rounded-2xl shadow-sm border">
              <div className="grid grid-cols-3 gap-3">
                <input
                  type="number"
                  placeholder="Amount"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="border p-3 rounded-lg"
                />
                <input
                  placeholder="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="border p-3 rounded-lg"
                />
                <button
                  onClick={addExpense}
                  className="bg-blue-500 text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                  Add Expense
                </button>
              </div>
            </div>

            <ExpenseChart expenses={expenses} />

            <div className="grid grid-cols-3 gap-4">
              {expenses.length === 0 ? (
                <p>No expenses yet</p>
              ) : (
                expenses.map((e) => (
                  <div key={e.id} className="bg-white p-4 rounded-2xl shadow-sm border">
                    <p className="text-lg font-bold">₹{e.amount}</p>
                    <p className="text-gray-600">{e.category}</p>
                    <p className="text-sm text-gray-400 mt-1">{e.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {active === "settings" && (
          <div className="bg-white p-6 rounded-2xl shadow-sm border max-w-2xl">
            <h2 className="text-2xl font-bold mb-6">Settings</h2>

            <div className="mb-6">
              <label className="block font-medium mb-2">
                Personalization
              </label>
              <textarea
                className="w-full border p-3 rounded-lg min-h-[120px]"
                placeholder="Describe your financial goals and preferences..."
                value={personalization}
                onChange={(e) => setPersonalization(e.target.value)}
              />
              <button
                onClick={savePersonalization}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Save
              </button>
            </div>

            <div>
              <label className="block font-medium mb-2">
                Language
              </label>
              <select
                className="w-full border p-3 rounded-lg"
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