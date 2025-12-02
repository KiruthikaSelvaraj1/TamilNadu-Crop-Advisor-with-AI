// frontend/src/CropHistory.jsx
import React, { useEffect, useState } from "react";

const CropHistory = ({ farmer }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("crop_history")) || [];
    const userHistory = stored.filter((entry) => entry.email === farmer?.email);
    setHistory(userHistory.reverse());
  }, [farmer]);

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">📜 Crop History</h2>
      {history.length === 0 ? (
        <p>No crop history found for this account.</p>
      ) : (
        <ul className="space-y-4">
          {history.map((entry, i) => (
            <li key={i} className="border-b pb-2">
              <p><strong>District:</strong> {entry.district}</p>
              <p><strong>City:</strong> {entry.city}</p>
              <p><strong>Season:</strong> {entry.season}</p>
              <p><strong>Area:</strong> {entry.area} hectares</p>
              <p><strong>Recommended Crop:</strong> {entry.crop}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CropHistory;
