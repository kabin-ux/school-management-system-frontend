import React, { useEffect } from 'react';
import { SupportConsoleHeader } from '../../../components/Admin/support/SupportConsoleHeader';
import { SupportConsoleStats } from '../../../components/Admin/support/SupportConsoleStats';
import { NewSupportTicket } from '../../../components/Admin/support/NewSupportTicket';
import { RecentTickets } from '../../../components/Admin/support/RecentTickets';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createSupportTicket, getSupportTicketBySchool } from '../../../features/supportTicketSlice';
import toast from 'react-hot-toast';

const AdminSupportConsole: React.FC = () => {
    const dispatch = useAppDispatch();
    const { tickets, loading } = useAppSelector(state => state.supportTicket);

    useEffect(() => {
        dispatch(getSupportTicketBySchool(''));
    }, [dispatch])

    const handleAddSupportTicket = async (supportTicketData: any) => {
        try {
            const res = await dispatch(createSupportTicket(supportTicketData))
            if (createSupportTicket.fulfilled.match(res)) {
                toast.success('Support Ticket added successfully')
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error adding Support Ticket'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error adding Support Ticket')
            console.error('Error adding Support Ticket', error)
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
                        <SupportConsoleHeader />
                        <SupportConsoleStats />
                        <NewSupportTicket
                            onAdd={handleAddSupportTicket}
                            isLoading={loading}
                        />
                        <RecentTickets
                            tickets={tickets}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminSupportConsole;