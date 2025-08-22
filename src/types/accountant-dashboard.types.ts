export interface Transaction {
  id: string;
  studentName: string;
  class: string;
  date: string;
  amount: string;
  method: string;
  status: 'Paid' | 'Pending' | 'E-Stmt';
}