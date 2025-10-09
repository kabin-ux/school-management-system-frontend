import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Teacher } from "../types/teacher.types";


// Fetch All Teachers
export const useTeachers = () => {
    return useQuery({
        queryKey: ["teachers"],
        queryFn: async () => {
            const res = await api.get("/teacher");
            return res.data.data as Teacher[];
        },
    });
};

// Add Teacher
export const useAddTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (teacherData: any) => {
            const res = await api.post("/teacher", teacherData);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Teacher added successfully");
            queryClient.invalidateQueries({ queryKey: ["teachers"] }); // Refresh list
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add teacher");
        },
    });
};

// Update Teacher
export const useUpdateTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            id,
            teacherData,
        }: {
            id: string;
            teacherData: any;
        }) => {
            const res = await api.put(`/teacher/${id}`, teacherData);
            return res.data?.data;
        },
        onSuccess: () => {
            toast.success("Teacher updated successfully");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update teacher");
        },
    });
};

// Delete Teacher
export const useDeleteTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (teacherId: string | number) => {
            await api.delete(`/teacher/${teacherId}`);
            return teacherId;
        },
        onSuccess: () => {
            toast.success("Teacher removed successfully");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to remove teacher");
        },
    });
};

// Assign Class Teacher
export const useAssignClassTeacher = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            teacherId,
            classId,
        }: {
            teacherId: string;
            classId: string;
        }) => {
            const res = await api.post(`/teacher/assign-class-teacher`, {
                teacherId,
                classId,
            });
            return res.data?.data;
        },
        onSuccess: () => {
            toast.success("Class Teacher assigned successfully");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
            queryClient.invalidateQueries({ queryKey: ["classes"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to assign class teacher");
        },
    });
};
