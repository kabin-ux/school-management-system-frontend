import { z } from "zod";

// Enum for SuperAdmin status
const SuperAdminStatusEnum = z.enum(["active", "inactive"]);

// Schema for creating a SuperAdmin
export const createSuperAdminSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
  address: z.string().min(1, "Address is required"),
  created_by: z.uuid().nullable(),
  status: SuperAdminStatusEnum,
  profile_image: z.url().nullable(),
  phone_number: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be at most 15 digits"),
});

// Schema for updating a SuperAdmin
export const updateSuperAdminSchema = createSuperAdminSchema
  .omit({
    password: true,
  })
  .partial();

export const loginSuperAdminSchema = z.object({
  email: z.email("Invalid email").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    ),
});

export const changeSuperAdminPasswordSchema = z
  .object({
    oldPassword: z
      .string()
      .min(8, "Old password must be at least 8 characters"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
      .regex(/[a-z]/, "New password must contain at least one lowercase letter")
      .regex(/[0-9]/, "New password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "New password must contain at least one special character"
      ),
    confirmPassword: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "New password and confirm password must match",
    path: ["confirmPassword"],
  });

//types of super_admin
export type SuperAdmin = z.infer<typeof createSuperAdminSchema>;
export type UpdateSuperAdmin = z.infer<typeof updateSuperAdminSchema>;
