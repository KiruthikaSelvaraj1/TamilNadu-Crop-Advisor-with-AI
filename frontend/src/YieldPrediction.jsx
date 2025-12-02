import React, { useState } from 'react';
import CropForm from './CropForm';

const YieldPrediction = () => {
  const [district, setDistrict] = useState('');
  const [season, setSeason] = useState('');
  const [area, setArea] = useState('');
  const [crop, setCrop] = useState('rice');
  const [yieldResult, setYieldResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const crops = [
    'rice', 'sugarcane', 'cotton', 'groundnut', 'maize', 'sorghum',
    'banana', 'coconut', 'tapioca', 'vegetable'
  ];

  const handlePredict = async () => {
    if (!district || !season || !area || !crop) {
      setError('Please fill all fields');
      return;
    }

    setLoading(true);
    setError('');
    setYieldResult(null);

    try {
      const response = await fetch('http://localhost:5000/predict_yield', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          crop: crop.toLowerCase(),
          district: district.toLowerCase(),
          season: season.toLowerCase(),
          area: parseFloat(area)
        })
      });

      if (response.ok) {
        const data = await response.json();
        setYieldResult({
          yield: data.predicted_yield,
          unit: data.unit,
          confidence: data.confidence,
          comparison: data.historical_comparison || []
        });
      } else {
        setError('Failed to predict yield. Please try again.');
      }
    } catch (err) {
      setError('Error connecting to server. Please ensure backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-emerald-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            விளைச்சல் கணிப்பு | Yield Prediction
          </h1>
          <p className="text-lg text-blue-600">
            Predict your crop yield using advanced machine learning
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Crop Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
                Select Your Crop
              </h2>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {crops.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCrop(c)}
                    className={`p-3 rounded-lg font-semibold transition-all capitalize ${
                      crop === c
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Farm Details */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6">
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
                onClick={handlePredict}
                disabled={loading}
                className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold text-white transition-all ${
                  loading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
                }`}
              >
                {loading ? '🔄 Calculating...' : '📊 Predict Yield'}
              </button>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {yieldResult ? (
              <div className="bg-gradient-to-br from-blue-500 to-emerald-600 rounded-xl shadow-lg p-8 text-white sticky top-8">
                <h3 className="text-2xl font-bold mb-6">
                  ✅ Yield Prediction
                </h3>

                <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-6 backdrop-blur-sm">
                  <div className="text-center mb-4">
                    <div className="text-5xl font-bold mb-2">
                      {yieldResult.yield.toFixed(2)}
                    </div>
                    <div className="text-lg text-white text-opacity-90">
                      {yieldResult.unit}
                    </div>
                  </div>

                  <div className="border-t border-white border-opacity-30 pt-4">
                    <p className="text-sm text-white text-opacity-90">
                      <strong>Confidence Level:</strong> {(yieldResult.confidence * 100).toFixed(0)}%
                    </p>
                  </div>
                </div>

                {/* Historical Comparison */}
                {yieldResult.comparison.length > 0 && (
                  <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
                    <h4 className="font-bold mb-3 text-white">Historical Trends</h4>
                    <div className="space-y-2">
                      {yieldResult.comparison.map((item, idx) => (
                        <div key={idx} className="flex justify-between items-center text-sm">
                          <span className="text-white text-opacity-80">{item.year}</span>
                          <span className="font-semibold">
                            {item.yield.toFixed(0)} {yieldResult.unit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Insights */}
                <div className="mt-6 pt-6 border-t border-white border-opacity-30">
                  <div className="space-y-2 text-sm">
                    <p className="text-white text-opacity-90">
                      💡 <strong>Tip:</strong> This prediction is based on historical data and current conditions.
                    </p>
                    <p className="text-white text-opacity-90">
                      🌾 Consider soil health and timely interventions for better yield.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setYieldResult(null)}
                  className="mt-6 w-full bg-white text-blue-600 font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-all"
                >
                  ← New Prediction
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-8 text-center sticky top-8">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Ready to predict?
                </h3>
                <p className="text-gray-600">
                  Fill in your crop and farm details, then click "Predict Yield" to see your estimated harvest.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default YieldPrediction;
