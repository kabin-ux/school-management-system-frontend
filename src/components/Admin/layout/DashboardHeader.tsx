import React from 'react';
import { Search, Bell, User } from 'lucide-react';

export const AdminDashboardHeader: React.FC = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-end justify-end">

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center space-x-4">

          {/* Notification Bell */}
          <div className="relative">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                1
              </span>
            </button>
          </div>

          {/* Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};