import React, { useState } from 'react';

const chartData = [
  { day: 1, amount: 42000 },
  { day: 2, amount: 38000 },
  { day: 3, amount: 44000 },
  { day: 4, amount: 41000 },
  { day: 5, amount: 46000 },
  { day: 6, amount: 48000 },
  { day: 7, amount: 43000 },
  { day: 8, amount: 45000 },
  { day: 9, amount: 47000 },
  { day: 10, amount: 44000 },
  { day: 11, amount: 42000 }
];

export const FeeCollectionTrend: React.FC = () => {
  const [activeTab, setActiveTab] = useState('today');

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Fee Collection Trend</h2>
          <p className="text-sm text-gray-600">Last 30 days performance</p>
        </div>
        <div className="flex items-center space-x-2">
          <label className="inline-flex items-center">
            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" defaultChecked />
            <span className="ml-2 text-sm text-gray-600">Daily Collections</span>
          </label>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          {['Today', 'This month', 'This year'].map((period) => (
            <button
              key={period}
              onClick={() => setActiveTab(period.toLowerCase().replace(' ', ''))}
              className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                activeTab === period.toLowerCase().replace(' ', '')
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* Simple Line Chart Representation */}
      <div className="h-48 relative">
        <div className="absolute inset-0 flex items-end justify-between space-x-1">
          {chartData.map((point, index) => (
            <div key={index} className="flex-1 flex flex-col items-center">
              <div 
                className="w-full bg-blue-500 rounded-t-sm opacity-70 hover:opacity-100 transition-opacity"
                style={{ height: `${(point.amount / 50000) * 100}%` }}
              />
              <span className="text-xs text-gray-400 mt-1">{point.day}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};