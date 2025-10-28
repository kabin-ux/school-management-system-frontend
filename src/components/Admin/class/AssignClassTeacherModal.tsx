import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Teacher } from "../../../types/teacher.types";

export interface AssignClassTeacherForm {
    classId: string;
    teacherId: string;
}

interface AssignClassTeacherModalProps {
    isOpen: boolean;
    onClose: () => void;
    classId?: string;
    onSubmit: (data: AssignClassTeacherForm) => void;
    teachers: Teacher[]
    isLoading: boolean;
}

export const AssignClassTeacherModal: React.FC<AssignClassTeacherModalProps> = ({
    isOpen,
    onClose,
    classId,
    onSubmit,
    teachers,
    isLoading
}) => {
    const [formData, setFormData] = useState<AssignClassTeacherForm>({
        classId: classId ?? "",
        teacherId: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData({
                classId: classId ?? "",
                teacherId: ""
            });
            setErrors({});
        }
    }, [isOpen, classId]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked; // only for checkbox

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));

        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.teacherId?.trim()) newErrors.teacherId = "Teacher is required";
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (isLoading) return;

        if (validateForm()) {
            onSubmit(formData);
            onClose();
            setFormData({
                classId: classId ?? "",
                teacherId: ""
            });
            setErrors({});
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Assign Class Teacher</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Choose Teacher <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="teacherId"
                            value={formData.teacherId}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.teacherId ? 'border-red-500' : 'border-gray-300'
                                }`}
                        >
                            <option value="">-- Select a Teacher --</option>
                            {teachers.map(teacher => (
                                <option key={teacher.id} value={teacher.id}>
                                    {teacher.firstName} {teacher.lastName}
                                </option>
                            ))}
                        </select>
                        {errors.teacherId && <p className="text-red-500 text-xs mt-1">{errors.teacherId}</p>}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        disabled={isLoading}
                        onClick={onClose}
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
                                Assigning Teacher...
                            </>
                        ) : (
                            'Assign Teacher'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};
