import React from 'react';
import { Users, UserCheck, UserMinus } from 'lucide-react';
import type { TransportationDashboardData } from '../../../hooks/useTransportation';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  bgColor: string;
}

interface TransportationStatsProps {
  transportationDashboardData: TransportationDashboardData
}

function StatCard({ title, value, change, changeType, icon, bgColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${bgColor}`}>
          {icon}
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-3xl font-bold text-gray-900 mb-2">{value}</p>
      <p className={`text-sm font-medium ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
        {change}
      </p>
    </div>
  );
}

export const TransportationStats: React.FC<TransportationStatsProps> = ({ transportationDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Buses"
        value={transportationDashboardData.totalVehicles.toString()}
        change="+12 this month"
        changeType="positive"
        icon={<Users className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Active Drivers"
        value={transportationDashboardData.totalDrivers.toString()}
        change="96%"
        changeType="positive"
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Total Routes"
        value={transportationDashboardData.totalRoutes.toString()}
        change="-2.5%"
        changeType="negative"
        icon={<UserMinus className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
    </div>
  );
}