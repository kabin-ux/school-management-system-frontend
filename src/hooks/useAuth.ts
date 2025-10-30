import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";

// Local storage helpers
const saveAuthData = (data: any, role: string) => {
    localStorage.setItem("auth", JSON.stringify(data.data));
    localStorage.setItem("token", data.data.accessToken);
    localStorage.setItem("role", role);
};

const clearAuthData = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
    localStorage.removeItem("role");
};

// Super Admin Login
export const useLoginSuperAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const res = await api.post("/super-admin/login", credentials);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success("Super Admin logged in successfully");
            saveAuthData(data, "superadmin");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to login super admin");
        },
    });
};

// Admin Login
export const useLoginAdmin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            email,
            password,
            rememberMe,
        }: {
            email: string;
            password: string;
            rememberMe: boolean;
        }) => {
            const res = await api.post("/school/login", { email, password });

            if (rememberMe) {
                localStorage.setItem("rememberMe", "true");
            } else {
                localStorage.removeItem("rememberMe");
            }

            return res.data;
        },
        onSuccess: (data) => {
            toast.success("Admin logged in successfully");
            saveAuthData(data, "admin");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to login admin");
        },
    });
};

// Super Admin Login
export const useLoginAccountant = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (credentials: { email: string; password: string }) => {
            const res = await api.post("/accountant/login", credentials);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success("Accountant logged in successfully");
            saveAuthData(data, "accountant");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to login accountant");
        },
    });
};

// Logout Hooks
export const useLogoutSuperAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await api.get("/super-admin/logout");
            return res.data;
        },
        onSuccess: () => {
            toast.success("Super Admin logged out successfully");
            clearAuthData();
            queryClient.clear();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to logout super admin");
        },
    });
};

export const useLogoutSchool = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await api.get("/school/logout");
            return res.data;
        },
        onSuccess: () => {
            toast.success("Admin logged out successfully");
            clearAuthData();
            queryClient.clear();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to logout admin");
        },
    });
};

export const useLogoutAccountant = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const res = await api.get("/accountant/logout");
            return res.data;
        },
        onSuccess: () => {
            toast.success("Accountant logged out successfully");
            clearAuthData();
            queryClient.clear();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.error || "Failed to logout accountant");
        },
    });
};

// Change Password (Super Admin)
export const useChangeSuperAdminPassword = () => {
    return useMutation({
        mutationFn: async (passwordData: {
            oldPassword: string;
            newPassword: string;
            confirmPassword: string;
        }) => {
            const res = await api.post("/super-admin/change-password", passwordData);
            return res.data;
        },
    });
};

// Send Password Reset Mail
export const useSendPasswordResetMail = () => {
    return useMutation({
        mutationFn: async (emailData: { email: string }) => {
            const res = await api.post("/super-admin/password-reset-mail", emailData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Password reset email sent!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to send email");
        },
    });
};

// Send Password Reset Mail
export const useSendPasswordResetMailAdmin = () => {
    return useMutation({
        mutationFn: async (emailData: { email: string }) => {
            const res = await api.post("/school/password-reset-mail", emailData);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Password reset email sent!");
        },
        onError: (err: any) => {
            toast.error(err.response?.data?.message || "Failed to send email");
        },
    });
};

// Reset Super Admin Password
export const useResetSuperAdminPassword = () => {
    return useMutation({
        mutationFn: async (payload: {
            token: string;
            id: string;
            password: string;
            confirmPassword: string;
        }) => {
            const { token, id, ...password } = payload;
            const res = await api.post(
                `/super-admin/password-reset?token=${token}&id=${id}`,
                password
            );
            return res.data;
        },
    });
};

// Reset Super Admin Password
export const useResetAdminPassword = () => {
    return useMutation({
        mutationFn: async (payload: {
            token: string;
            id: string;
            password: string;
            confirmPassword: string;
        }) => {
            const { token, id, ...password } = payload;
            const res = await api.post(
                `/school/password-reset?token=${token}&id=${id}`,
                password
            );
            return res.data;
        },
    });
};

export const useAuthUser = () => {
    return useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            const stored = localStorage.getItem("auth");
            return stored ? JSON.parse(stored) : null;
        },
        initialData: () => {
            const stored = localStorage.getItem("auth");
            return stored ? JSON.parse(stored) : null;
        },
    });
};
