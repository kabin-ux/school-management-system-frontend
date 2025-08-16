import React from 'react';
import { Users, UserCheck, Link, UserPlus } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  bgColor: string;
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
      <p className={`text-sm font-medium ${
        changeType === 'positive' ? 'text-green-600' : 'text-red-600'
      }`}>
        {change}
      </p>
    </div>
  );
}

export default function ParentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Parents"
        value="324"
        change="+12 this month"
        changeType="positive"
        icon={<Users className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Active Parents"
        value="298"
        change="90%"
        changeType="positive"
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Linked Students Count"
        value="456"
        change="-2.5%"
        changeType="negative"
        icon={<Link className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatCard
        title="Parents Registered This Month"
        value="18"
        change="This month"
        changeType="positive"
        icon={<UserPlus className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}