import React from 'react';
import { GraduationCap, UserCheck, UserMinus, UserPlus } from 'lucide-react';

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

export default function StudentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Students"
        value="156"
        change="+240 this Year"
        changeType="positive"
        icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Active Students"
        value="945"
        change="98%"
        changeType="positive"
        icon={<UserCheck className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Students on leave"
        value="16"
        change="-2.5%"
        changeType="negative"
        icon={<UserMinus className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatCard
        title="New Students"
        value="240"
        change="This Year"
        changeType="positive"
        icon={<UserPlus className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
    </div>
  );
}