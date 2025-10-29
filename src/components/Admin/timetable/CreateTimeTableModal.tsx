import React, { useEffect } from "react";
import { X } from "lucide-react";
import type { Grade } from "../../../types/class.types";
import { useSectionsByClass } from "../../../hooks/useSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { createTimetableSchema, type TimetableCreateSchema } from "../../../zod-schema/timetable";

export interface TimeTableForm {
    classId: string,
    sectionId: string,
    name: string
}

interface TimeTableModalProps {
    isOpen: boolean;
    classes: Grade[];
    onClose: () => void;
    onSubmit: (feeData: TimetableCreateSchema) => void;
    isLoading: boolean;
}

export const CreateTimeTableModal: React.FC<TimeTableModalProps> = ({
    isOpen,
    classes,
    onClose,
    onSubmit,
    isLoading
}) => {
    const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting }, clearErrors, setError, setValue } = useForm<TimetableCreateSchema>({
        resolver: zodResolver(createTimetableSchema),
        mode: 'onChange',
        defaultValues: {
            classId: "",
            sectionId: "",
            name: ""
        },
    });

    // Watch class_id to trigger section loading
    const watchedClassId = watch("classId");

    // Use React Query hook with the watched value
    const { data: sections = [] } = useSectionsByClass(watchedClassId ? watchedClassId : '');

    // Reset section when class changes
    useEffect(() => {
        if (watchedClassId) {
            setValue("sectionId", ""); // Clear section selection when class changes
        }
    }, [watchedClassId, setValue]);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen, reset, clearErrors]);

    const onFormSubmit = async (data: TimetableCreateSchema) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
            setError('root', { message: 'Failed to add student. Please try again.' });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
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

                <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* TimeTable Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name  <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                {...register("name")}
                                className={`w-full border rounded px-3 py-2 ${errors.name ? "border-red-500" : "border-gray-300"
                                    }`}
                                placeholder="Enter Name"
                            />
                            {errors.name && (
                                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                        </div>
                        {/* Class */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Class *
                            </label>
                            <select
                                {...register("classId")}
                                disabled={isLoading}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.classId ? 'border-red-500' : 'border-gray-300'
                                    } ${isLoading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                            >
                                <option value="">Select class</option>
                                {classes.map((cls) => (
                                    <option key={cls.id} value={cls.id}>
                                        {cls.name}
                                    </option>
                                ))}
                            </select>
                            {errors.classId && <p className="mt-1 text-sm text-red-600">{errors.classId.message}</p>}
                        </div>

                        {/* Timetable */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Section *
                            </label>
                            <select
                                {...register("sectionId")}
                                disabled={isLoading || !watchedClassId}
                                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.sectionId ? 'border-red-500' : 'border-gray-300'
                                    } ${(isLoading || !watchedClassId) ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                            >
                                <option value="">Select section</option>
                                {sections.map((section: any) => (
                                    <option key={section.id} value={section.id}>
                                        {section.section_name}
                                    </option>
                                ))}
                            </select>
                            {errors.sectionId && <p className="mt-1 text-sm text-red-600">{errors.sectionId.message}</p>}
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
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {isLoading || isSubmitting ? (
                                <div className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Saving Timetable Structure...
                                </div>
                            ) : (
                                'Save Timetable Structure'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
