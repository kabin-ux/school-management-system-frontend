import React from 'react';
import { Bell } from 'lucide-react';
import type { NotificationSettings } from '../../../types/settings.types';
import { NotificationToggle } from './NotificationToggle';
import { SectionHeader } from './SectionHeader';

interface NotificationsSectionProps {
  notifications: NotificationSettings;
  onToggleNotification: (key: keyof NotificationSettings) => void;
}

export const NotificationsSection: React.FC<NotificationsSectionProps> = ({
  notifications,
  onToggleNotification
}) => {
  const emailNotifications = [
    { key: 'feePaymentReminders' as keyof NotificationSettings, label: 'Fee Payment Reminders' },
    { key: 'expenseReminders' as keyof NotificationSettings, label: 'Expense Reminders' },
    { key: 'feeCollectionUpdate' as keyof NotificationSettings, label: 'Fee Collection Updates' },
    { key: 'monthlyFinancialReport' as keyof NotificationSettings, label: 'Monthly Financial Report' },
    { key: 'budgetExceedAlert' as keyof NotificationSettings, label: 'Budget Exceed Alert' },
    { key: 'systemMaintenance' as keyof NotificationSettings, label: 'System Maintenance' }
  ];

  const chatNotifications = [
    { key: 'dueDateAlerts' as keyof NotificationSettings, label: 'Due Date Alerts' },
    { key: 'chatNotifications' as keyof NotificationSettings, label: 'Fee Remand' },
    { key: 'feeResentReminder' as keyof NotificationSettings, label: 'Fee Present Reminder' },
    { key: 'systemUpdates' as keyof NotificationSettings, label: 'System Updates' },
    { key: 'dailyTransactionSummary' as keyof NotificationSettings, label: 'Daily Transaction' }
  ];

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <SectionHeader
        icon={Bell}
        iconColor="text-orange-600"
        title="Notification Settings"
        description="Manage your notification preferences"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Email Notifications
          </h4>
          <p className="text-sm text-gray-600 mb-4">Notifications sent to your email address</p>
          
          <div className="space-y-3">
            {emailNotifications.map((item) => (
              <NotificationToggle
                key={item.key}
                label={item.label}
                isEnabled={notifications[item.key]}
                onToggle={() => onToggleNotification(item.key)}
                color="blue"
              />
            ))}
          </div>
        </div>
        
        <div>
          <h4 className="font-medium text-gray-900 mb-4 flex items-center">
            <div className="w-2 h-2 bg-pink-500 rounded-full mr-2"></div>
            Chat Notifications
          </h4>
          <p className="text-sm text-gray-600 mb-4">Notifications sent to you on mobile device</p>
          
          <div className="space-y-3">
            {chatNotifications.map((item) => (
              <NotificationToggle
                key={item.key}
                label={item.label}
                isEnabled={notifications[item.key]}
                onToggle={() => onToggleNotification(item.key)}
                color="pink"
              />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-orange-50 border border-orange-200 rounded-lg">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-orange-500 rounded-full mr-2"></div>
          <span className="text-sm font-medium text-orange-800">Privacy Summary</span>
        </div>
        <p className="text-sm text-orange-700 mt-1">
          We use this data to improve our marketing, email campaigns, operational activities, and customer experience.
        </p>
      </div>
    </div>
  );
};
