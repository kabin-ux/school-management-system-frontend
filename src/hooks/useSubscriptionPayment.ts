import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { SchoolData } from "../types/partner-school.types";
import type { Subscription } from "./useSubscription";

// ---- Types ----
export const PartnerPaymentStatus = {
  PENDING: "PENDING",
  COMPLETED: "COMPLETED",
  CANCELLED: "CANCELLED",
} as const;

export type PartnerPaymentStatus =
  (typeof PartnerPaymentStatus)[keyof typeof PartnerPaymentStatus];

export const PartnerPaymentMethod = {
  CASH: "CASH",
  ONLINE: "ONLINE",
  NONE: "NONE",
} as const;

export type PartnerPaymentMethod =
  (typeof PartnerPaymentMethod)[keyof typeof PartnerPaymentMethod];

export interface PartnerSchoolPayment {
  id: string;
  amount: number;
  school_id: string;
  subscription_id: string;
  status: PartnerPaymentStatus;
  method: PartnerPaymentMethod;
  discount?: number;
  remarks?: string;
  createdAt: string;
  updatedAt: string;
  school?: SchoolData;
  subscription?: Subscription
}

type ApiEnvelope<T> = { data: T };

// POST /subscription-payment/generate
export const useCreateSubscriptionPaymentsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const { data } = await api.post<ApiEnvelope<PartnerSchoolPayment[]>>(
        "/subscription-payment/generate",
      );
      return data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-payments"] });
    },
  });
};

export interface UpdatePaymentStatusDto {
  id: string;
  status: PartnerPaymentStatus;
  method: PartnerPaymentMethod;
  remarks?: string;
}

export const useUpdateSubscriptionPaymentStatusMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...payload }: UpdatePaymentStatusDto) => {
      const { data } = await api.put<ApiEnvelope<PartnerSchoolPayment>>(
        `/subscription-payment/${id}`,
        payload,
      );
      return data.data;
    },
    onSuccess: (payment) => {
      queryClient.invalidateQueries({ queryKey: ["subscription-payments"] });
      queryClient.invalidateQueries({
        queryKey: ["subscription-payment", payment.id],
      });
    },
  });
};

export const useSubscriptionPaymentsQuery = (date?: string, schoolId?: string) =>
  useQuery({
    // Adding date and schoolId to the queryKey ensures the cache 
    // invalidates and refetches when these values change.
    queryKey: ["subscription-payments", { date, schoolId }],
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<PartnerSchoolPayment[]>>(
        "/subscription-payment",
        {
          params: {
            date,
            id: schoolId // Mapping 'schoolId' to 'id' to match req.query.id
          }
        }
      );
      return data.data;
    },
    // Keep it enabled only if we don't strictly require an ID, 
    // or customize based on your needs:
    enabled: true,
    retry: 2
  });

export const useSubscriptionPaymentByIdQuery = (
  id: string | undefined,
  enabled = true,
) =>
  useQuery({
    queryKey: ["subscription-payment", id],
    enabled: !!id && enabled,
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<PartnerSchoolPayment>>(
        `/subscription-payment/${id}`,
      );
      return data.data;
    },
    retry: 2
  });

export const useDeleteSubscriptionPaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/subscription-payment/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["subscription-payments"] });
    },
  });
};

export interface SchoolWiseTotalPayment {
  status?: PartnerPaymentStatus;
  total_amount: number;
  school?: { id: string; name: string };
}

export const useSchoolWiseTotalPaymentsQuery = (
  schoolId: string | undefined,
  status?: PartnerPaymentStatus,
) =>
  useQuery({
    queryKey: ["school-total-payments", schoolId, status],
    enabled: !!schoolId,
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<SchoolWiseTotalPayment[]>>(
        `/subscription-payment/school/${schoolId}`,
        {
          params: status ? { status } : undefined,
        },
      );
      return data.data;
    },
    retry: 2
  });

export const useClearSubscriptionPaymentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (schoolId: string) => {
      const { data } = await api.put<ApiEnvelope<PartnerSchoolPayment[]>>(
        `/subscription-payment/clear/${schoolId}`,
      );
      return data.data;
    },
    onSuccess: (_payments, schoolId) => {
      queryClient.invalidateQueries({
        queryKey: ["school-total-payments", schoolId],
      });
      queryClient.invalidateQueries({ queryKey: ["subscription-payments"] });
    },
  });
};

export const useMySchoolTotalPaymentsQuery = (
  status?: PartnerPaymentStatus,
) =>
  useQuery({
    queryKey: ["my-school-total-payments", status],
    queryFn: async () => {
      const { data } = await api.get<ApiEnvelope<SchoolWiseTotalPayment[]>>(
        "/subscription-payment/my-school",
        {
          params: status ? { status } : undefined,
        },
      );
      return data.data;
    },
    retry: 2
  });
