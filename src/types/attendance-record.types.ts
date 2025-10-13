export interface AttendanceRecord {
  id: string;
  studentId: string;
  teacherId: string;
  status: "present" | "absent" | "leave";
  createdAt: string;
  updatedAt?: string;

  studentName: string;
  className: string;
  sectionName: string;
  date: string;
}

export interface Subject {
  name: string;
  totalClass: number;
  attendedClass: number;
  attendance: string;
}

