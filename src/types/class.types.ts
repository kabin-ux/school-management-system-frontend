import type { School } from "./partner-school.types";
import type { Teacher } from "./teacher.types";

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  teacher: Teacher[];
  periods: number;
}

export interface SubjectForm {
  name: string,
  code: string,
  description: string,
}

export interface SectionForm {
  section_name: string;
  class_id: string;
}

export interface Section {
  id: string;
  section_name: string;
  class_id: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

export interface Grade {
  id: string;
  name: string;
  has_section: boolean;
  school_id: string;
  totalSection: number;
  totalStudent: number;
  totalSubject: number;
  class_teacher_id: string | null;
  createdAt: string;
  updatedAt: string;

  classTeacher?: Teacher;
  school?: School;
}