import React from 'react';
import { SettingsHeader } from '../../../components/Admin/settings/SettingsHeader';
import { SettingsContent } from '../../../components/Admin/settings/SettingsContent';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';

const AdminSettings: React.FC = () => {
  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminDashboardHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            <SettingsHeader />
            <SettingsContent />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminSettings;