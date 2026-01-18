import React from 'react';
import { StatusBadge } from './StatusBadge';
import { Pagination } from '../../../common/Pagination';
import { Receipt } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import toast from 'react-hot-toast';
import { getRoleAction } from '../../../lib/utils';

interface InvoiceTableProps {
    invoices: any[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onClearPayment: (id: string, type: 'Partial' | 'Completed') => void;
    onPartialClearPayment: (id: string, type: 'Partial' | 'Completed', amount: string) => void;
    onClearSalaryPayment: (id: string) => void;
    viewType: 'Student' | 'Employee'; // Add this prop
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
    invoices,
    currentPage,
    totalPages,
    onPageChange,
    onClearPayment,
    onPartialClearPayment,
    onClearSalaryPayment,
    viewType
}) => {
    const handlePartialClear = (id: string) => {
        const value = window.prompt('Enter partial amount:');
        if (!value) return;
        const num = Number(value);
        if (Number.isNaN(num) || num <= 0) {
            alert('Please enter a valid amount');
            toast.error('Please enter a valid amount');
            return;
        }
        onPartialClearPayment(id, 'Partial', value);
    };

    const getEmployeeFromInvoice = (invoice: any) => {
        if (invoice.student) return invoice.student; // student invoices

        const s = invoice.salaryStructure;
        if (!s) return null;

        return s.accountantEmployee ?? s.teacherEmployee ?? null;
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {viewType === 'Student' ? 'Student Invoice Management' : 'Employee Salary Management'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {invoices.length} {viewType === 'Student' ? 'invoices' : 'salary records'} generated
                    </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    View All
                </button>
            </div>

            <div className="overflow-x-auto">
                {!invoices || invoices.length === 0 ? (
                    <EmptyState
                        title="No invoice data found"
                        description="There are currently no any invoice data in the system."
                        icon={<Receipt className="w-14 h-14" />}
                    />
                ) : (
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    S.N.
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {viewType === 'Student' ? 'Student Name' : 'Employee Name'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {viewType === 'Student' ? 'Class' : 'Department'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {viewType === 'Student' ? 'Date Issued' : 'Amount Paid'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {viewType === 'Student' ? 'Amount' : 'Salary Amount'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {viewType === 'Student' ? 'Accountant' : 'Allowences'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    {viewType === 'Student' ? 'Method' : 'Remarks'}
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Partial Remaining
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invoices?.slice(0, 10).map((invoice, index) => {
                                const employee = getEmployeeFromInvoice(invoice);
                                return (
                                    <tr key={`${invoice.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                            {index + 1}
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900">
                                            {employee
                                                ? `${employee.firstName} ${employee.lastName}`
                                                : "N/A"}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {viewType === 'Student' ? (
                                                invoice.student.class?.name ?? '—'
                                            ) : (() => {
                                                const statusInfo = getRoleAction(invoice.salaryStructure.role);
                                                return (
                                                    <span
                                                        className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.textColor}`}
                                                    >
                                                        {statusInfo.label}
                                                    </span>
                                                );
                                            })()}
                                        </td>

                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {viewType === 'Student' ? invoice.payment_date
                                                ? new Date(invoice.payment_date).toLocaleDateString()
                                                : "N/A" : `Rs ${invoice.amount_paid}`}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            Rs. {viewType === 'Student' ? invoice.amount : invoice.salaryStructure.basic}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                            {viewType === 'Student' ? invoice.accountant?.firstName : `Rs ${invoice.salaryStructure.allowances}`} {invoice.accountant?.lastName}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                            {viewType === 'Student' ? invoice.method : invoice.salaryStructure.remarks}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <StatusBadge status={invoice.status} />
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {invoice.status === 'Partial'
                                                ? `Rs. ${invoice.partial_remaining_payment ?? 0}`
                                                : '-'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {viewType === 'Student' ? (
                                                invoice.status !== 'Completed' && (
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => onClearPayment(invoice.id, 'Completed')}
                                                            className="
            inline-flex items-center justify-center
            px-3 py-1.5 text-xs font-medium
            rounded-md border
            bg-red-50 text-red-600 border-red-200
            hover:bg-red-100 hover:text-red-700
            focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1
            transition-colors
          "
                                                        >
                                                            Clear Full
                                                        </button>

                                                        <button
                                                            onClick={() => handlePartialClear(invoice.id)}
                                                            className="
            inline-flex items-center justify-center
            px-3 py-1.5 text-xs font-medium
            rounded-md border
            bg-amber-50 text-amber-700 border-amber-200
            hover:bg-amber-100 hover:text-amber-800
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-1
            transition-colors
          "
                                                        >
                                                            Clear Partial
                                                        </button>
                                                    </div>
                                                )
                                            ) : (
                                                invoice.status !== 'completed' && (
                                                    <button
                                                        onClick={() => onClearSalaryPayment(invoice.id)}
                                                        className="
          inline-flex items-center justify-center
          px-3 py-1.5 text-xs font-medium
          rounded-md border
          bg-red-50 text-red-600 border-red-200
          hover:bg-red-100 hover:text-red-700
          focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1
          transition-colors
        "
                                                    >
                                                        Clear
                                                    </button>
                                                )
                                            )}
                                        </td>

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                )}
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
};
