export interface SuperAdminForm {
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    address: string;
    created_by: string | null;
    status: "active" | "inactive" | string;
    profile_image: string | null;
    phone_number: string;
    createdAt?: string;
    updatedAt?: string;
    deletedAt?: string | null;
}