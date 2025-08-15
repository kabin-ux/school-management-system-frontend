import React from 'react';
import { TrendingUp } from 'lucide-react';

export const FeesCollected: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Fees Collected</h2>
          <p className="text-sm text-gray-600">Summary of collected fees</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-2 mb-2">
          <h3 className="text-3xl font-bold text-gray-900">Rs. 45,230</h3>
          <span className="text-green-600 font-medium flex items-center">
            <TrendingUp className="w-4 h-4 mr-1" />
            +10.5%
          </span>
          <span className="text-sm text-gray-500">vs last day</span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <span className="text-gray-600">Pending Dues</span>
            <span className="text-red-600 font-medium">Rs 4,25,950</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Schools Paid</p>
          <p className="text-2xl font-bold text-gray-900">28/32</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">On Time</p>
          <p className="text-2xl font-bold text-green-600">24</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600 mb-1">Overdue</p>
          <p className="text-2xl font-bold text-red-600">4</p>
        </div>
      </div>
    </div>
  );
};