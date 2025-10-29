import { z } from "zod";

export const feeStructureSchema = z.object({
  class_id: z.uuid({ message: "class_id must be a valid UUID" }),
  monthly_fee: z
    .number("monthly_fee must be a number")
    .nonnegative({ message: "monthly_fee cannot be negative" }),
  exam_fee: z
    .number("exam_fee must be a number")
    .nonnegative({ message: "exam_fee cannot be negative" }),
  tution_fee: z
    .number("tution_fee must be a number")
    .nonnegative({ message: "tution_fee cannot be negative" }),
  computer_fee: z
    .number("computer_fee must be a number")
    .nonnegative({ message: "computer_fee cannot be negative" }),
  laboratory_fee: z
    .number("laboratory_fee must be a number")
    .nonnegative({ message: "laboratory_fee cannot be negative" }),
  transport_fee: z
    .uuid("transport_fee must be a valid UUID"),
  other_fee: z
    .number("other_fee must be a number")
    .nonnegative({ message: "other_fee cannot be negative" }),
});

export const UpdateFeeStructureSchema = feeStructureSchema.partial();

export type FeeStructure = z.infer<typeof feeStructureSchema>;
export type UpdateFeeStructure = z.infer<typeof UpdateFeeStructureSchema>;
