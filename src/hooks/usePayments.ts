import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

type ClearFeePayload = {
  id: string;
  type?: 'PARTIAL' | 'COMPLETED'; // use your PaymentStatus enum if shared
  amount?: number;
};

// FETCH ALL PAYMENTS
export const useAllPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: async () => {
      const res = await api.get("/payment");
      return res.data.data;
    },
  });
};

// FETCH PAYMENT DETAILS BY ID
export const usePaymentDetails = (id: string) => {
  return useQuery({
    queryKey: ["payment", id],
    queryFn: async () => {
      const res = await api.get(`/payment/${id}`);
      return res.data.data;
    },
    enabled: !!id, // only fetch if ID exists
  });
};

// FETCH FEES INFO OF A PARTICULAR STUDENT
export const useStudentFeesInfo = (studentId: string) => {
  return useQuery({
    queryKey: ["studentFees", studentId],
    queryFn: async () => {
      const res = await api.get(`/payment/student/${studentId}`);
      return res.data.data;
    },
    enabled: !!studentId,
  });
};

// CREATE PAYMENT (auto/manual)
export const useCreatePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/payment");
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

// CREATE PAYMENT SCHOOL-WISE
export const useCreatePaymentSchoolWise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/payment/school-wise");
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

// CLEAR PAYMENT (mark as completed)
export const useClearFeePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, type, amount }: ClearFeePayload) => {
      const res = await api.put(`/payment/clear-fee/${id}`, undefined, {
        params: {
          type,
          amount,
        },
      });

      // if you want the updated payment back, return res.data.data
      return res.data.data;
    },
    onSuccess: async () => {
      // keep UI in sync with backend
      await queryClient.invalidateQueries({ queryKey: ['payments'] });
    },
  });
};

// CHANGE PAYMENT STATUS
export const useChangePaymentStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (statusInfo: { paymentId: string; status: string }) => {
      const res = await api.put("/payment/status", statusInfo);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

// DELETE SINGLE PAYMENT
export const useDeletePayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/payment/${id}`);
      return id;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};

// DELETE ALL PAYMENTS
export const useDeleteAllPayments = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      await api.delete("/payment");
      return true;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};
