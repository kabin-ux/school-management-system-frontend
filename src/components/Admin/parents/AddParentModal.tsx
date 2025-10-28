import React, { useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Users } from 'lucide-react';
import type { Student } from '../../../types/student.types';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { parentSchema, type ParentSchema } from '../../../zod-schema/parent';

interface AddParentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (parent: ParentSchema) => void;
    isLoading?: boolean;
    students: Student[];
}

const AddParentModal: React.FC<AddParentModalProps> = ({
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
        setError
    } = useForm<ParentSchema>({
        resolver: zodResolver(parentSchema),
        mode: 'onChange', // Enable real-time validation
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
            relation: "",
            occupation: "",
            student_id: "",
        },
    });

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen, reset, clearErrors]);

    const onFormSubmit = async (data: ParentSchema) => {
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
                        <h2 className="text-xl font-semibold">Add New Parent</h2>
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
                        {/* Root error display */}
                        {errors.root && (
                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-700 text-sm">{errors.root.message}</p>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Personal Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Personal Information
                                </h3>

                                {/* Name */}
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                        Full Name <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="name"
                                        type="text"
                                        {...register("name")}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter full name"
                                        disabled={isLoading}
                                        aria-invalid={errors.name ? 'true' : 'false'}
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Mail className="w-4 h-4 inline mr-1" />
                                        Email <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        {...register("email")}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter email address"
                                        disabled={isLoading}
                                        aria-invalid={errors.email ? 'true' : 'false'}
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Phone className="w-4 h-4 inline mr-1" />
                                        Phone <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="phone"
                                        type="tel"
                                        {...register("phone")}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter phone number"
                                        disabled={isLoading}
                                        aria-invalid={errors.phone ? 'true' : 'false'}
                                    />
                                    {errors.phone && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Address */}
                                <div>
                                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                                        <MapPin className="w-4 h-4 inline mr-1" />
                                        Address
                                    </label>
                                    <textarea
                                        id="address"
                                        {...register("address")}
                                        rows={3}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors resize-none ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter address"
                                        disabled={isLoading}
                                        aria-invalid={errors.address ? 'true' : 'false'}
                                    />
                                    {errors.address && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.address.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Professional & Relationship Information */}
                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-900 border-b pb-2">
                                    Professional & Relationship Information
                                </h3>

                                {/* Occupation */}
                                <div>
                                    <label htmlFor="occupation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Occupation <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        id="occupation"
                                        type="text"
                                        {...register("occupation")}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.occupation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter occupation"
                                        disabled={isLoading}
                                        aria-invalid={errors.occupation ? 'true' : 'false'}
                                    />
                                    {errors.occupation && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.occupation.message}
                                        </p>
                                    )}
                                </div>

                                {/* Relation */}
                                <div>
                                    <label htmlFor="relation" className="block text-sm font-medium text-gray-700 mb-1">
                                        Relation <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="relation"
                                        {...register("relation")}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.relation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        disabled={isLoading}
                                        aria-invalid={errors.relation ? 'true' : 'false'}
                                    >
                                        <option value="">-- Select relation --</option>
                                        <option value="father">Father</option>
                                        <option value="mother">Mother</option>
                                        <option value="guardian">Guardian</option>
                                        <option value="uncle">Uncle</option>
                                        <option value="aunt">Aunt</option>
                                        <option value="grandparent">Grandparent</option>
                                        <option value="other">Other</option>
                                    </select>
                                    {errors.relation && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.relation.message}
                                        </p>
                                    )}
                                </div>

                                {/* Student Selection */}
                                <div>
                                    <label htmlFor="student_id" className="block text-sm font-medium text-gray-700 mb-1">
                                        <Users className="w-4 h-4 inline mr-1" />
                                        Select Student <span className="text-red-500">*</span>
                                    </label>
                                    <select
                                        id="student_id"
                                        {...register("student_id")}
                                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.student_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                                            }`}
                                        disabled={isLoading}
                                        aria-invalid={errors.student_id ? 'true' : 'false'}
                                    >
                                        <option value="">-- Select a student --</option>
                                        {students.map(student => (
                                            <option key={student.id} value={student.id}>
                                                {student.firstName} {student.lastName}
                                                {student.class?.name && ` - Class: ${student.class.name}`}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.student_id && (
                                        <p className="text-red-500 text-xs mt-1 flex items-center gap-1" role="alert">
                                            <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                                            {errors.student_id.message}
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
                                    Add Parent
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddParentModal;
