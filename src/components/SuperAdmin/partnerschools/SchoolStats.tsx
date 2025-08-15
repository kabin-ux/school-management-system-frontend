import React from 'react';
import { Users, GraduationCap, UserCheck, TrendingUp, Calendar, BarChart3 } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  iconBg: string;
}

function StatCard({ title, value, change, changeType, icon, iconBg }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconBg}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

interface ProgressCardProps {
  title: string;
  value: string;
  percentage: number;
  change: string;
  changeType: 'positive' | 'negative';
  icon: React.ReactNode;
  iconBg: string;
}

function ProgressCard({ title, value, percentage, change, changeType, icon, iconBg }: ProgressCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 rounded-lg ${iconBg}`}>
          {icon}
        </div>
        <span className={`text-sm font-medium ${
          changeType === 'positive' ? 'text-green-600' : 'text-red-600'
        }`}>
          {change}
        </span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900 mb-3">{value}</p>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className="bg-blue-600 h-2 rounded-full" 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

export default function SchoolStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      {/* Top Row */}
      <StatCard
        title="Total Students"
        value="1,247"
        change="+12%"
        changeType="positive"
        icon={<GraduationCap className="w-5 h-5 text-blue-600" />}
        iconBg="bg-blue-50"
      />
      <StatCard
        title="Total Teacher"
        value="78"
        change="+3.2%"
        changeType="positive"
        icon={<Users className="w-5 h-5 text-green-600" />}
        iconBg="bg-green-50"
      />
      <StatCard
        title="Total Parents"
        value="892"
        change="+8%"
        changeType="positive"
        icon={<UserCheck className="w-5 h-5 text-purple-600" />}
        iconBg="bg-purple-50"
      />
      
      {/* Bottom Row */}
      <ProgressCard
        title="Daily Usage"
        value="87%"
        percentage={87}
        change="+18%"
        changeType="positive"
        icon={<TrendingUp className="w-5 h-5 text-blue-600" />}
        iconBg="bg-blue-50"
      />
      <ProgressCard
        title="Avg Attendance"
        value="94.5"
        percentage={94.5}
        change="+8%"
        changeType="positive"
        icon={<Calendar className="w-5 h-5 text-green-600" />}
        iconBg="bg-green-50"
      />
      <ProgressCard
        title="Exam Average"
        value="78.2%"
        percentage={78.2}
        change="-12%"
        changeType="negative"
        icon={<BarChart3 className="w-5 h-5 text-orange-600" />}
        iconBg="bg-orange-50"
      />
    </div>
  );
}