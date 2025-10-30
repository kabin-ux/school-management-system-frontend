import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import type { SchoolData } from "../types/partner-school.types";

export const useSchools = () => {
    return useQuery<SchoolData[], Error>({
        queryKey: ["schools"],
        queryFn: async () => {
            const res = await api.get(`/school`, {
                withCredentials: true,
                headers: { "x-client-type": "web" },
            });
            return res.data.data.schools;
        },
    });
};

export const useSchoolDetails = (id: string) => {
    return useQuery<SchoolData, Error>({
        queryKey: ["school", id],
        queryFn: async () => {
            const res = await api.get(`/school/${id}`, {
                withCredentials: true,
                headers: { "x-client-type": "web" },
            });
            return res.data.data;
        },
        enabled: !!id, // only run if id exists
    });
};


export const useAddSchool = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (schoolData: SchoolData) => {
            const res = await api.post(`/school`, schoolData, { withCredentials: true });
            return res.data.data as SchoolData;
        },
        onSuccess: (newSchool) => {
            toast.success("School added successfully");
            // Update the cached list
            queryClient.setQueryData<SchoolData[]>(["schools"], (old) =>
                old ? [...old, newSchool] : [newSchool]
            );
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add school");
        },
    });
};

export const useUpdateSchool = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, updates }: { id: string, updates: Record<string, any> }) => {
            const res = await api.put(`/school/${id}`, updates);
            return res.data.data as SchoolData;
        },
        onSuccess: (updatedSchool) => {
            toast.success("School updated successfully");
            queryClient.invalidateQueries({ queryKey: ["schools"] });
            queryClient.invalidateQueries({ queryKey: ["school", updatedSchool.id] });
                        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update school");
        },
    });
};

export const useDeleteSchool = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (schoolId: string) => {
            await api.delete(`/school/${schoolId}`);
            return schoolId;
        },
        onSuccess: (deletedId) => {
            toast.success("School deleted successfully");
            queryClient.setQueryData<SchoolData[]>(["schools"], (old) =>
                old ? old.filter((s) => s.id !== deletedId) : []
            );
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete school");
        },
    });
};

export const useChangeSchoolStatus = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, status }: { id: string; status: string }) => {
            const res = await api.put(`/school/change-status/${id}`, { status });
            return res.data.data as SchoolData;
        },
        onSuccess: (updated) => {
            queryClient.invalidateQueries({ queryKey: ["schools"] });
            queryClient.invalidateQueries({ queryKey: ["school", updated.id] });
        },
    });
};

export const useChangePassword = () => {
    return useMutation({
        mutationFn: async (data: { oldPassword: string; newPassword: string }) => {
            const res = await api.put(`/school/change-password`, data, {
                withCredentials: true,
            });
            return res.data.message as string;
        },
    });
};

export const useSendResetMail = () => {
    return useMutation({
        mutationFn: async (email: string) => {
            const res = await api.post(`/school/password-reset-mail`, { email });
            return res.data.message as string;
        },
    });
};

export const useResetPassword = () => {
    return useMutation({
        mutationFn: async (data: { token: string; newPassword: string }) => {
            const res = await api.put(`/school/password-reset`, data);
            return res.data.message as string;
        },
    });
};
