import React, { useState } from 'react';
import { AccountantManagementHeader } from '../../../components/Admin/accountmanagement/AccountManagementHeader';
import { AccountantManagementContent } from '../../../components/Admin/accountmanagement/AccountMangementContent';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import AddAccountantModal from '../../../components/Admin/accountmanagement/AddAccountantModal';
import EditAccountantModal from '../../../components/Admin/accountmanagement/EditAccountantModal';
import { useAddAccountant, useAllAccountantsBySchool, useDeleteAccountant, useUpdateAccountant } from '../../../hooks/useAccountant';
import type { Accountant } from '../../../types/accountant-dashboard.types';

const AccountantManagement: React.FC = () => {
    const { data: accountantBySchool = [], isLoading: loading } = useAllAccountantsBySchool();
    const addAccountantMutation = useAddAccountant();
    const updateAccountantMutation = useUpdateAccountant();
    const deleteAccountantMutation = useDeleteAccountant();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAccountant, setSelectedAccountant] = useState<Accountant | null>(null);


    const handleAddAccountant = async (accountantData: any) => {
        addAccountantMutation.mutate(accountantData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditAccountant = (accountant: Accountant) => {
        setIsEditModalOpen(true);
        setSelectedAccountant(accountant)
    }

    const handleUpdateAccountant = async (id: string, accountantData: any) => {
        updateAccountantMutation.mutate({ id, accountantData }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteAccountant = async (id: any) => {
        deleteAccountantMutation.mutate(id);
    }

    return (
        <div className="flex h-full bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <AdminDashboardHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <AccountantManagementHeader
                            onAddAccountant={() => setIsModalOpen(true)}
                        />
                        <AccountantManagementContent
                            accountantBySchool={accountantBySchool}
                            onEdit={handleEditAccountant}
                            onRemove={handleDeleteAccountant}
                        />

                        <AddAccountantModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddAccountant}
                            isLoading={loading}
                        />

                        <EditAccountantModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedAccountant(null);
                            }}
                            onSubmit={handleUpdateAccountant}
                            accountant={selectedAccountant}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountantManagement;