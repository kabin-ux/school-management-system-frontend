import type { Accountant } from "./accountant-dashboard.types";
import type { Transportation } from "./admin-transportation.types";
import type { Grade } from "./class.types";
import type { Teacher } from "./teacher.types";

export interface FeeStructureAttributes {
  id: string;
  class_id: string;
  monthly_fee: number;
  exam_fee: number;
  tution_fee?: number;
  computer_fee?: number;
  laboratory_fee?: number;
  transport_fee?: string;
  other_fee?: number;
  class?: Grade;
  transportation: Transportation;
}

export interface FeeStructureForm {
    class_id: string;
    monthly_fee: number;
    exam_fee: number;
    tution_fee: number;
    computer_fee: number;
    laboratory_fee: number;
    transport_fee: string; // transport ID
    other_fee: number;
}


export interface Salary {
  id: string;
  employee_id: string;
  basic: number;
  allowances: number;
  role: 'teacher' | 'accountant' | 'staff';
  created_by: string;
  remarks?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  creator: Accountant;
  teacherEmployee?: Teacher;
  accountantEmployee?: Accountant;
}

export interface SalaryStructureForm {
  employee_id: string,
  basic: number,
  allowances: number,
  role: string,
  remarks?: string;
}

// export interface Teacher {
//   id: string;
//   name: string;
//   department: string;
//   lastPaid: string;
//   totalSalary: string;
//   dueAmount: string;
//   status: 'Paid' | 'Unpaid' | 'Pending';
// }

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
  classOrRole: string;
}

export interface FeeRecord {
  code: string,
  id: number;
  name: string;
  classSection: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
}

export type ViewType = 'Student' | 'Employee';
export type TabType = 'Fee Structure' | 'Payment History' | 'Add Payment';
