import { useState } from "react";

import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import ChatBox from "../components/ChatBox";
import RecentQueries from "../components/RecentQueries";
import ExpenseChart from "../components/ExpenseChart";
import AddExpense from "../components/AddExpense";
import ExpenseCard from "../components/ExpenseCard";
import useChat from "../hooks/useChat";

export default function Dashboard() {
  // 💬 Chat Hook
  const { messages, sendMessage, loading } = useChat();

  // 💸 Expense State
  const [expenses, setExpenses] = useState([]);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-blue-100 to-blue-300">
      
      {/* 🔹 Sidebar */}
      <Sidebar />

      {/* 🔹 Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        
        {/* 🔹 Topbar */}
        <Topbar />

        {/* 🔹 Top Section (Expenses + Chart + Add) */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          <ExpenseChart expenses={expenses} />
          <AddExpense onAdd={addExpense} />
          <ExpenseCard expenses={expenses} />
        </div>

        {/* 🔹 Bottom Section (Chat + Recent Queries) */}
        <div className="flex gap-6">
          <RecentQueries messages={messages} />
          <ChatBox
            messages={messages}
            sendMessage={sendMessage}
            loading={loading}
          />
        </div>

      </div>
    </div>
  );
}