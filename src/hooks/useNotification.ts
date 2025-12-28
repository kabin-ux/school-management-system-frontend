import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import api from "../lib/axios";
import type { NoticeType, NotificationFormData } from "../types/Notification";

/*                                   Types                                    */

export interface Notice {
    id: string;
    subject: string;
    message: string;
    notice_for: "all" | "someone";
    recipients: string[];
    type: NoticeType;
    image: string[];
    expireAt: string;
    createdAt: string;
    updatedAt: string;
    created_by?: string;
    publish_by?: string;
}

/*                                   Queries                                  */

export const useAllNotices = () => {
    return useQuery<Notice[], Error>({
        queryKey: ["notices"],
        queryFn: async () => {
            const res = await api.get("/notice");
            return res.data.data;
        },
    });
};

export const useNoticeDetails = (id: string) => {
    return useQuery<Notice, Error>({
        queryKey: ["notice", id],
        queryFn: async () => {
            const res = await api.get(`/notice/${id}`);
            return res.data.data;
        },
        enabled: !!id,
    });
};

export const useMyNotices = () => {
    return useQuery<Notice[], Error>({
        queryKey: ["my-notices"],
        queryFn: async () => {
            const res = await api.get("/notice/me");
            return res.data.data;
        },
    });
};

export const useSchoolNotices = () => {
    return useQuery<Notice[], Error>({
        queryKey: ["school-notices"],
        queryFn: async () => {
            const res = await api.get("/notice/student");
            return res.data.data;
        },
    });
};

export const useMySchoolNotices = () => {
    return useQuery<Notice[], Error>({
        queryKey: ["my-school-notices"],
        queryFn: async () => {
            const res = await api.get("/notice/my-school");
            return res.data.data;
        },
    });
};

/*                                  Mutations                                 */

export const useSendNoticeForStudent = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            payload,
            files,
        }: {
            payload: NotificationFormData;
            files?: File[];
        }) => {
            const formData = new FormData();

            Object.entries(payload).forEach(([key, value]) => {
                if (Array.isArray(value)) {
                    value.forEach((v) => formData.append(`${key}[]`, v));
                } else if (value !== undefined && value !== null) {
                    formData.append(key, String(value));
                }
            });

            if (files?.length) {
                files.forEach((file) => formData.append("files", file));
            }

            const res = await api.post("/notice/student", formData);
            return res.data.data as Notice;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["school-notices"] });
            queryClient.invalidateQueries({ queryKey: ["my-school-notices"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to send notice");
        },
    });
};

export const useDeleteNotice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/notice/${id}`);
            return id;
        },
        onSuccess: (deletedId) => {
            toast.success("Notice deleted successfully");
            queryClient.setQueryData<Notice[]>(["notices"], (old) =>
                old ? old.filter((n) => n.id !== deletedId) : []
            );
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to delete notice");
        },
    });
};

export const useDeleteMySchoolNotice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/notice/student/${id}`);
            return id;
        },
        onSuccess: (deletedId) => {
            queryClient.setQueryData<Notice[]>(["school-notices"], (old) =>
                old ? old.filter((n) => n.id !== deletedId) : []
            );
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || "Failed to remove notice");
        },
    });
};
