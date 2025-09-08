export interface Subject {
  name: string;
  code: string;
  teacher: string;
  periods: number;
}

export interface Grade {
  id: number;
  name: string;
  has_section: boolean;
  school_id: string;
  createdAt?: Date;
  updatedAt?: Date;
}