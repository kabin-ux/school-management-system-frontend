import { Settings, CreditCard, Bell, Shield, HelpCircle, Database } from 'lucide-react';

interface SettingsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function SettingsTabs({ activeTab, onTabChange }: SettingsTabsProps) {
  const tabs = [
    { id: 'general', label: 'General Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'payment', label: 'Payment Settings', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'notification', label: 'Notification Settings', icon: <Bell className="w-4 h-4" /> },
    { id: 'permission', label: 'Permission Defaults', icon: <Shield className="w-4 h-4" /> },
    { id: 'support', label: 'Support Console', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'backup', label: 'Backup & Data', icon: <Database className="w-4 h-4" /> }
  ];

  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`flex items-center gap-2 py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === tab.id
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}