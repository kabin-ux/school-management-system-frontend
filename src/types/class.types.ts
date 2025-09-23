import type { School } from "./partner-school.types";

export interface Subject {
  name: string;
  code: string;
  description:string;
  teacher: string;
  periods: number;
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
  class_teacher_id: string | null;
  createdAt: string;
  updatedAt: string;

  school?: School[];
}