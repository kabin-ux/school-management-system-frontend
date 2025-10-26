import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import SupportFilters from '../../../components/SuperAdmin/support/SupportFilters';
import SupportStats from '../../../components/SuperAdmin/support/SupportStats';
import SupportTicketsTable from '../../../components/SuperAdmin/support/SupportTicketsTable';
import { useDeleteSupportTicket, useSupportTickets, useSupportTicketSuperAdminDashboardData } from '../../../hooks/useSupportTickets';

export default function SupportConsole() {
    const [userType, setUserType] = useState('All');
    const [issueType, setIssueType] = useState('All');
    const [priority, setPriority] = useState('All');
    const [status, setStatus] = useState('All');
    const [ticketId, setTicketId] = useState('');
    const navigate = useNavigate();

    const { data: tickets = [] } = useSupportTickets();
    const { data: ticketStats } = useSupportTicketSuperAdminDashboardData();

    const deleteSupportTicketMutation = useDeleteSupportTicket();

    const handleViewTicket = (ticketId: string) => {
        navigate(`/super-admin/support/details/${ticketId}`)
    };

    const handleDeleteSupportTicket = async (supportTicketId: string) => {
        deleteSupportTicketMutation.mutate(supportTicketId);
    }

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
                        userType={userType}
                        issueType={issueType}
                        priority={priority}
                        status={status}
                        ticketId={ticketId}
                        onUserTypeChange={setUserType}
                        onIssueTypeChange={setIssueType}
                        onPriorityChange={setPriority}
                        onStatusChange={setStatus}
                        onTicketIdChange={setTicketId}
                    />

                    {/* Support Tickets Table */}
                    <SupportTicketsTable
                        tickets={tickets}
                        onViewTicket={handleViewTicket}
                        onDeleteTicket={handleDeleteSupportTicket}
                    />
                </div>
            </div>
        </div>

    );
}