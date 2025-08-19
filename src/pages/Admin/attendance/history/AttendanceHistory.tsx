import React from 'react';
import { AttendanceHistoryHeader } from '../../../../components/Admin/attendance/history/AttendanceHistoryHeader';
import { SubjectWiseTable } from '../../../../components/Admin/attendance/history/SubjectWiseTable';
import { AttendanceHistoryStats } from '../../../../components/Admin/attendance/history/AttendanceHistoryStats';
import { MonthlyCalendar } from '../../../../components/Admin/attendance/history/MonthlyCalendar';
import { Sidebar } from '../../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../../components/Admin/layout/DashboardHeader';

const AttendanceHistory: React.FC = () => {
    const subjects = [
        { name: 'Mathematic', totalClass: 52, attendedClass: 48, attendance: '92%' },
        { name: 'Physics', totalClass: 52, attendedClass: 46, attendance: '90%' },
        { name: 'Chemistry', totalClass: 52, attendedClass: 46, attendance: '90%' },
        { name: 'Computer', totalClass: 52, attendedClass: 46, attendance: '88%' },
        { name: 'English', totalClass: 52, attendedClass: 46, attendance: '88%' },
        { name: 'Nepali', totalClass: 52, attendedClass: 46, attendance: '88%' },
    ];

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
                        <AttendanceHistoryHeader />
                        <AttendanceHistoryStats />
                        <SubjectWiseTable subjects={subjects} />
                        <MonthlyCalendar />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AttendanceHistory;