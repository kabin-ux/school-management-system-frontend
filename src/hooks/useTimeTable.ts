import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { TimetableCreateSchema } from "../zod-schema/timetable";

export const useCreateTimetable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (timetableData: TimetableCreateSchema) => {
            const res = await api.post("/timetable", timetableData);
            return res.data.data;
        },
        onSuccess: () => {
            toast.success("Timetable created successfully");
            // refetch all timetables after creation
            queryClient.invalidateQueries({ queryKey: ["timetables"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete timetable");
        },
    });
};

export const useAllTimetables = () => {
    return useQuery({
        queryKey: ["timetables"],
        queryFn: async () => {
            const res = await api.get("/timetable");
            return res.data.data;
        },
    });
};

export const useTimetableByClassId = (classId: string | undefined) => {
    return useQuery({
        queryKey: ["timetable", "class", classId],
        queryFn: async () => {
            const res = await api.get(`/timetable/class/${classId}`);
            return res.data.data;
        },
        enabled: !!classId, // only fetch if classId exists
    });
};

export const useTimetableBySection = (sectionId: string | undefined) => {
    return useQuery({
        queryKey: ["timetable", "section", sectionId],
        queryFn: async () => {
            const res = await api.get(`/timetable/section/${sectionId}`);
            return res.data.data;
        },
        enabled: !!sectionId,
    });
};

export const useTimetableById = (id: string | undefined) => {
    return useQuery({
        queryKey: ["timetable", id],
        queryFn: async () => {
            const res = await api.get(`/timetable/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });
};

export const useDeleteTimetable = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/timetable/${id}`);
            return id;
        },
        onSuccess: (deletedId) => {
            toast.success("Timetable deleted successfully");
            // remove from cache
            queryClient.setQueryData<any[]>(["timetables"], (old) =>
                old ? old.filter((t) => t.id !== deletedId) : []
            );
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to delete timetable");
        },
    });
};
