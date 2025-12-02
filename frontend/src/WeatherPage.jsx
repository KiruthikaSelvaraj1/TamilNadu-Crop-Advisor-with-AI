import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WeatherPage = () => {
  const [weather, setWeather] = useState(null);
  const [district, setDistrict] = useState('Chennai');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const tamilNaduDistricts = [
    'ARIYALUR', 'CHENNAI', 'COIMBATORE', 'CUDDALORE', 'DHARMAPURI',
    'DINDIGUL', 'ERODE', 'KANCHIPURAM', 'KANNIYAKUMARI', 'KARUR',
    'KRISHNAGIRI', 'MADURAI', 'NAGAPATTINAM', 'NAMAKKAL', 'PERAMBALUR',
    'PUDUKKOTTAI', 'RAMANATHAPURAM', 'SALEM', 'SIVAGANGA', 'THANJAVUR',
    'THE NILGIRIS', 'THENI', 'THIRUVALLUR', 'THIRUVARUR', 'TIRUCHIRAPPALLI',
    'TIRUNELVELI', 'TIRUPPUR', 'TIRUVANNAMALAI', 'TUTICORIN', 'VELLORE',
    'VILLUPURAM', 'VIRUDHUNAGAR'
  ];

  const fetchWeather = async (dist) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/get_weather?district=${dist.toLowerCase()}`);
      if (response.ok) {
        const data = await response.json();
        setWeather(data);
      } else {
        setError('Failed to fetch weather data');
      }
    } catch (err) {
      setError('Error connecting to server. Please ensure backend is running.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(district);
  }, [district]);

  const getWeatherIcon = (temp) => {
    if (temp > 30) return '☀️';
    if (temp > 20) return '⛅';
    return '🌧️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 to-blue-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-800 mb-2">
            வானிலை | Weather Forecast
          </h1>
          <p className="text-lg text-cyan-600">
            Real-time weather information for Tamil Nadu farming
          </p>
        </div>

        {/* District Selector */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Select Your District
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {tamilNaduDistricts.map((dist) => (
              <button
                key={dist}
                onClick={() => setDistrict(dist)}
                className={`p-2 rounded-lg font-semibold text-sm transition-all ${
                  district === dist
                    ? 'bg-cyan-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {dist.slice(0, 8)}
              </button>
            ))}
          </div>
        </div>

        {/* Weather Display */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔄</div>
            <p className="text-lg text-gray-600">Loading weather data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 rounded-xl p-6 mb-8">
            {error}
          </div>
        ) : weather ? (
          <>
            {/* Current Weather */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Main Weather Card */}
              <div className="md:col-span-1 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl shadow-lg p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{district}</h3>
                
                <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-6 backdrop-blur-sm text-center">
                  <div className="text-6xl mb-4">
                    {getWeatherIcon(weather.temperature)}
                  </div>
                  <div className="text-5xl font-bold mb-2">
                    {weather.temperature}°C
                  </div>
                  <p className="text-lg text-white text-opacity-90">
                    {weather.description}
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
                    <span>💧 Humidity</span>
                    <span className="font-bold">{weather.humidity}%</span>
                  </div>
                  <div className="flex justify-between items-center bg-white bg-opacity-10 rounded-lg p-3 backdrop-blur-sm">
                    <span>🌧️ Rainfall</span>
                    <span className="font-bold">{weather.rainfall || '0'} mm</span>
                  </div>
                </div>
              </div>

              {/* Agricultural Info */}
              <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    🌾 Agricultural Insights
                  </h3>
                  
                  {weather.temperature > 35 && (
                    <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4 mb-4">
                      <p className="font-bold text-yellow-800 mb-2">⚠️ Heat Alert</p>
                      <p className="text-sm text-yellow-700">
                        High temperature detected. Ensure proper irrigation and use mulching to retain soil moisture.
                      </p>
                    </div>
                  )}

                  {weather.humidity > 70 && (
                    <div className="bg-blue-50 border border-blue-300 rounded-lg p-4 mb-4">
                      <p className="font-bold text-blue-800 mb-2">💧 High Humidity</p>
                      <p className="text-sm text-blue-700">
                        High humidity may increase disease risk. Monitor crops for fungal infections and ensure proper ventilation.
                      </p>
                    </div>
                  )}

                  <div className="bg-green-50 border border-green-300 rounded-lg p-4">
                    <p className="font-bold text-green-800 mb-2">✅ Farming Recommendations</p>
                    <ul className="text-sm text-green-700 space-y-1">
                      <li>• Monitor soil moisture levels regularly</li>
                      <li>• Plan irrigation based on temperature and rainfall</li>
                      <li>• Check crops for pest and disease symptoms</li>
                      <li>• Apply fertilizers during appropriate moisture conditions</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Forecast */}
            {weather.forecast && (
              <div className="bg-white rounded-xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-6">
                  📅 3-Day Forecast
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {weather.forecast.map((day, idx) => (
                    <div
                      key={idx}
                      className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-6 border border-blue-200"
                    >
                      <h4 className="font-bold text-gray-800 mb-4">{day.day}</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">
                            {getWeatherIcon(day.temp)}
                          </span>
                          <span className="text-3xl font-bold text-cyan-600">
                            {day.temp}°C
                          </span>
                        </div>

                        <div className="bg-white rounded p-3">
                          <p className="text-sm text-gray-600 mb-2">
                            {day.description}
                          </p>
                          <div className="flex items-center space-x-2 text-sm">
                            <span>🌧️</span>
                            <span className="font-semibold text-gray-700">
                              {day.rainfall} mm rainfall
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
};

export default WeatherPage;
