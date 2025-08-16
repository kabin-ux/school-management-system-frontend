import React from 'react';
import { GraduationCap, Users, BookOpen, Calendar, Headphones } from 'lucide-react';

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

export default function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <StatCard
        title="Total Students"
        value="45,231"
        change="+240 this Year"
        changeType="positive"
        icon={<GraduationCap className="w-6 h-6 text-blue-600" />}
        bgColor="bg-blue-50"
      />
      <StatCard
        title="Total Teacher"
        value="89"
        change="98%"
        changeType="positive"
        icon={<Users className="w-6 h-6 text-green-600" />}
        bgColor="bg-green-50"
      />
      <StatCard
        title="Total Teacher"
        value="89"
        change="Active teaching staff"
        changeType="positive"
        icon={<Users className="w-6 h-6 text-purple-600" />}
        bgColor="bg-purple-50"
      />
      <StatCard
        title="Active Classes"
        value="24"
        change=""
        changeType="positive"
        icon={<BookOpen className="w-6 h-6 text-orange-600" />}
        bgColor="bg-orange-50"
      />
      <StatCard
        title="Total Teacher"
        value="89"
        change=""
        changeType="positive"
        icon={<Calendar className="w-6 h-6 text-pink-600" />}
        bgColor="bg-pink-50"
      />
      <StatCard
        title="Open Support Tickets"
        value="89"
        change=""
        changeType="positive"
        icon={<Headphones className="w-6 h-6 text-indigo-600" />}
        bgColor="bg-indigo-50"
      />
    </div>
  );
}