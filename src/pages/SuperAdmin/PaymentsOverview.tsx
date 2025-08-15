import { useNavigate } from "react-router-dom";
import FeeCollectionChart from "../../components/SuperAdmin/payments/FeeCollectionChart";
import PaymentInsights from "../../components/SuperAdmin/payments/PaymentInsights";
import PaymentStats from "../../components/SuperAdmin/payments/PaymentStats";
import { DashboardHeader } from "../../components/SuperAdmin/layout/DashboardHeader";
import { Sidebar } from "../../components/SuperAdmin/layout/Sidebar";


export default function PaymentsOverview() {
    const navigate = useNavigate();

    const handleViewSchoolPayments = () => {
        console.log("view")
        navigate(`/super-admin/payments/schools`)

    };
    return (
        <div className="flex h-screen bg-gray-50">
            <Sidebar />
            <div className="flex-1 overflow-auto">
                <DashboardHeader />
                <div className="flex-1 p-8">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Payments Overview</h1>
                            <p className="text-gray-600 mt-2">Monitor revenue, dues, and payment trends across all schools</p>
                        </div>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                            onClick={handleViewSchoolPayments}>
                            📋 View Detailed School Payment
                        </button>
                    </div>

                    {/* Stats Cards */}
                    <PaymentStats />

                    {/* Fee Collection Chart */}
                    <FeeCollectionChart />

                    {/* Payment Insights */}
                    <PaymentInsights />
                </div>
            </div>
        </div>
    );
}