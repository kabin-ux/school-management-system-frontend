import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";

export interface TransportationDashboardData {
    totalVehicles: number,
    totalDrivers: number,
    totalRoutes: number
}

// Get All Transportation Records
export const useAllTransportation = () => {
    return useQuery({
        queryKey: ["transportations"],
        queryFn: async () => {
            const res = await api.get("/transportation");
            return res.data.data;
        },
    });
};

// Get Transportation by ID
export const useTransportationById = (id?: number) => {
    return useQuery({
        queryKey: ["transportation", id],
        queryFn: async () => {
            const res = await api.get(`/transportation/${id}`);
            return res.data.data;
        },
        enabled: !!id, // fetch only if id is provided
    });
};

// Create Transportation
export const useCreateTransportation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post("/transportation", data);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Transportation added successfully");
            queryClient.invalidateQueries({ queryKey: ["transportations"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add transportation");
        },
    });
};

// Update Transportation
export const useUpdateTransportation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string, updates: any }) => {
            const res = await api.put(`/transportation/${id}`, updates);
            return res.data.data;
        },
        onSuccess: (updates) => {
            toast.success("Transportation updated successfully");
            queryClient.invalidateQueries({ queryKey: ["transportations"] });
            queryClient.invalidateQueries({ queryKey: ["transportation", updates.id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update transportation");
        },
    });
};

// Delete Transportation
export const useDeleteTransportation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/transportation/${id}`);
            return id;
        },
        onSuccess: () => {
            toast.success("Transportation deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["transportations"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete transportation");
        },
    });
};

export const useTransportationDashboardData = () => {
    return useQuery<TransportationDashboardData>({
        queryKey: ["transportationDashboardData"],
        queryFn: async () => {
            const res = await api.get("/dashboard/transportation");
            return res.data.data;
        },
    });
};

// Unassign Transportation from Student
export const useUnassignTransportationFromStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (studentId: string) => {
            const res = await api.put("/transportation/unassign-student", { studentId });
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Transportation unassigned from student successfully");
            // Invalidate relevant queries like students list or student details
            queryClient.invalidateQueries({ queryKey: ["students"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to unassign transportation");
        },
    });
};
