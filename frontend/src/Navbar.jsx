import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('farmer');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className="w-full">
      <nav className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 text-white shadow-2xl fixed w-full top-0 z-50 border-b-4 border-emerald-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                title="Toggle menu"
                className="md:hidden inline-flex items-center justify-center p-2 rounded-lg hover:bg-emerald-600 transition-colors"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>

              {/* Brand Logo */}
              <div className="flex-shrink-0 flex items-center ml-2 md:ml-0">
                <Link to="/" className="flex items-center gap-2 group">
                  <span className="text-2xl md:text-3xl">🌾</span>
                  <div>
                    <div className="text-sm md:text-base font-bold text-white leading-tight">தமிழ்நாடு</div>
                    <div className="text-xs md:text-sm font-semibold text-emerald-100">Agriculture Hub</div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/dashboard"
                    className="nav-link"
                  >
                    விவசாய ஆலோசனை
                    <span className="block text-xs">Crop Advisor</span>
                  </Link>

                  <Link
                    to="/yield-prediction"
                    className="nav-link"
                  >
                    விளைச்சல் கணிப்பு
                    <span className="block text-xs">Yield Prediction</span>
                  </Link>

                  <Link
                    to="/pesticide"
                    className="nav-link"
                  >
                    பூச்சி மருந்து
                    <span className="block text-xs">Pesticide Guide</span>
                  </Link>

                  <Link
                    to="/weather"
                    className="nav-link"
                  >
                    வானிலை
                    <span className="block text-xs">Weather</span>
                  </Link>

                  <Link
                    to="/crop-history"
                    className="nav-link"
                  >
                    பாரம்பரிய முறைகள்
                    <span className="block text-xs">Practices</span>
                  </Link>

                  <Link
                    to="/assistant"
                    className="nav-link"
                  >
                    AI உதவியாளர்
                    <span className="block text-xs">AI Assistant</span>
                  </Link>

                  <div className="border-l border-emerald-600 h-8 mx-2"></div>

                  <Link
                    to="/profile"
                    className="nav-link"
                  >
                    சுயவிவரம்
                    <span className="block text-xs">Profile</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    title="Logout from account"
                    className="px-3 py-2 rounded-md text-sm font-medium bg-red-600 hover:bg-red-700 transition-colors"
                  >
                    வெளியேறு
                    <span className="block text-xs">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="nav-link"
                  >
                    உள்நுழைய
                    <span className="block text-xs">Login</span>
                  </Link>
                  <Link
                    to="/register"
                    className="nav-link"
                  >
                    பதிவு செய்ய
                    <span className="block text-xs">Register</span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pb-3`}>
            {isAuthenticated ? (
              <div className="space-y-1">
                <Link to="/dashboard" className="mobile-nav-link">
                  விவசாய ஆலோசனை / Crop Advisor
                </Link>
                <Link to="/yield-prediction" className="mobile-nav-link">
                  விளைச்சல் கணிப்பு / Yield Prediction
                </Link>
                <Link to="/pesticide" className="mobile-nav-link">
                  பூச்சி மருந்து / Pesticide Guide
                </Link>
                <Link to="/weather" className="mobile-nav-link">
                  வானிலை / Weather
                </Link>
                <Link to="/crop-history" className="mobile-nav-link">
                  பாரம்பரிய முறைகள் / Practices
                </Link>
                <Link to="/assistant" className="mobile-nav-link">
                  AI உதவியாளர் / AI Assistant
                </Link>
                <Link to="/profile" className="mobile-nav-link">
                  சுயவிவரம் / Profile
                </Link>
                <button
                  onClick={handleLogout}
                  title="Logout from account"
                  className="w-full text-left block px-3 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                >
                  வெளியேறு / Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1">
                <Link to="/login" className="mobile-nav-link">
                  உள்நுழைய / Login
                </Link>
                <Link to="/register" className="mobile-nav-link">
                  பதிவு செய்ய / Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      {/* Add padding to prevent content from going under the fixed navbar */}
      <div className="h-16"></div>
    </div>
  );
};

export default Navbar;