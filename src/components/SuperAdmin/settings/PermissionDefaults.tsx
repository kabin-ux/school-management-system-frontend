import { useState } from 'react';

export default function PermissionDefaults() {
  const [permissions, setPermissions] = useState({
    dashboard: { admin: true, accountant: true },
    paymentManagement: { admin: true, accountant: true },
    notifications: { admin: true, accountant: false },
    supportConsole: { admin: true, accountant: false },
    userManagement: { admin: true, accountant: false },
    systemSettings: { admin: true, accountant: false }
  });

  const handlePermissionChange = (module: string, role: string, checked: boolean) => {
    setPermissions(prev => ({
      ...prev,
      [module]: {
        ...prev[module as keyof typeof prev],
        [role]: checked
      }
    }));
  };

  const modules = [
    { key: 'dashboard', label: 'Dashboard' },
    { key: 'paymentManagement', label: 'Payment Management' },
    { key: 'notifications', label: 'Notifications' },
    { key: 'supportConsole', label: 'Support Console' },
    { key: 'userManagement', label: 'User Management' },
    { key: 'systemSettings', label: 'System Settings' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Default Permissions by Role</h3>
        <p className="text-gray-600">Configure default access permissions for each user role</p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                MODULE
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ADMIN
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                ACCOUNTANT
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {modules.map((module, index) => (
              <tr key={module.key} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {module.label}
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={permissions[module.key as keyof typeof permissions]?.admin || false}
                    onChange={(e) => handlePermissionChange(module.key, 'admin', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
                <td className="px-6 py-4 text-center">
                  <input
                    type="checkbox"
                    checked={permissions[module.key as keyof typeof permissions]?.accountant || false}
                    onChange={(e) => handlePermissionChange(module.key, 'accountant', e.target.checked)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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