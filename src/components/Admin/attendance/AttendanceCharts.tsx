import React from 'react';

export const AttendanceCharts: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Distribution</h3>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-600">Present: 459</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">Absent: 23</span>
            </div>
          </div>
        </div>
        <div className="h-48 bg-gradient-to-t from-blue-600 to-blue-400 rounded-lg flex items-end justify-center relative">
          <div className="text-white text-center">
            <div className="text-2xl font-bold">Chart Placeholder</div>
            <div className="text-sm opacity-75">Area Chart</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Distribution</h3>
          <div className="text-sm text-gray-600">Total: 502</div>
        </div>
        <div className="flex items-center justify-center h-48">
          <div className="w-32 h-32 rounded-full border-8 border-green-500 flex items-center justify-center relative">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Present</div>
            </div>
            <div className="absolute -right-8 top-4 text-xs">
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Present: 459</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>Absent: 23</span>
              </div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Late: 12</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>Leave: 8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};