export interface Student {
  id: string;
  name: string;
  class: string;
  date: string;
  amount: string;
  dueAmount: string;
  status: 'Paid' | 'Unpaid' | 'Pending';
}

export interface Teacher {
  id: string;
  name: string;
  department: string;
  lastPaid: string;
  totalSalary: string;
  dueAmount: string;
  status: 'Paid' | 'Unpaid' | 'Pending';
}

export interface PaymentHistoryItem {
  date: string;
  amount: string;
  method: string;
  description: string;
  status: 'Paid';
}

export interface StudentProfile {
  id: string;
  name: string;
  phone: string;
  class: string;
  email: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  parentEmail: string;
}

export interface Note {
  id: string;
  author: string;
  date: string;
  content: string;
  type: 'info' | 'warning' | 'success';
}

export interface FilterOptions {
  search: string;
  status: string;
  classOrDepartment: string;
}

export type ViewType = 'Student' | 'Teacher';
export type TabType = 'Fee Structure' | 'Payment History' | 'Add Payment';
