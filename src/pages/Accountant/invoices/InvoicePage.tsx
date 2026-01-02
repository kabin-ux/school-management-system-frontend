import { useMemo, useState } from "react";
import type { FilterValues, Invoice } from "../../../types/invoice.types";
import { Sidebar } from "../../../components/Accountant/layout/Sidebar";
import { AccountantDashboardHeader } from "../../../components/Accountant/layout/DashboardHeader";
import { InvoiceFilters } from "../../../components/Accountant/invoice/InvoiceFilters";
import { InvoiceTable } from "../../../components/Accountant/invoice/InvoiceTable";
import { useAllPayments, useClearFeePayment } from "../../../hooks/usePayments";
import { useClasses } from "../../../hooks/useClasses";

export default function InvoicesPage() {
    const [filters, setFilters] = useState<FilterValues>({
        viewType: 'Student',
        search: '',
        paymentStatus: '',
        class: ''
    });
    const [currentPage, setCurrentPage] = useState(1);
    const { data: payments = [] } = useAllPayments();
    const clearFeeMutation = useClearFeePayment();
    const { data: classes = [] } = useClasses();

    const handleClearPayment = (id: string, type: 'PARTIAL' | 'COMPLETED') => {
        if (type === 'COMPLETED') {
            clearFeeMutation.mutate({ id, type: 'COMPLETED' });
        }
    };

    const handlePartialClearPayment = (id: string, type: 'PARTIAL' | 'COMPLETED', amount: string) => {
        if (type === 'PARTIAL') {
            clearFeeMutation.mutate({ id, type: 'PARTIAL', amount: Number(amount) });
        }
    };

    const itemsPerPage = 10
    const totalPages = Math.ceil(payments.length / itemsPerPage);

    // Get the correct data source based on viewType
    const currentInvoices = payments;

    // Filtered invoices based on current filters
    const filteredInvoices = useMemo(() => {
        return currentInvoices.filter((invoice: Invoice) => {
            const fullName = `${invoice.student?.firstName || ""} ${invoice.student?.lastName || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesStatus = !filters.paymentStatus || invoice.status === filters.paymentStatus;
            const matchesClass = !filters.class || invoice.student.class.name === filters.class;

            return matchesSearch && matchesStatus && matchesClass;
        });
    }, [currentInvoices, filters]);


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
                        invoices={filteredInvoices}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        viewType={filters.viewType}
                        onClearPayment={handleClearPayment}
                        onPartialClearPayment={handlePartialClearPayment}
                    />
                </main>
            </div>
        </div>
    );
}

