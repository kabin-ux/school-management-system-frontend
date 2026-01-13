import React from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import type { Subscription } from "../../../hooks/useSubscription";

interface SubscriptionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Subscription) => Promise<void> | void;
    isLoading: boolean;
}

export const AddSubscriptionModal: React.FC<SubscriptionModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<Subscription>({
        mode: "onChange",
        defaultValues: {
            name: "",
            total_fee: 0,
            discount: 0,
            subscription_type: "SILVER",
            remarks: "",
            maintenance_fee: 0,
        },
    });

    const onFormSubmit = async (data: Subscription) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            setError("root", {
                message: "Failed to add subscription. Please try again.",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <form
                onSubmit={handleSubmit(onFormSubmit)}
                className="bg-white rounded-lg shadow-xl w-full max-w-md"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">
                        Add Subscription
                    </h2>
                    <button type="button" onClick={onClose}>
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="label">Name *</label>
                        <input
                            {...register("name", { required: "Name is required" })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.name
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}
                        />
                        {errors.name && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.name.message}
                            </p>
                        )}                    </div>

                    {/* Total Fee */}
                    <div>
                        <label className="label">Total Fee *</label>
                        <input
                            type="number"
                            {...register("total_fee", {
                                required: "Total fee is required",
                                valueAsNumber: true,
                            })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.total_fee
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}
                        />
                        {errors.total_fee && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.total_fee.message}
                            </p>
                        )}
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="label">Discount</label>
                        <input
                            type="number"
                            {...register("discount", {
                                valueAsNumber: true,
                            })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.discount
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}
                        />
                        {errors.discount && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.discount.message}
                            </p>
                        )}
                    </div>

                    {/* Subscription Type */}
                    <div>
                        <label className="label">Subscription Type *</label>
                        <select
                            {...register("subscription_type", {
                                required: "Subscription type is required",
                            })}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.subscription_type
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}
                        >
                            <option value="SILVER">SILVER</option>
                            <option value="GOLD">GOLD</option>
                            <option value="PLATINUM">PLATINUM</option>
                            <option value="TRIAL">TRIAL</option>
                        </select>
                        {errors.subscription_type && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.subscription_type.message}
                            </p>
                        )}
                    </div>

                    {/* Maintenance Fee */}
                    <div>
                        <label className="label">Maintenance Fee</label>
                        <input
                            {...register("maintenance_fee")}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.maintenance_fee
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-gray-300 focus:ring-blue-500"
                                }
                                ${isLoading || isSubmitting
                                    ? "bg-gray-100 cursor-not-allowed text-gray-500"
                                    : ""
                                }
                            `}
                            placeholder="Optional"
                        />
                        {errors.maintenance_fee && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.maintenance_fee.message}
                            </p>
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
                            `}
                            rows={3}
                        />
                        {errors.remarks && (
                            <p
                                className="mt-1 text-sm text-red-600 flex items-center gap-1"
                                role="alert"
                            >
                                <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
                                    !
                                </span>
                                {errors.remarks.message}
                            </p>
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
                        `}
                    >
                        {isSubmitting ? "Saving..." : "Add Subscription"}
                    </button>
                </div>
            </form >
        </div >
    );
};
