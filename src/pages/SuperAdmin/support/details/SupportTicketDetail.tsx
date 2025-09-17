import { useNavigate, useParams } from 'react-router-dom';
import TicketDetail from '../../../../components/SuperAdmin/support/TicketDetail';
import { Sidebar } from '../../../../components/SuperAdmin/layout/Sidebar';
import { DashboardHeader } from '../../../../components/SuperAdmin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { useEffect } from 'react';
import { acceptSupportTicket, closeSupportTicket, getSupportTicketById, resolveSupportTicket } from '../../../../features/supportTicketSlice';
import toast from 'react-hot-toast';

export default function SupportTicketDetailPage() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { selectedTicket, loading, loadingClose } = useAppSelector(state => state.supportTicket);

    const { id } = useParams<{ id: string }>()
    const ticketId: string = id ?? "";

    useEffect(() => {
        dispatch(getSupportTicketById(ticketId));
    }, [dispatch])

    const handleBack = () => {
        console.log('Going back to support console');
        navigate(`/super-admin/support`)
    };

    const handleAcceptSupportTicket = async () => {
        try {
            const res = await dispatch(acceptSupportTicket(ticketId));
            if (acceptSupportTicket.fulfilled.match(res)) {
                toast.success('Support Ticket accepted successfully')
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error accepting Support Ticket'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error accepting Support Ticket')
            console.error('Error accepting Support Ticket', error)
        }
    }

    const handleResolveSupportTicket = async () => {
        try {
            const res = await dispatch(resolveSupportTicket(ticketId));
            if (resolveSupportTicket.fulfilled.match(res)) {
                toast.success('Support Ticket resolved successfully')
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error resolving Support Ticket'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error resolving Support Ticket')
            console.error('Error resolving Support Ticket', error)
        }
    }

    const handleCloseSupportTicket = async () => {
        try {
            const res = await dispatch(closeSupportTicket(ticketId));
            if (closeSupportTicket.fulfilled.match(res)) {
                toast.success('Support Ticket closed successfully')
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error closing Support Ticket'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error closing Support Ticket')
            console.error('Error closing Support Ticket', error)
        }
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
                        isLoadingClose={loadingClose}
                    />
                </div>
            </div>
        </div>
    );
}