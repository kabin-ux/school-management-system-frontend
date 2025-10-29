import React, { useMemo, useState } from 'react';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { SalaryOverviewTable } from '../../../components/Admin/salary/SalaryOverviewTable';
import { SalaryOverviewHeader } from '../../../components/Admin/salary/SalaryOverviewHeader';
import { SalaryOverviewFilter } from '../../../components/Admin/salary/SalaryOverviewFilters';
import { useMySchoolSalaryStructures } from '../../../hooks/useSalary';
import type { Salary } from '../../../types/fee-salary.types';

export interface FilterValues {
    search: string;
    role: string;
}

const SalaryOverview: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        role: '',
    });
    const { data: salaryStructures = [] } = useMySchoolSalaryStructures();

    const filteredSalaryStructure = useMemo(() => {
        return salaryStructures.filter((salaryStructure: Salary) => {
            const textinput = `${salaryStructure?.teacherEmployee?.firstName || ""} ${salaryStructure?.teacherEmployee?.lastName || ""} ${salaryStructure?.accountantEmployee?.firstName || ""} ${salaryStructure?.accountantEmployee?.lastName || ""}`.toLowerCase();
            const matchesSearch = textinput.includes(filters.search.toLowerCase());
            const matchesRole = !filters.role || salaryStructure.role === filters.role;

            return matchesSearch && matchesRole;
        });
    }, [salaryStructures, filters]);

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
                        <SalaryOverviewHeader />
                        <SalaryOverviewFilter
                            filters={filters}
                            onFiltersChange={setFilters}
                        />
                        {/* <SalaryOverviewStats /> */}
                        <SalaryOverviewTable salaryData={filteredSalaryStructure} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default SalaryOverview;