import React, { useEffect } from "react";
import { X } from "lucide-react";
import type { Grade } from "../../../types/class.types";
import { useSectionsByClass } from "../../../hooks/useSection";
import { zodResolver } from "@hookform/resolvers/zod";
import { createStudentSchema, type StudentSchema } from "../../../zod-schema/student";
import { useForm } from "react-hook-form";

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: StudentSchema) => void;
  classes: Grade[];
  loading: boolean;
}

export const AddStudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  classes,
  loading
}) => {
const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting }, clearErrors, setError, setValue } = useForm<StudentSchema>({
  resolver: zodResolver(createStudentSchema),
  mode: 'onChange',
  defaultValues: {
    firstName: "",
    lastName: "",
    email: "",
    class_id: "",
    section_id: "",
    gender: "male",
    dateOfBirth: "",
    address: "",
    transportation_id: undefined,
  },
});

  // Watch class_id to trigger section loading
  const watchedClassId = watch("class_id");

  // Use React Query hook with the watched value
  const { data: sections = [] } = useSectionsByClass(watchedClassId ? watchedClassId : '');

  // Reset section when class changes
  useEffect(() => {
    if (watchedClassId) {
      setValue("section_id", ""); // Clear section selection when class changes
    }
  }, [watchedClassId, setValue]);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const onFormSubmit = async (data: StudentSchema) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      setError('root', { message: 'Failed to add student. Please try again.' });
    }
  };

  // Handle modal close - prevent closing during loading
  const handleClose = () => {
    if (loading || isSubmitting) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
          <button
            onClick={handleClose}
            disabled={loading || isSubmitting}
            className={`p-2 rounded-full transition-colors ${loading || isSubmitting
              ? 'text-gray-400 cursor-not-allowed'
              : 'text-gray-500 hover:bg-gray-100'
              }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onFormSubmit)}>
          <div className="p-6">
            {/* Root error display */}
            {errors.root && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">{errors.root.message}</p>
              </div>
            )}

            {/* Student Information */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    {...register("firstName")}
                    disabled={loading || isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    placeholder="Enter first name"
                    aria-invalid={errors.firstName ? 'true' : 'false'}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    {...register("lastName")}
                    disabled={loading || isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    placeholder="Enter last name"
                    aria-invalid={errors.lastName ? 'true' : 'false'}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    {...register("email")}
                    disabled={loading || isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    placeholder="Enter email address"
                    aria-invalid={errors.email ? 'true' : 'false'}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="gender"
                    {...register("gender")}
                    disabled={loading || isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    aria-invalid={errors.gender ? 'true' : 'false'}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <label htmlFor="class_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="class_id"
                    {...register("class_id")}
                    disabled={loading || isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.class_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    aria-invalid={errors.class_id ? 'true' : 'false'}
                  >
                    <option value="">Select class</option>
                    {classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                  {errors.class_id && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.class_id.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="section_id" className="block text-sm font-medium text-gray-700 mb-1">
                    Section <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="section_id"
                    {...register("section_id")}
                    disabled={loading || isSubmitting || !watchedClassId}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.section_id ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${(loading || isSubmitting || !watchedClassId) ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    aria-invalid={errors.section_id ? 'true' : 'false'}
                  >
                    <option value="">
                      {!watchedClassId ? 'Select class first' : 'Select section'}
                    </option>
                    {sections.map((section: any) => (
                      <option key={section.id} value={section.id}>
                        {section.section_name}
                      </option>
                    ))}
                  </select>
                  {errors.section_id && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.section_id.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700 mb-1">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="dateOfBirth"
                    type="date"
                    {...register("dateOfBirth")}
                    disabled={loading || isSubmitting}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    aria-invalid={errors.dateOfBirth ? 'true' : 'false'}
                  />
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    {...register("address")}
                    disabled={loading || isSubmitting}
                    rows={2}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none transition-colors ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                      } ${loading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                    placeholder="Enter address"
                    aria-invalid={errors.address ? 'true' : 'false'}
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                      <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                      {errors.address.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Class/Section Info Display */}
              {watchedClassId && sections.length === 0 && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-700 text-sm">
                    No sections available for the selected class.
                  </p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading || isSubmitting}
                className={`px-6 py-2 border border-gray-300 rounded-md transition-colors ${loading || isSubmitting
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500'
                  }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || isSubmitting}
                className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${loading || isSubmitting
                  ? 'bg-blue-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  }`}
              >
                {loading || isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Adding...
                  </>
                ) : (
                  'Add Student'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
