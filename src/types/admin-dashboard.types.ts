export interface Activity {
  id: string;
  type: 'student' | 'timetable' | 'exam' | 'support' | 'teacher';
  description: string;
  performedBy: string;
  time: string;
}

export interface Teacher {
  id: string;
  name: string;
  teacherId: string;
  email: string;
  phone: string;
  subjects: string[];
  classes: string[];
  status: 'Active' | 'Inactive';
  avatar: string;
}
