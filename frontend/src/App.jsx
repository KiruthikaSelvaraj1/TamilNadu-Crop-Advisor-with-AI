import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import CropAdvisor from "./CropAdvisor";
import CropHistory from "./CropHistory";
import LLMAssistant from "./LLMAssistant";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import Navbar from "./Navbar";
import WeatherPage from "./WeatherPage";
import YieldPrediction from "./YieldPrediction";
import PesticideGuide from "./PesticideGuide";
import FarmerProfile from "./FarmerProfile";
import TestPage from "./TestPage";

// Protected Route wrapper
const ProtectedRoute = ({ children, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [farmer, setFarmer] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedFarmer = localStorage.getItem('farmer');
    if (token) {
      setIsAuthenticated(true);
      if (storedFarmer) {
        setFarmer(JSON.parse(storedFarmer));
      }
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          {/* Public Routes */}
          <Route 
            path="/" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <Navigate to="/login" replace />
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <LoginForm setIsAuthenticated={setIsAuthenticated} setFarmer={setFarmer} />
            } 
          />
          <Route 
            path="/register" 
            element={
              isAuthenticated ? 
                <Navigate to="/dashboard" replace /> : 
                <RegisterForm setIsAuthenticated={setIsAuthenticated} setFarmer={setFarmer} />
            } 
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <Dashboard farmer={farmer} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-advisor"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <CropAdvisor />
              </ProtectedRoute>
            }
          />
          <Route
            path="/weather"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <WeatherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/yield-prediction"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <YieldPrediction />
              </ProtectedRoute>
            }
          />
          <Route
            path="/pesticide"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <PesticideGuide />
              </ProtectedRoute>
            }
          />
          <Route
            path="/crop-history"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <CropHistory farmer={farmer} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/assistant"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <LLMAssistant farmer={farmer} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <FarmerProfile farmer={farmer} setFarmer={setFarmer} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Navbar isAuthenticated={isAuthenticated} farmer={farmer} setIsAuthenticated={setIsAuthenticated} />
                <TestPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </Router>
  );
}