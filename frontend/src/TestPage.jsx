import React from 'react';
import { useNavigate } from 'react-router-dom';

const TestPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">✅ Test Page</h1>
          <p className="text-lg text-gray-700 mb-4">
            This is a simple test page to verify routing is working!
          </p>

          <div className="bg-green-50 border border-green-300 rounded-lg p-6 mb-6">
            <h2 className="font-bold text-green-800 mb-2">✓ Page loaded successfully!</h2>
            <p className="text-green-700">
              If you can see this message, it means:
            </p>
            <ul className="list-disc list-inside text-green-700 mt-2">
              <li>✓ Navigation is working</li>
              <li>✓ Components are rendering</li>
              <li>✓ The app is functioning properly</li>
            </ul>
          </div>

          <div className="bg-blue-50 border border-blue-300 rounded-lg p-6">
            <h3 className="font-bold text-blue-800 mb-2">📋 Debug Info:</h3>
            <p className="text-blue-700 font-mono text-sm">
              Current Route: /test<br/>
              Status: ✅ OK<br/>
              Time: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
