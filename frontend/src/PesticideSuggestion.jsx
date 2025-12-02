
import React, { useState } from "react";

const PesticideSuggestion = () => {
  const [crop, setCrop] = useState("");
  const [pest, setPest] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setResult(null);
    try {
  const res = await fetch("http://127.0.0.1:5000/suggest_pesticide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, pest }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || "No recommendation found.");
      }
    } catch (err) {
      setError("Error connecting to backend.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">🧪 Pesticide Suggestion</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">Crop:</label>
        <input
          type="text"
          value={crop}
          onChange={e => setCrop(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. rice, cotton, banana"
          required
        />
        <label className="block mb-2">Pest/Disease (optional):</label>
        <input
          type="text"
          value={pest}
          onChange={e => setPest(e.target.value)}
          className="w-full p-2 border rounded mb-4"
          placeholder="e.g. stem borer, blast"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">Get Suggestion</button>
      </form>
      {result && result.pesticide && (
        <div className="mt-4">
          <p><strong>Pesticide:</strong> {result.pesticide}</p>
          <p><strong>Instructions:</strong> {result.instructions}</p>
        </div>
      )}
      {result && result.pesticides && (
        <div className="mt-4">
          <p><strong>Available pesticides for {crop}:</strong></p>
          <ul>
            {Object.entries(result.pesticides).map(([pest, pesticide]) => (
              <li key={pest}><strong>{pest}:</strong> {pesticide}</li>
            ))}
          </ul>
        </div>
      )}
      {error && <p className="text-red-600 mt-4">{error}</p>}
    </div>
  );
};

export default PesticideSuggestion;
