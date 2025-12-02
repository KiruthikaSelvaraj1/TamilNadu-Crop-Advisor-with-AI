import React, { useState } from 'react';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'warning',
      title: 'Heavy Rain Alert',
      message: 'Heavy rainfall expected in Chennai district next 48 hours',
      icon: '🌧️',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'success',
      title: 'Yield Prediction Ready',
      message: 'Your rice yield prediction for next season is ready to view',
      icon: '✅',
      time: '1 hour ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Market Update',
      message: 'Cotton prices increased by 5% this week',
      icon: 'ℹ️',
      time: '30 minutes ago',
    },
  ]);

  const dismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  const getAlertClass = (type) => {
    switch (type) {
      case 'warning':
        return 'alert-warning';
      case 'success':
        return 'alert-success';
      case 'info':
        return 'alert-info';
      default:
        return 'alert-info';
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">🔔 Latest Alerts</h3>
        <span className="badge badge-danger">{notifications.length}</span>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <div key={notification.id} className={`${getAlertClass(notification.type)} flex items-start justify-between animate-slideInUp`}>
              <div className="flex items-start gap-4 flex-1">
                <span className="text-2xl">{notification.icon}</span>
                <div className="flex-1">
                  <h4 className="font-bold">{notification.title}</h4>
                  <p className="text-sm opacity-75">{notification.message}</p>
                  <p className="text-xs opacity-60 mt-1">{notification.time}</p>
                </div>
              </div>
              <button
                onClick={() => dismissNotification(notification.id)}
                className="ml-4 text-lg opacity-50 hover:opacity-100 transition-opacity"
                title="Dismiss notification"
              >
                ✕
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-6 text-gray-500">
            <p className="text-lg">No alerts at the moment! ✨</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
