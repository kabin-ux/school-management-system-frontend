import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";

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

export interface SuperAdminDashboard {
  totalSchools: number;
  totalStudents: number;
  totalTeachers: number;
  totalAccountants: number;
  totalParents: number;
}

export interface PaymentData {
  status: string;
  totalAmount: number;
}

export interface AccountantDashboard {
  totalStudents: number;
  totalTeachers: number;
  totalclass: number;
  totalPayment: PaymentData[];
  todayTransaction: number;
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
