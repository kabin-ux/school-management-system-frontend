
export interface Activity {
  id: string;
  type: 'student' | 'timetable' | 'exam' | 'support' | 'teacher';
  description: string;
  performedBy: string;
  time: string;
}


