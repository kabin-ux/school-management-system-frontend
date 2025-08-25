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
  teacherId: string;
  email: string;
  phone: string;
  teacherSubjects: string[];
  teacherClasses: string[];
  status: 'Active' | 'Inactive';
  avatar: string;
}
