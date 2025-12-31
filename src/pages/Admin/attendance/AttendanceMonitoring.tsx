import React, { useState } from 'react';
import { AttendanceHeader } from '../../../components/Admin/attendance/AttendanceHeader';
import { AttendanceFilters } from '../../../components/Admin/attendance/AttendanceFilters';
import { AttendanceTable } from '../../../components/Admin/attendance/AttendanceTable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useStudentAttendanceByClassSection } from '../../../hooks/useAttendance';
import { useClasses } from '../../../hooks/useClasses';
import { useSectionsByClass } from '../../../hooks/useSection';

export interface FilterValues {
    search: string;
    class: string;
    section: string;
    startDate: string;
    endDate: string;
}

const AttendanceMonitoring: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        class: '',
        section: '',
        startDate: '',
        endDate: ''
    });

    const { data: classes = [] } = useClasses();
    const selectedClass = classes.find((c) => c.name === filters.class);
    const classId = selectedClass?.id || "";

    const { data: sections = [] } = useSectionsByClass(classId);
    const selectedSection = sections.find((s) => s.section_name === filters.section);
    const sectionId = selectedSection?.id || "";

    const { data: attendanceData = [] } =
        useStudentAttendanceByClassSection(
            classId && sectionId ? classId : "",
            classId && sectionId ? sectionId : "",
            filters.startDate,
            filters.endDate
        );

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
                            classes={classes}
                            filters={filters}
                            onFiltersChange={setFilters}
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