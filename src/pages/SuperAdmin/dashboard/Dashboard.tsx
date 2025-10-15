import { DashboardHeader } from "../../../components/SuperAdmin/layout/DashboardHeader";
import { Sidebar } from "../../../components/SuperAdmin/layout/Sidebar";
import { StatsCard } from "../../../components/SuperAdmin/dashboard/StatsCard";
import { FeesCollected } from "../../../components/SuperAdmin/dashboard/FeesCollected";
import { RecentNotifications } from "../../../components/SuperAdmin/dashboard/RecentNotifications";
import SupportTickets from "../../../components/SuperAdmin/partnerschools/SupportTickets";
import { FeeCollectionTrend } from "../../../components/SuperAdmin/dashboard/FeeCollectionTrend";
import { QuickActions } from "../../../components/SuperAdmin/dashboard/QuickActions";
import { useSuperAdminDashboard } from "../../../hooks/useDashboard";
import { GraduationCap, School, Users, UsersIcon } from "lucide-react";


function SuperAdminDashboard() {
  const { data: superAdminDashboard } = useSuperAdminDashboard();

  console.log(superAdminDashboard)
  return (
    <div className="flex h-screen gray-50">
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
            <StatsCard
              title="Total Schools"
              value={superAdminDashboard?.totalSchools ? superAdminDashboard.totalSchools.toString() : ''}
              change="+240 this Year"
              icon={<School className="w-6 h-6 text-blue-600" />}
              color="blue"
            />
            <StatsCard
              title="Total Students"
              value={superAdminDashboard?.totalStudents ? superAdminDashboard?.totalStudents.toString() : ''}
              change="+240 this Year"
              icon={<GraduationCap className="w-6 h-6 text-green-600" />}
              color="green"
            />
            <StatsCard
              title="Total Teachers"
              value={superAdminDashboard?.totalTeachers ? superAdminDashboard?.totalTeachers.toString() : ''}
              change="98%"
              icon={<Users className="w-6 h-6 text-purple-600" />}
              color="purple"
            />
            <StatsCard
              title="Total Parents"
              value={superAdminDashboard?.totalParents ? superAdminDashboard.totalParents.toString() : ''}
              change="Active teaching staff"
              icon={<UsersIcon className="w-6 h-6 text-orange-600" />}
              color="orange"
            />
            <StatsCard
              title="Total Accountants"
              value={superAdminDashboard?.totalAccountants ? superAdminDashboard.totalAccountants.toString() : ''}
              change="+240 this Year"
              icon={<UsersIcon className="w-6 h-6 text-pink-600" />}
              color="pink"
            />
            {/* <StatsCard
              title="Open Support Tickets"
              value={data?.totalSupportTicket || 0}
              change=""
              icon={<Headphones className="w-6 h-6 text-indigo-600" />}
              color="indigo"
            /> */}
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