import React from 'react';
import { useNavigate } from 'react-router-dom';

export const RecentTickets: React.FC = () => {
  const navigate = useNavigate();
  const tickets = [
    { id: '1', ticketId: 'TIC-001', submittedBy: 'Evergreen Academy', assignedTo: 'Sarah Johnson', issueType: 'Admin', status: 'Other', priority: 'High', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '2', ticketId: 'TIC-002', submittedBy: 'Greenwood High', assignedTo: 'Michael Chen', issueType: 'Accountant', status: 'Low', priority: 'Medium', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '3', ticketId: 'TIC-003', submittedBy: 'Lakeside School', assignedTo: 'Emily Rodriguez', issueType: 'Admin', status: 'Website', priority: 'High', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '4', ticketId: 'TIC-004', submittedBy: 'Hillside Prep', assignedTo: 'David Thompson', issueType: 'Admin', status: 'Website', priority: 'Medium', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '5', ticketId: 'TIC-005', submittedBy: 'Riverside Academy', assignedTo: 'Lisa Anderson', issueType: 'Accountant', status: 'Other', priority: 'Low', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '6', ticketId: 'TIC-006', submittedBy: 'Maplewood Institute', assignedTo: 'Robert Kim', issueType: 'Admin', status: 'Website', priority: 'Medium', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '7', ticketId: 'TIC-007', submittedBy: 'Cedar Valley School', assignedTo: 'Jennifer Walsh', issueType: 'Accountant', status: 'Website', priority: 'Medium', lastModified: '2024-01-15 14:30', action: 'View and edit' },
    { id: '8', ticketId: 'TIC-008', submittedBy: 'Pinecrest High', assignedTo: 'Mark Garcia', issueType: 'Admin', status: 'Website', priority: 'Medium', lastModified: '2024-01-15 14:30', action: 'View and edit' },
  ];


  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Other': return 'bg-blue-100 text-blue-800';
      case 'Low': return 'bg-red-100 text-red-800';
      case 'Website': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleViewTicket = (ticketId: string) => {
    console.log('Viewing ticket:', ticketId);

    navigate(`/admin/support/details/${ticketId}`)
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent tickets</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Submitted by</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Date</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Issue Type</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Priority</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Status</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Latest Modified</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleViewTicket(ticket.id)}
              >
                <td className="p-4 text-gray-900">{ticket.submittedBy}</td>
                <td className="p-4 text-gray-900">{ticket.assignedTo}</td>
                <td className="p-4 text-gray-900">{ticket.issueType}</td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ticket.priority)}`}>
                    {ticket.priority}
                  </span>
                </td>
                <td className="p-4">
                  <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ticket.status)}`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="p-4 text-gray-900">{ticket.lastModified}</td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    {ticket.action}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-gray-600">Previous</span>
        <div className="flex space-x-1">
          <button className="w-8 h-8 text-sm bg-blue-600 text-white rounded">1</button>
          <button className="w-8 h-8 text-sm border border-gray-200 rounded text-gray-700 hover:bg-gray-100">2</button>
        </div>
        <span className="text-sm text-gray-600">Next</span>
        <span className="text-sm text-gray-600">Page 1 of 5</span>
      </div>
    </div>
  );
};