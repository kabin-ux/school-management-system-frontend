import React, { useState } from 'react';
import { BookUser, Trash2 } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import { Pagination } from '../../../common/Pagination';
import type { Role } from '../../../hooks/useRoles';

interface RolesTableProps {
    roles: Role[];
    onDelete: (classId: string) => void;
}

export const RolesTable: React.FC<RolesTableProps> = ({ roles, onDelete }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil(roles.length / itemsPerPage);

    const paginatedData = roles.slice(
        (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
    )

    return (
        <div className="bg-white rounded-lg shadow-sm">

            {!roles || roles.length === 0 ? (
                <div className='flex justify-center'>
                    <EmptyState
                        title='No Classes Found'
                        description='There are currently no class records. Click the button above to add a new class.'
                        icon={<BookUser className='w-14 h-14' />}
                    />
                </div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">S.N.</th>
                                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Role</th>
                                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {
                                paginatedData.map((role, index) => (
                                    <tr key={role.id} className="hover:bg-gray-50 cursor-pointer"
                                    >
                                        <td className="p-4 border-r border-gray-200 text-gray-900">{index + 1}</td>
                                        <td className="p-4 border-r border-gray-200">
                                            <button
                                                // onClick={() => toggleGrade(role.id)}
                                                className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
                                            >
                                                {role.name.toLocaleUpperCase()}
                                            </button>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center gap-2">
                                                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-red-600"
                                                    onClick={() => onDelete(role.id)}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            )}

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                    totalPages={totalPages}
                />
            )}
        </div>

    );
};