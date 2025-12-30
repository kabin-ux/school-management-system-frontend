import React, { useState } from 'react';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { AddRoleModal } from '../../../components/Admin/roles/AddRoleModal';
import { RolesTable } from '../../../components/Admin/roles/RolesTable';
import { RoleHeader } from '../../../components/Admin/roles/RoleHeader';
import { useCreateRole, useDeleteRole, useGetRoles, type Role } from '../../../hooks/useRoles';

export interface FilterValues {
    search: string;
}

const RoleManagement: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { data: roles = [], isLoading: loading } = useGetRoles();

    const addClassMutation = useCreateRole();
    const deleteClassMutation = useDeleteRole();

    const filteredRoles = roles.filter((role: Role) => {
        return role.name.toLowerCase().includes(filters.search.toLowerCase());
    })

    const handleAddClass = async (classData: any) => {
        addClassMutation.mutate(classData, {
            onSuccess: () => setIsModalOpen(false),
        });
    }

    const handleDeleteClass = async (classId: any) => {
        deleteClassMutation.mutate(classId);
    }

    return (
        <div className="flex h-full bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <AdminDashboardHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">

                        <RoleHeader
                            filters={filters}
                            onFiltersChange={setFilters}
                            onAdd={() => setIsModalOpen(true)}
                        />
                        {/* <ClassStats
                            classDashboardData={classDashboardData}
                        /> */}
                        <RolesTable
                            roles={filteredRoles}
                            onDelete={handleDeleteClass}
                        />

                        <AddRoleModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddClass}
                            isLoading={loading}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default RoleManagement;