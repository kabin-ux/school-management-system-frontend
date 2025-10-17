import type { Student } from "./student.types";

export interface Parent {
    id: string;
    avatar?: string;
    status?: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    relation: string;
    occupation: string;
    students?: Student[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}
export interface ParentForm {
    avatar?: string;
    status?: string;
    name: string;
    email: string;
    phone: string;
    address?: string;
    relation: string;
    occupation: string;
    students?: Student[];
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
}