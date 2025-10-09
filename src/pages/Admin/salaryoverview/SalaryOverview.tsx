import React, { useState } from 'react';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { SalaryOverviewTable } from '../../../components/Admin/salary/SalaryOverviewTable';
import { SalaryOverviewHeader } from '../../../components/Admin/salary/SalaryOverviewHeader';
import { SalaryOverviewFilter } from '../../../components/Admin/salary/SalaryOverviewFilters';
import { SalaryOverviewStats } from '../../../components/Admin/salary/SalaryOverviewStats';
import { useMySchoolSalaryStructures } from '../../../hooks/useSalary';

const SalaryOverview: React.FC = () => {
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const { data: salaryStructures = [] } = useMySchoolSalaryStructures();

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
                        <SalaryOverviewHeader />
                        <SalaryOverviewFilter
                            searchStudent={searchStudent}
                            setSearchStudent={setSearchStudent}
                            selectedClass={selectedClass}
                            setSelectedClass={setSelectedClass}
                            selectedSection={selectedSection}
                            setSelectedSection={setSelectedSection}
                            selectedTerminal={selectedTerminal}
                            setSelectedTerminal={setSelectedTerminal}
                            selectedDateRange={selectedDateRange}
                            setSelectedDateRange={setSelectedDateRange}
                        />
                        <SalaryOverviewStats />
                        <SalaryOverviewTable salaryData={salaryStructures} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SalaryOverview;