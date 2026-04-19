import { useState } from "react";

export default function Settings() {
  const [text, setText] = useState("");

  return (
    <div>
      <h2 className="text-xl mb-4">Settings</h2>

      <textarea
        placeholder="Describe your personalization..."
        className="w-full p-2 border"
        onChange={(e)=>setText(e.target.value)}
      />

      <button className="mt-2 bg-blue-600 text-white p-2">
        Save
      </button>
    </div>
  );
}