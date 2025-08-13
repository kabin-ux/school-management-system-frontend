// import { useState } from 'react';
import { ArrowLeft, Plus, Users, GraduationCap, DollarSign, BarChart3, FileText, Settings } from 'lucide-react';
import UserCard from './UserCard';
import PermissionSection from './PermissionSection';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../Sidebar';
import { DashboardHeader } from '../DashboardHeadert';

export default function SchoolPermissionDetail() {
  //   const [activeTab, setActiveTab] = useState('users');
  const navigate = useNavigate();

  const users = [
    {
      id: '1',
      name: 'Sarah Johnson',
      role: 'Admin',
      email: 'sarah.johnson@greenwoodintl.edu',
      permissions: '17 permissions assigned',
      status: 'Active' as const
    },
    {
      id: '2',
      name: 'Emma Davis',
      role: 'Accountant',
      email: 'emma.davis@greenwoodintl.edu',
      permissions: '17 permissions assigned',
      status: 'Active' as const
    },
    {
      id: '3',
      name: 'Michael Chen',
      role: 'Admin',
      email: 'michael.chen@greenwoodintl.edu',
      permissions: '17 permissions assigned',
      status: 'Inactive' as const
    }
  ];

  const permissionSections = [
    {
      title: 'Student Management',
      icon: <GraduationCap className="w-5 h-5" />,
      permissions: [
        { id: 'add-students', name: 'Add Students', description: 'Add new student records', enabled: true },
        { id: 'edit-students', name: 'Edit Students', description: 'Modify student information', enabled: true },
        { id: 'delete-students', name: 'Delete Students', description: 'Remove student records', enabled: false }
      ]
    },
    {
      title: 'Teacher Management',
      icon: <Users className="w-5 h-5" />,
      permissions: [
        { id: 'assign-teachers', name: 'Assign Teachers', description: 'Assign teachers to classes', enabled: true },
        { id: 'mentor-teachers', name: 'Mentor Teachers', description: 'Manage teacher mentoring', enabled: true },
        { id: 'review-teachers', name: 'Review Teachers', description: 'Conduct teacher reviews', enabled: true }
      ]
    },
    {
      title: 'Parent Management',
      icon: <Users className="w-5 h-5" />,
      permissions: [
        { id: 'list-parents', name: 'List Parents', description: 'View parent listings', enabled: true },
        { id: 'notify-parents', name: 'Notify Parents', description: 'Send notifications to parents', enabled: true },
        { id: 'track-parents', name: 'Track Parents', description: 'Monitor parent engagement', enabled: false }
      ]
    },
    {
      title: 'Fee Management',
      icon: <DollarSign className="w-5 h-5" />,
      permissions: [
        { id: 'fee-collection', name: 'Fee Collection', description: 'Manage fee collections', enabled: true },
        { id: 'scholarship-mgmt', name: 'Scholarship Management', description: 'Manage scholarships', enabled: true },
        { id: 'discount-mgmt', name: 'Discount Management', description: 'Apply fee discounts', enabled: true }
      ]
    },
    {
      title: 'Financial Records',
      icon: <BarChart3 className="w-5 h-5" />,
      permissions: [
        { id: 'expense-records', name: 'Expense Records', description: 'Track school expenses', enabled: true },
        { id: 'payroll-tracking', name: 'Payroll Tracking', description: 'Manage staff payroll', enabled: true },
        { id: 'invoice-generation', name: 'Invoice Generation', description: 'Generate financial invoices', enabled: true }
      ]
    },
    {
      title: 'Reporting',
      icon: <FileText className="w-5 h-5" />,
      permissions: [
        { id: 'report-downloading', name: 'Report Downloading', description: 'Download system reports', enabled: true }
      ]
    },
    {
      title: 'School Operations',
      icon: <Settings className="w-5 h-5" />,
      permissions: [
        { id: 'class-schedule-control', name: 'Class & Schedule Control', description: 'Manage class schedules', enabled: true },
        { id: 'library-access', name: 'Library Access', description: 'Manage library resources', enabled: true },
        { id: 'transport-classification', name: 'Transport Classification', description: 'Organize transport services', enabled: true },
        { id: 'global-school-settings', name: 'Global School Settings', description: 'Configure school-wide settings', enabled: false }
      ]
    }
  ];

  const handlePermissionChange = (sectionTitle: string, permissionId: string, enabled: boolean) => {
    console.log(`Permission changed: ${sectionTitle} - ${permissionId} - ${enabled}`);
  };

  const handleUserEdit = (userId: string) => {
    console.log(`Edit user: ${userId}`);
  };

  const handleUserDelete = (userId: string) => {
    console.log(`Delete user: ${userId}`);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={() =>
                  navigate(`/super-admin/permissions`)
                }>
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Manage Permissions - Greenwood International School</h1>
                <p className="text-gray-600 mt-1">North Region • School permission management</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Admins
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Accountant
              </button>
            </div>
          </div>

          {/* User Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-6">
            {users.map((user) => (
              <UserCard
                key={user.id}
                name={user.name}
                role={user.role}
                email={user.email}
                permissions={user.permissions}
                status={user.status}
                onEdit={() => handleUserEdit(user.id)}
                onDelete={() => handleUserDelete(user.id)}
              />
            ))}
          </div>

          {/* Permission Settings */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Settings</h3>
              <div className="space-y-4">
                {permissionSections.slice(0, Math.ceil(permissionSections.length / 2)).map((section) => (
                  <PermissionSection
                    key={section.title}
                    title={section.title}
                    icon={section.icon}
                    permissions={section.permissions}
                    onPermissionChange={handlePermissionChange}
                  />
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Permission Settings</h3>
              <div className="space-y-4">
                {permissionSections.slice(Math.ceil(permissionSections.length / 2)).map((section) => (
                  <PermissionSection
                    key={section.title}
                    title={section.title}
                    icon={section.icon}
                    permissions={section.permissions}
                    onPermissionChange={handlePermissionChange}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-gray-200">
            <button className="text-gray-600 hover:text-gray-800 font-medium">
              Remove Default
            </button>
            <div className="flex gap-3">
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                Save Changes
              </button>
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Add All Permission
              </button>
            </div>
          </div>

          {/* School-wide Action */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-blue-900">School-wide Action</h4>
                <p className="text-sm text-blue-700 mt-1">Apply changes to all users in this school</p>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Apply All Permission
              </button>
            </div>
          </div>

          {/* Permission Guidelines */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Permission Guidelines</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>• Each school can have maximum 2 Admin users and 2 Accountant users</li>
              <li>• Admin permissions include student, teacher, and parent management capabilities</li>
              <li>• Accountant permissions are focused on financial and fee management features</li>
              <li>• Changes are applied immediately and logged for audit purposes</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}