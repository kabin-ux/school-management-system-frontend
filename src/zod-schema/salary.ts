import { z } from "zod";

export const createSalarySchema = z.object({
  employee_id: z.string().min(1, "Employee ID is required"),
  basic: z.number().nonnegative("Basic salary must be non-negative"),
  allowances: z.number().nonnegative("Allowence must be non-negative"),
  role: z
    .enum(["teacher", "accountant", "staff"])
    .refine((val) => ["teacher", "accountant", "staff"].includes(val), {
      message: "Role must be one of 'teacher', 'accountant', or 'staff'",
    }),
  remarks: z.string().optional(),
});

export const updateSalarySchema = createSalarySchema.partial();

export type SalaryStructure = z.infer<typeof createSalarySchema>;
export type UpdateSalary = z.infer<typeof updateSalarySchema>;
export type Salary = z.infer<typeof createSalarySchema>;
