import { useMemo, useState } from "react";
import type { FilterValues, Invoice } from "../../../types/invoice.types";
import { Sidebar } from "../../../components/Accountant/layout/Sidebar";
import { AccountantDashboardHeader } from "../../../components/Accountant/layout/DashboardHeader";
import { InvoiceFilters } from "../../../components/Accountant/invoice/InvoiceFilters";
import { InvoiceTable } from "../../../components/Accountant/invoice/InvoiceTable";
import { useAllPayments, useAllSalaryPayments, useClearFeePayment, useClearSalaryPayment } from "../../../hooks/usePayments";
import { useClasses } from "../../../hooks/useClasses";

export default function InvoicesPage() {
    const [filters, setFilters] = useState<FilterValues>({
        viewType: 'Student',
        search: '',
        paymentStatus: '',
        class: '',
        date: ''
    });
    const [currentPage, setCurrentPage] = useState(1);

    const { data: payments = [] } = useAllPayments({
        classId: filters.class || undefined,
        status: filters.paymentStatus || undefined,
        date: filters.date || undefined, // if you have date in filters
    });

    const { data: salaryPayments = [] } = useAllSalaryPayments({ date: filters.date || undefined, status: filters.paymentStatus || undefined });

    const clearFeeMutation = useClearFeePayment();
    const clearSalaryMutation = useClearSalaryPayment();

    const { data: classes = [] } = useClasses();

    const handleClearPayment = (id: string, type: 'Partial' | 'Completed') => {
        if (type === 'Completed') {
            clearFeeMutation.mutate({ id, type: 'Completed' });
        }
    };

    const handlePartialClearPayment = (id: string, type: 'Partial' | 'Completed', amount: string) => {
        if (type === 'Partial') {
            clearFeeMutation.mutate({ id, type: 'Partial', amount: Number(amount) });
        }
    };

    const handleClearSalaryPayment = (id: string) => {
        clearSalaryMutation.mutate(id);
    };


    const itemsPerPage = 10
    const totalPages = Math.ceil(payments.length / itemsPerPage);

    // Get the correct data source based on viewType
    const currentInvoices = payments;

    // Filtered invoices based on current filters
    const filteredStudentInvoices = useMemo(() => {
        return currentInvoices.filter((invoice: Invoice) => {
            const fullName = `${invoice.student?.firstName || ""} ${invoice.student?.lastName || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesStatus = !filters.paymentStatus || invoice.status === filters.paymentStatus;
            const matchesClass = !filters.class || invoice.student.class.name === filters.class;

            return matchesSearch && matchesStatus && matchesClass;
        });
    }, [currentInvoices, filters]);

    // Employee salary payments
    // Employee salary payments - Updated with correct paths
    const filteredSalaryPayments = useMemo(() => {
        if (filters.viewType !== "Employee") return [];
        return salaryPayments.filter((salary: any) => {
            const employee = salary.salaryStructure?.accountantEmployee || salary.salaryStructure?.teacherEmployee;
            const fullName = `${employee?.firstName || ""} ${employee?.lastName || ""}`.toLowerCase();

            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesStatus = !filters.paymentStatus || salary.status === filters.paymentStatus;

            // Filter by department/role - using 'role' from salaryStructure since no explicit department field
            // Adjust this if you have a department field elsewhere
            const matchesDepartment = !filters.class ||
                salary.salaryStructure?.role === filters.class;

            return matchesSearch && matchesStatus && matchesDepartment;
        });
    }, [salaryPayments, filters]);


    const dataToShow =
        filters.viewType === "Student"
            ? filteredStudentInvoices
            : filteredSalaryPayments;

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <AccountantDashboardHeader />

                {/* Scrollable Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Invoice & Report Center</h1>
                        <p className="text-gray-600 mt-1">
                            Managing {filters.viewType === 'Student' ? 'invoices' : 'teacher salaries'},
                            manage payments, and collect financial reports
                        </p>
                    </div>

                    <InvoiceFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                        classes={classes}
                    />

                    <InvoiceTable
                        invoices={dataToShow}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        viewType={filters.viewType}
                        onClearPayment={handleClearPayment}
                        onPartialClearPayment={handlePartialClearPayment}
                        onClearSalaryPayment={handleClearSalaryPayment}
                    />
                </main>
            </div>
        </div>
    );
}

