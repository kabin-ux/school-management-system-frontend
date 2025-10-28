import { z } from "zod";

export const createTimetableSchema = z.object({
  classId: z.uuid("Invalid class ID"),
  sectionId: z.uuid("Invalid section ID").optional().nullable().default(null),
  name: z.string().min(1, "Name is required"),
  startTime: z.number().min(1, "Start time is required").optional(),
  timeInterval: z
    .number()
    .min(1, "Time interval must be at least 1 minute")
    .optional(),
});
