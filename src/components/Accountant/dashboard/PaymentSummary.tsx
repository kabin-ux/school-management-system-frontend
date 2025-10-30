import React from 'react'
import type { AccountantDashboard } from '../../../hooks/useDashboard'
import EmptyState from '../../../common/EmptyState'
import { HandCoins } from 'lucide-react'

interface PaymentSummaryProps {
    accountantDashboard: AccountantDashboard
}

export const PaymentSummary: React.FC<PaymentSummaryProps> = ({ accountantDashboard }) => {
    return (
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Summary</h2>
            {!accountantDashboard.totalPayment || accountantDashboard.totalPayment.length === 0 ? (
                <div className='flex justify-center'>
                    <EmptyState
                        title='No Classes Found'
                        description='There are currently no class records. Click the button above to add a new class.'
                        icon={<HandCoins className='w-14 h-14' />}
                    />
                </div>
            ) : (
                <div>
                    <table className="min-w-full cursor-pointer">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 md:px-6 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-4 md:px-6 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                    Total Amount
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {accountantDashboard.totalPayment?.map((p: any, index: number) => (
                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-4 md:px-6 py-2 whitespace-nowrap text-sm md:text-sm text-gray-900">
                                        {p.status}
                                    </td>
                                    <td className="px-4 md:px-6 py-2 whitespace-nowrap text-sm md:text-sm text-gray-900">
                                        Rs. {p.totalAmount}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}
