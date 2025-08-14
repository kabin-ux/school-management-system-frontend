import { Clock, Trophy, TrendingUp, Calendar } from 'lucide-react';

export default function PaymentInsights() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {/* School Paid This Month */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-600">School Paid This Month</h4>
          <Clock className="w-4 h-4 text-blue-500" />
        </div>
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#3b82f6"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${73 * 2.51} ${(100 - 73) * 2.51}`}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold text-blue-600">73%</span>
          </div>
        </div>
        <p className="text-center text-sm text-gray-600">104 out of 142 schools</p>
      </div>

      {/* Highest Paying School */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-600">Highest Paying School</h4>
          <Trophy className="w-4 h-4 text-yellow-500" />
        </div>
        <div className="flex items-center mb-2">
          <span className="text-lg">👑</span>
          <span className="ml-2 font-medium text-gray-900">Royal Academy</span>
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">$8,450</p>
        <p className="text-sm text-gray-600">This month's payment</p>
      </div>

      {/* Growth vs Last Month */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-600">Growth vs Last Month</h4>
          <TrendingUp className="w-4 h-4 text-green-500" />
        </div>
        <p className="text-2xl font-bold text-green-600 mb-1">+18.4%</p>
        <p className="text-sm text-gray-600 mb-2">Revenue increase</p>
        <p className="text-xs text-gray-500">$234,750 → $284,750</p>
      </div>

      {/* Upcoming Payments */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-gray-600">Upcoming Payments</h4>
          <Calendar className="w-4 h-4 text-purple-500" />
        </div>
        <p className="text-2xl font-bold text-gray-900 mb-1">27</p>
        <p className="text-sm text-gray-600 mb-2">Due in next 7 days</p>
        <p className="text-xs text-gray-500 mb-1">Dec 19 - Dec 26 2025</p>
        <p className="text-xs text-purple-600">Expected: $89,200</p>
      </div>
    </div>
  );
}