import React, { useEffect } from 'react';
import { X, User, Users } from 'lucide-react';
import type { Student } from '../../../types/student.types';
import { useForm } from "react-hook-form";
import type { Parent } from '../../../types/parent.types';

interface LinkParentToStudentModalProps {
    parent: Parent | null;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (updateData: any) => void;
    isLoading?: boolean;
    students: Student[];
}

const LinkParentToStudentModal: React.FC<LinkParentToStudentModalProps> = ({
    parent,
    isOpen,
    onClose,
    onSubmit,
    isLoading,
    students
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        clearErrors,
        setError,
    } = useForm<{
        parentId: string;
        studentId: string;
    }>({
        mode: 'onChange',
        defaultValues: {
            parentId: parent?.id || '',
            studentId: '',
        },
    });

    useEffect(() => {
        if (isOpen && parent?.id) {
            reset({
                parentId: parent.id,
                studentId: '',
            });
            clearErrors();
        }
    }, [isOpen, parent, reset, clearErrors]);


    const onFormSubmit = async (data: { parentId: string, studentId: string }) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error('Form submission error:', error);
            // Handle submission errors if needed
            setError('root', { message: 'Failed to add parent. Please try again.' });
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <User className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">Link Parent To Student</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                        disabled={isLoading}
                        type="button"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onFormSubmit)}>
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
                        <input type="hidden" {...register('parentId')} />

                        {/* Root error display */}
                        {errors.root && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">{errors.root.message}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                {/* Student Selection */}
                                <div>
                                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Users className="w-4 h-4 inline mr-1" />
                                        Select Student <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        {...register('studentId', {
                                            required: 'Student is required',
                                        })}
                                        className={`w-full px-3 py-2 border rounded-lg focus:ring-2 ${errors.studentId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                                            }`}
                                    >
                                        <option value="">-- Select a student --</option>
                                        {students.map(student => (
                                            <option key={student.id} value={student.id}>
                                                {student.firstName} {student.lastName}
                                                {student.class?.name && ` - Class: ${student.class.name}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.studentId && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.studentId.message}
                                        </p>
                                    )}
                                </div>

                                {/* Students list info */}
                                {students.length === 0 && (
                                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <Users className="h-4 w-4 text-amber-400" />
                                            </div>
                                            <div className="ml-2">
                                                <p className="text-sm text-amber-700">
                                                    No students available. Please add students first.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 p-6 pt-4 border-t bg-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading || isSubmitting}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || isSubmitting || students.length === 0}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
                        >
                            {(isLoading || isSubmitting) ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Adding Parent...
                                </>
                            ) : (
                                <>
                                    <User className="w-4 h-4" />
                                    Link Parent
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LinkParentToStudentModal;
