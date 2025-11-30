export interface TimetableAttributes {
    id: string;
    classId: string;
    sectionId?: string | null;
    name: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}

export interface TimeSlot {
  id: string;
  dayOfWeek: string; // e.g., "sunday"
  label: string;     // e.g., "First Period"
  startTime: string; // "08:00:00"
  endTime: string;   // "09:00:00"
  subject: string;
  teacher?: string;
}

export interface TimetableDay {
  day: string;
  slots: TimeSlot[];
}