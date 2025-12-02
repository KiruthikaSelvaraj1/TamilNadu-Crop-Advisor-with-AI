import React from 'react';

const WeatherInsights = ({ weather, district }) => {
  // Tamil Nadu specific monsoon seasons
  const monsoonInfo = {
    'Southwest Monsoon': {
      period: 'June to September',
      tamilName: 'தென்மேற்கு பருவமழை',
      regions: ['Western Ghats', 'Nilgiris', 'Coimbatore'],
      rainfall: '35% of annual rainfall'
    },
    'Northeast Monsoon': {
      period: 'October to December',
      tamilName: 'வடகிழக்கு பருவமழை',
      regions: ['Coastal regions', 'Central districts'],
      rainfall: '48% of annual rainfall'
    },
    'Summer': {
      period: 'March to May',
      tamilName: 'கோடை காலம்',
      regions: ['All districts'],
      rainfall: 'Pre-monsoon showers'
    },
    'Winter': {
      period: 'January to February',
      tamilName: 'குளிர் காலம்',
      regions: ['All districts'],
      rainfall: 'Light showers'
    }
  };

  // Get current season based on date
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 5 && month <= 8) return 'Southwest Monsoon';
    if (month >= 9 && month <= 11) return 'Northeast Monsoon';
    if (month >= 2 && month <= 4) return 'Summer';
    return 'Winter';
  };

  const currentSeason = getCurrentSeason();
  const seasonInfo = monsoonInfo[currentSeason];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-semibold text-blue-800 mb-4">
        {seasonInfo.tamilName} | {currentSeason}
      </h3>

      {/* Current Weather */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <h4 className="font-semibold text-blue-800 mb-2">Current Weather</h4>
          <div className="space-y-2">
            <p className="text-gray-700">Temperature: {weather.temperature}°C</p>
            <p className="text-gray-700">Humidity: {weather.humidity}%</p>
            <p className="text-gray-700">Wind: {weather.windSpeed} km/h</p>
          </div>
        </div>

        <div className="bg-emerald-50 rounded-lg p-4">
          <h4 className="font-semibold text-emerald-800 mb-2">Season Details</h4>
          <div className="space-y-2">
            <p className="text-gray-700">Period: {seasonInfo.period}</p>
            <p className="text-gray-700">Expected Rainfall: {seasonInfo.rainfall}</p>
          </div>
        </div>
      </div>

      {/* Agricultural Advisory */}
      <div className="bg-amber-50 rounded-lg p-4 mb-6">
        <h4 className="font-semibold text-amber-800 mb-2">Agricultural Advisory</h4>
        <div className="space-y-2">
          {currentSeason === 'Southwest Monsoon' && (
            <>
              <p>• Ideal time for paddy cultivation in delta regions</p>
              <p>• Prepare nurseries for Kuruvai season</p>
              <p>• Monitor soil moisture levels regularly</p>
            </>
          )}
          {currentSeason === 'Northeast Monsoon' && (
            <>
              <p>• Main cultivation season for Samba paddy</p>
              <p>• Good period for groundnut cultivation</p>
              <p>• Watch for pest infestations due to humidity</p>
            </>
          )}
          {currentSeason === 'Summer' && (
            <>
              <p>• Focus on drought-resistant crops</p>
              <p>• Implement water conservation methods</p>
              <p>• Consider crop insurance</p>
            </>
          )}
          {currentSeason === 'Winter' && (
            <>
              <p>• Suitable for vegetables and pulses</p>
              <p>• Watch for ground frost in higher altitudes</p>
              <p>• Maintain soil moisture</p>
            </>
          )}
        </div>
      </div>

      {/* Region-specific Information */}
      <div className="bg-purple-50 rounded-lg p-4">
        <h4 className="font-semibold text-purple-800 mb-2">Regional Impact</h4>
        <div className="space-y-2">
          <p className="font-medium">Key Affected Areas:</p>
          <div className="flex flex-wrap gap-2">
            {seasonInfo.regions.map((region, idx) => (
              <span key={idx} className="px-3 py-1 bg-white rounded-full text-sm text-purple-700">
                {region}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherInsights;