import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { Salary } from "../types/fee-salary.types";

type ClearFeePayload = {
  id: string;
  type?: 'Partial' | 'Completed'; // use your PaymentStatus enum if shared
  amount?: number;
};

type PaymentsFilters = {
  classId?: string;
  status?: string;
  date?: string; // ISO string or yyyy-mm-dd
};

type SalaryFilters = {
  status?: string;
  date?: string; // ISO string or yyyy-mm-dd
};

export interface SalaryPaymentAttributes {
  id: string;
  salary_structure_id: string;
  amount_paid: number;
  status: "pending" | "completed" | "failed";
  remarks?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;

  salaryStructure: Salary;
}

// FETCH ALL PAYMENTS
export const useAllPayments = (filters: PaymentsFilters = {}) => {
  const { classId, status, date } = filters;

  return useQuery({
    queryKey: ['payments', { classId, status, date }],
    queryFn: async () => {
      const res = await api.get('/payment', {
        params: {
          classId,
          status,
          date,
        },
      });
      return res.data.data;
    },
  });
};

// FETCH ALL STAFF PAYMENTS
export const useAllSalaryPayments = (filters: SalaryFilters) => {
  const { status, date } = filters;

  return useQuery({
    queryKey: ['salaryPayments', { status, date }],
    queryFn: async () => {
      const res = await api.get('/salary-payment/my-school', {
        params: {
          date,
          status
        }
      });
      return res.data.data as SalaryPaymentAttributes[];
    },
  });
};

export const useClearSalaryPayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await api.put(`/salary-payment/clear-payment/`,
        {
          id
        },
      );

      // if you want the updated payment back, return res.data.data
      return res.data.data;
    },
    onSuccess: async () => {
      // keep UI in sync with backend
      await queryClient.invalidateQueries({ queryKey: ['salaryPayments'] });
      toast.success('Salary Payment cleared successfully')
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Something went wrong while clearing salary payment';

      toast.error(message);
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
      toast.success('Fees payments created successfully');
    },
  });
};

export const useCreateSalaryPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const res = await api.post("/salary-payment");
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["salaryPayments"] });
      toast.success('Salary payments created successfully');
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
      toast.success('Payment cleared successfully')
    },
    onError: (error: AxiosError<any>) => {
      const message =
        error.response?.data?.error ||
        error.response?.data?.message ||
        'Something went wrong while clearing payment';

      toast.error(message);
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
