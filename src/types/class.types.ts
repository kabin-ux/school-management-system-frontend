export interface Subject {
  name: string;
  code: string;
  teacher: string;
  periods: number;
}

export interface Grade {
  id: number;
  name: string;
  sections: string[];
  totalSubjects: number;
  totalStudents: number;
  teacher: string;
  subjects: Subject[];
}