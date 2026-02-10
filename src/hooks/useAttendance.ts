import { useQuery } from "@tanstack/react-query";
import api from "../lib/axios";

//  Types
export interface StudentAttendance {
    id: string;
    studentId: string;
    teacherId: string;
    status: "present" | "absent" | "leave";
    createdAt: string;
    updatedAt?: string;
}

export interface TeacherAttendance {
    id: string;
    teacherId: string;
    status: "present" | "absent" | "leave";
    createdAt: string;
    updatedAt?: string;
}

export const useAttendanceReport = (
    type: "student" | "teacher",
    fromDate?: string,
    toDate?: string
) => {
    return useQuery({
        queryKey: ["attendance-report", type, fromDate, toDate],
        queryFn: async () => {
            const params = new URLSearchParams({ type, fromDate: fromDate || "", toDate: toDate || "" }).toString();
            const res = await api.get(`/attendance/report?${params}`);
            return res.data.data;
        },
        retry: 2
    });
};

export const useTeacherDailySummary = (date: string) => {
    return useQuery({
        queryKey: ["teacher-daily-summary", date],
        queryFn: async () => {
            const res = await api.get(`/attendance/teacher-summary?date=${date}`);
            return res.data.data;
        },
        enabled: !!date,
        retry: 2
    });
};

export const useAbsenteeAlerts = (date: string) => {
    return useQuery({
        queryKey: ["absentee-alerts", date],
        queryFn: async () => {
            const res = await api.get(`/attendance/absentees?date=${date}`);
            return res.data.data;
        },
        enabled: !!date,
        retry: 2
    });
};

export const useStudentAttendanceByClassSection = (
    classId: string,
    sectionId: string,
    startDate?: string,
    endDate?: string
) => {
    return useQuery({
        queryKey: ["attendance-student", classId, sectionId, startDate, endDate],
        queryFn: async () => {
            const params = new URLSearchParams({
                classId,
                sectionId,
                startDate: startDate || "",
                endDate: endDate || "",
            }).toString();

            const res = await api.get(`/attendance/student?${params}`);
            return res.data.data;
        },
        enabled: !!classId && !!sectionId,
        retry: 2
    });
};
