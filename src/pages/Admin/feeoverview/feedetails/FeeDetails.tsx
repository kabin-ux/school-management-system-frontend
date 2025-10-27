import React from 'react';
import { FeeDetailsHeader } from '../../../../components/Admin/feeoverview/feedetails/FeeDetailsHeader';
import { FeeDetailsContent } from '../../../../components/Admin/feeoverview/feedetails/FeeDetailsContent';
import { AdminDashboardHeader } from '../../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../../components/Admin/layout/Sidebar';
const FeeDetails: React.FC = () => {
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
                        <FeeDetailsHeader />
                        <FeeDetailsContent />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FeeDetails;