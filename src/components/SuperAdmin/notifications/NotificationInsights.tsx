import { BarChart3, Calendar, AlertTriangle, CheckCircle, Clock, XCircle } from 'lucide-react';

export default function NotificationInsights() {
  return (
    <div className="space-y-6">
      {/* Notification Insights Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Notification Insights</h3>
          <BarChart3 className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {/* Total Notification Sent */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Notification Sent</span>
          <CheckCircle className="w-4 h-4 text-green-500" />
        </div>
        <div className="text-3xl font-bold text-green-600 mb-1">12,807</div>
        <div className="text-xs text-gray-500">Up to Date</div>
      </div>

      {/* Total Scheduled Notification */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Scheduled Notification</span>
          <Clock className="w-4 h-4 text-blue-500" />
        </div>
        <div className="text-3xl font-bold text-blue-600 mb-1">851</div>
        <div className="text-xs text-gray-500">Up to Date</div>
      </div>

      {/* Total Notification Failed */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Total Notification Failed</span>
          <XCircle className="w-4 h-4 text-red-500" />
        </div>
        <div className="text-3xl font-bold text-red-600 mb-1">3500</div>
        <div className="text-xs text-gray-500">Up to Date</div>
      </div>

      {/* Scheduled Notification */}
      <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-4">
        <div className="flex items-start">
          <Calendar className="w-5 h-5 text-yellow-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-900 mb-1">Scheduled Notification</h4>
            <p className="text-xs text-yellow-700 mb-2">
              Tap the button below to clear all the scheduled Notification at once
            </p>
            <button className="text-xs bg-yellow-600 text-white px-3 py-1 rounded hover:bg-yellow-700 transition-colors">
              Clear All
            </button>
          </div>
        </div>
      </div>

      {/* All Notification */}
      <div className="bg-red-50 rounded-lg border border-red-200 p-4">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-red-900 mb-1">All Notification</h4>
            <p className="text-xs text-red-700 mb-2">
              Tap the button below to clear all the notifications at once
            </p>
            <button className="text-xs bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition-colors">
              Clear All Notification
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}