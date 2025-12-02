import React, { useState, useEffect } from 'react';

const Statistics = () => {
  const [stats, setStats] = useState({
    activeFarmers: 1250,
    totalYield: 8500,
    successRate: 94,
    weatherAlerts: 3,
  });

  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {/* Active Farmers Card */}
      <div className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all ${animate ? 'animate-slideInUp' : ''}`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-blue-100 text-sm font-semibold">Active Farmers</p>
            <p className="text-4xl font-black mt-2">{stats.activeFarmers.toLocaleString()}</p>
            <p className="text-blue-200 text-xs mt-2">↑ 12% this month</p>
          </div>
          <div className="text-4xl">👨‍🌾</div>
        </div>
      </div>

      {/* Total Yield Card */}
      <div className={`bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all ${animate ? 'animate-slideInUp' : ''}`} style={{ animationDelay: '0.1s' }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-green-100 text-sm font-semibold">Total Yield</p>
            <p className="text-4xl font-black mt-2">{stats.totalYield}+ T</p>
            <p className="text-green-200 text-xs mt-2">↑ 8% vs last season</p>
          </div>
          <div className="text-4xl">📊</div>
        </div>
      </div>

      {/* Success Rate Card */}
      <div className={`bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all ${animate ? 'animate-slideInUp' : ''}`} style={{ animationDelay: '0.2s' }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-purple-100 text-sm font-semibold">Success Rate</p>
            <p className="text-4xl font-black mt-2">{stats.successRate}%</p>
            <p className="text-purple-200 text-xs mt-2">✓ Predictions accuracy</p>
          </div>
          <div className="text-4xl">🎯</div>
        </div>
      </div>

      {/* Weather Alerts Card */}
      <div className={`bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all ${animate ? 'animate-slideInUp' : ''}`} style={{ animationDelay: '0.3s' }}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-orange-100 text-sm font-semibold">Active Alerts</p>
            <p className="text-4xl font-black mt-2">{stats.weatherAlerts}</p>
            <p className="text-orange-200 text-xs mt-2">⚠️ Review now</p>
          </div>
          <div className="text-4xl">🔔</div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
