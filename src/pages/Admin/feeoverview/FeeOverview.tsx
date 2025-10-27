import React, { useMemo, useState } from 'react';
import { FeeOverviewHeader } from '../../../components/Admin/feeoverview/FeeOverviewHeader';
import { FeeOverviewFilters } from '../../../components/Admin/feeoverview/FeeOverviewFilters';
import { FeeOverviewStats } from '../../../components/Admin/feeoverview/FeeOverviewStats';
import { FeeOverviewTable } from '../../../components/Admin/feeoverview/FeeOverviewTable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useMySchoolFeesStructures } from '../../../hooks/useFees';
import { useClasses } from '../../../hooks/useClasses';
import type { FeeStructureAttributes } from '../../../types/fee-salary.types';

export interface FilterValues {
    search: string;
    class: string;
}

const FeeOverview: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        class: ''
    });
    const { data: feeStructures = [] } = useMySchoolFeesStructures();
    const { data: classes = [] } = useClasses();

    const filteredFeeStructure = useMemo(() => {
        return feeStructures.filter((feeStructure: FeeStructureAttributes) => {
            const textinput = `${feeStructure?.class?.name || ""}`.toLowerCase();
            const matchesSearch = textinput.includes(filters.search.toLowerCase());
            const matchesClass = !filters.class || feeStructure.class?.name === filters.class;

            return matchesSearch && matchesClass;
        });
    }, [feeStructures, filters]);

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
                            classes={classes}
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        {/* <FeeOverviewStats /> */}
                        <FeeOverviewTable
                            feeData={filteredFeeStructure}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FeeOverview;