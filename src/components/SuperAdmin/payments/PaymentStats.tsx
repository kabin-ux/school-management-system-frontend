import React from 'react';
import { DollarSign, AlertCircle, Building2, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  subtitle?: string;
}

function StatCard({ title, value, change, icon, bgColor, iconColor, subtitle }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg ${bgColor}`}>
          <div className={iconColor}>
            {icon}
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className="text-sm text-green-600 mt-1">{change}</p>
          )}
          {subtitle && (
            <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PaymentStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Revenue Collected"
        value="$284,750"
        change="↑ +12.8%"
        icon={<DollarSign className="w-5 h-5" />}
        bgColor="bg-green-50"
        iconColor="text-green-600"
      />
      <StatCard
        title="Total Pending Dues"
        value="$47,320"
        subtitle="28% overdue"
        icon={<AlertCircle className="w-5 h-5" />}
        bgColor="bg-orange-50"
        iconColor="text-orange-600"
      />
      <StatCard
        title="Paying Schools"
        value="142"
        subtitle="Active: 98, Expired: 32, New: 12"
        icon={<Building2 className="w-5 h-5" />}
        bgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        title="Last Payment Received"
        value="$2,850"
        subtitle="Greenwood Academy - ID: #SCH-2024-0847 - Dec 18, 2024 2:34 PM EST"
        icon={<Clock className="w-5 h-5" />}
        bgColor="bg-purple-50"
        iconColor="text-purple-600"
      />
    </div>
  );
}