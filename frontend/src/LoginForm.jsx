import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setIsAuthenticated, setFarmer }) => {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('test123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log('🔐 Login clicked with:', { email, password });
    
    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate login delay
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'test123') {
        console.log('✅ Credentials match!');
        
        // Store in localStorage
        const token = 'fake-jwt-token-' + Date.now();
        const farmer = {
          name: 'Test User',
          email: email,
          district: 'Chennai',
          village: 'Tambaram',
          phone: '9876543210'
        };
        
        localStorage.setItem('token', token);
        localStorage.setItem('farmer', JSON.stringify(farmer));
        console.log('✅ Data stored in localStorage');

        // Update app state
        setIsAuthenticated(true);
        setFarmer(farmer);
        console.log('✅ State updated');

        // Navigate
        console.log('🚀 Navigating to dashboard...');
        navigate('/dashboard', { replace: true });
      } else {
        console.log('❌ Invalid credentials');
        setError('Invalid email or password. Use: test@example.com / test123');
        setLoading(false);
      }
    }, 500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-800 to-emerald-600">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-96 transform transition-all hover:scale-105">
        <h2 className="text-4xl font-bold text-center mb-8 text-emerald-800">
          Tamil Agriculture
        </h2>
        <h3 className="text-xl font-semibold text-center mb-6 text-emerald-600">
          வணக்கம் | Welcome
        </h3>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email | மின்னஞ்சல்
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="test@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password | கடவுச்சொல்
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
              placeholder="test123"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            title="Click to login"
            className="w-full bg-emerald-600 text-white py-3 rounded-lg font-semibold hover:bg-emerald-700 focus:ring-4 focus:ring-emerald-300 transition-all disabled:opacity-50 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
            {loading ? '⏳ Signing in...' : '✅ Login | உள்நுழைய'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600 mb-2">
            📝 Demo Credentials (Pre-filled):
          </p>
          <p className="text-xs text-gray-500">
            Email: test@example.com<br/>
            Password: test123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;