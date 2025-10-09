import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import toast from 'react-hot-toast';

// Create Section
export const useCreateSection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (sectionData: { class_id: number; section_name: string }) => {
            const res = await api.post('/section', sectionData);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Section added successfully");
            queryClient.invalidateQueries({ queryKey: ['sections'] }); // refetch section list
        },
        onError: (err: any) => {
            const message = err.response?.data?.error || 'Error adding section';
            toast.error(message);
        },
    });
};

//  Get Sections by Class
export const useSectionsByClass = (classId: string | number | null) => {
    return useQuery({
        queryKey: ['sections', classId],
        queryFn: async () => {
            const res = await api.get(`/section/class/${classId}`);
            return res.data.data;
        },
        enabled: !!classId, // only fetch if classId exists
    });
};

//  Get Section Details
export const useSectionDetails = (id: number | null) => {
    return useQuery({
        queryKey: ['section', id],
        queryFn: async () => {
            const res = await api.get(`/section/${id}`);
            return res.data.data;
        },
        enabled: !!id, // only fetch if id exists
    });
};

//  Update Section
export const useUpdateSection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (updateData: { id: number; section_name: string }) => {
            const res = await api.put('/section', updateData);
            return res.data.data;
        },
        onSuccess: (data) => {
            toast.success("Section updated successfully");
            queryClient.invalidateQueries({ queryKey: ['sections'] });
            queryClient.invalidateQueries({ queryKey: ['section', data.id] });
        },
        onError: (err: any) => {
            const message = err.response?.data?.error || 'Error updating section';
            toast.error(message);
        },
    });
};

//  Delete Section
export const useDeleteSection = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: number) => {
            await api.delete('/section', { data: { id } });
            return id;
        },
        onSuccess: () => {
            toast.success("Section removed successfully");
            queryClient.invalidateQueries({ queryKey: ['sections'] });
        },
        onError: (err: any) => {
            const message = err.response?.data?.error || 'Error deleting section';
            toast.error(message);
        },
    });
};
