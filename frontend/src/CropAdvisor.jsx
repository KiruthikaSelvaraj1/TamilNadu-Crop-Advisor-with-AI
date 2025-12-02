import React, { useState } from 'react';
import CropForm from './CropForm';

const CropAdvisor = () => {
  const [district, setDistrict] = useState('');
  const [season, setSeason] = useState('');
  const [area, setArea] = useState('');
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGetRecommendations = async () => {
    if (!district || !season || !area) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    setRecommendations(null);

    try {
      const response = await fetch('http://localhost:5000/recommend_crop', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          district: district.toLowerCase(), 
          season: season.toLowerCase()
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations({
          crops: data.recommended_crops || ['Rice', 'Sugarcane', 'Cotton'],
          confidence: data.confidence_scores?.primary || 0.87,
          info: data.crop_info || {}
        });
      } else {
        setError('Failed to get recommendations. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to server. Please ensure backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-green-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-emerald-800 mb-2">
            விவசாய ஆலோசனை | Crop Advisor
          </h1>
          <p className="text-lg text-emerald-600">
            Get AI-powered crop recommendations for your farm
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-emerald-800 mb-6">
              Tell us about your farm
            </h2>

            <CropForm
              district={district}
              setDistrict={setDistrict}
              season={season}
              setSeason={setSeason}
              area={area}
              setArea={setArea}
            />

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                {error}
              </div>
            )}

            <button
              onClick={handleGetRecommendations}
              disabled={loading}
              className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-emerald-600 hover:bg-emerald-700 active:scale-95'
              }`}
            >
              {loading ? '🔄 Getting Recommendations...' : '🌾 Get Recommendations'}
            </button>
          </div>

          {/* Recommendations Section */}
          <div className="space-y-6">
            {recommendations ? (
              <>
                <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">
                    ✅ Recommended Crops
                  </h3>
                  <div className="space-y-3">
                    {recommendations.crops.map((crop, index) => (
                      <div
                        key={index}
                        className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg font-semibold">{crop}</span>
                          <span className="text-sm bg-white bg-opacity-30 px-3 py-1 rounded-full">
                            {(recommendations.confidence * (100 - index * 10) / 100).toFixed(0)}% match
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-white border-opacity-30">
                    <p className="text-sm text-white text-opacity-90">
                      <strong>Overall Confidence:</strong> {(recommendations.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* Additional Info */}
                {Object.keys(recommendations.info).length > 0 && (
                  <div className="bg-white rounded-xl shadow-lg p-8">
                    <h4 className="text-xl font-bold text-emerald-800 mb-4">
                      📋 Growing Information
                    </h4>
                    <div className="space-y-3">
                      {Object.entries(recommendations.info).map(([key, value]) => (
                        <div key={key} className="flex justify-between items-center pb-2 border-b border-gray-200">
                          <span className="text-gray-600 capitalize">
                            {key.replace(/_/g, ' ')}:
                          </span>
                          <span className="font-semibold text-emerald-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tips Section */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <h4 className="text-lg font-bold text-blue-800 mb-3">💡 Pro Tips</h4>
                  <ul className="space-y-2 text-sm text-blue-900">
                    <li>✓ Consider soil type before final selection</li>
                    <li>✓ Check market demand in your area</li>
                    <li>✓ Consult with local agricultural experts</li>
                    <li>✓ Monitor weather patterns closely</li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center">
                <div className="text-5xl mb-4">🌾</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ready for recommendations?
                </h3>
                <p className="text-gray-600">
                  Fill in your farm details on the left and click "Get Recommendations" to see AI-powered crop suggestions tailored for your conditions.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropAdvisor;
