import React from 'react';
import { GraduationCap, UserCheck } from 'lucide-react';
import type { StudentDashboardData } from '../../../hooks/useStudents';
import { StatsCard } from '../dashboard/StatsCard';

interface StudentStatsProps {
  studentDashboardData: StudentDashboardData
}

export const StudentStats: React.FC<StudentStatsProps> = ({ studentDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <StatsCard
        title="Total Students"
        value={studentDashboardData.totalStudents}
        icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatsCard
        title="Students Registerd This Month"
        value={studentDashboardData.totalStudentRegisterOnThisMonth}
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
    </div>
  );
}