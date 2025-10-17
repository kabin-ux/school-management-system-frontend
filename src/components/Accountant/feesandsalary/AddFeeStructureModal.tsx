import React, { useState } from "react";
import { X } from "lucide-react";
import type { Grade } from "../../../types/class.types";
import type { Transportation } from "../../../types/admin-transportation.types";

export interface FeeStructureForm {
    class_id: string;
    monthly_fee: number;
    exam_fee: number;
    tution_fee: number;
    computer_fee: number;
    laboratory_fee: number;
    transport_fee: string; // transport ID
    other_fee: number;
}

interface FeeStructureModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (feeData: FeeStructureForm) => void;
    classes: Grade[];
    items: Transportation[];
    isLoading: boolean;
}

export const AddFeeStructureModal: React.FC<FeeStructureModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    classes,
    items,
    isLoading
}) => {
    const [formData, setFormData] = useState<FeeStructureForm>({
        class_id: "",
        monthly_fee: 0,
        exam_fee: 0,
        tution_fee: 0,
        computer_fee: 0,
        laboratory_fee: 0,
        transport_fee: "",
        other_fee: 0,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["monthly_fee",
                "exam_fee",
                "tution_fee",
                "computer_fee",
                "laboratory_fee",
                "other_fee",].includes(name) ? Number(value) : value,
        }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.class_id) newErrors.class_id = "Class is required";
        if (!formData.transport_fee) newErrors.transport_fee = "Transport is required";
        if (formData.monthly_fee <= 0)
            newErrors.monthly_fee = "Monthly fee must be greater than 0";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (isLoading) return;

        if (validateForm()) {
            onSubmit(formData);
            setFormData({
                class_id: "",
                monthly_fee: 0,
                exam_fee: 0,
                tution_fee: 0,
                computer_fee: 0,
                laboratory_fee: 0,
                transport_fee: "",
                other_fee: 0,
            });
            setErrors({});
            onClose();
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
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class *
                            </label>
                            <select
                                name="class_id"
                                value={formData.class_id}
                                onChange={handleInputChange}
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
                                <p className="mt-1 text-sm text-red-600">{errors.class_id}</p>
                            )}
                        </div>

                        {/* Transport */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Transportation *
                            </label>
                            <select
                                name="transport_fee"
                                value={formData.transport_fee ? String(formData.transport_fee) : ""}
                                onChange={handleInputChange}
                                className={`w-full border rounded px-3 py-2 ${errors.transport_fee ? "border-red-500" : "border-gray-300"
                                    }`}
                            >
                                <option value="">Select transportation</option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.driverName}
                                    </option>
                                ))}
                            </select>
                            {errors.transport_fee && (
                                <p className="mt-1 text-sm text-red-600">{errors.transport_fee}</p>
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
                                    name={field.name}
                                    value={formData[field.name as keyof FeeStructureForm]}
                                    onChange={handleInputChange}
                                    className={`w-full border rounded px-3 py-2 ${errors[field.name] ? "border-red-500" : "border-gray-300"
                                        }`}
                                />
                                {errors[field.name] && (
                                    <p className="mt-1 text-sm text-red-600">
                                        {errors[field.name]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        {isLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Saving Fee Structure...
                            </>
                        ) : (
                            'Save Fee Structure'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
