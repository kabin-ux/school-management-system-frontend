import type { Subject } from "./class.types";

export interface Teacher {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address?: string;
  qualification: string;
  classIds: number[];
  subjectIds: number[];
  status?: string;
  subjects?: Subject[];
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface TeacherForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address?: string;
  qualification: string;
  classIds: number[];
  subjectIds: number[];
  status?: string;
}