import { z } from "zod";

export const parentSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email().nullable().optional(),
  phone: z.string().min(1, "Phone number is required"),
  address: z.string().min(1, "Address is required"),
  relation: z.string().min(1, "Relation is required"),
  occupation: z.string().nullable().optional(),
  student_id: z.string().uuid({ message: "Invalid Student ID" }),
});

export const updateParentSchema = parentSchema.partial();

export type ParentSchema = z.infer<typeof parentSchema>;
