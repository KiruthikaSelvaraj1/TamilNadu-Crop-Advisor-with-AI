import React, { useState } from "react";
import axios from "axios";

const LLMAssistant = () => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const askLLM = async () => {
    if (!query.trim()) {
      setError("Please enter a question!");
      return;
    }

    setLoading(true);
    setError("");
    setResponse("");

    try {
      const res = await axios.post("http://localhost:5000/ask_llm", { query });
      setResponse(res.data.answer);
      setQuery("");
    } catch (err) {
      setError("Error: Could not get response. Try again!");
      console.error("LLM Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      askLLM();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">🤖 AI Crop Assistant</h1>
          <p className="text-gray-600 mb-8">Ask me anything about farming, crops, and agriculture!</p>

          {/* Chat Area */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 min-h-40 max-h-80 overflow-y-auto border border-blue-200">
            {response ? (
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-400 py-12">
                <p>Ask a question and get instant farming advice! 🌾</p>
              </div>
            )}
          </div>

          {/* Input Section */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="E.g., 'How to grow rice?' or 'Best crops for monsoon?'"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={loading}
              />
              <button
                onClick={askLLM}
                disabled={loading}
                title="Ask the AI Assistant"
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                {loading ? "⏳" : "Ask"}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-red-700">
                {error}
              </div>
            )}
          </div>

          {/* Quick Questions */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm font-semibold text-gray-700 mb-3">💡 Try asking:</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {[
                "How to grow rice?",
                "Best crops for monsoon?",
                "How to increase yield?",
                "Organic pest control methods?",
                "Soil preparation tips?",
                "Irrigation schedule for cotton?"
              ].map((question, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setQuery(question);
                    setTimeout(() => {
                      document.querySelector("input")?.focus();
                    }, 0);
                  }}
                  className="text-left text-sm bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-3 transition-colors text-blue-700"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LLMAssistant;
