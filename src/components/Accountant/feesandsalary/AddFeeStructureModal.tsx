import React, { useEffect } from "react";
import { X } from "lucide-react";
import type { Grade } from "../../../types/class.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { feeStructureSchema, type FeeStructure } from "../../../zod-schema/fees";
import { useForm } from "react-hook-form";

interface FeeStructureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (feeData: FeeStructure) => void;
    classes: Grade[];
    isLoading: boolean;
}

export const AddFeeStructureModal: React.FC<FeeStructureModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    classes,
    isLoading,
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        clearErrors,
        setError,
    } = useForm<FeeStructure>({
        resolver: zodResolver(feeStructureSchema),
        mode: "onChange",
        defaultValues: {
            class_id: "",
            monthly_fee: 0,
            exam_fee: 0,
            tution_fee: 0,
            computer_fee: 0,
            laboratory_fee: 0,
            other_fee: 0,
        },
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen, reset, clearErrors]);

    const onFormSubmit = async (data: FeeStructure) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error("Form submission error:", error);
            setError("root", {
                message: "Failed to add fee structure. Please try again.",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Add Fee Structure</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class *
                            </label>
                            <select
                                {...register("class_id")}
                                disabled={isLoading || isSubmitting}
                                className={`w-full border rounded px-3 py-2 ${errors.class_id ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {errors.class_id && (
                                <p className="mt-1 text-sm text-red-600" role="alert">
                                    {errors.class_id.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Fee Inputs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[
                            { label: "Monthly Fee", name: "monthly_fee" },
                            { label: "Exam Fee", name: "exam_fee" },
                            { label: "Tuition Fee", name: "tution_fee" },
                            { label: "Computer Fee", name: "computer_fee" },
                            { label: "Laboratory Fee", name: "laboratory_fee" },
                            { label: "Other Fee", name: "other_fee" },
                        ].map((field) => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    {field.label}
                                </label>
                                <input
                                    type="number"
                                    step="0.01"
                                    {...register(field.name as keyof FeeStructure, {
                                        valueAsNumber: true,
                                    })}
                                    disabled={isLoading || isSubmitting}
                                    className={`w-full border rounded px-3 py-2 ${errors[field.name as keyof FeeStructure]
                                            ? "border-red-500"
                                            : "border-gray-300"
                                        }`}
                                />
                                {errors[field.name as keyof FeeStructure] && (
                                    <p className="mt-1 text-sm text-red-600" role="alert">
                                        {
                                            errors[field.name as keyof FeeStructure]?.message as
                                            | string
                                            | undefined
                                        }
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {isLoading || isSubmitting ? "Saving..." : "Save Fee Structure"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
