import type { Admin } from "../../../types/partner-school.types";

export default function SystemInformation() {
  const admins: Admin[] = [
    { name: 'Sarah Johnson', role: 'Primary Admin', initials: 'SJ', bgColor: 'bg-blue-100 text-blue-600' },
    { name: 'Mike Chen', role: 'Secondary Admin', initials: 'MC', bgColor: 'bg-green-100 text-green-600' },
    { name: 'Alex Doe', role: 'Accountant', initials: 'AD', bgColor: 'bg-orange-100 text-orange-600' }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">System Information</h3>

      {/* Assigned Administrators */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Assigned Administrators</h4>
        <div className="space-y-3">
          {admins.map((admin, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${admin.bgColor}`}>
                {admin.initials}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">{admin.name}</p>
                <p className="text-xs text-gray-500">{admin.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">Quick Stats</h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Last Login:</span>
            <span className="text-gray-900">2 hours ago</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Data Sync:</span>
            <span className="text-green-600">Active</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Server Status:</span>
            <span className="text-green-600">Online</span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2">
        <button className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
          Reset Schools Information
        </button>
        <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
          Remove School From Partnered Schools
        </button>
      </div>
    </div>
  );
}