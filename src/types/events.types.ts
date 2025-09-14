export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  target: string;
  school_id: string;
  eventType: string
}

export interface EventForm {
  title: string;
  description: string;
  eventType: string;
  target: string;
  date: string;
  startTime: string;
  endTime: string;
}