import React from 'react';
import { GraduationCap, UserCheck } from 'lucide-react';
import type { StudentDashboardData } from '../../../hooks/useStudents';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  bgColor: string;
}

interface StudentStatsProps {
  studentDashboardData: StudentDashboardData
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

export const StudentStats: React.FC<StudentStatsProps> = ({ studentDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <StatCard
        title="Total Students"
        value={studentDashboardData.totalStudents.toString()}
        change="+240 this Year"
        changeType="positive"
        icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Students Registerd This Month"
        value={studentDashboardData.totalStudentRegisterOnThisMonth.toString()}
        change="98%"
        changeType="positive"
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
    </div>
  );
}