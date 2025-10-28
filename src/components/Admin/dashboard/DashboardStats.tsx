import { GraduationCap, Users, BookOpen, Calendar, Headphones } from 'lucide-react';
import type { SchoolAdminDashboard } from '../../../hooks/useDashboard';
import { StatsCard } from './StatsCard';

interface DashboardStatsProps {
  data: SchoolAdminDashboard
}

export default function DashboardStats({ data }: DashboardStatsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatsCard
        title="Total Students"
        value={data.totalStudents}
        icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatsCard
        title="Total Teachers"
        value={data.totalTeachers}
        icon={<Users className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatsCard
        title="Total Parents"
        value={data.totalParents}
        icon={<Users className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatsCard
        title="Active Classes"
        value={data.totalClasses}
        icon={<BookOpen className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
      <StatsCard
        title="Total Accountants"
        value={data.totalAccountant}
        icon={<Calendar className="w-6 h-6 text-pink-600" />}
        bgColor="bg-pink-50"
      />
      <StatsCard
        title="Open Support Tickets"
        value={data.totalSupportTicket}
        icon={<Headphones className="w-6 h-6 text-indigo-600" />}
        bgColor="bg-indigo-50"
      />
    </div>
  );
}