import AttendanceChart from "../../../components/Admin/dashboard/AttendanceChart";
import AttendancePieChart from "../../../components/Admin/dashboard/AttendancePieChart";
import DashboardStats from "../../../components/Admin/dashboard/DashboardStats";
import QuickActions from "../../../components/Admin/dashboard/QuickAction";
import  { RecentActivitySection } from "../../../components/Admin/dashboard/RecentActivity";
import SystemStatus from "../../../components/Admin/dashboard/SystemStatus";
import { AdminDashboardHeader } from "../../../components/Admin/layout/DashboardHeader";
import { Sidebar } from "../../../components/Admin/layout/Sidebar";
import { useAuthUser } from "../../../hooks/useAuth";
import { useRecentActivity, useSchoolAdminDashboard, useSchoolAdminDashboardLineChart, useSchoolAdminDashboardPieChart } from "../../../hooks/useDashboard";

export default function AdminDashboard() {
  const { data: user } = useAuthUser();
  const { data: schoolAdmin } = useSchoolAdminDashboard();
  const { data: lineChartData = [] } = useSchoolAdminDashboardLineChart();
  const { data: pieChartData } = useSchoolAdminDashboardPieChart();
  const { data: recentActivity = [] } = useRecentActivity();

  return (
    <div className="flex h-full bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <AdminDashboardHeader />

        {/* Scrollable Content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto">
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">Welcome, Admin ({user.name ? user.name : ''})</h1>
              <p className="text-gray-600 mt-1">Monday, August 4, 2025</p>
            </div>

            {/* Stats Cards */}
            <DashboardStats
              data={schoolAdmin}
            />

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <AttendanceChart
                data={lineChartData}
              />
              <AttendancePieChart
                data={pieChartData}
              />
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
              {/* Recent Activity - spans 2 columns */}
              <div className="lg:col-span-2">
                <RecentActivitySection
                  recentActivity={recentActivity}
                />
              </div>

              {/* Sidebar Widgets */}
              {/* <div className="space-y-6">
                <QuickActions />
                <SystemStatus />
              </div> */}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
