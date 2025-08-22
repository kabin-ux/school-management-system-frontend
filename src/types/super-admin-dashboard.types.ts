export interface QuickAction {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  color: 'blue' | 'green' | 'purple' | 'orange' | 'red';
}

export interface Notification {
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
  time: string;
  target: string;
}

export interface SupportTicket {
  id: string;
  school: string;
  issue: string;
  status: 'Open' | 'In Progress' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  created: string;
}