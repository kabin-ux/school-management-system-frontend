import React, { useEffect, useState } from 'react';
import { FeeOverviewHeader } from '../../../components/Admin/feeoverview/FeeOverviewHeader';
import { FeeOverviewFilters } from '../../../components/Admin/feeoverview/FeeOverviewFilters';
import { FeeOverviewStats } from '../../../components/Admin/feeoverview/FeeOverviewStats';
import { FeeOverviewTable } from '../../../components/Admin/feeoverview/FeeOverviewTable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {  getMySchoolFeesStructures } from '../../../features/feesSlice';

const FeeOverview: React.FC = () => {
    const [searchStudent, setSearchStudent] = useState('');
    const [selectedClass, setSelectedClass] = useState('');
    const [selectedSection, setSelectedSection] = useState('');
    const [selectedTerminal, setSelectedTerminal] = useState('');
    const [selectedDateRange, setSelectedDateRange] = useState('');
    const { fees } = useAppSelector(state => state.fees)
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state=> state.auth);

    useEffect(() => {
        dispatch(getMySchoolFeesStructures(user.id))
    })

    const feeData = Array.from({ length: 15 }, (_, i) => ({
        code: `TIC-001`,
        id: 1,
        name: 'Ramesh Poudel',
        classSection: 'Class 12 Sec A',
        totalFee: 20000,
        paidAmount: 20000,
        dueAmount: 0,
        status: 'Paid'
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
                        <FeeOverviewTable feeData={feeData} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FeeOverview;