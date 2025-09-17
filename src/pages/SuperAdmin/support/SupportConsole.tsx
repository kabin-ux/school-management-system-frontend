import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../components/SuperAdmin/layout/DashboardHeader';
import SupportFilters from '../../../components/SuperAdmin/support/SupportFilters';
import SupportStats from '../../../components/SuperAdmin/support/SupportStats';
import SupportTicketsTable from '../../../components/SuperAdmin/support/SupportTicketsTable';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteSupportTicket, getAllSupportTickets } from '../../../features/supportTicketSlice';
import toast from 'react-hot-toast';

export default function SupportConsole() {
    const [userType, setUserType] = useState('All');
    const [issueType, setIssueType] = useState('All');
    const [priority, setPriority] = useState('All');
    const [status, setStatus] = useState('All');
    const [ticketId, setTicketId] = useState('');
    const navigate = useNavigate();

    const dispatch = useAppDispatch();
    const { tickets } = useAppSelector(state => state.supportTicket);

    useEffect(() => {
        dispatch(getAllSupportTickets());
    }, [dispatch])

    const handleViewTicket = (ticketId: string) => {
        console.log('Viewing ticket:', ticketId);

        navigate(`/super-admin/support/details/${ticketId}`)
    };

    const handleDeleteSupportTicket = async (supportTicketId: string) => {
        try {
            const res = await dispatch(deleteSupportTicket(supportTicketId))
            if (deleteSupportTicket.fulfilled.match(res)) {
                toast.success('Support Ticket deleted successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to delete Support Ticket'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error removing Support Ticket')
            console.error('Error removing Support Ticket', error)
        }
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
                        tickets={tickets}
                        onViewTicket={handleViewTicket}
                        onDeleteTicket={handleDeleteSupportTicket}
                    />
                </div>
            </div>
        </div>

    );
}