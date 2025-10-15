import { TrendingDown, DollarSign, Calendar, FileText } from 'lucide-react';
import StatCard from '../../../components/Accountant/dashboard/StatsCard';
import FeeChart from '../../../components/Accountant/dashboard/FeeChart';
import QuickActions from '../../../components/Accountant/dashboard/QuickActions';
import TransactionTable from '../../../components/Accountant/dashboard/TransactionTable';
import { Sidebar } from '../../../components/Accountant/layout/Sidebar';
import { AccountantDashboardHeader } from '../../../components/Accountant/layout/DashboardHeader';
import { useAccountantDashboard } from '../../../hooks/useDashboard';

export default function AccountantDashboard() {
    const {data: accountantDashboard} = useAccountantDashboard();

    console.log(accountantDashboard)

    return (
        <div className="flex h-full bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <AccountantDashboardHeader />
                {/* Scrollable Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Accountant Dashboard</h1>
                        <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your education platform today</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Fees Collected"
                            value="$45,280"
                            change="10.5%"
                            changeType="positive"
                            icon={DollarSign}
                            iconColor="text-green-600"
                            iconBg="bg-green-100"
                        />
                        <StatCard
                            title="Pending Payments"
                            value="$8,450"
                            change="4.2%"
                            changeType="negative"
                            icon={TrendingDown}
                            iconColor="text-red-600"
                            iconBg="bg-red-100"
                        />
                        <StatCard
                            title="Upcoming Due Dates"
                            value="24"
                            change="6"
                            changeType="positive"
                            icon={Calendar}
                            iconColor="text-blue-600"
                            iconBg="bg-blue-100"
                        />
                        <StatCard
                            title="Today's Transactions"
                            value="16"
                            change="3"
                            changeType="positive"
                            icon={FileText}
                            iconColor="text-orange-600"
                            iconBg="bg-orange-100"
                        />
                    </div>

                    {/* Chart and Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        <div className="lg:col-span-2">
                            <FeeChart />
                        </div>
                        <div>
                            <QuickActions />
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <TransactionTable />
                </main>
            </div>
        </div>
    );
}