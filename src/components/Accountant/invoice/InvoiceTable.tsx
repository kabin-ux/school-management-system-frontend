import React from 'react';
import { StatusBadge } from './StatusBadge';
import type { Invoice } from '../../../types/invoice.types';
import { Pagination } from '../../../common/Pagination';

interface InvoiceTableProps {
    invoices: Invoice[];
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    viewType: 'Student' | 'Teacher'; // Add this prop
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
    invoices,
    currentPage,
    totalPages,
    onPageChange,
    viewType
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {viewType === 'Student' ? 'Student Invoice Management' : 'Teacher Salary Management'}
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
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {viewType === 'Student' ? 'Student ID' : 'Teacher ID'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {viewType === 'Student' ? 'Student Name' : 'Teacher Name'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {viewType === 'Student' ? 'Class' : 'Department'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {viewType === 'Student' ? 'Date Issued' : 'Last Paid'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {viewType === 'Student' ? 'Amount' : 'Salary Amount'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                {viewType === 'Student' ? 'Due Date' : 'Due Amount'}
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {invoices.slice(0, 10).map((invoice, index) => (
                            <tr key={`${invoice.id}-${index}`} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                    {invoice.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {invoice.studentName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {invoice.class}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {invoice.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {invoice.dueAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {invoice.outstanding}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <StatusBadge status={invoice.status} />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
            />
        </div>
    );
};
