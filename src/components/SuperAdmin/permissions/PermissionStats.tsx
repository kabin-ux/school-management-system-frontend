import React from 'react';
import { Building2, Users, UserCheck } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

function StatCard({ title, value, change, icon, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-500 mt-1">{change}</p>
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PermissionStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Partnered School"
        value="149"
        change="+28 this month"
        icon={<Building2 className="w-6 h-6" />}
        bgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Total Admins (Max 2 per school)"
        value="290"
        change="+56 this month"
        icon={<Users className="w-6 h-6" />}
        bgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
      <StatCard
        title="Total Accountants (Max 2 per school)"
        value="293"
        change="+54 this month"
        icon={<UserCheck className="w-6 h-6" />}
        bgColor="bg-green-50"
        iconColor="text-green-600"
      />
    </div>
  );
}