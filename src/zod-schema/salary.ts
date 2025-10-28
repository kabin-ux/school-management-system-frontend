import { z } from "zod";

export const EmployeeRole = {
  TEACHER: "teacher",
  ACCOUNTANT: "accountant",
  STAFF: "staff",
} as const;

export type GenderType = (typeof EmployeeRole)[keyof typeof EmployeeRole];

export const createSalarySchema = z.object({
  employee_id: z.string().min(1, "Employee ID is required"),
  basic: z.number().nonnegative("Basic salary must be non-negative"),
  allowances: z
    .number()
    .nonnegative("Allowances must be non-negative")
    .default(0),
  role: z.enum(
    [...Object.values(EmployeeRole)],
    "Role must be one of 'teacher', 'accountant', or 'staff'"
  ),
  remarks: z.string().optional().nullable().default(null),
});

export const updateSalarySchema = createSalarySchema.partial();

export type UpdateSalary = z.infer<typeof updateSalarySchema>;

export type Salary = z.infer<typeof createSalarySchema>;
