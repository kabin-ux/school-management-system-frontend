import React from 'react';
import { Users, UserCheck, UserMinus } from 'lucide-react';
import type { TransportationDashboardData } from '../../../hooks/useTransportation';
import { StatsCard } from '../dashboard/StatsCard';

interface TransportationStatsProps {
  transportationDashboardData: TransportationDashboardData
}

export const TransportationStats: React.FC<TransportationStatsProps> = ({ transportationDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Buses"
        value={transportationDashboardData.totalVehicles}
        icon={<Users className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatsCard
        title="Active Drivers"
        value={transportationDashboardData.totalDrivers}
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatsCard
        title="Total Routes"
        value={transportationDashboardData.totalRoutes}
        icon={<UserMinus className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
    </div>
  );
}