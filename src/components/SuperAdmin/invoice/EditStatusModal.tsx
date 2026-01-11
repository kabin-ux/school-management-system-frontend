// EditStatusModal.tsx
import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import type {
    PartnerSchoolPayment,
    PartnerPaymentStatus,
    PartnerPaymentMethod,
} from "../../../hooks/useSubscriptionPayment";

interface EditStatusFormValues {
    status: PartnerPaymentStatus;
    method: PartnerPaymentMethod;
    remarks?: string;
}

interface EditStatusModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: EditStatusFormValues) => Promise<void> | void;
    isLoading: boolean;
    payment: PartnerSchoolPayment | null;
}

export const EditStatusModal: React.FC<EditStatusModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    payment,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<EditStatusFormValues>({
        mode: "onChange",
        defaultValues: {
            status: (payment?.status as PartnerPaymentStatus) ?? "Pending",
            method: (payment?.method as PartnerPaymentMethod) ?? "None",
            remarks: payment?.remarks ?? "",
        },
        values: payment
            ? {
                status: payment.status as PartnerPaymentStatus,
                method: payment.method as PartnerPaymentMethod,
                remarks: payment.remarks ?? "",
            }
            : undefined,
    });

    const onFormSubmit = async (data: EditStatusFormValues) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch {
            setError("root", {
                message: "Failed to update payment status. Please try again.",
            });
        }
    };

    if (!isOpen || !payment) return null;

    return (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold">Edit Payment Status</h2>
                    <button type="button" onClick={onClose}>
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Status */}
                    <div>
                        <label className="label">Status *</label>
                        <select
                            {...register("status", { required: "Status is required" })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.status
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}                        >
                            <option value="Pending">Pending</option>
                            <option value="Completed">Completed</option>
                            <option value="Faile">Failed</option>
                            <option value="Partial Paid">Partial Paid</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                        {errors.status && (
                            <p className="text-sm text-red-600">{errors.status.message}</p>
                        )}
                    </div>

                    {/* Method */}
                    <div>
                        <label className="label">Method *</label>
                        <select
                            {...register("method", { required: "Method is required" })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.method
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}                        >
                            <option value="None">None</option>
                            <option value="Cash">Cash</option>
                            <option value="Online">Online</option>
                        </select>
                        {errors.method && (
                            <p className="text-sm text-red-600">{errors.method.message}</p>
                        )}
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="label">Remarks</label>
                        <textarea
                            {...register("remarks")}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.remarks
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `} rows={3}
                            placeholder="Optional remarks about this payment"
                        />
                        {errors.remarks && (
                            <p className="text-sm text-red-600">{errors.remarks.message}</p>
                        )}
                    </div>

                    {errors.root && (
                        <p className="text-sm text-red-600">{errors.root.message}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t">
                    <button type="button" onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || isSubmitting}
                        className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2
                            ${isLoading || isSubmitting
                                ? "bg-blue-400 cursor-not-allowed text-white"
                                : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            }
                        `}          >
                        {isSubmitting || isLoading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
};
