import { z } from "zod";

export const DayOfWeek = {
  Sunday: "sunday",
  Monday: "monday",
  Tuesday: "tuesday",
  Wednesday: "wednesday",
  Thursday: "thursday",
  Friday: "friday",
} as const;

export type DayOfWeek = (typeof DayOfWeek)[keyof typeof DayOfWeek];

export const timeslotCreateSchema = z.object({
  timetableId: z.uuid("Invalid timetable ID"),
  label: z.string().min(1, "Label is required"),
  dayOfWeek: z.enum(
    [
      DayOfWeek.Sunday,
      DayOfWeek.Monday,
      DayOfWeek.Tuesday,
      DayOfWeek.Wednesday,
      DayOfWeek.Thursday,
      DayOfWeek.Friday,
    ],
    "Invalid day of the week"
  ),
  tag: z.string().optional(),
  startTime: z
    .string()
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      "Invalid time format (HH:mm)"
    ),
  endTime: z
    .string()
    .regex(
      /^([0-1]\d|2[0-3]):([0-5]\d)$/,
      "Invalid time format (HH:mm)"
    ),
});

export type TimeslotCreateSchema = z.infer<typeof timeslotCreateSchema>;
