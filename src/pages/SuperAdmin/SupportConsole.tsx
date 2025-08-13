import { useState } from 'react';
import SupportFilters from '../../components/SuperAdmin/support/SupportFilters';
import SupportStats from '../../components/SuperAdmin/support/SupportStats';
import SupportTicketsTable from '../../components/SuperAdmin/support/SupportTicketsTable';
import { Sidebar } from '../../components/SuperAdmin/Sidebar';
import { DashboardHeader } from '../../components/SuperAdmin/DashboardHeadert';
import { useNavigate } from 'react-router-dom';

export default function SupportConsole() {
    const [userType, setUserType] = useState('All');
    const [issueType, setIssueType] = useState('All');
    const [priority, setPriority] = useState('All');
    const [status, setStatus] = useState('All');
    const [ticketId, setTicketId] = useState('');
    const navigate = useNavigate();

    const supportTickets = [
        { id: '1', ticketId: 'TIC-001', school: 'Springfield High School', submittedBy: 'Sarah Johnson', role: 'Admin', issueType: 'Other', priority: 'High' as const, status: 'Open' as const, lastModified: '2024-01-15 14:30' },
        { id: '2', ticketId: 'TIC-002', school: 'Oakwood Academy', submittedBy: 'Michael Chen', role: 'Accountant', issueType: 'App', priority: 'Low' as const, status: 'In Progress' as const, lastModified: '2024-01-15 14:30' },
        { id: '3', ticketId: 'TIC-003', school: 'Riverside School', submittedBy: 'Emily Rodriguez', role: 'Admin', issueType: 'Website', priority: 'High' as const, status: 'Resolved' as const, lastModified: '2024-01-15 14:30' },
        { id: '4', ticketId: 'TIC-004', school: 'Greenfield College', submittedBy: 'David Thompson', role: 'Admin', issueType: 'Website', priority: 'Medium' as const, status: 'Resolved' as const, lastModified: '2024-01-15 14:30' },
        { id: '5', ticketId: 'TIC-001', school: 'Springfield High School', submittedBy: 'Lisa Anderson', role: 'Accountant', issueType: 'Other', priority: 'Low' as const, status: 'Open' as const, lastModified: '2024-01-15 14:30' },
        { id: '6', ticketId: 'TIC-002', school: 'Oakwood Academy', submittedBy: 'Robert Kim', role: 'Admin', issueType: 'App', priority: 'Medium' as const, status: 'Resolved' as const, lastModified: '2024-01-15 14:30' },
        { id: '7', ticketId: 'TIC-003', school: 'Riverside School', submittedBy: 'Jennifer Walsh', role: 'Accountant', issueType: 'Website', priority: 'High' as const, status: 'In Progress' as const, lastModified: '2024-01-15 14:30' },
        { id: '8', ticketId: 'TIC-004', school: 'Greenfield College', submittedBy: 'Mark Davis', role: 'Admin', issueType: 'App', priority: 'High' as const, status: 'Resolved' as const, lastModified: '2024-01-15 14:30' }
    ];

    const handleViewTicket = (ticketId: string) => {
        console.log('Viewing ticket:', ticketId);

        navigate(`/super-admin/support/details/${ticketId}`)
    };

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
                    <SupportStats />

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
                        tickets={supportTickets}
                        onViewTicket={handleViewTicket}
                    />
                </div>
            </div>
        </div>

    );
}