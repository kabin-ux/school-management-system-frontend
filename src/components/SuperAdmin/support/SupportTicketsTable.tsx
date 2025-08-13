

interface SupportTicket {
  id: string;
  ticketId: string;
  school: string;
  submittedBy: string;
  role: string;
  issueType: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Resolved';
  lastModified: string;
}

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
  onViewTicket: (ticketId: string) => void;
}

export default function SupportTicketsTable({ tickets, onViewTicket }: SupportTicketsTableProps) {
  const getPriorityBadge = (priority: string) => {
    const priorityClasses = {
      'High': 'bg-green-100 text-green-800',
      'Medium': 'bg-yellow-100 text-yellow-800',
      'Low': 'bg-red-100 text-red-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityClasses[priority as keyof typeof priorityClasses]}`}>
        {priority}
      </span>
    );
  };

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Open': 'bg-blue-100 text-blue-800',
      'In Progress': 'bg-yellow-100 text-yellow-800',
      'Resolved': 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    );
  };

  const getIssueTypeBadge = (issueType: string) => {
    const issueTypeClasses = {
      'Payment': 'bg-blue-100 text-blue-800',
      'App': 'bg-yellow-100 text-yellow-800',
      'Website': 'bg-red-100 text-red-800',
      'Other': 'bg-gray-100 text-gray-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${issueTypeClasses[issueType as keyof typeof issueTypeClasses]}`}>
        {issueType}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Ticket ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                School
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted by
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Issue Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Latest Modified
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {tickets.map((ticket, index) => (
              <tr key={ticket.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-sm font-medium text-blue-600">
                  {ticket.ticketId}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {ticket.school}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {ticket.submittedBy}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {ticket.role}
                </td>
                <td className="px-6 py-4">
                  {getIssueTypeBadge(ticket.issueType)}
                </td>
                <td className="px-6 py-4">
                  {getPriorityBadge(ticket.priority)}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(ticket.status)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {ticket.lastModified}
                </td>
                <td className="px-6 py-4 text-sm">
                  <button 
                    onClick={() => onViewTicket(ticket.id)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    View and edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            Next
          </button>
        </div>
        <div className="text-sm text-gray-700">
          Page 1 of 5
        </div>
      </div>
    </div>
  );
}