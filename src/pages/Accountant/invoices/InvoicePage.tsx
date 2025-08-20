import { useState, useMemo } from 'react';
import type { DefaulterSummary, FilterValues, Invoice } from '../../../types/invoice.types';
import { InvoiceFilters } from '../../../components/Accountant/invoice/InvoiceFilters';
import { InvoiceTable } from '../../../components/Accountant/invoice/InvoiceTable';
import { DefaulterList } from '../../../components/Accountant/invoice/DefaulterList';

export default function InvoicesPage() {
    const [filters, setFilters] = useState<FilterValues>({
        viewType: 'Invoice Management',
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

    const defaulterData: Invoice[] = [
        { id: 'TC-001', studentName: 'Ramesh Prasad', class: '12', date: 'Science', dueAmount: '$300.00', outstanding: 'Jan 12', lastReminder: 'Jan 15', status: 'Pending' },
        // ... other defaulter data
    ];

    const defaulterSummary: DefaulterSummary[] = [
        { type: 'Critical (Re-admit)', count: 2, color: 'bg-red-100 text-red-800' },
        { type: 'Moderate (Re-admit)', count: 2, color: 'bg-orange-100 text-orange-800' },
        { type: 'Recent (3+ days)', count: 1, color: 'bg-yellow-100 text-yellow-800' },
        { type: 'Any Outstanding', count: 4440, color: 'bg-purple-100 text-purple-800' }
    ];

    // Filtered invoices based on current filters
    const filteredInvoices = useMemo(() => {
        return invoices.filter(invoice => {
            const matchesSearch = invoice.studentName.toLowerCase().includes(filters.search.toLowerCase());
            const matchesStatus = !filters.paymentStatus || invoice.status === filters.paymentStatus;
            const matchesClass = !filters.class || invoice.class === filters.class;

            return matchesSearch && matchesStatus && matchesClass;
        });
    }, [invoices, filters]);

    const totalPages = Math.ceil(filteredInvoices.length / 10);

    const handleSendReminder = (studentId: string) => {
        console.log('Sending reminder to:', studentId);
        // Implement reminder logic
    };

    const handleMarkPaid = (studentId: string) => {
        console.log('Marking as paid:', studentId);
        // Implement mark as paid logic
    };

    const handleSendAllReminders = () => {
        console.log('Sending all reminders');
        // Implement send all reminders logic
    };

    return (
        <div className="p-6 bg-gray-50 min-h-screen">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Invoice & Report Center</h1>
                <p className="text-gray-600 mt-1">Managing invoices, manage payments, and collect financial reports</p>
            </div>

            <InvoiceFilters
                filters={filters}
                onFiltersChange={setFilters}
            />

            {/* Tab Navigation */}
            <div className="mb-6">
                <div className="flex space-x-1 bg-blue-50 p-1 rounded-lg">
                    <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-lg">
                        Invoice Management
                    </button>
                </div>
            </div>

            <InvoiceTable
                invoices={filteredInvoices}
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />

            <DefaulterList
                defaulterData={defaulterData}
                summaryData={defaulterSummary}
                onSendReminder={handleSendReminder}
                onMarkPaid={handleMarkPaid}
                onSendAllReminders={handleSendAllReminders}
            />
        </div>
    );
}
