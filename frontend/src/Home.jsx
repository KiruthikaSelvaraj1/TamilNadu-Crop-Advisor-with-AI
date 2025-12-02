import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-700 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold mb-6">
              Tamil Nadu Crop Advisor
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              Smart farming solutions powered by AI for Tamil Nadu's agricultural community
            </p>
            <Link
              to="/crop-predictor"
              className="inline-flex items-center px-6 py-3 bg-white text-emerald-700 rounded-lg font-semibold hover:bg-emerald-50 transition-all shadow-lg"
            >
              Try the Crop Predictor
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>

      {/* Key Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">The Importance of Agriculture</h2>
            <p className="mt-4 text-lg text-gray-600">
              Agriculture powers Tamil Nadu's economy, provides food security, and supports millions of livelihoods.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-emerald-50 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="text-emerald-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Insights</h3>
              <p className="text-gray-600">Get intelligent crop recommendations based on soil, climate, and market data.</p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="text-blue-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Real-time Weather</h3>
              <p className="text-gray-600">Access accurate weather forecasts and agricultural advisories.</p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 hover:shadow-lg transition-all">
              <div className="text-amber-600 mb-4">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Yield Prediction</h3>
              <p className="text-gray-600">Predict crop yields with advanced machine learning models.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Crop Types Section */}
      <div className="py-16 bg-gradient-to-b from-emerald-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Rich in Diverse Crops</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">🌾</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Rice</h3>
              <p className="text-gray-600">Main staple crop in Tamil Nadu.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">🌽</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Millets</h3>
              <p className="text-gray-600">Highly resilient, drought-friendly.</p>
            </div>
            <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-all">
              <div className="text-4xl mb-4">🍌</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Banana</h3>
              <p className="text-gray-600">Popular fruit crop across the state.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Farmer Profile Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gradient-to-r from-emerald-100 to-green-50 rounded-2xl p-8">
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-white p-3 rounded-full">
                <span className="text-3xl">👨‍🌾</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Farmer: Muthuvel Pandian</h3>
                <p className="text-gray-600">District: Thanjavur</p>
                <p className="text-gray-600">Last Crop: Paddy</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-emerald-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">About Us</h4>
              <p className="text-emerald-100">Empowering Tamil Nadu farmers with modern agricultural technology and traditional wisdom.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><Link to="/crop-predictor" className="text-emerald-100 hover:text-white">Crop Predictor</Link></li>
                <li><Link to="/weather" className="text-emerald-100 hover:text-white">Weather</Link></li>
                <li><Link to="/ai-assistant" className="text-emerald-100 hover:text-white">AI Assistant</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact</h4>
              <p className="text-emerald-100">Email: support@tncropadvisor.in</p>
              <p className="text-emerald-100">Phone: 1800-123-4567</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;