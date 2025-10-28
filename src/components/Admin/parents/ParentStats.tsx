import React from 'react';
import { Users, Link, UserPlus } from 'lucide-react';
import type { ParentDashboardData } from '../../../hooks/useParents';
import { StatsCard } from '../dashboard/StatsCard';

interface ParentStatsProps {
  parentDashboardData: ParentDashboardData
}

export const ParentStats: React.FC<ParentStatsProps> = ({ parentDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Parents"
        value={parentDashboardData.totalParents}
        icon={<Users className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatsCard
        title="Linked Students Count"
        value={parentDashboardData.linkedStudents}
        icon={<Link className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatsCard
        title="Parents Registered This Month"
        value={parentDashboardData.totalParentRegisterOnThisMonth}
        icon={<UserPlus className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}