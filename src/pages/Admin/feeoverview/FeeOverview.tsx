import React, { useState } from 'react';
import { FeeOverviewHeader } from '../../../components/Admin/feeoverview/FeeOverviewHeader';
import { FeeOverviewFilters } from '../../../components/Admin/feeoverview/FeeOverviewFilters';
import { FeeOverviewStats } from '../../../components/Admin/feeoverview/FeeOverviewStats';
import { FeeOverviewTable } from '../../../components/Admin/feeoverview/FeeOverviewTable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useMySchoolFeesStructures } from '../../../hooks/useFees';

const FeeOverview: React.FC = () => {
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const { data: feeStructures = [] } = useMySchoolFeesStructures();

    return (
        <div className="flex h-full bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <AdminDashboardHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <FeeOverviewHeader />
                        <FeeOverviewFilters
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
                        <FeeOverviewStats />
                        <FeeOverviewTable
                            feeData={feeStructures}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FeeOverview;