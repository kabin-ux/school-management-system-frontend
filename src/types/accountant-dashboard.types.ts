import type { SchoolData } from "./partner-school.types";

export interface Accountant {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  school?: SchoolData;
  phone: string;
  password: string;
  status?: "Active" | "Inactive" | string;
  school_id: string;
  dateOfBirth: Date | string | null;
  address: string;
  district: string;
  city: string;
  state: string;
  role?: string;
  postal_code?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface AccountantForm {
  firstName: string;
  lastName: string;
  email: string;
  school?: SchoolData;
  phone: string;
  password: string;
  status?: "Active" | "Inactive" | string;
  school_id: string;
  dateOfBirth: Date | string | null;
  address: string;
  district: string;
  city: string;
  state: string;
  postal_code?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}