import { Search } from 'lucide-react';

interface SupportFiltersProps {
  userType: string;
  issueType: string;
  priority: string;
  status: string;
  ticketId: string;
  onUserTypeChange: (value: string) => void;
  onIssueTypeChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onTicketIdChange: (value: string) => void;
}

export default function SupportFilters({
  userType,
  issueType,
  priority,
  status,
  ticketId,
  onUserTypeChange,
  onIssueTypeChange,
  onPriorityChange,
  onStatusChange,
  onTicketIdChange
}: SupportFiltersProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">User Type</label>
          <select
            value={userType}
            onChange={(e) => onUserTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Admin">Admin</option>
            <option value="Accountant">Accountant</option>
            <option value="Teacher">Teacher</option>
            <option value="Parent">Parent</option>
            <option value="Student">Student</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Issue Type</label>
          <select
            value={issueType}
            onChange={(e) => onIssueTypeChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Payment">Payment</option>
            <option value="App">App</option>
            <option value="Website">Website</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text gray-700 mb-2">Priority</label>
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select
            value={status}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Ticket ID (if one)</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by Ticket ID"
              value={ticketId}
              onChange={(e) => onTicketIdChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}