import type { SchoolData } from "../components/SuperAdmin/partnerschools/AddSchoolModal";

export const SupportTicketType = {
  FEATURE_REQUEST: "feature_request",
  BUG_REPORT: "bug_report",
  GENERAL_INQUIRY: "general_inquiry",
  BILLING: "billing",
  OTHER: "other",
} as const;

export type SupportTicketType =
  (typeof SupportTicketType)[keyof typeof SupportTicketType];

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  type: SupportTicketType;
  status: string;
  school?: SchoolData
  created_by: number;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketForm {
  title: string;
  description: string;
  type: SupportTicketType;
  // status: string;
}