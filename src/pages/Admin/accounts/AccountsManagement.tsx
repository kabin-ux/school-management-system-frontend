import React, { useEffect, useState } from 'react';
import { AccountantManagementHeader } from '../../../components/Admin/accountmanagement/AccountManagementHeader';
import { AccountantManagementContent } from '../../../components/Admin/accountmanagement/AccountMangementContent';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addAccountantBySchool, deleteAccountant, getAllAccountantBySchool, updateAccountant, type Accountant } from '../../../features/accountantSlice';
import toast from 'react-hot-toast';
import AddAccountantModal from '../../../components/Admin/accountmanagement/AddAccountantModal';
import EditAccountantModal from '../../../components/Admin/accountmanagement/EditAccountantModal';

const AccountantManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const { accountantBySchool } = useAppSelector((state) => state.accountant)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedAccountant, setSelectedAccountant] = useState<Accountant | null>(null);

    useEffect(() => {
        dispatch(getAllAccountantBySchool())
    }, [dispatch])

    const handleAddAccountant = async (accountantData: any) => {
        try {
            console.log(accountantData)
            const res = await dispatch(addAccountantBySchool(accountantData))
            if (addAccountantBySchool.fulfilled.match(res)) {
                toast.success('Accountant added successfully')
            } else {
                toast.error('Error adding accountant')
            }
        } catch (error) {
            toast.error('Error adding accountant')
            console.error('Error adding accountant', error)
        }
    }

    const handleEditAccountant = (accountant: Accountant) => {
        setIsEditModalOpen(true);
        setSelectedAccountant(accountant)
    }

    const handleUpdateAccountant = async (accountantData: any) => {
        try {
            const res = await dispatch(updateAccountant(accountantData))
            if (updateAccountant.fulfilled.match(res)) {
                toast.success('Accountant updated successfully')
            } else {
                toast.error('Error adding accountant')
            }
        } catch (error) {
            toast.error('Error updating accountant')
            console.error('Error updating accountant', error)
        }
    }

    const handleDeleteAccountant = (id: any) => {
        try {
            dispatch(deleteAccountant(id))
            toast.success('Accountant removed successfully')
        } catch (error) {
            toast.error('Error removing accountant')
            console.error('Error removing accountant', error)
        }
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
                            isLoading={false}
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