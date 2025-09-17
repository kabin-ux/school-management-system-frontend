export interface SupportTicket {
  id: string;
  title: string;
  description: string;
  status: string;
  created_by: number;
  createdAt: string;
  updatedAt: string;
}

export interface SupportTicketForm {
  title: string;
  description: string;
  // status: string;
}