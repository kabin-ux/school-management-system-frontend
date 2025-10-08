import type { Student } from "./student.types";

export interface Invoice {
  id: string;
  student_id: string;
  amount: number;
  discount: number;
  accountant_id: string | null;
  method: "Cash" | "Online" | "None";
  status: "Pending" | "Completed" | "Failed" | "Refunded";
  payment_date?: Date;
  description?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  student: Student
}

export interface DefaulterSummary {
  type: string;
  count: number;
  color: string;
}

export interface FilterValues {
  viewType: 'Student' | 'Teacher';
  search: string;
  paymentStatus: string;
  class: string;
}
