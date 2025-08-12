import React from 'react';
import { 
  School, 
  Send, 
  FileText, 
  UserPlus, 
  HeadphonesIcon 
} from 'lucide-react';

interface QuickAction {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

const quickActions: QuickAction[] = [
  {
    icon: School,
    title: 'Manage Schools',
    description: 'Add, edit, or remove partner schools',
    color: 'blue'
  },
  {
    icon: Send,
    title: 'Send Notification', 
    description: 'Send announcements to schools',
    color: 'green'
  },
  {
    icon: FileText,
    title: 'Financial Reports',
    description: 'View detailed financial analytics',
    color: 'purple'
  },
  {
    icon: UserPlus,
    title: 'User Management',
    description: 'Manage users and permissions',
    color: 'orange'
  },
  {
    icon: HeadphonesIcon,
    title: 'Support Console',
    description: 'Handle support tickets and queries',
    color: 'red'
  }
];

const getIconColor = (color: string) => {
  switch (color) {
    case 'blue': return 'text-blue-600 bg-blue-50';
    case 'green': return 'text-green-600 bg-green-50'; 
    case 'purple': return 'text-purple-600 bg-purple-50';
    case 'orange': return 'text-orange-600 bg-orange-50';
    case 'red': return 'text-red-600 bg-red-50';
    default: return 'text-gray-600 bg-gray-50';
  }
};

export const QuickActions: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-1">Quick Actions</h2>
        <p className="text-sm text-gray-600">Frequently used features</p>
      </div>

      <div className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <button
              key={index}
              className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
            >
              <div className={`p-2 rounded-lg ${getIconColor(action.color)}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 text-sm">{action.title}</h4>
                <p className="text-xs text-gray-500">{action.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};