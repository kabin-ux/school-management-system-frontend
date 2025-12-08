import { z } from "zod";

export const subjectSchema = z.object({
  section_id: z.string().uuid("Invalid section ID"),
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long"),
  class_id: z.uuid("Invalid class ID"),
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const updateSubjectSchema = subjectSchema
  .omit({
    class_id: true,
  })
  .partial();
