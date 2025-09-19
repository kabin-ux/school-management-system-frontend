import type { Grade, Section } from "./class.types";

export type GenderType = "male" | "female" | "other";


export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  rollNumber?: string;
  gender: GenderType;
  address?: string | null;
  parent_id?: string | null;
  password: string;
  dateOfBirth: Date;
  transport_id?: string | null;
  class_id: string;
  section_id?: string | null;
  createdAt?: Date;
  updatedAt?: Date;

  // Relations
  classes: Grade;
  section: Section;
}

export interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  class_id: string;
  section_id: string;
  rollNumber: string;
  gender: string;
  dateOfBirth: string;
  address: string;
}
