import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { TimeSlot } from "../../../types/TimeSlot.types";

export interface EditTimeSlotForm {
    label: string,
    startTime: string,
    endTime: string
}

interface EditTimeSlotModalProps {
    isOpen: boolean;
    timeSlot: TimeSlot | null;
    onClose: () => void;
    onSubmit: (id: string, timeSlotData: EditTimeSlotForm) => void;
    isLoading: boolean;
}

export const EditTimeSlotModal: React.FC<EditTimeSlotModalProps> = ({
    isOpen,
    timeSlot,
    onClose,
    onSubmit,
    isLoading
}) => {
    const [formData, setFormData] = useState<EditTimeSlotForm>({
        label: "",
        startTime: "",
        endTime: ""
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Load timeslot 
    useEffect(() => {
        if (isOpen && timeSlot) {
            setFormData({
                label: timeSlot.label,
                startTime: timeSlot.startTime,
                endTime: timeSlot.endTime
            });
            setErrors({});
        } else if (!isOpen) {
            setFormData({
                label: "",
                startTime: "",
                endTime: ""
            });
            setErrors({});
        }
    }, [isOpen, timeSlot]);

    console.log("timeslot", timeSlot)

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: ["basic", "allowances"].includes(name) ? Number(value) : value,

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
        if (!formData.label) newErrors.employee_id = "TimeSlot Label is required";
        if (!formData.startTime) newErrors.basic = "Start time is required";
        if (!formData.endTime) newErrors.basic = "End time is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (isLoading) return;
        // console.log("form", formData)

        if (validateForm()) {
            onSubmit(timeSlot.id, formData);
            console.log("form", formData)

            setFormData({
                label: "",
                startTime: "",
                endTime: ""
            });
            setErrors({});
            onClose();
        }

    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Edit TimeSlot Structure</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* TimeSlot Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Timeslot Label  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="label"
                                value={formData.label}
                                onChange={handleInputChange}
                                className={`w-full border rounded px-3 py-2 ${errors.label ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.label && (
                                <p className="mt-1 text-sm text-red-600">{errors.label}</p>
                            )}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Start Time *
                            </label>
                            <input
                                type="time"
                                name="startTime"
                                value={formData.startTime}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                End Time *
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                value={formData.endTime}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
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
                            <div className="flex items-center gap-2">
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                Saving TimeSlot Structure...
                            </div>
                        ) : (
                            'Save TimeSlot Structure'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
