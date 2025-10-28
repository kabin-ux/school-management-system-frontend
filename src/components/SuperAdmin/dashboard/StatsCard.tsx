import React from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'pink' | 'indigo';
}

const getIconColor = (color: string) => {
  switch (color) {
    case 'blue': return 'text-blue-600 bg-blue-50';
    case 'green': return 'text-green-600 bg-green-50';
    case 'purple': return 'text-purple-600 bg-purple-50';
    case 'orange': return 'text-orange-600 bg-orange-50';
    case 'pink': return 'text-pink-600 bg-pink-50';
    case 'indigo': return 'text-indigo-600 bg-indigo-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

const getChangeColor = (change: string) => {
  return change.startsWith('+') ? 'text-green-600' : 'text-red-600';
};

export const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  change,
  color
}) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${getIconColor(color)}`}>
          {icon}
        </div>
      </div>
      <div className="mb-2">
        <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
        <p className="text-2xl font-bold text-gray-900">{value}</p>
      </div>
      <div className="flex items-center space-x-2 text-sm">
        <span className={`font-medium ${getChangeColor(change)}`}>
          {change}
        </span>
      </div>
    </div>
  );
};