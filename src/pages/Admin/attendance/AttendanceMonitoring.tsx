import React, { useState } from 'react';
import { AttendanceHeader } from '../../../components/Admin/attendance/AttendanceHeader';
import { AttendanceFilters } from '../../../components/Admin/attendance/AttendanceFilters';
import { AttendanceStats } from '../../../components/Admin/attendance/AttendanceStats';
import { AttendanceCharts } from '../../../components/Admin/attendance/AttendanceCharts';
import { AttendanceTable } from '../../../components/Admin/attendance/AttendanceTable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useStudentAttendanceByClassSection } from '../../../hooks/useAttendance';
import { useClasses } from '../../../hooks/useClasses';
import { useSectionsByClass } from '../../../hooks/useSection';
const AttendanceMonitoring: React.FC = () => {
    const [viewType, setViewType] = useState('Student');
    const [selectedDate, setSelectedDate] = useState('mm/dd/yyyy');
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSection, setSelectedSection] = useState('Select Section');


    const { data: classes } = useClasses();
    // const { data: sections } = useSectionsByClass(selectedClass.id);
    const { data: attendanceData } = useStudentAttendanceByClassSection('45355777-5b2d-44be-863d-8a7caa9550c1', 'd2b88fcd-4fa5-4a1b-a677-618f582189c7', '2025-10-01', '2025-10-31')

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
                        {/* <AttendanceStats />
                        <AttendanceCharts /> */}
                        <AttendanceTable attendanceData={attendanceData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AttendanceMonitoring;