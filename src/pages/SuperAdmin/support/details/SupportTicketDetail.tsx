import { useNavigate, useParams } from 'react-router-dom';
import TicketDetail from '../../../../components/SuperAdmin/support/TicketDetail';
import { Sidebar } from '../../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../../components/SuperAdmin/layout/DashboardHeader';
import { useAcceptSupportTicket, useCloseSupportTicket, useResolveSupportTicket, useSupportTicketById } from '../../../../hooks/useSupportTickets';

export default function SupportTicketDetailPage() {
    const navigate = useNavigate();

    const { id } = useParams<{ id: string }>()
    const ticketId: string = id ?? "";

    const { data: selectedTicket = null, isLoading: loading } = useSupportTicketById(ticketId);
    const acceptSupportTicketMutation = useAcceptSupportTicket();
    const resolveSupportTicketMutation = useResolveSupportTicket();
    const closeSupportTicketMutation = useCloseSupportTicket();
    
    const handleBack = () => {
        console.log('Going back to support console');
        navigate(`/super-admin/support`)
    };

    const handleAcceptSupportTicket = async () => {
        acceptSupportTicketMutation.mutate(ticketId);
    }

    const handleResolveSupportTicket = async () => {
        resolveSupportTicketMutation.mutate(ticketId);
    }

    const handleCloseSupportTicket = async () => {
        closeSupportTicketMutation.mutate(ticketId);
    }

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 flex flex-col">
                <DashboardHeader />
                <div className="flex-1 p-6 overflow-y-auto">
                    <TicketDetail
                        selectedTicket={selectedTicket}
                        onAccept={handleAcceptSupportTicket}
                        onResolve={handleResolveSupportTicket}
                        onClose={handleCloseSupportTicket}
                        onBack={handleBack}
                        isLoading={loading}
                    />
                </div>
            </div>
        </div>
    );
}