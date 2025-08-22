export interface Student {
  id: string;
  name: string;
  email: string;
  admissionNumber: string;
  classSection: string;
  attendance: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
  status: 'Active' | 'Inactive';
  avatar: string;
}