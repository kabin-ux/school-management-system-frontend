import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/axios';

export type Subscription = {
    id: string;
    name: string;
    subscription_type: string;
    total_fee: number;
    discount: number;
    remarks?: string | null;
    createdAt: string;
    updatedAt: string;
    schools?: any[];
    maintenance_fee?: number;
};

export type CreateSubscriptionDto = {
    name: string;
    subscription_type: string;
    total_fee: number;
    discount?: number;
    remarks?: string;
    maintenance_fee?: number;
};

export type UpdateSubscriptionDto = Partial<CreateSubscriptionDto>;

export type AddSchoolOnSubscriptionDto = {
    school_id: string;
    subscription_id: string;
    ended_at?: string;
};

export type RemoveSchoolFromSubscriptionDto = {
    school_id: string;
};

// QUERIES

// GET /subscriptions
export const useSubscriptionsQuery = () =>
    useQuery({
        queryKey: ['subscriptions'],
        queryFn: async () => {
            const { data } = await api.get<{ data: Subscription[] }>(
                '/subscription',
            );
            return data.data;
        },
    });

// GET /subscriptions/:id
export const useSubscriptionQuery = (id: string | undefined) =>
    useQuery({
        queryKey: ['subscriptions', id],
        enabled: !!id,
        queryFn: async () => {
            const { data } = await api.get<{ data: Subscription }>(
                `/subscription/${id}`,
            );
            return data.data;
        },
    });

// MUTATIONS

// POST /subscriptions
export const useCreateSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: CreateSubscriptionDto) => {
            const { data } = await api.post<{ data: Subscription }>(
                '/subscription',
                payload,
            );
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
};

export const useUpdateSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        // just accept Subscription directly
        mutationFn: async (subscription: Subscription) => {
            const { id, ...rest } = subscription;

            const body: UpdateSubscriptionDto = {
                name: rest.name,
                subscription_type: rest.subscription_type,
                total_fee: rest.total_fee,
                discount: rest.discount,
                remarks: rest.remarks ?? undefined,
                maintenance_fee: rest.maintenance_fee,
            };

            const { data } = await api.put<{ data: Subscription }>(`subscription/${id}`, body);
            return data.data;
        },
        onSuccess: (sub) => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
            queryClient.invalidateQueries({ queryKey: ['subscriptions', sub.id] });
        },
    });
};


// DELETE /subscriptions/:id
export const useDeleteSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/subscription/${id}`);
            return id;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
};

// POST /subscriptions/add-school
export const useAddSchoolOnSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: AddSchoolOnSubscriptionDto) => {
            const { data } = await api.put<{ data: any }>(
                '/subscription/add',
                body,
            );
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
};

// POST /subscriptions/remove-school
export const useRemoveSchoolFromSubscriptionMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (body: RemoveSchoolFromSubscriptionDto) => {
            const { data } = await api.put<{ data: any }>(
                '/subscription/remove',
                body,
            );
            return data.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subscriptions'] });
        },
    });
};
