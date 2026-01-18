import type { SchoolData } from "./partner-school.types";
import type { Teacher } from "./teacher.types";

export interface Subject {
  id: string;
  name: string;
  code: string;
  teacher_id?: string | null;
  description?: string | null;
  class_id: string;
  createdAt?: Date;
  updatedAt?: Date;

  teacher: Teacher;
  class: Grade;
  section: Section;
}

export interface SubjectForm {
  name: string,
  code: string,
  description?: string | null;
}

export interface SectionForm {
  section_name: string;
  class_id: string;
}

export interface Section {
  id: string;
  section_name: string;
  class_id: string;
  classTeachers: Teacher | null;
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
  school?: SchoolData;
}