export interface Invoice {
  id: string;
  studentName: string;
  class: string;
  date: string;
  dueAmount: string;
  outstanding: string;
  lastReminder: string;
  status: 'Paid' | 'Unpaid' | 'Pending' | 'Urgent';
}

export interface DefaulterSummary {
  type: string;
  count: number;
  color: string;
}

export interface FilterValues {
  viewType: 'Invoice Management' | 'Teacher';
  search: string;
  paymentStatus: string;
  class: string;
}
