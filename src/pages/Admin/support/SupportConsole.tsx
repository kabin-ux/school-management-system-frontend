import React, { useState } from 'react';
import { SupportConsoleHeader } from '../../../components/Admin/support/SupportConsoleHeader';
import { SupportConsoleStats } from '../../../components/Admin/support/SupportConsoleStats';
import { NewSupportTicket } from '../../../components/Admin/support/NewSupportTicket';
import { RecentTickets } from '../../../components/Admin/support/RecentTickets';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useCreateSupportTicket, useDeleteSupportTicket, useSupportTicketAdminDashboardData, useSupportTicketsBySchool, useUpdateSupportTicket } from '../../../hooks/useSupportTickets';
import type { SupportTicket } from '../../../types/support.types';
import { EditSupportTicketModal } from '../../../components/Admin/support/EditSupportTicketModal';

const AdminSupportConsole: React.FC = () => {
    const { data: tickets = [], isLoading: loading } = useSupportTicketsBySchool('');
    const { data: ticketStats } = useSupportTicketAdminDashboardData();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedSupportTicket, setSelectedSupportTicket] = useState<SupportTicket | null>(null);

    const createSupportTicketMutation = useCreateSupportTicket();
    const updateSupportTicketMutation = useUpdateSupportTicket();
    const deleteSupportTicketMutation = useDeleteSupportTicket();

    const handleAddSupportTicket = async (supportTicketData: any) => {
        createSupportTicketMutation.mutate(supportTicketData)
    }

    const handleEditSupportTicket = (ticket: SupportTicket) => {
        setIsEditModalOpen(true);
        setSelectedSupportTicket(ticket)
    }

    const handleUpdateSupportTicket = async (id: string, updates: any) => {
        updateSupportTicketMutation.mutate({ id, updates }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteSupportTicket = async (id: string) => {
        deleteSupportTicketMutation.mutate(id, {
            onSuccess: () => setIsEditModalOpen(false)
        })
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
                        <SupportConsoleHeader />
                        <SupportConsoleStats
                            ticketStats={ticketStats ?? { totalSupportTickets: 0, totalOpenTickets: 0, totalResolvedTickets: 0, totalClosedTickets: 0, totalInProgressTickets: 0 }}
                        />
                        <NewSupportTicket
                            onAdd={handleAddSupportTicket}
                            isLoading={loading}
                        />
                        <RecentTickets
                            tickets={tickets}
                            onEdit={handleEditSupportTicket}
                            onDelete={handleDeleteSupportTicket}
                        />

                        <EditSupportTicketModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedSupportTicket(null);
                            }}
                            onSubmit={handleUpdateSupportTicket}
                            ticket={selectedSupportTicket}
                            isLoading={loading}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminSupportConsole;