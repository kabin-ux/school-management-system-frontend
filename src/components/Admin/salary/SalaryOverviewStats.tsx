import React from 'react';
import { HandCoins, CreditCard, AlertCircle, Clock } from 'lucide-react';

export const SalaryOverviewStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Salary Collected</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">Rs.2,4680</p>
            <p className="text-sm text-green-600 mt-1">+12.5% from last month</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <HandCoins className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Due Amount</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">Rs.89,000</p>
            <p className="text-sm text-green-600 mt-1">-8.2% from last month</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Number of Defaulters</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">23</p>
            <p className="text-sm text-red-600 mt-1">+5 this month</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Recent Payments</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">Rs.45,230</p>
            <p className="text-sm text-yellow-600 mt-1">last 7 days</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
};