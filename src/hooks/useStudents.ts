import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import type { Student, StudentForm } from "../types/student.types";

export interface StudentDashboardData {
  totalStudents: number,
  totalStudentRegisterOnThisMonth: number
}

// Fetch all students by school
export const useStudentsBySchool = () => {
  return useQuery({
    queryKey: ["students"],
    queryFn: async () => {
      const res = await api.get("/student/by-school");
      return res.data.data as Student[];
    },
  });
};

// Add Student
export const useAddStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (studentData: StudentForm) => {
      const res = await api.post("/student", studentData);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Student added successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to add student");
    },
  });
};

// Update Student
export const useUpdateStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: StudentForm }) => {
      const res = await api.put(`/student/${id}`, updates);
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Student updated successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to update student");
    },
  });
};

// Delete Student
export const useDeleteStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/student/${id}`);
      return id;
    },
    onSuccess: () => {
      toast.success("Student deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["students"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error || "Failed to delete student");
    },
  });
};

export const useStudentDashboardData = () => {
  return useQuery<StudentDashboardData>({
    queryKey: ["studentDashboardData"],
    queryFn: async () => {
      const res = await api.get("/dashboard/school");
      return res.data.data;
    },
  });
};
