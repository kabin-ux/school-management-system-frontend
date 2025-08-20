import React from 'react';
import type { AccountStats as AccountStatsType } from '../../../types/settings.types';

interface AccountStatsProps {
  stats: AccountStatsType;
}

export const AccountStats: React.FC<AccountStatsProps> = ({ stats }) => {
  const statItems = [
    { label: 'Account Created', value: stats.accountCreated },
    { label: 'Last Login', value: stats.lastLogin, isHighlighted: stats.lastLogin === 'Current' },
    { label: 'Last Logout', value: stats.lastLogout },
    { label: 'Data Usage', value: stats.dataUsage }
  ];

  return (
    <div className="space-y-2">
      {statItems.map((item, index) => (
        <div key={index} className="flex items-center justify-between py-2">
          <span className="text-sm text-gray-700">{item.label}</span>
          <span className={`text-sm ${item.isHighlighted ? 'text-blue-600' : 'text-gray-600'}`}>
            {item.value}
          </span>
        </div>
      ))}
    </div>
  );
};
