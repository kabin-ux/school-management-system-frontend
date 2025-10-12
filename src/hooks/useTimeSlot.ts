// src/hooks/useTimeSlot.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { EditTimeSlotForm } from "../components/Admin/timetable/EditTimeSlotModal";
import toast from "react-hot-toast";

// QUERY HOOKS

// Get all time slots by timetable ID
export const useTimeSlotsByTimetable = (timetableId: string) => {
    return useQuery({
        queryKey: ["timeslots", "timetable", timetableId],
        queryFn: async () => {
            const res = await api.get(`/timeslot/timetable/${timetableId}`);
            return res.data.data;
        },
        enabled: !!timetableId, // Only run when timetableId exists
    });
};

// Get single time slot by ID
export const useTimeSlotById = (id: string) => {
    return useQuery({
        queryKey: ["timeslot", id],
        queryFn: async () => {
            const res = await api.get(`/timeslot/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });
};

// MUTATION HOOKS

// Create new time slot
export const useCreateTimeSlot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: any) => {
            const res = await api.post("/timeslot", data);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Timeslot created successfully");
            queryClient.invalidateQueries({ queryKey: ["timeslots"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete timeslot");
        },
    });
};

// Update existing time slot
export const useUpdateTimeSlot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            timeslotData,
        }: {
            id: string;
            timeslotData: EditTimeSlotForm;
        }) => {
            const res = await api.put(`/timeslot/${id}`, timeslotData);
            return res.data.data;
        },
        onSuccess: (updatedSlot) => {
            toast.success("Timeslot updated successfully");
            queryClient.invalidateQueries({ queryKey: ["timeslots"] });
            queryClient.invalidateQueries({ queryKey: ["timetables"] });
            queryClient.invalidateQueries({ queryKey: ["timeslot", updatedSlot.id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete timeslot");
        },
    });
};

// Delete time slot
export const useDeleteTimeSlot = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/timeslot/${id}`);
            return id;
        },
        onSuccess: (deletedId) => {
            toast.success("Timeslot deleted successfully");
            queryClient.invalidateQueries({ queryKey: ["timeslots"] });
            queryClient.removeQueries({ queryKey: ["timeslot", deletedId] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete timeslot");
        },
    });
};

// Change tag of time slot
export const useChangeTimeSlotTag = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, tag }: { id: string; tag: string }) => {
            const res = await api.patch(`/timeslot/${id}/tag`, { tag });
            return res.data.data;
        },
        onSuccess: (updatedSlot) => {
            toast.success("Timeslot tag changed successfully");
            queryClient.invalidateQueries({ queryKey: ["timeslots"] });
            queryClient.invalidateQueries({ queryKey: ["timeslot", updatedSlot.id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete timeslot");
        },
    });
};
