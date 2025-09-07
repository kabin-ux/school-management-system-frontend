export interface Transportation {
    id: string
    vehicleNumber: string;
    driverName: string;
    driverPhone: string;
    last_location: string;
    capacity: number;
    price: number;
    status: string;
    created_by ?: string | null;
    createdAt ?: Date;
    updatedAt ?: Date;
    deletedAt ?: Date | null;
}