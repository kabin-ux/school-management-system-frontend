import { z } from "zod";

export const TransportationStatus = {
  ACTIVE: "active",
  INACTIVE: "inactive",
} as const;

export type TransportationStatus = (typeof TransportationStatus)[keyof typeof TransportationStatus];

export const transportationSchema = z.object({
  vehicleNumber: z.string().min(1, "Vehicle number is required"),
  driverName: z.string().min(1, "Driver name is required"),
  driverPhone: z.string().min(1, "Driver phone is required"),
  last_location: z.string().min(1, "Last location is required"),
  capacity: z.number().int().min(1, "Capacity must be at least 1"),
  price: z.number().min(0, "Price must be at least 0"),
  status: z
    .enum([TransportationStatus.ACTIVE, TransportationStatus.INACTIVE])
});

export const updateTransportationSchema = transportationSchema.partial();

export type TransportationSchema = z.infer<typeof transportationSchema>;
export type UpdateTransportationType = z.infer<
  typeof updateTransportationSchema
>;
