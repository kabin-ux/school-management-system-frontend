import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../../../../components/SuperAdmin/layout/Sidebar";
import { DashboardHeader } from "../../../../components/SuperAdmin/layout/DashboardHeader";
import PaymentDetailView from "../../../../components/SuperAdmin/payments/PaymentDetailView";

interface PaymentDetailsProps {
  onBack?: () => void;
}

export default function PaymentDetails({ onBack }: PaymentDetailsProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/super-admin/payments/schools`)
  }
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="flex-1 p-8">
          <div className="flex items-center justify-between mb-4" >
            <div className="flex items-center gap-4">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                onClick={handleBack}>
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Payment Details: Greenwood Academy</h1>
                <p className="text-gray-600 mt-1">Comprehensive payment overview and transaction history</p>
              </div>
            </div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Admin Actions
            </button>
          </div >
          <PaymentDetailView onBack={onBack} />
        </div>
      </div>
    </div>
  );
}