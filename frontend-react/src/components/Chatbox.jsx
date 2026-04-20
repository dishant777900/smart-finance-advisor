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
    <div className="h-full flex flex-col bg-white/60 backdrop-blur-lg p-4 rounded-xl shadow overflow-hidden">
      <h3 className="mb-2 font-semibold">💬 Chat</h3>

      {/* Messages Area */}
      <div
        ref={chatRef}
        className="flex-1 overflow-y-auto space-y-2 mb-3 pr-1"
      >
        {messages.map((m, i) => (
          <div key={i} className="max-w-full break-words whitespace-pre-wrap">
            <MessageBubble type={m.type} text={m.text} />
          </div>
        ))}

        {loading && (
          <div className="bg-gray-200 p-2 rounded-xl w-fit max-w-full break-words">
            Typing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex gap-2 pt-2 border-t">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 p-2 rounded border outline-none"
          placeholder="Ask about your finances..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}