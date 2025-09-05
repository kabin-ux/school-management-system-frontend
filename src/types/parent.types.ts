import type { Student } from "../features/studentSlice";

export interface Parent {
    id: number;
    avatar?: string;
    status?: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    relation: string;
    occupation: string;
    students?: Student[];
}