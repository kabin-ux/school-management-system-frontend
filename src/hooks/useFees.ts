import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';
import type { FeeStructureAttributes } from '../types/fee-salary.types';
import toast from 'react-hot-toast';

// Fetch My School Fee Structures
export const useMySchoolFeesStructures = () => {
    return useQuery<FeeStructureAttributes[]>({
        queryKey: ['mySchoolFeesStructures'],
        queryFn: async () => {
            const res = await api.get('/fees/my-school');
            return res.data.data as FeeStructureAttributes[];
        },
        retry: 2
    });
};

// Fetch All Schools Fee Structures
export const useAllSchoolsFeesStructures = () => {
    return useQuery({
        queryKey: ['allSchoolFeesStructures'],
        queryFn: async () => {
            const res = await api.get('/fees');
            return res.data.data as FeeStructureAttributes[];
        },
        retry: 2
    });
};

// Fetch Fee Structure By Id
export const useFeeStructureById = (id?: number) => {
    return useQuery({
        queryKey: ['feeStructure', id],
        queryFn: async () => {
            const res = await api.get(`/fees/${id}`);
            return res.data.data.feesStructure as FeeStructureAttributes;
        },
        enabled: !!id, // only fetch if id exists
        retry: 2
    });
};

// Add Fee Structure
export const useAddFeeStructure = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post('/fees', data);
            return res.data.data as FeeStructureAttributes;
        },
        onSuccess: () => {
            toast.success("Fee structure added successfully");
            queryClient.invalidateQueries({ queryKey: ['mySchoolFeesStructures'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add fee structure");
        },
    });
};

// Update Fee Structure
export const useUpdateFeeStructure = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, feeStructureData }: { id: string, feeStructureData: any }) => {
            const res = await api.put(`/fees/${id}`, feeStructureData);
            return res.data.data as FeeStructureAttributes;
        },
        onSuccess: () => {
            toast.success("Fee structure updated successfully");
            queryClient.invalidateQueries({ queryKey: ['mySchoolFeesStructures'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update fee structure");
        },
    });
};

// Delete Fee Structure
export const useDeleteFeeStructure = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/fees/${id}`);
            return id;
        },
        onSuccess: () => {
            toast.success("Fee structure deleted successfully");
            queryClient.invalidateQueries({ queryKey: ['mySchoolFeesStructures'] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete fee structure");
        },
    });
};
