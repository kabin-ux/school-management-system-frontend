import  { useState } from 'react';

export default function FeeCollectionChart() {
  const [activeTab, setActiveTab] = useState('Daily');

  const chartData = [
    { label: '2', value: 15 },
    { label: '4', value: 18 },
    { label: '6', value: 12 },
    { label: '8', value: 20 },
    { label: '10', value: 25 },
    { label: '12', value: 22 },
    { label: '14', value: 16 },
    { label: '16', value: 28 }
  ];

  const maxValue = Math.max(...chartData.map(d => d.value));

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Fee Collection Trend</h3>
          <p className="text-sm text-gray-600">Total in range: <span className="font-medium">$236,000</span> • Average per day: <span className="font-medium">$13,111</span></p>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          {['Daily', 'Weekly', 'Monthly'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                activeTab === tab
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-64">
        <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>Rs 25k</span>
          <span>Rs 20k</span>
          <span>Rs 15k</span>
          <span>Rs 10k</span>
          <span>Rs 0k</span>
        </div>
        
        <div className="ml-12 h-full flex items-end justify-between">
          {chartData.map((point, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative mb-2">
                <div 
                  className="w-2 h-2 bg-blue-600 rounded-full relative z-10"
                  style={{ marginBottom: `${(point.value / maxValue) * 200}px` }}
                />
                {index < chartData.length - 1 && (
                  <div 
                    className="absolute top-1 left-1 w-8 border-t-2 border-blue-600"
                    style={{ 
                      transform: `rotate(${Math.atan2(
                        (chartData[index + 1].value - point.value) / maxValue * 200,
                        32
                      )}rad)`
                    }}
                  />
                )}
              </div>
              <span className="text-xs text-gray-500">{point.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}