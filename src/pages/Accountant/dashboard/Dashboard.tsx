import { FileText, GraduationCap, UsersIcon, Book } from 'lucide-react';
import StatCard from '../../../components/Accountant/dashboard/StatsCard';
import FeeChart from '../../../components/Accountant/dashboard/FeeChart';
import QuickActions from '../../../components/Accountant/dashboard/QuickActions';
import TransactionTable from '../../../components/Accountant/dashboard/TransactionTable';
import { Sidebar } from '../../../components/Accountant/layout/Sidebar';
import { AccountantDashboardHeader } from '../../../components/Accountant/layout/DashboardHeader';
import { useAccountantDashboard } from '../../../hooks/useDashboard';

export default function AccountantDashboard() {
    const { data: accountantDashboard = null } = useAccountantDashboard();

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar /> {/* Make sure Sidebar has mobile slide-in with backdrop */}

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
                {/* Header */}
                <AccountantDashboardHeader />

                {/* Scrollable Content */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    <div className="mb-6 md:mb-8">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Accountant Dashboard</h1>
                        <p className="text-gray-600 mt-1 text-sm md:text-base">
                            Welcome back! Here's what's happening with your education platform today
                        </p>
                    </div>

                    {/* Stats Cards */}
                    {accountantDashboard && (
                        <div className="mb-6 md:mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
                                <StatCard
                                    title="Total Students"
                                    value={accountantDashboard.totalStudents}
                                    change="10.5%"
                                    changeType="positive"
                                    icon={GraduationCap}
                                    iconColor="text-green-600"
                                    iconBg="bg-green-100"
                                />
                                <StatCard
                                    title="Total Teachers"
                                    value={accountantDashboard.totalTeachers}
                                    change="6"
                                    changeType="positive"
                                    icon={UsersIcon}
                                    iconColor="text-blue-600"
                                    iconBg="bg-blue-100"
                                />
                                <StatCard
                                    title="Total Classes"
                                    value={accountantDashboard.totalclass}
                                    change="6"
                                    changeType="positive"
                                    icon={Book}
                                    iconColor="text-blue-600"
                                    iconBg="bg-blue-100"
                                />
                                <StatCard
                                    title="Today's Transactions"
                                    value={accountantDashboard.todayTransaction}
                                    change="3"
                                    changeType="positive"
                                    icon={FileText}
                                    iconColor="text-orange-600"
                                    iconBg="bg-orange-100"
                                />
                            </div>

                            {/* Payment Summary Table */}
                            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md overflow-x-auto">
                                <h2 className="text-lg font-semibold text-gray-900 mb-2">Payment Summary</h2>
                                <table className="min-w-full cursor-pointer">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-4 md:px-6 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th className="px-4 md:px-6 py-2 text-left text-xs md:text-sm font-medium text-gray-500 uppercase tracking-wider">
                                                Total Amount
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {accountantDashboard.totalPayment?.map((p: any, index: number) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-4 md:px-6 py-2 whitespace-nowrap text-sm md:text-base text-gray-900">
                                                    {p.status}
                                                </td>
                                                <td className="px-4 md:px-6 py-2 whitespace-nowrap text-sm md:text-base text-gray-900">
                                                    Rs. {p.totalAmount}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {/* Chart and Quick Actions */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 mb-6">
                        <div className="lg:col-span-2">
                            <FeeChart />
                        </div>
                        <div>
                            <QuickActions />
                        </div>
                    </div>

                    {/* Recent Transactions */}
                    <div className="overflow-x-auto">
                        <TransactionTable />
                    </div>
                </main>
            </div>
        </div>

    );
}