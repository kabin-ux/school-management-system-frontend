import { z } from "zod";

export const createStudentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  class_id: z.string().min(1, "Class is required"),
  section_id: z.string().min(1, "Section is required"),
  gender: z.enum(["male", "female", "other"]), // This makes it required with specific values
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  transportation_id: z.string().optional(),
});
export const updateStudentSchema = createStudentSchema.partial();

export type StudentSchema = z.infer<typeof createStudentSchema>;