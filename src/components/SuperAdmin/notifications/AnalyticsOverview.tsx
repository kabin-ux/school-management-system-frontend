import { TrendingUp, Users, Bell} from 'lucide-react';

export default function AnalyticsOverview() {
  return (
    <div className="space-y-6">
      {/* Analytical Overview */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytical Overview</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Notification Sent</span>
            <span className="text-2xl font-bold text-gray-900">2,847</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">+15.3% from last month</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Success Rate</span>
              <span className="text-sm font-medium text-gray-900">94.2%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Most Active Audience</span>
            </div>
            <div className="flex items-center mt-2">
              <Users className="w-4 h-4 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-900">Parents</span>
              <span className="text-xs text-gray-500 ml-2">67% of notifications</span>
            </div>
          </div>
        </div>
      </div>

      {/* Last Notification */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Last Notification</h3>
          <Bell className="w-5 h-5 text-gray-400" />
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-gray-900">1 Day App Maintenance</p>
            <p className="text-xs text-gray-500">To All Users</p>
          </div>
          
          <div className="text-xs text-gray-500">
            3 hours ago
          </div>
          
          <div className="flex items-center">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
              Delivered
            </span>
            <span className="text-xs text-gray-500 ml-2">to 2,847 users</span>
          </div>
        </div>
      </div>

      {/* Quick Tip */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-bold">💡</span>
            </div>
          </div>
          <div className="ml-3">
            <h4 className="text-sm font-medium text-blue-900 mb-1">Quick Tip</h4>
            <p className="text-xs text-blue-700">
              Schedule notifications during peak user activity times (7-9 AM and 5-8 PM) for better engagement rates.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}