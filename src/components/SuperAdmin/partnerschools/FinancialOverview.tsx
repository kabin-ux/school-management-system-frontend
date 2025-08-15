import { Download, DollarSign, Calendar, AlertCircle, CreditCard } from 'lucide-react';

export default function FinancialOverview() {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Financial Overview</h3>
        <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
          <Download className="w-4 h-4" />
          Download Invoice (PDF)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {/* Fee Collection Status */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-green-100 rounded">
              <DollarSign className="w-4 h-4 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-800">Paid</span>
          </div>
          <h4 className="text-sm text-gray-600 mb-1">Fee Collection Status</h4>
          <p className="text-lg font-bold text-gray-900">Current</p>
          <p className="text-xs text-gray-500">This year</p>
        </div>

        {/* Total Amount Paid */}
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-purple-100 rounded">
              <DollarSign className="w-4 h-4 text-purple-600" />
            </div>
          </div>
          <h4 className="text-sm text-gray-600 mb-1">Total Amount Paid</h4>
          <p className="text-lg font-bold text-gray-900">$24,500</p>
          <p className="text-xs text-gray-500">This year</p>
        </div>

        {/* Last Payment */}
        <div className="bg-orange-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-orange-100 rounded">
              <Calendar className="w-4 h-4 text-orange-600" />
            </div>
          </div>
          <h4 className="text-sm text-gray-600 mb-1">Last Payment</h4>
          <p className="text-lg font-bold text-gray-900">Feb 15</p>
          <p className="text-xs text-gray-500">$2,500</p>
        </div>

        {/* Due Amount */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="p-1 bg-red-100 rounded">
              <AlertCircle className="w-4 h-4 text-red-600" />
            </div>
          </div>
          <h4 className="text-sm text-gray-600 mb-1">Due Amount</h4>
          <p className="text-lg font-bold text-gray-900">$0</p>
          <p className="text-xs text-gray-500">All clear</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">Payment Method</h4>
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-blue-600" />
            <span className="text-sm text-gray-600">Bank Transfer - ****3532</span>
          </div>
        </div>
        <div className="text-right">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Next billing date</h4>
          <p className="text-sm text-gray-600">March 15, 2025</p>
        </div>
      </div>
    </div>
  );
}