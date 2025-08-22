import React from 'react';
import type { SupportTicket } from '../../../types/super-admin-dashboard.types';

const supportTickets: SupportTicket[] = [
  {
    id: 'TIC-001',
    school: 'Springfield High School',
    issue: 'Payment gateway not working for fee collection',
    status: 'In Progress',
    priority: 'High',
    created: '2 hours ago'
  },
  {
    id: 'TIC-002', 
    school: 'Oakwood Academy',
    issue: 'Unable to generate student reports',
    status: 'Open',
    priority: 'Medium',
    created: '4 hours ago'
  },
  {
    id: 'TIC-003',
    school: 'Riverside School',
    issue: 'SMS notifications not being sent to parents',
    status: 'In Progress',
    priority: 'High', 
    created: '6 hours ago'
  },
  {
    id: 'TIC-004',
    school: 'GreenPark College',
    issue: 'Login issues for teachers portal',
    status: 'Open',
    priority: 'Medium',
    created: '4 hours ago'
  }
];

export const SupportTickets: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1">Support Tickets</h2>
          <p className="text-sm text-gray-600">Open Support requests</p>
        </div>
        <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">TICKET ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">SCHOOL</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">ISSUE</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">STATUS</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">PRIORITY</th>
              <th className="text-left py-3 px-4 font-medium text-gray-600 text-sm">CREATED</th>
            </tr>
          </thead>
          <tbody>
            {supportTickets.map((ticket, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-blue-600 font-medium">{ticket.id}</td>
                <td className="py-3 px-4 text-sm text-gray-900">{ticket.school}</td>
                <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{ticket.issue}</td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    ticket.status === 'In Progress' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    ticket.priority === 'High'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-500">{ticket.created}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};