import React, { useState } from 'react';
import type { School } from '../../../types/partner-school.types';
import type { SuperAdmin } from '../../../features/superAdminSlice';
import { Trash2 } from 'lucide-react';

interface SuperAdminTableProps {
    superAdminData?: SuperAdmin[];
    onViewSuperAdminDetails: (schoolCode: string) => void;
}


export const SuperAdminTable: React.FC<SuperAdminTableProps> = ({ superAdminData, onViewSuperAdminDetails }) => {
    const [subscription, setSubscription] = useState('All Status');
    const [payment, setPayment] = useState('Payment');

    const getStatusBadge = (status: string) => {
        return status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };

    const getSubscriptionBadge = (sub: string) => {
        return sub === 'Premium'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {/* Header */}
            <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
                            <span className="text-red-600 text-sm">⚠</span>
                        </div>
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900">Super Admins</h2>
                            <p className="text-sm text-gray-600">List of all super admins</p>
                        </div>
                    </div>
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
                        View All
                    </button>
                </div>

                {/* Filters */}
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search All Super Admins..."
                            className="pl-4 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                        />
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">ID</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Name</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Location</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Email Address</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Contact No.</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Status</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Created By</th>
                            <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {superAdminData?.map((superAdmin, index) => (
                            <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                                onClick={() => onViewSuperAdminDetails?.(superAdmin.id)}
                            >
                                <td className="py-4 px-6 text-sm text-blue-600 font-medium">{superAdmin.id || '-'}</td>
                                <td className="py-4 px-6 text-sm text-gray-900 font-medium">{superAdmin.firstName + ' ' + superAdmin.lastName || '-'}</td>
                                <td className="py-4 px-6 text-sm text-gray-600">{superAdmin.address || '-'}</td>
                                <td className="py-4 px-6 text-sm text-gray-900">{superAdmin.email || '-'}</td>
                                <td className="py-4 px-6 text-sm text-gray-900">{superAdmin.phone_number || '-'}</td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(superAdmin.status)}`}>
                                        {superAdmin.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6">
                                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium`}>
                                        {superAdmin.created_by || '-'}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    <button
                                        // onClick={() => handleDelete(driver._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-center space-x-2">
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'].map((letter) => (
                        <button
                            key={letter}
                            className="w-8 h-8 text-sm text-gray-600 hover:bg-gray-100 rounded flex items-center justify-center"
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};