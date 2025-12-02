import React from 'react';
import { useNavigate } from 'react-router-dom';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      icon: '📋',
      title: 'Quick Check',
      description: 'Get instant crop recommendations',
      color: 'from-blue-400 to-blue-500',
      action: () => navigate('/crop-advisor'),
    },
    {
      id: 2,
      icon: '📈',
      title: 'Predict Yield',
      description: 'Estimate your harvest',
      color: 'from-green-400 to-green-500',
      action: () => navigate('/yield-prediction'),
    },
    {
      id: 3,
      icon: '🌤️',
      title: 'Check Weather',
      description: 'Plan your farming activities',
      color: 'from-yellow-400 to-yellow-500',
      action: () => navigate('/weather'),
    },
    {
      id: 4,
      icon: '💬',
      title: 'Ask AI',
      description: 'Get farming advice instantly',
      color: 'from-purple-400 to-purple-500',
      action: () => navigate('/assistant'),
    },
  ];

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">⚡ Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, idx) => (
          <button
            key={action.id}
            onClick={action.action}
            className={`bg-gradient-to-br ${action.color} rounded-xl p-6 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left group animate-slideInUp`}
            style={{ animationDelay: `${idx * 0.1}s` }}
            title={action.title}
          >
            <div className="text-4xl mb-3 group-hover:animate-bounce-slow transition-all">{action.icon}</div>
            <h4 className="font-bold text-lg mb-1">{action.title}</h4>
            <p className="text-sm opacity-90">{action.description}</p>
            <div className="mt-3 text-xs font-semibold opacity-75 group-hover:opacity-100 transition-opacity">
              Click to access →
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
