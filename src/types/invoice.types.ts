import type { Accountant } from "./accountant-dashboard.types";
import type { Student } from "./student.types";

export interface Invoice {
  id: string;
  student_id: string;
  amount: number;
  discount: number;
  accountant_id: string | null;
  method: "Cash" | "Online" | "None";
  status: "Pending" | "Completed" | "Failed" | "Refunded" | "Partial";
  payment_date?: Date;
  description?: string | null;
  partial_amount?: number;
  partial_remaining_payment: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  student: Student
  accountant: Accountant
}

export interface DefaulterSummary {
  type: string;
  count: number;
  color: string;
}

export interface FilterValues {
  viewType: 'Student' | 'Employee';
  search: string;
  paymentStatus: string;
  class: string;
  date?: string;
}
