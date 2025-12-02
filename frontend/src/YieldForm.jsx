import React from "react";

function YieldForm({ crop, district, season, area, setYieldResult }) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://127.0.0.1:5000/predict_yield", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ crop, district, season, area }),
      });
      const data = await res.json();
      setYieldResult(data.yield >= 2000); // High if >= 2000
    } catch (err) {
      console.error("Yield fetch error:", err);
      setYieldResult(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-4 rounded shadow-md">
      <h3 className="text-lg font-bold mb-2">🌾 Predict Crop Yield</h3>
      <button id="predict-yield-btn" name="predict-yield-btn" type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
        Predict Yield
      </button>
    </form>
  );
}

export default YieldForm;
