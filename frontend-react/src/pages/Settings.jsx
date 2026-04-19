import { useState, useEffect } from "react";

export default function Settings() {
  const [personalization, setPersonalization] = useState("");
  const [language, setLanguage] = useState("");

  // Auto detect language
  useEffect(() => {
    const lang = navigator.language;
    setLanguage(lang);
  }, []);

  return (
    <div className="space-y-6">

      {/* Personalization */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">⚙️ Personalization</h3>

        <textarea
          value={personalization}
          onChange={(e) => setPersonalization(e.target.value)}
          placeholder="Tell us how you want your AI assistant to behave..."
          className="w-full p-2 border rounded"
        />

        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </div>

      {/* Language Detection */}
      <div className="bg-white p-4 rounded-xl shadow">
        <h3 className="font-semibold mb-2">🌐 Language</h3>

        <p className="text-gray-600">
          Auto-detected Language: <b>{language}</b>
        </p>

        <p className="text-sm text-gray-500 mt-1">
          Your AI responses will adapt based on this language.
        </p>
      </div>
    </div>
  );
}