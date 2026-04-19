import React from "react";

export default function RecentQueries({ messages }) {
  // Get last 5 user queries
  const queries = messages
    .filter((m) => m.type === "user")
    .slice(-5)
    .reverse();

  return (
    <div className="w-1/3 bg-white/60 backdrop-blur-lg p-4 rounded-xl shadow">
      <h3 className="mb-4 font-semibold text-lg">📜 Recent Queries</h3>

      {queries.length === 0 ? (
        <p className="text-gray-500">No queries yet</p>
      ) : (
        <ul className="space-y-3">
          {queries.map((q, i) => (
            <li
              key={i}
              className="bg-white p-3 rounded-lg shadow hover:bg-blue-50 transition cursor-pointer"
            >
              {q.text}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}