import React, { useEffect, useState } from 'react';
import { AccountantManagementHeader } from '../../../components/Admin/accountmanagement/AccountManagementHeader';
import { AccountantManagementContent } from '../../../components/Admin/accountmanagement/AccountMangementContent';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addAccountantBySchool, getAllAccountantBySchool } from '../../../features/accountantSlice';
import toast from 'react-hot-toast';
import AddAccountantModal from '../../../components/Admin/accountmanagement/AddAccountantModal';

const AccountantManagement: React.FC = () => {
    const dispatch = useAppDispatch();
    const { accountantBySchool } = useAppSelector((state) => state.accountant)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllAccountantBySchool())
    }, [dispatch])

    const handleAddAccountant = (accountantData: any) => {
        try {
            console.log(accountantData)
            dispatch(addAccountantBySchool(accountantData))
            toast.success('Accountant added successfully')
        } catch (error) {
            console.error('Error adding accountant', error)
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
                        />

                        <AddAccountantModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddAccountant}
                            isLoading={false}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AccountantManagement;