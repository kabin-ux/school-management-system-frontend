import { z } from "zod";

export const createTimetableSchema = z.object({
  classId: z.uuid("Invalid class ID"),
  sectionId: z.uuid("Invalid section ID").optional().nullable(),
  name: z.string().min(1, "Name is required")
});

export type TimetableCreateSchema = z.infer<typeof createTimetableSchema>;
