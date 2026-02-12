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
    retry: 2
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
    retry: 2
  });
};

// Promote Single Student to Next Class
export const usePromoteStudentToNextClass = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ classId, sectionId, studentId }: {
      classId: string | number;
      sectionId: string | number;
      studentId: string | number
    }) => {
      const res = await api.put("/student/promote-class", {
        class_id: classId,
        section_id: sectionId,
        student_id: studentId
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Student promoted successfully");
      // Invalidate student lists and individual student queries
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
      // Also invalidate class/section related queries if you have them
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to promote student");
    },
  });
};

// Promote Multiple Students to Next Class (Bulk)
export const usePromoteStudentsBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ students, classId, sectionId }: {
      students: (string | number)[];
      classId: string | number;
      sectionId: string | number
    }) => {
      const res = await api.put("/student/bulk-promote-class", {
        students,
        class_id: classId,
        section_id: sectionId
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Students promoted successfully");
      // Invalidate student lists and related queries
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
      queryClient.invalidateQueries({ queryKey: ["classes"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to promote students");
    },
  });
};

export const useUpdateStudentStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ student_id, status }: {
      student_id: string | number;
      status: "active" | "inactive"
    }) => {
      const res = await api.patch("/student/change-status", {
        student_id,
        status,
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Student status changed successfully");
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to change student status");
    },
  });
};

export const useUpdateStudentStatusBulk = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ students_id, status }: {
      students_id: (string | number)[];
      status: "ACTIVE" | "INACTIVE"
    }) => {
      const res = await api.patch("/student/change-status-bulk", {
        students_id,
        status,
      });
      return res.data.data;
    },
    onSuccess: () => {
      toast.success("Students status changed successfully");
      // Invalidate relevant queries to refresh the UI
      queryClient.invalidateQueries({ queryKey: ["students"] });
      queryClient.invalidateQueries({ queryKey: ["student"] });
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to change students status");
    },
  });
};
