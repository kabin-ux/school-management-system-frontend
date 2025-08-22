export interface TimeSlot {
  time: string;
  subject?: string;
  teacher?: string;
  color?: string;
}

export interface TimetableDay {
  day: string;
  slots: TimeSlot[];
}