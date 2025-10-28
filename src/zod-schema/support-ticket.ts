import { z } from "zod";

export const SupportTicketType = {
  FEATURE_REQUEST: "feature_request",
  BUG_REPORT: "bug_report",
  GENERAL_INQUIRY: "general_inquiry",
  BILLING: "billing",
  OTHER: "other",
} as const;

export type SupportTicketType = (typeof SupportTicketType)[keyof typeof SupportTicketType];

export const SupportTicketStatus = {
  OPEN: "open",
  IN_PROGRESS: "in_progress",
  RESOLVED: "resolved",
  CLOSED: "closed",
} as const;

export type SupportTicketStatus = (typeof SupportTicketStatus)[keyof typeof SupportTicketStatus];

export const supportTicketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  type: z
    .enum(SupportTicketType, "Type is required")
    .default(SupportTicketType.GENERAL_INQUIRY),
  status: z
    .enum(SupportTicketStatus, "Status is required")
    .default(SupportTicketStatus.OPEN),
  response: z.string().nullable().default(null),
});

export type SupportTicket = z.infer<typeof supportTicketSchema>;
