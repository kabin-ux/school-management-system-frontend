import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import type { Invoice } from "../types/invoice.types";

// Types
export interface AttendanceData {
  date: string;
  count: number;
}

export interface ClassWiseAttendanceData {
  date: string;
  class_id: string;
  class_name: string;
  count: number;
}

export interface SchoolAdminDashboard {
  totalClasses: number;
  totalStudents: number;
  totalTeachers: number;
  totalParents: number;
  totalAccountant: number;
  totalSupportTicket: number;
  last7DaysAttendanceGraphData: AttendanceData[];
  last7DaysClassWiseAttendanceGraphData: ClassWiseAttendanceData[];
}

export interface AttendanceData {
  grade: string;
  percentage: number;
}

export interface AttendanceItem {
  date: string;
  present: string;
  absent: string;
  leave: string;
}

export interface SuperAdminDashboard {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalAccountants: number;
  totalParents: number;
  totalSupportTickets: number;
}

export interface PaymentData {
  status: string;
  totalAmount: number;
}

export interface PaymentGraph {
  date: string;
  totalAmount: number;
}

export interface AccountantDashboard {
  totalStudents: number;
  totalTeachers: number;
  totalclass: number;
  totalPayment: PaymentData[];
  todayTransaction: number;
  paymentGraphData: PaymentGraph[];
}

export interface RecentActivity {
  id: string,
  school_id: string,
  action: string,
  description: string,
  createdAt: string,
  updatedAt: string
}

// Fetch School Admin Dashboard
export const useSchoolAdminDashboard = () => {
  return useQuery<SchoolAdminDashboard>({
    queryKey: ["school-admin-dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/school");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2
  });
};

export const useSchoolAdminDashboardLineChart = () => {
  return useQuery<AttendanceItem[]>({
    queryKey: ["school-admin-dashboard-line-chart"],
    queryFn: async () => {
      const res = await api.get("/attendance/dashboard/weekly");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2
  });
};

export const useSchoolAdminDashboardPieChart = () => {
  return useQuery<AttendanceData[]>({
    queryKey: ["school-admin-dashboard-pie-chart"],
    queryFn: async () => {
      const res = await api.get("/attendance/dashboard/grade-summary");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2
  });
};

// Fetch Super Admin Dashboard
export const useSuperAdminDashboard = () => {
  return useQuery<SuperAdminDashboard>({
    queryKey: ["super-admin-dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/super-admin");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2
  });
};

export const useAccountantDashboard = () => {
  return useQuery<AccountantDashboard>({
    queryKey: ["super-admin-dashboard"],
    queryFn: async () => {
      const res = await api.get("/dashboard/accountant");
      return res.data.data;
    },
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
    retry: 2
  });
};

// Optional: invalidate all dashboard data (useful after updates)
export const useInvalidateDashboard = () => {
  const queryClient = useQueryClient();
  return () => {
    queryClient.invalidateQueries({ queryKey: ["school-admin-dashboard"] });
    queryClient.invalidateQueries({ queryKey: ["super-admin-dashboard"] });
  };
};

export const useRecentPayments = (limit = 10) => {
  return useQuery<Invoice[]>({
    queryKey: ["recentPayments", limit],
    queryFn: async () => {
      const res = await api.get(`/payment/recent?limit=${limit}`);
      return res.data.data;
    },
    retry: 2
  });
};

export const useRecentActivity = () => {
  return useQuery<RecentActivity[]>({
    queryKey: ["recentActivity"],
    queryFn: async () => {
      const res = await api.get(`/logs/my-school`);
      return res.data.data;
    },
    retry: 2
  });
};