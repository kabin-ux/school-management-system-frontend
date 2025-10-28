import { z } from "zod";

export const createTeacherSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email address").min(1, "Email is requireds"),
  phone: z.string().min(1, "Phone is required").max(15, "Phone is too long"),
  dateOfBirth: z
    .string()
    .refine((date) => new Date(date) >= new Date(1900, 0, 1), {
      message: "Date must be after 1900",
    }),
  gender: z.enum(["Male", "Female", "Other"]), 
  address: z.string().min(1,"Address is required"),
  qualification: z.string().min(1, "Qualification is required"),
});

export const updateTeacherSchema = createTeacherSchema.partial();

export type TeacherSchema = z.infer<typeof createTeacherSchema>;