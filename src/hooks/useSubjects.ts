import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Subject, SubjectForm } from "../types/class.types";
import toast from "react-hot-toast";

export interface SubjectDashboardData {
    totalSubjects: number,
    totalTeacher: number
}

// Fetch all subjects
export const useAllSubjects = () => {
    return useQuery({
        queryKey: ["subjects"],
        queryFn: async () => {
            const res = await api.get("/subject");
            return res.data.data as Subject[];
        },
    });
};

// Fetch subjects by class
export const useSubjectsByClass = (classId: string) => {
    return useQuery({
        queryKey: ["subjectsByClass", classId],
        queryFn: async () => {
            const res = await api.get(`/subject/class/${classId}`);
            return res.data.data as Subject[];
        },
        enabled: !!classId,
    });
};

// Fetch subject by ID
export const useSubjectById = (id: string) => {
    return useQuery({
        queryKey: ["subject", id],
        queryFn: async () => {
            const res = await api.get(`/subject/${id}`);
            return res.data.data as Subject;
        },
        enabled: !!id,
    });
};

// Search subjects
export const useSearchSubjects = (query: string) => {
    return useQuery({
        queryKey: ["searchSubjects", query],
        queryFn: async () => {
            const res = await api.get(`/subject/search?query=${query}`);
            return res.data.data as Subject[];
        },
        enabled: !!query,
    });
};

// Add new subject
export const useAddSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subjectData: { name: string; code?: string | null }) => {
            const res = await api.post("/subject", subjectData);
            return res.data.data as Subject;
        },
        onSuccess: () => {
            toast.success("Subject added successfully");
            queryClient.invalidateQueries({ queryKey: ["subjectsByClass"] });
            queryClient.invalidateQueries({ queryKey: ["subjectDashboard"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add subject");
        },
    });
};

// Add bulk subjects
export const useAddSubjectsBulk = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (subjects: { name: string; code?: string | null }[]) => {
            const res = await api.post("/subject/bulk", subjects);
            return res.data.data as Subject[];
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["subjects"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add subject");
        },
    });
};

// Update subject
export const useUpdateSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            updates,
        }: {
            id: string;
            updates: SubjectForm;
        }) => {
            const res = await api.put(`/subject/${id}`, updates);
            return res.data.data as Subject;
        },
        onSuccess: (data) => {
            toast.success("Subject updated successfully");
            queryClient.invalidateQueries({ queryKey: ["subjectsByClass"] });
            queryClient.invalidateQueries({ queryKey: ["subjectsByClass", data.id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update subject");
        },
    });
};

// Delete subject
export const useDeleteSubject = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/subject/${id}`);
            return id;
        },
        onSuccess: () => {
            toast.success("Subject removed successfully");
            queryClient.invalidateQueries({ queryKey: ["subjectsByClass"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete subject");
        },
    });
};

// Assign subject to teacher
export const useAssignSubjectToTeacher = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            teacherId,
            subjectId,
        }: {
            teacherId: string;
            subjectId: string;
        }) => {
            const res = await api.put(`/subject/assign-teacher`, {
                teacherId,
                subjectId,
            });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Teacher assigned successfully");
            queryClient.invalidateQueries({ queryKey: ["subjectsByClass"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to assign teacher");
        },
    });
};

export const useSubjectDashboardData = (classId: string) => {
    return useQuery<SubjectDashboardData>({
        queryKey: ["subjectDashboard"],
        queryFn: async () => {
            const res = await api.get(`/dashboard/subject/${classId}`);
            return res.data.data;
        },
    });
};
