import { z } from "zod";

export const classSchema = z.object({
  name: z.string().min(1, "Class name is required"),
  has_section: z.boolean(), // required boolean
});

export const updateClassSchema = classSchema.partial();

export type Class = z.infer<typeof classSchema>;
