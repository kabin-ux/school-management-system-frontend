import React from 'react';
import { SupportConsoleHeader } from '../../../components/Admin/support/SupportConsoleHeader';
import { SupportConsoleStats } from '../../../components/Admin/support/SupportConsoleStats';
import { NewSupportTicket } from '../../../components/Admin/support/NewSupportTicket';
import { RecentTickets } from '../../../components/Admin/support/RecentTickets';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';

const AdminSupportConsole: React.FC = () => {
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
                        <SupportConsoleHeader />
                        <SupportConsoleStats />
                        <NewSupportTicket />
                        <RecentTickets />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminSupportConsole;