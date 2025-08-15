
interface Ticket {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  timeAgo: string;
  status: 'Open' | 'In progress' | 'Resolved';
}

export default function SupportTickets() {
  const tickets: Ticket[] = [
    {
      id: 'TK-001',
      title: 'Login Issues for Grade 10 students',
      priority: 'High',
      assignee: 'Sarah Johnson',
      timeAgo: '2 hours ago',
      status: 'Open'
    },
    {
      id: 'TK-002',
      title: 'Grade book sync error',
      priority: 'Medium',
      assignee: 'Sarah Johnson',
      timeAgo: '2 hours ago',
      status: 'In progress'
    },
    {
      id: 'TK-003',
      title: 'Parent portal access request',
      priority: 'Low',
      assignee: 'Sarah Johnson',
      timeAgo: '3 hours ago',
      status: 'Resolved'
    }
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Open': 'bg-blue-100 text-blue-800',
      'In progress': 'bg-yellow-100 text-yellow-800',
      'Resolved': 'bg-green-100 text-green-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    );
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'High': 'text-red-600',
      'Medium': 'text-yellow-600',
      'Low': 'text-green-600'
    };
    return colors[priority as keyof typeof colors];
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
          2 Active
        </span>
      </div>

      <div className="space-y-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="border-l-4 border-l-blue-500 pl-4 py-2">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-blue-600">{ticket.id}</span>
                  {getStatusBadge(ticket.status)}
                </div>
                <p className="text-sm text-gray-900 mb-2">{ticket.title}</p>
                <div className="flex items-center gap-4 text-xs text-gray-500">
                  <span>Priority: <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>{ticket.priority}</span></span>
                  <span>👤 {ticket.assignee}</span>
                  <span>⏰ {ticket.timeAgo}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}