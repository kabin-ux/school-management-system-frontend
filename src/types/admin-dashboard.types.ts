import type { Subject } from "./class.types";

export interface Activity {
  id: string;
  type: 'student' | 'timetable' | 'exam' | 'support' | 'teacher';
  description: string;
  performedBy: string;
  time: string;
}

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
