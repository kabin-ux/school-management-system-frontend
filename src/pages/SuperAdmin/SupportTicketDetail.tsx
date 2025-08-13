import { useNavigate } from 'react-router-dom';
import TicketDetail from '../../components/SuperAdmin/support/TicketDetail';
import { Sidebar } from '../../components/SuperAdmin/Sidebar';
import { DashboardHeader } from '../../components/SuperAdmin/DashboardHeadert';

export default function SupportTicketDetailPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        console.log('Going back to support console');
        navigate(`/super-admin/support`)

    };

    return (
         <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <DashboardHeader />
        <div className="flex-1 p-6 overflow-y-auto">
                    <TicketDetail onBack={handleBack} />
                </div>
            </div>
        </div>
    );
}