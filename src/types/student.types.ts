import type { Grade, Section } from "./class.types";
import type { Parent } from "./parent.types";

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
  class: Grade;
  section: Section;
  parent: Parent;
}

export interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  class_id: string;
  section_id: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  transport_id?: string | null;
}
