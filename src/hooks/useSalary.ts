import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Salary, SalaryStructureForm } from "../types/fee-salary.types";

// Get All Salary Structures for My School
export const useMySchoolSalaryStructures = () => {
    return useQuery<Salary[]>({
        queryKey: ["mySchoolSalaryStructures"],
        queryFn: async () => {
            const res = await api.get("/salary/my-school");
            return res.data.data as Salary[];
        },
        retry: 2
    });
};

// Get Salary Structure by ID
export const useSalaryStructureById = (id?: number) => {
    return useQuery<Salary>({
        queryKey: ["salaryStructure", id],
        queryFn: async () => {
            const res = await api.get(`/salary/${id}`);
            return res.data.data as Salary;
        },
        enabled: !!id, // only run when id exists
        retry: 2
    });
};

// Create Salary Structure
export const useCreateSalaryStructure = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: SalaryStructureForm) => {
            const res = await api.post("/salary", data);
            return res.data.data as Salary;
        },
        onSuccess: () => {
            toast.success("Salary structure created successfully");
            queryClient.invalidateQueries({ queryKey: ["mySchoolSalaryStructures"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add salary structure");
        },
    });
};

// Update Salary Structure
export const useUpdateSalaryStructure = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, data }: { id: string; data: SalaryStructureForm }) => {
            const res = await api.put(`/salary/${id}`, data);
            return res.data.data as Salary;
        },
        onSuccess: (_, { id }) => {
            toast.success("Salary structure updated successfully");
            queryClient.invalidateQueries({ queryKey: ["mySchoolSalaryStructures"] });
            queryClient.invalidateQueries({ queryKey: ["salaryStructure", id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update salary structure");
        },
    });
};

// Delete Salary Structure
export const useDeleteSalaryStructure = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/salary/${id}`);
            return id;
        },
        onSuccess: () => {
            toast.success("Salary structure deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["mySchoolSalaryStructures"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete salary structure");
        },
    });
};
