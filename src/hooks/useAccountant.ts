import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Accountant } from "../types/accountant-dashboard.types";
import toast from "react-hot-toast";

// React Query Hooks
// Fetch all accountants
export const useAllAccountants = () =>
    useQuery({
        queryKey: ["accountants"],
        queryFn: async () => {
            const res = await api.get("/accountant", { withCredentials: true });
            return res.data.data;
        },
    });

// Fetch all accountants by school
export const useAllAccountantsBySchool = () =>
    useQuery({
        queryKey: ["accountantsBySchool"],
        queryFn: async () => {
            const res = await api.get("/accountant/my-accountant");
            return res.data.data;
        },
    });

// Fetch accountant details
export const useAccountantDetails = (id?: string) =>
    useQuery({
        queryKey: ["accountant", id],
        queryFn: async () => {
            const res = await api.get(`/accountant/${id}`);
            return res.data.data;
        },
        enabled: !!id, // only runs if ID exists
    });

// Add new accountant
export const useAddAccountant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Accountant>) => {
            const res = await api.post("/accountant", data);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Accountant added successfully");
            queryClient.invalidateQueries({ queryKey: ["accountants"] });
            queryClient.invalidateQueries({ queryKey: ["accountantsBySchool"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add accountant");
        },
    });
};

// Update accountant
export const useUpdateAccountant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: Partial<Accountant>) => {
            const res = await api.put("/accountant", data);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Accountant details updated successfully");
            queryClient.invalidateQueries({ queryKey: ["accountants"] });
            queryClient.invalidateQueries({ queryKey: ["accountantsBySchool"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update accountant");
        },
    });
};

// Delete accountant
export const useDeleteAccountant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete("/accountant", { data: { id } });
        },
        onSuccess: () => {
            toast.success("Accountant deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["accountants"] });
            queryClient.invalidateQueries({ queryKey: ["accountantsBySchool"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete accountant");
        },
    });
};

// Login accountant
export const useLoginAccountant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const res = await api.post("/accountant/login", credentials);
            return res.data.data;
        },
        onSuccess: (data) => {
            toast.success("Accountant logged in successfully");
            queryClient.setQueryData(["currentAccountant"], data);
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to login accountant");
        },
    });
};

// Logout accountant
export const useLogoutAccountant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            await api.post("/accountant/logout", {});
        },
        onSuccess: () => {
            toast.success("Accountant logged out successfully");
            queryClient.removeQueries({ queryKey: ["currentAccountant"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to logout accountant");
        },
    });
};

// Get current logged-in accountant (from cache)
export const useCurrentAccountant = () => {
    return useQuery({
        queryKey: ["currentAccountant"],
        queryFn: async () => {
            const res = await api.get("/accountant/me", { withCredentials: true });
            return res.data.data;
        },
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};
