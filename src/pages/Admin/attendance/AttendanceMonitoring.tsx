import React, { useState } from 'react';
import { AttendanceHeader } from '../../../components/Admin/attendance/AttendanceHeader';
import { AttendanceFilters } from '../../../components/Admin/attendance/AttendanceFilters';
import { AttendanceStats } from '../../../components/Admin/attendance/AttendanceStats';
import { AttendanceCharts } from '../../../components/Admin/attendance/AttendanceCharts';
import { AttendanceTable } from '../../../components/Admin/attendance/AttendanceTable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
const AttendanceMonitoring: React.FC = () => {
    const [viewType, setViewType] = useState('Student');
    const [selectedDate, setSelectedDate] = useState('mm/dd/yyyy');
    const [selectedClass, setSelectedClass] = useState('Select Class');
    const [selectedSection, setSelectedSection] = useState('Select Section');

    const attendanceData = Array.from({ length: 10 }, () => ({
        id:1,
        name: 'Biswas Poudel',
        classSection: 'Class: 12, A',
        date: '12th July 2025',
        status: 'Present'
    }));

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
                        <AttendanceHeader />
                        <AttendanceFilters
                            viewType={viewType}
                            setViewType={setViewType}
                            selectedDate={selectedDate}
                            setSelectedDate={setSelectedDate}
                            selectedClass={selectedClass}
                            setSelectedClass={setSelectedClass}
                            selectedSection={selectedSection}
                            setSelectedSection={setSelectedSection}
                        />
                        <AttendanceStats />
                        <AttendanceCharts />
                        <AttendanceTable attendanceData={attendanceData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AttendanceMonitoring;