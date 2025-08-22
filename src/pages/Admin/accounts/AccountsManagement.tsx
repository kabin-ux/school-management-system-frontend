import React from 'react';
import { AccountantManagementHeader } from '../../../components/Admin/accountmanagement/AccountManagementHeader';
import { AccountantManagementContent } from '../../../components/Admin/accountmanagement/AccountMangementContent';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';

const AccountantManagement: React.FC = () => {
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
                        <AccountantManagementHeader />
                        <AccountantManagementContent />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountantManagement;