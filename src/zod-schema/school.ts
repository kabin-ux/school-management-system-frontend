import { z } from "zod";

// Enum for school type
const SchoolTypeEnum = z.enum(["public", "private"], "SchoolType is required");
const StatusEnum = z
  .enum(["Active", "Inactive"], "Status is required")
  .default("Active");

// Validation schema for creating a school
export const createSchoolSchema = z.object({
  name: z.string().min(1, "School name is required"),
  address: z.string().min(1, "Address is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postal_code: z.number().nullable().default(null),
  status: StatusEnum,
  latitude: z
    .number()
    .min(-90, "Latitude must be >= -90")
    .max(90, "Latitude must be <= 90"),
  longitude: z
    .number()
    .min(-180, "Longitude must be >= -180")
    .max(180, "Longitude must be <= 180"),
  phone: z
    .string()
    .min(7, "Phone number must be at least 7 digits")
    .max(15, "Phone number must be at most 15 digits"),
  email: z.email().min(1, "Email is required"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  image: z.url().nullable().default(null),
  verified: z.boolean().default(false),
  principal_name: z.string().min(1, "Principal name is required"),
  principal_contact: z.string().min(1, "Principal contact is required"),
  school_type: SchoolTypeEnum,
  has_transport: z.boolean().default(false),
  established_year: z.number().int(),
  student_capacity: z.number().int().min(1, "Capacity must be at least 1"),
  school_code: z.number("school code must be number").int(),
  details: z.string().min(50, "school details should be atleast 50 word"),
  subscription_id: z.uuid("Invalid subscription_id").nullable().default(null),
  grade_range: z.string().min(1, "Grade Range is required"),
  has_hostel: z.boolean().default(false),
  school_logo: z.url(),
});

// Validation schema for updating a school
export const updateSchoolSchema = createSchoolSchema
  .omit({
    password: true,
  })
  .partial();

export const changeSchoolPasswordSchema = z
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

export const passwordResetSchema = z.object({
  password: z
    .string()
    .min(8, "New password must be at least 8 characters")
    .regex(/[A-Z]/, "New password must contain at least one uppercase letter")
    .regex(/[a-z]/, "New password must contain at least one lowercase letter")
    .regex(/[0-9]/, "New password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "New password must contain at least one special character"
    ),
});

//types of schools
export type School = z.infer<typeof createSchoolSchema>;
export type UpdateSchool = z.infer<typeof updateSchoolSchema>;
