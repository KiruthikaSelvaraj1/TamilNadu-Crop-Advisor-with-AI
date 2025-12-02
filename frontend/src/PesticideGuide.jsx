import React, { useState } from 'react';

const PesticideGuide = () => {
  const [crop, setCrop] = useState('rice');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const crops = [
    'rice', 'sugarcane', 'cotton', 'groundnut', 'maize', 'sorghum',
    'banana', 'coconut', 'tapioca', 'vegetable', 'chilli', 'turmeric'
  ];

  const handleGetSuggestion = async () => {
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await fetch('http://localhost:5000/suggest_pesticide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ crop: crop.toLowerCase() })
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data);
      } else {
        setError('Failed to get pesticide suggestions. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to server. Please ensure backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800 mb-2">
            பூச்சி மருந்து | Pesticide Guide
          </h1>
          <p className="text-lg text-green-600">
            Eco-friendly pest control recommendations for your crops
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Selection Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold text-green-800 mb-6">
                Select Your Crop
              </h2>

              <div className="space-y-3 mb-6">
                {crops.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCrop(c)}
                    className={`w-full p-3 rounded-lg font-semibold text-left transition-all capitalize ${
                      crop === c
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🌾 {c}
                  </button>
                ))}
              </div>

              <button
                onClick={handleGetSuggestion}
                disabled={loading}
                className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-green-600 hover:bg-green-700 active:scale-95'
                }`}
              >
                {loading ? '🔄 Loading...' : '🧪 Get Suggestions'}
              </button>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2">
            {loading ? (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-4xl mb-4">🔄</div>
                <p className="text-lg text-gray-600">Loading pesticide suggestions...</p>
              </div>
            ) : error ? (
              <div className="bg-red-100 border border-red-400 text-red-700 rounded-xl p-6">
                {error}
              </div>
            ) : result ? (
              <div className="space-y-6">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white">
                  <h3 className="text-3xl font-bold mb-6">
                    ✅ Pesticide Recommendations for {crop.toUpperCase()}
                  </h3>

                  {Array.isArray(result.recommended_pesticides || result) ? (
                    <div className="space-y-4">
                      {(result.recommended_pesticides || result).map((rec, idx) => (
                        <div
                          key={idx}
                          className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30"
                        >
                          <h4 className="text-xl font-bold mb-2">
                            {rec.name}
                          </h4>
                          <p className="text-sm text-white text-opacity-90 mb-3">
                            {rec.description}
                          </p>
                          <div className="bg-white bg-opacity-10 rounded p-3">
                            <p className="text-sm font-semibold">
                              📋 Application: {rec.application}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div>
                      {result.pesticides && Object.entries(result.pesticides).map(([pestName, pesticide], idx) => (
                        <div
                          key={idx}
                          className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm border border-white border-opacity-30 mb-3"
                        >
                          <h4 className="text-lg font-bold mb-2 capitalize">
                            {pestName}
                          </h4>
                          <p className="text-sm text-white text-opacity-90">
                            {pesticide}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Best Practices */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h4 className="text-2xl font-bold text-green-800 mb-6">
                    ⭐ Best Practices
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h5 className="font-bold text-green-800 mb-2">✓ Preventive Measures</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Practice crop rotation</li>
                        <li>• Remove infected plant parts</li>
                        <li>• Maintain field hygiene</li>
                        <li>• Use resistant varieties</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                      <h5 className="font-bold text-blue-800 mb-2">🔍 Monitoring Tips</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Scout fields regularly</li>
                        <li>• Check leaf undersides</li>
                        <li>• Look for pest eggs/larvae</li>
                        <li>• Monitor weather for disease</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                      <h5 className="font-bold text-yellow-800 mb-2">⚠️ Safety First</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Wear protective equipment</li>
                        <li>• Follow mixing instructions</li>
                        <li>• Apply during cool hours</li>
                        <li>• Keep away from water sources</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 rounded-lg p-4 border border-purple-200">
                      <h5 className="font-bold text-purple-800 mb-2">🌱 Eco-Friendly Tips</h5>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Use botanical pesticides</li>
                        <li>• Encourage natural predators</li>
                        <li>• Reduce chemical use</li>
                        <li>• Try bio-pesticides first</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Application Guide */}
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h4 className="text-2xl font-bold text-gray-800 mb-6">
                    📋 Application Guide
                  </h4>

                  <div className="space-y-4">
                    <div className="border-l-4 border-green-600 pl-4 py-2">
                      <h5 className="font-bold text-gray-800 mb-2">Timing</h5>
                      <p className="text-sm text-gray-600">
                        Early morning (6-9 AM) or late evening (4-7 PM) are best for pesticide application. Avoid spraying during rain or strong wind.
                      </p>
                    </div>

                    <div className="border-l-4 border-blue-600 pl-4 py-2">
                      <h5 className="font-bold text-gray-800 mb-2">Dosage</h5>
                      <p className="text-sm text-gray-600">
                        Always follow recommended dosage on the product label. Overdosing won't improve results and may damage crops.
                      </p>
                    </div>

                    <div className="border-l-4 border-yellow-600 pl-4 py-2">
                      <h5 className="font-bold text-gray-800 mb-2">Intervals</h5>
                      <p className="text-sm text-gray-600">
                        Maintain proper intervals between successive applications to prevent resistance development.
                      </p>
                    </div>

                    <div className="border-l-4 border-red-600 pl-4 py-2">
                      <h5 className="font-bold text-gray-800 mb-2">Harvest Period</h5>
                      <p className="text-sm text-gray-600">
                        Observe recommended waiting periods after pesticide application before harvesting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🧪</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Select a crop to begin
                </h3>
                <p className="text-gray-600">
                  Choose your crop from the list to get personalized pesticide recommendations and eco-friendly alternatives.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PesticideGuide;
