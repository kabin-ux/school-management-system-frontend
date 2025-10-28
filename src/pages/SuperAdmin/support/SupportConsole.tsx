import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import { SupportFilters } from '../../../components/SuperAdmin/support/SupportFilters';
import { SupportStats } from '../../../components/SuperAdmin/support/SupportStats';
import SupportTicketsTable from '../../../components/SuperAdmin/support/SupportTicketsTable';
import { useDeleteSupportTicket, useSupportTickets, useSupportTicketSuperAdminDashboardData } from '../../../hooks/useSupportTickets';
import type { SupportTicket } from '../../../types/support.types';

export interface FilterValues {
    type: string;
    status: string;
    search: string;
}

export default function SupportConsole() {
    const [filters, setFilters] = useState<FilterValues>({
        type: '',
        status: '',
        search: ''
    });
    const navigate = useNavigate();

    const { data: tickets = [] } = useSupportTickets();
    const { data: ticketStats = { totalClosedTickets: 0, totalInProgressTickets: 0, totalOpenTickets: 0, totalSupportTickets: 0, totalResolvedTickets: 0 } } = useSupportTicketSuperAdminDashboardData();

    const deleteSupportTicketMutation = useDeleteSupportTicket();

    const handleViewTicket = (ticketId: string) => {
        navigate(`/super-admin/support/details/${ticketId}`)
    };

    const handleDeleteSupportTicket = async (supportTicketId: string) => {
        deleteSupportTicketMutation.mutate(supportTicketId);
    }

    // Filtered students based on current filters
    const filteredSupportTickets = useMemo(() => {
        return tickets.filter((ticket: SupportTicket) => {
            const fullName = `${ticket?.id || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesType = !filters.type || ticket.type === filters.type;
            const matchesStatus = !filters.status || ticket.status === filters.status;

            return matchesSearch && matchesType && matchesStatus;
        });
    }, [tickets, filters]);

    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />

                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Support Console</h1>
                            <p className="text-gray-600 mt-1">View and edit all the tickets received from the users</p>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <SupportStats
                        ticketStats={ticketStats}
                    />

                    {/* Filters */}
                    <SupportFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                    />

                    {/* Support Tickets Table */}
                    <SupportTicketsTable
                        tickets={filteredSupportTickets}
                        onViewTicket={handleViewTicket}
                        onDeleteTicket={handleDeleteSupportTicket}
                    />
                </div>
            </div>
        </div>

    );
}