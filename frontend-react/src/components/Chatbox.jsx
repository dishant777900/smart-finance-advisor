import { useState, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";

export default function ChatBox({ messages, sendMessage, loading }) {
  const [query, setQuery] = useState("");
  const chatRef = useRef(null);

  const handleSend = () => {
    if (!query.trim()) return;
    sendMessage(query);
    setQuery("");
  };

  useEffect(() => {
    chatRef.current?.scrollTo({
      top: chatRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, loading]);

  return (
    <div className="w-2/3 bg-white/60 backdrop-blur-lg p-4 rounded-xl shadow flex flex-col">
      <h3 className="mb-2 font-semibold">💬 Chat</h3>

      <div ref={chatRef} className="flex-1 overflow-y-auto space-y-2 mb-3">
        {messages.map((m, i) => (
          <MessageBubble key={i} type={m.type} text={m.text} />
        ))}

        {loading && (
          <div className="bg-gray-200 p-2 rounded-xl w-fit">
            Typing...
          </div>
        )}
      </div>

      <div className="flex gap-2">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded border"
          placeholder="Ask about your finances..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}