export interface Transaction {
  id: string;
  studentName: string;
  class: string;
  date: string;
  amount: string;
  method: string;
  status: 'Paid' | 'Pending' | 'E-Stmt';
}

export interface Accountant {
  id: string;
  firstName: string;
  lastName: string;
  status?: "Active" | "Inactive" | string; // or just string if status can vary
  email: string;
  phone: string;
  dateOfBirth: string; // or Date if you parse it
  address: string;
  district: string;
  city: string;
  state: string;
  postal_code: string;
  school_id: string;
  role: string;
  createdAt: string; // or Date
  updatedAt: string; // or Date
  deletedAt: string | null;
}