import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { SupportTicket } from "../types/support.types";
import toast from "react-hot-toast";

export interface SupportTicketDashboardData {
  totalOpenTickets: number;
  totalInProgressTickets: number;
  totalResolvedTickets: number;
  totalClosedTickets: number;
  totalSupportTickets: number;
}

// Get all support tickets
export const useSupportTickets = () => {
  return useQuery<SupportTicket[]>({
    queryKey: ["supportTickets"],
    queryFn: async () => {
      const res = await api.get("/support");
      return res.data.data;
    },
  });
};

// Get support ticket by ID
export const useSupportTicketById = (id: string) => {
  return useQuery<SupportTicket>({
    queryKey: ["supportTicket", id],
    queryFn: async () => {
      const res = await api.get(`/support/${id}`);
      return res.data.data;
    },
    enabled: !!id,
  });
};

// Get support tickets by school ID
export const useSupportTicketsBySchool = (id: string) => {
  return useQuery<SupportTicket[]>({
    queryKey: ["supportTicketsBySchool"],
    queryFn: async () => {
      const url = id ? `/support/my-school?id=${id}` : 'support/my-school';
      const res = await api.get(url);
      return res.data.data;
    },
  });
};

// Create support ticket
export const useCreateSupportTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (ticketData: Partial<SupportTicket>) => {
      const res = await api.post("/support", ticketData);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Support Ticket added successfully");
      queryClient.invalidateQueries({ queryKey: ["supportTicketsBySchool"] });
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to add support ticket");
    },
  });
};

// Accept support ticket
export const useAcceptSupportTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put(`/support/accept/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Support Ticket accepted successfully");
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to accept support ticket");
    },
  });
};

// Resolve support ticket
export const useResolveSupportTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put(`/support/resolve/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Support Ticket resolved successfully");
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to resolve support ticket");
    },
  });
};

// Close support ticket
export const useCloseSupportTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put(`/support/close/${id}`);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Support Ticket closed successfully");
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to close support ticket");
    },
  });
};

// Update support ticket
export const useUpdateSupportTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }: { id: string, updates: any }) => {
      const res = await api.put(`/support/${id}`, updates);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Support Ticket details updated successfully");
      queryClient.invalidateQueries({ queryKey: ["supportTicketsBySchool"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update support ticket details");
    },
  });
};

// Delete support ticket
export const useDeleteSupportTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/support/${id}`);
      return id;
    },
    onSuccess: () => {
      toast.success("Support Ticket deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["supportTicketsBySchool"] });
      queryClient.invalidateQueries({ queryKey: ["supportTickets"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to delete support ticket");
    },
  });
};

export const useSupportTicketSuperAdminDashboardData = () => {
  return useQuery<SupportTicketDashboardData>({
    queryKey: ["supportTicketDashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/support-ticket");
      return res.data.data;
    },
  });
};

export const useSupportTicketAdminDashboardData = () => {
  return useQuery<SupportTicketDashboardData>({
    queryKey: ["supportTicketDashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/support-ticket/my-school");
      return res.data.data;
    },
  });
};