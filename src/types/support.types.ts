import type { SchoolData } from "../components/SuperAdmin/partnerschools/AddSchoolModal";

export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: string;
  school?: SchoolData
  created_by: number;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketForm {
  title: string;
  description: string;
  // status: string;
}