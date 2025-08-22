export interface School {
  id: string;
  schoolCode: string;
  name: string;
  location: string;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  status: 'Active' | 'Inactive';
  subscription: 'Premium' | 'Basic';
  payment: 'Fully paid' | 'Partial paid';
}

export interface Ticket {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  timeAgo: string;
  status: 'Open' | 'In progress' | 'Resolved';
}

export interface Admin {
  name: string;
  role: string;
  initials: string;
  bgColor: string;
}