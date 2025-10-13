import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";

// TYPES
export interface SuperAdmin {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    address: string;
    created_by: string | null;
    status: "active" | "inactive" | string;
    profile_image: string | null;
    phone_number: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}

// QUERY HOOKS

// Fetch all Super Admins
export const useSuperAdmins = () => {
    return useQuery({
        queryKey: ["superAdmins"],
        queryFn: async () => {
            const res = await api.get("/super-admin");
            return res.data.data as SuperAdmin[];
        },
    });
};

// Fetch single Super Admin details by ID
export const useSuperAdminDetails = (id: string) => {
    return useQuery({
        queryKey: ["superAdmin", id],
        queryFn: async () => {
            const res = await api.get(`/super-admin/${id}`);
            return res.data.data as SuperAdmin;
        },
        enabled: !!id, // only fetch if id is provided
    });
};

// MUTATION HOOKS

// Create Super Admin
export const useCreateSuperAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (
            data: Omit<
                SuperAdmin,
                "id" | "createdAt" | "updatedAt" | "deletedAt" | "created_by"
            > & { password: string }
        ) => {
            const res = await api.post("/super-admin", data, { withCredentials: true });
            return res.data.data as SuperAdmin;
        },
        onSuccess: () => {
            toast.success("Super Admin added successfully");
            queryClient.invalidateQueries({ queryKey: ["superAdmins"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add superadmin");
        },
    });
};

// Update Super Admin
export const useUpdateSuperAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: String, data: Partial<SuperAdmin> }) => {
            const res = await api.put(`/super-admin/${id}`, data);
            return res.data.data as SuperAdmin;
        },
        onSuccess: (updatedAdmin) => {
            toast.success("Super Admin updated successfully");
            queryClient.invalidateQueries({ queryKey: ["superAdmins"] });
            queryClient.invalidateQueries({ queryKey: ["superAdmin", updatedAdmin.id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update superadmin");
        },
    });
};

// Delete Super Admin
export const useDeleteSuperAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/super-admin?id=${id}`);
            return id;
        },
        onSuccess: (deletedId) => {
            toast.success("Super Admin deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["superAdmins"] });
            queryClient.removeQueries({ queryKey: ["superAdmin", deletedId] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete superadmin");
        },
    });
};
