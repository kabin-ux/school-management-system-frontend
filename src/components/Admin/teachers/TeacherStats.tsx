import React from 'react';
import { Users, UserCheck, UserPlus } from 'lucide-react';
import type { TeacherDashboardData } from '../../../hooks/useTeachers';
import { StatsCard } from '../dashboard/StatsCard';

interface TeacherStatsProps {
  teacherDashboardData: TeacherDashboardData
}

export const TeacherStats: React.FC<TeacherStatsProps> = ({ teacherDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Teachers"
        value={teacherDashboardData.totalTeachers}
        icon={<Users className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatsCard
        title="Active Teachers"
        value={teacherDashboardData.totalActiveTeachers}
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatsCard
        title="New Teachers"
        value={teacherDashboardData.totalTeacherRegisterOnThisMonth}
        icon={<UserPlus className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}