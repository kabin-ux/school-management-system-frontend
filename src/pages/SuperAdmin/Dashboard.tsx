import { DashboardHeader } from "../../components/SuperAdmin/DashboardHeadert";
import { FeeCollectionTrend } from "../../components/SuperAdmin/FeeCollectionTrend";
import { FeesCollected } from "../../components/SuperAdmin/FeesCollected";
import { QuickActions } from "../../components/SuperAdmin/QuickActions";
import { RecentNotifications } from "../../components/SuperAdmin/RecentNotifications";
import { Sidebar } from "../../components/SuperAdmin/Sidebar";
import { StatsCard } from "../../components/SuperAdmin/StatsCard";
import { SupportTickets } from "../../components/SuperAdmin/SupportTickets";
import { statsCards } from "../../data/statsData";


function SuperAdminDashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <DashboardHeader />

        <div className="p-8">

          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Super Admin Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here’s what’s happening with your education platform today.</p>
          </div>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((card, index) => (
              <StatsCard key={index} {...card} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              <FeesCollected />
              <RecentNotifications />
              <SupportTickets />
            </div>

            {/* Right Column */}
            <div className="space-y-8">
              <FeeCollectionTrend />
              <QuickActions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperAdminDashboard;