import { useState } from 'react';
import { Edit } from 'lucide-react';

export default function NotificationSettings() {
  const [masterToggle, setMasterToggle] = useState(true);
  const [recipients, setRecipients] = useState({
    admin: true,
    accountant: true,
    parent: false
  });

  const notificationTemplates = [
    {
      title: 'Payment Reminder',
      description: 'Sent when payment is overdue'
    },
    {
      title: 'Account Creation',
      description: 'Welcome message for new users'
    },
    {
      title: 'Ticket Resolution',
      description: 'Sent when support ticket is resolved'
    },
    {
      title: 'System Maintenance',
      description: 'Notification for scheduled maintenance'
    }
  ];

  const handleRecipientChange = (type: string, checked: boolean) => {
    setRecipients(prev => ({ ...prev, [type]: checked }));
  };

  return (
    <div className="space-y-6">
      {/* Master Notification Toggle */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Master Notification Toggle</h3>
            <p className="text-blue-700 mt-1">Enable or disable all system notifications</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={masterToggle}
              onChange={(e) => setMasterToggle(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      {/* Default Recipients */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Default Recipients for System Alerts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="admin"
              checked={recipients.admin}
              onChange={(e) => handleRecipientChange('admin', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="admin" className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-blue-600">👤</span>
              </div>
              Admin
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="accountant"
              checked={recipients.accountant}
              onChange={(e) => handleRecipientChange('accountant', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="accountant" className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-blue-600">👤</span>
              </div>
              Accountant
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="parent"
              checked={recipients.parent}
              onChange={(e) => handleRecipientChange('parent', e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="parent" className="flex items-center gap-2 text-sm font-medium text-gray-900">
              <div className="w-4 h-4 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-xs text-blue-600">👤</span>
              </div>
              Parent
            </label>
          </div>
        </div>
      </div>

      {/* Notification Templates */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Templates</h3>
        <div className="space-y-4">
          {notificationTemplates.map((template, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <h4 className="font-medium text-gray-900">{template.title}</h4>
                <p className="text-sm text-gray-500">{template.description}</p>
              </div>
              <button className="text-blue-600 hover:text-blue-800">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Last Saved */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">Last saved: Today at 2:30 PM</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Reset All
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}