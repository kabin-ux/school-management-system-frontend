import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../../components/Admin/layout/AdminDashboardHeader';
import TicketDetail from '../../../../components/Admin/support/details/TicketDetail';

export default function AdminSupportTicketDetailPage() {
    const navigate = useNavigate();

    const handleBack = () => {
        console.log('Going back to support console');
        navigate(`/admin/support`)

    };

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
                        <TicketDetail onBack={handleBack} />
                    </div>
                </main>
            </div>
        </div >
    );
}