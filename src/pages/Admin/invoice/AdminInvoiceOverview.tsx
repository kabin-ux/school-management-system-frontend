import React, { useMemo, useState } from "react";
import {
    useSubscriptionPaymentsQuery,
    type PartnerSchoolPayment,
} from "../../../hooks/useSubscriptionPayment";
import { useAuthUser } from "../../../hooks/useAuth";
import { Sidebar } from "../../../components/Admin/layout/Sidebar";
import { AdminDashboardHeader } from "../../../components/Admin/layout/AdminDashboardHeader";
import { InvoiceOverviewTable } from "../../../components/Admin/invoice/InvoiceOverviewTable";
import { InvoiceOverviewFilters } from "../../../components/Admin/invoice/InvoiceOverviewFilters";
import { InvoiceOverviewHeader } from "../../../components/Admin/invoice/InvoiceOverviewHeader";

export interface FilterValues {
    search: string;
    date: ''
}

const AdminInvoiceOverview: React.FC = () => {
    const { data: user } = useAuthUser();

    const [filters, setFilters] = useState<FilterValues>({
        search: "",
        date: ""
    });

    const { data: invoices = [] } = useSubscriptionPaymentsQuery(filters.date || undefined, user.id);


    const filteredPayments = useMemo(() => {
        return invoices.filter((invoice: PartnerSchoolPayment) => {
            const textinput = `${invoice?.subscription?.name || ""}`.toLowerCase();
            const matchesSearch = textinput.includes(filters.search.toLowerCase());
            return matchesSearch;
        });
    }, [invoices, filters]);

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col">
                <AdminDashboardHeader />

                <main className="flex-1 p-6 space-y-6">
                    {/* Header */}
                    <InvoiceOverviewHeader />

                    {/* Filters */}
                    <InvoiceOverviewFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                    />

                    {/* Table */}
                    <InvoiceOverviewTable
                        payments={filteredPayments}
                    />
                </main>
            </div>
        </div>
    );
};

export default AdminInvoiceOverview;
