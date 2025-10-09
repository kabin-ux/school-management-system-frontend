import React, { useState } from "react";
import { X } from "lucide-react";
import type { Grade } from "../../../types/class.types";
import { useSectionsByClass } from "../../../hooks/useSection";

export interface TimeTableForm {
    classId: string,
    sectionId: string,
    name: string
}

interface TimeTableModalProps {
    isOpen: boolean;
    classes: Grade[];
    onClose: () => void;
    onSubmit: (feeData: TimeTableForm) => void;
    isLoading: boolean;
}

export const CreateTimeTableModal: React.FC<TimeTableModalProps> = ({
    isOpen,
    classes,
    onClose,
    onSubmit,
    isLoading
}) => {
    const [formData, setFormData] = useState<TimeTableForm>({
        classId: "",
        sectionId: "",
        name: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const { data: sections = [] } = useSectionsByClass(formData.classId);

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
        if (!formData.classId) newErrors.employee_id = "Class is required";
        if (!formData.sectionId) newErrors.basic = "Section is required";
        if (!formData.name) newErrors.basic = "Timetable Name is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (isLoading) return;
        // console.log("form", formData)

        if (validateForm()) {
            onSubmit(formData);
            console.log("form", formData)

            setFormData({
                classId: "",
                sectionId: "",
                name: ""
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
                    <h2 className="text-2xl font-bold text-gray-900">Create Timetable Structure</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* TimeTable Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className={`w-full border rounded px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                        </div>
                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class *
                            </label>
                            <select
                                name="classId"
                                value={formData.classId}
                                onChange={handleInputChange}
                                disabled={isLoading}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.class ? 'border-red-500' : 'border-gray-300'
                                    } ${isLoading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                            >
                                <option value="">Select class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
                        </div>

                        {/* Timetable */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Section *
                            </label>
                            <select
                                name="sectionId"
                                value={formData.sectionId}
                                onChange={handleInputChange}
                                disabled={isLoading || !formData.classId}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.section ? 'border-red-500' : 'border-gray-300'
                                    } ${(isLoading || !formData.classId) ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                            >
                                <option value="">Select section</option>
                                {sections.map((section: any) => (
                                    <option key={section.id} value={section.id}>
                                        {section.section_name}
                                    </option>
                                ))}
                            </select>
                            {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
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
                                Saving Timetable Structure...
                            </div>
                        ) : (
                            'Save Timetable Structure'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
