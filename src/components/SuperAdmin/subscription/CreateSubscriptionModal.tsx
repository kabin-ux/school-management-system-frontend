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
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold">Add Subscription</h2>
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
                            className="input"
                        />
                        {errors.name && <p className="error">{errors.name.message}</p>}
                    </div>

                    {/* Total Fee */}
                    <div>
                        <label className="label">Total Fee *</label>
                        <input
                            type="number"
                            {...register("total_fee", {
                                required: "Total fee is required",
                                valueAsNumber: true,
                            })}
                            className="input"
                        />
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="label">Discount</label>
                        <input
                            type="number"
                            {...register("discount", {
                                valueAsNumber: true,
                            })}
                            className="input"
                        />
                    </div>

                    {/* Subscription Type */}
                    <div>
                        <label className="label">Subscription Type *</label>
                        <select
                            {...register("subscription_type", {
                                required: "Subscription type is required",
                            })}
                            className="input"
                        >
                            <option value="SILVER">SILVER</option>
                            <option value="GOLD">GOLD</option>
                            <option value="PLATINUM">PLATINUM</option>
                        </select>
                    </div>

                    {/* Maintenance Fee */}
                    <div>
                        <label className="label">Maintenance Fee</label>
                        <input
                            {...register("maintenance_fee")}
                            className="input"
                            placeholder="Optional"
                        />
                    </div>

                    {/* Remarks */}
                    <div>
                        <label className="label">Remarks</label>
                        <textarea
                            {...register("remarks")}
                            className="input"
                            rows={3}
                        />
                    </div>

                    {errors.root && (
                        <p className="text-sm text-red-600">{errors.root.message}</p>
                    )}
                </div>

                {/* Footer */}
                <div className="flex justify-end gap-3 p-6 border-t">
                    <button type="button" onClick={onClose} className="btn-secondary">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading || isSubmitting}
                        className="flex items-center gap-2 w-max bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                        {isSubmitting ? "Saving..." : "Add Subscription"}
                    </button>
                </div>
            </form>
        </div>
    );
};
