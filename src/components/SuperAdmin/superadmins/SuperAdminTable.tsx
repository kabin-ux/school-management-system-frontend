import React from 'react';
import { Eye, Search, Trash2, Edit } from 'lucide-react';
import { Pagination } from '../../../common/Pagination';
import type { SuperAdmin } from '../../../types/super-admin-dashboard.types';

interface SuperAdminTableProps {
    superAdminData?: SuperAdmin[];
    onViewSuperAdminDetails: (schoolCode: string) => void;
    onDelete: (id: string) => void;
    onEdit: (superAdmin: SuperAdmin) => void;
}

export const SuperAdminTable: React.FC<SuperAdminTableProps> = ({ superAdminData, onDelete, onEdit }) => {
    const getStatusBadge = (status: string) => {
        return status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800';
    };
    return (

        <div className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                {/* Search */}
                <div className="relative w-96">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search super admins..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                </div>
                {/* Add button could go here if needed */}
            </div>

            {/* Table */}
            <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full border-collapse">
                    <thead className="bg-gray-50 sticky top-0 z-10">
                        <tr>
                            {[
                                "ID",
                                "Name",
                                "Location",
                                "Email",
                                "Contact No.",
                                "Status",
                                "Created By",
                                "Actions",
                            ].map((header) => (
                                <th
                                    key={header}
                                    className="text-left py-3 px-6 font-medium text-gray-600 text-sm"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {superAdminData?.map((superAdmin, index) => (
                            <tr
                                key={index}
                                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                            >
                                <td className="py-4 px-6 text-sm text-blue-600 font-medium">
                                    {index + 1 || "-"}
                                </td>
                                <td className="py-4 px-6 text-sm font-medium text-gray-900">
                                    {superAdmin.firstName + " " + superAdmin.lastName || "-"}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-600">
                                    {superAdmin.address || "-"}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {superAdmin.email || "-"}
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-900">
                                    {superAdmin.phone_number || "-"}
                                </td>
                                <td className="py-4 px-6">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                                            superAdmin.status
                                        )}`}
                                    >
                                        {superAdmin.status}
                                    </span>
                                </td>
                                <td className="py-4 px-6 text-sm text-gray-700">
                                    {superAdmin.created_by || "-"}
                                </td>
                                <td className="py-4 px-6 flex items-center gap-3">
                                    <button
                                        className="text-green-600 hover:text-green-800"
                                        title="Edit"
                                        onClick={() => onEdit(superAdmin)}
                                    >
                                        <Edit className="w-5 h-5" />
                                    </button>
                                    <button
                                        className="text-red-600 hover:text-red-800"
                                        title="Delete"
                                        onClick={() => onDelete(superAdmin.id)}
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
            {/* <Pagination /> */}
        </div>

    );
};