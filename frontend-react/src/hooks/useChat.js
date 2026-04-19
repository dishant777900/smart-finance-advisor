import { useState } from "react";

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async (query) => {
    if (!query.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { type: "user", text: query },
    ];
    setMessages(newMessages);
    setLoading(true);

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/ask?query=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      // 🔹 Format response into bullet-style lines
      let lines = data.response
        ?.split("\n")
        .map((l) => l.trim())
        .filter((l) => l);

      if (!lines || lines.length === 0) {
        lines = [data.response || "No response received"];
      }

      const botMessages = lines.map((line) => ({
        type: "bot",
        text: line,
      }));

      // Update chat
      setMessages([...newMessages, ...botMessages]);

    } catch (error) {
      setMessages([
        ...newMessages,
        {
          type: "bot",
          text: "⚠️ Unable to connect to server. Please try again.",
        },
      ]);
    }

    setLoading(false);
  };

  return {
    messages,
    sendMessage,
    loading,
  };
}