import React from 'react';
import { Ticket, Clock, CheckCircle, AlertTriangle, BookOpenTextIcon } from 'lucide-react';
import type { SupportTicketDashboardData } from '../../../hooks/useSupportTickets';

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
}

interface SupportStatsProps {
  ticketStats: SupportTicketDashboardData
}

function StatCard({ title, value, icon, bgColor, iconColor }: StatCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className="text-sm text-gray-600 mt-1">{title}</p>
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

export const SupportStats: React.FC<SupportStatsProps> = ({ ticketStats }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatCard
        title="Total Tickets"
        value={ticketStats.totalSupportTickets.toString()}
        icon={<Ticket className="w-6 h-6" />}
        bgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <StatCard
        title="In Progress"
        value={ticketStats.totalInProgressTickets.toString()}
        icon={<Clock className="w-6 h-6" />}
        bgColor="bg-yellow-50"
        iconColor="text-yellow-600"
      />
      <StatCard
        title="Open"
        value={ticketStats.totalOpenTickets.toString()}
        icon={<BookOpenTextIcon className="w-6 h-6" />}
        bgColor="bg-pink-50"
        iconColor="text-pink-600"
      />
      <StatCard
        title="Resolved"
        value={ticketStats.totalResolvedTickets.toString()}
        icon={<CheckCircle className="w-6 h-6" />}
        bgColor="bg-green-50"
        iconColor="text-green-600"
      />
    </div>
  );
}