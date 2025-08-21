import { useMemo, useState } from "react";
import type { DefaulterSummary, FilterValues, Invoice } from "../../../types/invoice.types";
import { Sidebar } from "../../../components/Accountant/layout/Sidebar";
import { AccountantDashboardHeader } from "../../../components/Accountant/layout/DashboardHeader";
import { InvoiceFilters } from "../../../components/Accountant/invoice/InvoiceFilters";
import { InvoiceTable } from "../../../components/Accountant/invoice/InvoiceTable";
import { DefaulterList } from "../../../components/Accountant/invoice/DefaulterList";

export default function InvoicesPage() {
    const [filters, setFilters] = useState<FilterValues>({
        viewType: 'Student',
        search: '',
        paymentStatus: '',
        class: ''
    });
    const [currentPage, setCurrentPage] = useState(1);

    // Mock data - replace with actual API calls
    const invoices: Invoice[] = [
        { id: 'TC-001', studentName: 'Ramesh Prasad', class: '12', date: 'Jan 3,2025', dueAmount: 'Rs 50,000', outstanding: 'Jan 12', lastReminder: 'Jan 15', status: 'Paid' },
        // ... other invoice data
    ];

    const teacherInvoices: Invoice[] = [
        { id: 'TCH-001', studentName: 'John Smith', class: 'Science', date: 'Jan 3,2025', dueAmount: '$3,000', outstanding: 'Jan 12', lastReminder: 'Jan 15', status: 'Paid' },
        // ... other teacher data
    ];

    const defaulterData: Invoice[] = [
        { id: 'TC-001', studentName: 'Ramesh Prasad', class: '12', date: 'Science', dueAmount: '$300.00', outstanding: 'Jan 12', lastReminder: 'Jan 15', status: 'Pending' },
        // ... other defaulter data
    ];

    const teacherDefaulterData: Invoice[] = [
        { id: 'TCH-003', studentName: 'Mike Wilson', class: 'English', date: 'Dec 30,2024', dueAmount: '$2,500', outstanding: 'Jan 10', lastReminder: 'Jan 18', status: 'Pending' },
        // ... other teacher defaulter data
    ];

    // ADD THESE MISSING DECLARATIONS:
    const defaulterSummary: DefaulterSummary[] = [
        { type: 'Critical (Re-admit)', count: 2, color: 'bg-red-100 text-red-800' },
        { type: 'Moderate (Re-admit)', count: 2, color: 'bg-orange-100 text-orange-800' },
        { type: 'Recent (3+ days)', count: 1, color: 'bg-yellow-100 text-yellow-800' },
        { type: 'Any Outstanding', count: 4440, color: 'bg-purple-100 text-purple-800' }
    ];

    const handleSendReminder = (studentId: string) => {
        console.log('Sending reminder to:', studentId);
        // Implement reminder logic here
        // You can call your API to send reminder
    };

    const handleMarkPaid = (studentId: string) => {
        console.log('Marking as paid:', studentId);
        // Implement mark as paid logic here
        // You can call your API to mark payment as paid
    };

    const handleSendAllReminders = () => {
        console.log('Sending all reminders');
        // Implement send all reminders logic here
        // You can call your API to send reminders to all defaulters
    };

    // Get the correct data source based on viewType
    const currentInvoices = filters.viewType === 'Student' ? invoices : teacherInvoices;
    const currentDefaulters = filters.viewType === 'Student' ? defaulterData : teacherDefaulterData;

    // Filtered invoices based on current filters
    const filteredInvoices = useMemo(() => {
        return currentInvoices.filter(invoice => {
            const matchesSearch = invoice.studentName.toLowerCase().includes(filters.search.toLowerCase());
            const matchesStatus = !filters.paymentStatus || invoice.status === filters.paymentStatus;
            const matchesClass = !filters.class || invoice.class === filters.class;

            return matchesSearch && matchesStatus && matchesClass;
        });
    }, [currentInvoices, filters]);

    const totalPages = Math.ceil(filteredInvoices.length / 10);

    return (
        <div className="flex h-full bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
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
                    />

                    <InvoiceTable
                        invoices={filteredInvoices}
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                        viewType={filters.viewType}
                    />

                    <DefaulterList
                        defaulterData={currentDefaulters}
                        summaryData={defaulterSummary}
                        onSendReminder={handleSendReminder}
                        onMarkPaid={handleMarkPaid}
                        onSendAllReminders={handleSendAllReminders}
                        viewType={filters.viewType}
                    />
                </main>
            </div>
        </div>
    );
}

