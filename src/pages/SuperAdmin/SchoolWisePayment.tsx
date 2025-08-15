import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../components/SuperAdmin/layout/DashboardHeader";
import SchoolPaymentTable from "../../components/SuperAdmin/payments/SchoolPaymentTable";
import { Sidebar } from "../../components/SuperAdmin/layout/Sidebar";

interface SchoolPaymentsProps {
    onViewSchool?: (schoolCode: string) => void;
}

export default function SchoolPayments({ onViewSchool }: SchoolPaymentsProps) {
const navigate = useNavigate();

    const handleViewSchoolPaymentDetails = () => {
        navigate(`/super-admin/payments/schools/details/`)

    };
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />
                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">School wise payment</h1>
                            <p className="text-gray-600 mt-2 mb-4">List of all partnered schools and click to view detailed payment information.</p>
                        </div>
                    </div>

                    {/* School Payment Table */}
                    <SchoolPaymentTable onViewSchool={handleViewSchoolPaymentDetails} />
                </div>
            </div>
        </div>
    );
}