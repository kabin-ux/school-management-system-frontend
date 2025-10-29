import { z } from "zod";

export const EventType = {
  SPORTS: "sports",
  ACADEMIC: "academic",
  HOLIDAY: "holiday",
  PTM: "ptm",
  EXAM: "exam",
  OTHER: "other",
} as const;

export type EventType = (typeof EventType)[keyof typeof EventType];

export const EventTarget = {
  STUDENTS: "students",
  TEACHERS: "teachers",
  STAFFS: "staff",
  PARENTS: "parents",
  ALL: "all",
} as const;

export type EventTarget = (typeof EventTarget)[keyof typeof EventTarget];

export const eventCreateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description should be at least 10 characters")
    .nullable(),
      eventType: z.enum(EventType, "Invalid eventType"),
  target: z.enum(EventTarget, "Invalid target"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
});

export const eventUpdateSchema = eventCreateSchema.partial();

export type EventCreateSchema = z.infer<typeof eventCreateSchema>;
export type EventUpdateSchema = z.infer<typeof eventUpdateSchema>;
