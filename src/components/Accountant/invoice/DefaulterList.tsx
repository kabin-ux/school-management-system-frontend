import React from 'react';
import { Download } from 'lucide-react';
import type { Invoice } from '../../../types/invoice.types';
import { DefaulterSummary } from './DefaulterSummary';

interface DefaulterListProps {
    defaulterData: Invoice[];
    summaryData: any[];
    onSendReminder: (studentId: string) => void;
    onMarkPaid: (studentId: string) => void;
    onSendAllReminders: () => void;
    viewType: 'Student' | 'Teacher'; // Add this prop
}

export const DefaulterList: React.FC<DefaulterListProps> = ({
    defaulterData,
    summaryData,
    onSendReminder,
    onMarkPaid,
    onSendAllReminders,
    viewType
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                        {viewType === 'Student' ? 'Student Defaulter List' : 'Teacher Payment Due List'}
                    </h3>
                    <p className="text-gray-600 text-sm">
                        {defaulterData.length} {viewType === 'Student' ? 'students with unpaid fees' : 'teachers with pending salaries'}
                    </p>
                </div>
                <button
                    onClick={onSendAllReminders}
                    className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center"
                >
                    <Download className="h-4 w-4 mr-2" />
                    Send All Reminders
                </button>
            </div>

            <DefaulterSummary summaryData={summaryData} />

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
                                Date Pending
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Outstanding
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Reminder
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {defaulterData.map((defaulter, index) => (
                            <tr key={`defaulter-${index}`} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                                    {defaulter.id}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                    {defaulter.studentName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {defaulter.class}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {defaulter.date}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                                    {defaulter.dueAmount}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {defaulter.outstanding}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => onSendReminder(defaulter.id)}
                                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                        >
                                            Remind
                                        </button>
                                        <button
                                            onClick={() => onMarkPaid(defaulter.id)}
                                            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                                        >
                                            Mark Paid
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
