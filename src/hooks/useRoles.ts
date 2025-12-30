import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

/* Types */
export interface Role {
    id: string;
    name: string;
    school_id: string;
}

/* Query keys */
const ROLE_QUERY_KEY = ["school-roles"];

//    Get all roles
export const useGetRoles = () => {
    return useQuery({
        queryKey: ROLE_QUERY_KEY,
        queryFn: async () => {
            const res = await api.get("/role");
            return res.data.data; // matches ApiResponse
        },
    });
};

//    Create role
export const useCreateRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { name: string }) => {
            const res = await api.post("/role", data);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY });
        },
    });
};

//    Delete role
export const useDeleteRole = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            const res = await api.delete(`/role/${id}`);
            return res.data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ROLE_QUERY_KEY });
        },
    });
};
