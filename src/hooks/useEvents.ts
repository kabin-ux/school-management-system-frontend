import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Event } from "../types/events.types";

// Fetch All Events by School
export const useEventsBySchool = (target?: string) => {
    return useQuery({
        queryKey: ["events", target],
        queryFn: async () => {
            const res = await api.get("/event", {
                params: target ? { target } : {}
            });
            return res.data?.data as Event[];
        },
    });
};

// Fetch Single Event Details
export const useEventDetails = (id: number | string | undefined) => {
    return useQuery({
        queryKey: ["event", id],
        queryFn: async () => {
            const res = await api.get(`/event/${id}`);
            return res.data?.data as Event;
        },
        enabled: !!id,
    });
};

// Add Event
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (eventData: any) => {
            const res = await api.post("/event", eventData);
            return res.data?.data;
        },
        onSuccess: () => {
            toast.success("Event added successfully");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to add event");
        },
    });
};

// Update Event
export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, updateData }: { id: string, updateData: any }) => {
            const res = await api.put(`/event/${id}`, updateData);
            return res.data?.data;
        },
        onSuccess: (_, updatedEvent) => {
            toast.success("Event updated successfully");
            queryClient.invalidateQueries({ queryKey: ["events"] });
            queryClient.invalidateQueries({ queryKey: ["event", updatedEvent.id] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to update event");
        },
    });
};

// Delete Event
export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/event/${id}`);
            return id;
        },
        onSuccess: () => {
            toast.success("Event removed successfully");
            queryClient.invalidateQueries({ queryKey: ["events"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete event");
        },
    });
};


