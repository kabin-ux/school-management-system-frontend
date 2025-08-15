import React from 'react';

interface Notification {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
  time: string;
  target: string;
}

const notifications: Notification[] = [
  {
    type: 'success',
    title: 'Fee Reminder Successfully',
    description: 'Monthly fee reminder sent to all partner Schools collaboration with us.',
    time: '2 hours ago',
    target: 'All partner Schools'
  },
  {
    type: 'info', 
    title: 'Diamond Academy Registration',
    description: 'Diamond Academy has submitted their registration application.',
    time: '3 hours ago',
    target: 'Super Admin'
  },
  {
    type: 'warning',
    title: 'Payment Gateway Issue',
    description: 'Payment processing temporarily unavailable for Riverside School.',
    time: '5 hours ago',
    target: 'Riverside School'
  },
  {
    type: 'error',
    title: 'Monthly Report Generated',
    description: 'Financial report for November 2024 is ready for download.',
    time: '8 hours ago',
    target: 'All Schools'
  },
  {
    type: 'success',
    title: 'Fee Reminder Successfully',
    description: 'Monthly fee reminder sent to all partner Schools collaboration with us.',
    time: '10 hours ago',
    target: 'All partner Schools'
  }
];

const getNotificationColor = (type: string) => {
  switch (type) {
    case 'success': return 'bg-green-100 border-green-200';
    case 'info': return 'bg-blue-100 border-blue-200';
    case 'warning': return 'bg-yellow-100 border-yellow-200';
    case 'error': return 'bg-red-100 border-red-200';
    default: return 'bg-gray-100 border-gray-200';
  }
};

const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'success': return '✓';
    case 'info': return 'ℹ';
    case 'warning': return '⚠';
    case 'error': return '✗';
    default: return '•';
  }
};

export const RecentNotifications: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Recent Notifications</h2>
          <p className="text-sm text-gray-600">Latest system activities</p>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="space-y-4">
        {notifications.map((notification, index) => (
          <div key={index} className={`p-4 rounded-lg border ${getNotificationColor(notification.type)}`}>
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-sm font-medium">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1">{notification.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{notification.description}</p>
                <div className="flex items-center text-xs text-gray-500 space-x-4">
                  <span>Target: {notification.target}</span>
                  <span>{notification.time}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};