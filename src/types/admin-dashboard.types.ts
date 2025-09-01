export interface Activity {
  id: string;
  type: 'student' | 'timetable' | 'exam' | 'support' | 'teacher';
  description: string;
  performedBy: string;
  time: string;
}

export interface Teacher {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Other';
  address?: string;
  hireDate: string;
  qualification: string;
  classIds: number[];
  subjectIds: number[];
  status?: string;
}
