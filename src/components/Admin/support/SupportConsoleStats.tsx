import React from 'react';
import { Ticket, Clock, CheckCircle, AlertTriangle, BookOpen } from 'lucide-react';
import type { SupportTicketDashboardData } from '../../../hooks/useSupportTickets';

interface SupportConsoleStatsProps {
  ticketStats: SupportTicketDashboardData;
}

export const SupportConsoleStats: React.FC<SupportConsoleStatsProps> = ({ ticketStats }) => {
  console.log("ticekts", ticketStats)
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Tickets</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{ticketStats.totalSupportTickets}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Ticket className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">In Progress</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{ticketStats.totalInProgressTickets}</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Open</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{ticketStats.totalOpenTickets}</p>
          </div>
          <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-pink-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Resolved</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{ticketStats.totalResolvedTickets}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};