export interface AttendanceRecord {
    id:number
    name: string;
    classSection: string;
    date: string;
    status: string;
}

export interface Subject {
  name: string;
  totalClass: number;
  attendedClass: number;
  attendance: string;
}

