import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Statistics from './Statistics';
import Notifications from './Notifications';
import QuickActions from './QuickActions';

const FeatureCard = ({ to, title, titleTamil, description, icon, isPrimary = false }) => {
  const navigate = useNavigate();
  
  return (
    <button
      onClick={() => {
        console.log('🔗 Navigating to:', to);
        navigate(to);
      }}
      title={`Navigate to ${title}`}
      className={`group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 p-6 text-left w-full cursor-pointer ${
        isPrimary 
          ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-2 border-emerald-700' 
          : 'bg-white text-gray-800 border-2 border-transparent hover:border-emerald-400'
      }`}
    >
      {/* Gradient overlay for primary */}
      {isPrimary && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
      
      <div className="relative z-10">
        <div className="text-5xl mb-4 transform group-hover:scale-125 transition-transform duration-300">{icon}</div>
        <h3 className={`text-xl font-bold mb-2 ${isPrimary ? 'text-white' : 'text-emerald-800'}`}>
          {titleTamil}
          <span className={`block text-sm font-semibold mt-1 ${isPrimary ? 'text-emerald-100' : 'text-emerald-600'}`}>{title}</span>
        </h3>
        <p className={`text-sm leading-relaxed ${isPrimary ? 'text-emerald-50' : 'text-gray-600'}`}>{description}</p>
      </div>
    </button>
  );
};

const DecisionGuide = () => (
  <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 rounded-2xl p-8 shadow-xl text-white mt-12">
    <div className="flex items-center gap-3 mb-6">
      <span className="text-3xl">📚</span>
      <h3 className="text-2xl md:text-3xl font-bold">
        விவசாய முடிவெடுக்கும் வழிகாட்டி | Farming Decision Guide
      </h3>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
        <h4 className="font-bold text-lg mb-3 text-emerald-100">
          1️⃣ பயிர் தேர்வு | Crop Selection
        </h4>
        <p className="text-sm text-emerald-50 leading-relaxed">
          Get AI-powered recommendations based on:<br/>
          ✓ Soil type & quality<br/>
          ✓ Seasonal conditions<br/>
          ✓ Local climate patterns<br/>
          ✓ Market demand
        </p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
        <h4 className="font-bold text-lg mb-3 text-emerald-100">
          2️⃣ விளைச்சல் திட்டமிடல் | Yield Planning
        </h4>
        <p className="text-sm text-emerald-50 leading-relaxed">
          Predict & plan effectively:<br/>
          ✓ Estimate potential yield<br/>
          ✓ Resource planning<br/>
          ✓ Production goals<br/>
          ✓ Financial planning
        </p>
      </div>
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
        <h4 className="font-bold text-lg mb-3 text-emerald-100">
          3️⃣ பயிர் பாதுகாப்பு | Crop Protection
        </h4>
        <p className="text-sm text-emerald-50 leading-relaxed">
          Protect your investment:<br/>
          ✓ Disease prevention<br/>
          ✓ Pest control timing<br/>
          ✓ Weather-based planning<br/>
          ✓ Organic solutions
        </p>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const features = [
    {
      to: '/crop-advisor',
      title: 'Crop Advisor',
      titleTamil: 'விவசாய ஆலோசனை',
      description: 'AI-powered crop recommendations based on soil, climate, and market conditions',
      icon: '🌾',
      isPrimary: true
    },
    {
      to: '/yield-prediction',
      title: 'Yield Prediction',
      titleTamil: 'விளைச்சல் கணிப்பு',
      description: 'Predict your crop yield using advanced machine learning models and local historical data',
      icon: '📈',
      isPrimary: true
    },
    {
      to: '/weather',
      title: 'Weather Forecast',
      titleTamil: 'வானிலை',
      description: 'Access detailed weather forecasts and agricultural advisories for better planning',
      icon: '☁️',
      isPrimary: true
    },
    {
      to: '/pesticide',
      title: 'Pesticide Guide',
      titleTamil: 'பூச்சி மருந்து',
      description: 'Get eco-friendly pest control recommendations for your crops',
      icon: '🌿',
      isPrimary: true
    },
    {
      to: '/crop-history',
      title: 'Crop History',
      titleTamil: 'பயிர் வரலாறு',
      description: 'View your past crop performance and historical data',
      icon: '📊'
    },
    {
      to: '/assistant',
      title: 'AI Assistant',
      titleTamil: 'AI உதவியாளர்',
      description: 'Get instant answers to your farming questions',
      icon: '🤖'
    },
    {
      to: '/profile',
      title: 'My Profile',
      titleTamil: 'எனது விவரம்',
      description: 'Manage your farmer profile and personal details',
      icon: '👤'
    },
    {
      to: '/test',
      title: 'TEST - Click Me First!',
      titleTamil: ' TEST - முதலில் இதை கிளிக் செய்யவும்!',
      description: '✅ Click this to verify navigation is working',
      icon: '✨',
      isPrimary: true
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <Navbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="mb-6">
            <span className="text-6xl">🌾</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-emerald-800 mb-3 leading-tight">
            தமிழ்நாடு
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold text-emerald-700 mb-4">
            Agriculture Hub
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Smart Farming Solutions powered by AI & Machine Learning
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-black mb-2">30+</div>
              <div className="text-sm font-semibold opacity-90">Districts Covered</div>
              <p className="text-xs mt-2 opacity-75">Across Tamil Nadu</p>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-black mb-2">95%</div>
              <div className="text-sm font-semibold opacity-90">Prediction Accuracy</div>
              <p className="text-xs mt-2 opacity-75">AI-powered forecasting</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl font-black mb-2">20+</div>
              <div className="text-sm font-semibold opacity-90">Crop Varieties</div>
              <p className="text-xs mt-2 opacity-75">Fully supported</p>
            </div>
          </div>
        </div>

        {/* Decision Guide */}
        <DecisionGuide />

        {/* Statistics Section */}
        <Statistics />

        {/* Notifications Section */}
        <Notifications />

        {/* Quick Actions */}
        <QuickActions />

        {/* Features Grid */}
        <div className="mt-16 mb-16">
          <h3 className="text-3xl font-bold text-emerald-800 text-center mb-12">✨ Key Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-xl p-8 md:p-12 text-white text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">🚀 Start Farming Smarter Today</h2>
          <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
            Use our AI-powered tools to make better farming decisions, maximize yields, and grow your success
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              onClick={() => window.location.href = '#features'}
              className="bg-white text-emerald-700 font-bold px-8 py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Explore Features
            </button>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border-l-4 border-emerald-600">
          <h2 className="text-3xl font-bold text-emerald-800 mb-6">
            💡 About Our Platform
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-emerald-700 mb-3">🎯 Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                Empower Tamil Nadu farmers with advanced AI technology to make data-driven decisions about crop selection, yield optimization, and sustainable farming practices.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-emerald-700 mb-3">🌱 How It Works</h3>
              <p className="text-gray-700 leading-relaxed">
                Our platform combines traditional agricultural wisdom with cutting-edge machine learning algorithms to provide personalized recommendations based on soil type, climate, season, and market trends.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;