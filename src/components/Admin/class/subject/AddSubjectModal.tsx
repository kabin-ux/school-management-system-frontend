import React, { useEffect } from "react";
import { X } from "lucide-react";
import { subjectSchema, type SubjectSchema } from "../../../../zod-schema/subject";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { Section } from "../../../../types/class.types";

interface SubjectModalProps {
    sections: Section[];
    classId: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (section: SubjectSchema) => void;
    isLoading: boolean;
}

export const AddSubjectModal: React.FC<SubjectModalProps> = ({
    sections,
    classId,
    isOpen,
    onClose,
    onSubmit,
    isLoading
}) => {
    const { register, handleSubmit, reset, formState: { errors }, clearErrors, setError } = useForm<SubjectSchema>({
        resolver: zodResolver(subjectSchema),
        mode: 'onChange',
        defaultValues: {
            section_id: "",
            name: "",
            code: "",
            description: "",
            class_id: classId,
        },
    });

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen, reset, clearErrors]);

    const onFormSubmit = async (data: SubjectSchema) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error("Form submission error:", error);
            setError("root", {
                message: "Failed to add subject. Please try again.",
            });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Subject</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject Name <span className="text-red-500">*</span>
                        </label>
                        <select
                            id="section_id"
                            {...register("section_id")}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            aria-invalid={errors.section_id ? 'true' : 'false'}
                        >
                            <option value="">Select Section</option>
                            {sections.map((section) => (
                                <option key={section.id} value={section.id}>
                                    {section.section_name}
                                </option>
                            ))}
                        </select>
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("name")}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter subject name"
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Subject Code <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("code")}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.code ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter subject code"
                        />
                        {errors.code && <p className="mt-1 text-sm text-red-600">{errors.code.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("description")}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                            placeholder="Enter subject description"
                        />
                        {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                    </div>

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
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            {isLoading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Adding Subject...</span>
                                </div>
                            ) : (
                                'Add Subject'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
