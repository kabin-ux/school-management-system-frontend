import React from 'react';
import { Download, CheckCircle, Calendar, FileText } from 'lucide-react';
import type { PaymentHistoryItem } from '../../../types/fee-salary.types';

interface PaymentHistoryProps {
    payments: PaymentHistoryItem[];
}

export const PaymentHistory: React.FC<PaymentHistoryProps> = ({ payments }) => {
    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h4 className="font-medium text-gray-900">Payment History</h4>
                    <p className="text-sm text-gray-600">{payments.length} payments made in last 6 month</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Export History
                </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                    <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Total Paid</p>
                    <p className="text-xl font-bold text-green-600">$ 45000.00</p>
                </div>
                <div className="text-center p-4 bg-pink-50 rounded-lg">
                    <Calendar className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Last Payment</p>
                    <p className="text-xl font-bold text-pink-600">$ 45000.00</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <FileText className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Next Fee</p>
                    <p className="text-xl font-bold text-blue-600">$ 45000.00</p>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {payments.map((payment, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm text-gray-900">{payment.date}</td>
                                <td className="px-4 py-3 text-sm font-medium text-gray-900">{payment.amount}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{payment.method}</td>
                                <td className="px-4 py-3 text-sm text-gray-600">{payment.description}</td>
                                <td className="px-4 py-3">
                                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                        {payment.status}
                                    </span>
                                </td>
                                <td className="px-4 py-3">
                                    <button className="text-blue-600 hover:text-blue-800">
                                        <Download className="h-4 w-4" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
