import React from 'react';
import { LogOut } from 'lucide-react';
import type { AccountStats as AccountStatsType } from '../../../types/settings.types';
import { AccountStats } from './AccountStats';

interface AccountActionsSectionProps {
  accountStats: AccountStatsType;
  onLogout: () => void;
  onSafeLogout: () => void;
}

export const AccountActionsSection: React.FC<AccountActionsSectionProps> = ({
  accountStats,
  onLogout,
  onSafeLogout
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center mb-6">
        <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Logout & Account Actions</h3>
          <p className="text-gray-600 text-sm">Logout from application and related security options</p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-gray-900">Account Overview</h4>
            <p className="text-sm text-gray-600">March 15, 2025</p>
          </div>
          <div className="text-right">
            <p className="font-medium text-gray-900">Account Actions</p>
            <p className="text-sm text-gray-600">Control of your current session</p>
          </div>
        </div>

        <AccountStats stats={accountStats} />

        <div className="flex space-x-3 mt-6">
          <button 
            onClick={onSafeLogout}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Safe Logout(s)
          </button>
          <button 
            onClick={onLogout}
            className="flex-1 px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};
