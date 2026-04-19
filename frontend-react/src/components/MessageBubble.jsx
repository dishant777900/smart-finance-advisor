export default function MessageBubble({ type, text }) {
  return (
    <div
      className={`p-2 rounded-xl max-w-xs ${
        type === "user"
          ? "bg-blue-500 text-white ml-auto"
          : "bg-gray-200"
      }`}
    >
      {text}
    </div>
  );
}