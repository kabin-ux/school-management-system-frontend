export interface SupportTicket {
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