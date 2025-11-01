import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import toast from 'react-hot-toast';
import type { Grade } from '../types/class.types';

export interface ClassDashboardData {
    totalClasses: number,
    totalSubjects: number
}

// Fetch all classes for logged-in school
export const useClasses = () => {
    return useQuery<Grade[]>({
        queryKey: ['classes'],
        queryFn: async () => {
            const res = await api.get('/class/myclasses');
            return res.data.data; // assuming backend responds with { data: [...] }
        },
    });
};

// Fetch single class details
export const useClassDetails = (id: string) => {
    return useQuery<Grade>({
        queryKey: ['class', id],
        queryFn: async () => {
            const res = await api.get(`/class/${id}`);
            return res.data.data;
        },
        enabled: !!id, // only fetch if ID exists
    });
};

// Add new class
export const useAddClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (newClass: any) => {
            const res = await api.post('/class', newClass);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["classes"] });
            toast.success('Class added successfully');
        },
        onError: (err: any) => {
            const message = err.response?.data || 'Error adding class';
            toast.error(message);
        },
    });
};

// Update class
export const useUpdateClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updates }: { id: string, updates: any }) => {
            const res = await api.put(`/class/${id}`, updates);
            return res.data.data;
        },
        onSuccess: (updatedClass) => {
            // Optimistically update local cache
            queryClient.setQueryData(['classes'], (old: any) =>
                old?.map((cls: any) => (cls.id === updatedClass.id ? updatedClass : cls))
            );
            queryClient.invalidateQueries({ queryKey: ["classes"] });
            queryClient.invalidateQueries({ queryKey: ["class", updatedClass.id] });
            toast.success('Class updated successfully');
        },
        onError: (err: any) => {
            const message = err.response?.data || 'Error updating class';
            toast.error(message);
        },
    });
};

// Delete class
export const useDeleteClass = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            const res = await api.delete(`/class/${id}`);
            return { id, ...res.data };
        },
        onSuccess: (deleted) => {
            queryClient.setQueryData(['classes'], (old: any) =>
                old?.filter((cls: any) => cls.id !== deleted.id)
            );
            toast.success('Class deleted successfully');
        },
        onError: (err: any) => {
            const message = err.response?.data || 'Error deleting class';
            toast.error(message);
        },
    });
};

export const useClassDashboardData = () => {
    return useQuery<ClassDashboardData>({
        queryKey: ["classDashboard"],
        queryFn: async () => {
            const res = await api.get("/dashboard/class");
            return res.data.data;
        },
    });
};
