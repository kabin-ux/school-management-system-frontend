import React from 'react';
import { Users, UserCheck, UserPlus } from 'lucide-react';
import type { TeacherDashboardData } from '../../../hooks/useTeachers';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  bgColor: string;
}

interface TeacherStatsProps {
  teacherDashboardData: TeacherDashboardData
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

export const TeacherStats: React.FC<TeacherStatsProps> = ({ teacherDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Teachers"
        value={teacherDashboardData.totalTeachers.toString()}
        change="+12 this month"
        changeType="positive"
        icon={<Users className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Active Teachers"
        value={teacherDashboardData.totalActiveTeachers.toString()}
        change="96%"
        changeType="positive"
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="New Teachers"
        value={teacherDashboardData.totalTeacherRegisterOnThisMonth.toString()}
        change="This month"
        changeType="positive"
        icon={<UserPlus className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}