import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";

// Fetch All Parents
export const useParents = () => {
    return useQuery({
        queryKey: ["parents"],
        queryFn: async () => {
            const res = await api.get("/parent");
            return res.data?.data || [];
        },
    });
};

// Fetch All Parents by Class
export const useParentsByClass = (classId: number | string | undefined) => {
    return useQuery({
        queryKey: ["parents", "class", classId],
        queryFn: async () => {
            const res = await api.get(`/parent/class/${classId}`);
            return res.data?.data || [];
        },
        enabled: !!classId, // Only fetch when classId exists
    });
};

// Fetch Single Parent Details
export const useParentDetails = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["parent", id],
        queryFn: async () => {
            const res = await api.get(`/parent/${id}`);
            return res.data?.data;
        },
        enabled: !!id,
    });
};

// Add Parent
export const useAddParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (parentData: any) => {
            const res = await api.post("/parent", parentData);
            return res.data?.data;
        },
        onSuccess: () => {
            toast.success("Parent added successfully");
            queryClient.invalidateQueries({ queryKey: ["parents"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add parent");
        },
    });
};

// Update Parent
export const useUpdateParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updateData }: { id: string, updateData: any }) => {
            const res = await api.put(`/parent/${id}`, updateData);
            return res.data?.data;
        },
        onSuccess: () => {
            toast.success("Parent updated successfully");
            queryClient.invalidateQueries({ queryKey: ["parents"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update parent");
        },
    });
};

// Delete Parent
export const useDeleteParent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/parent/${id}`);
            return id;
        },
        onSuccess: () => {
            toast.success("Parent removed successfully");
            queryClient.invalidateQueries({ queryKey: ["parents"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete parent");
        },
    });
};


