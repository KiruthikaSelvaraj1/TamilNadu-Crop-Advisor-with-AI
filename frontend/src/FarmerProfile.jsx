// frontend/src/FarmerProfile.jsx
import React from "react";

const FarmerProfile = ({ farmer }) => {
  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold text-green-700 mb-4">👨‍🌾 Farmer Profile</h2>
      <p><strong>Email:</strong> {farmer?.email}</p>
      <p><strong>Name:</strong> {farmer?.name || "N/A"}</p>
      <p className="mt-2 text-gray-600">
        Welcome to Tamil Nadu Smart Agri Dashboard! You can now access recommendations, yield predictions, and crop history.
      </p>
    </div>
  );
};

export default FarmerProfile;
