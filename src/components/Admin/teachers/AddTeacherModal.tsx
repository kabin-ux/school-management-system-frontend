import React, { useEffect } from 'react';
import { X, User, Mail, Phone, Calendar, MapPin, GraduationCap } from 'lucide-react';
import { createTeacherSchema, type TeacherSchema } from '../../../zod-schema/teacher';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface AddTeacherModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (teacher: TeacherSchema) => void;
  isLoading?: boolean;
}

const AddTeacherModal: React.FC<AddTeacherModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, clearErrors, setError } = useForm<TeacherSchema>({
    resolver: zodResolver(createTeacherSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      gender: 'Male',
      address: '',
      qualification: '',
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const onFormSubmit = async (data: TeacherSchema) => {
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
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className=" text-black p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <User className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Add New Teacher</h2>
          </div>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-200 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("firstName")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.firstName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("lastName")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.lastName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter email"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="w-4 h-4 inline mr-1" />
                  Phone <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.phone ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter phone number"
                  aria-invalid={errors.phone ? 'true' : 'false'}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="w-4 h-4 inline mr-1" />
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  {...register("dateOfBirth")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.dateOfBirth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter date of birth"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender <span className="text-red-500">*</span>
                </label>
                <select
                  id="gender"
                  {...register("gender")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  aria-invalid={errors.gender ? 'true' : 'false'}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                    {errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="w-4 h-4 inline mr-1" />
                  Address
                </label>
                <textarea
                  {...register("address")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.address ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
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

            {/* Professional Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Professional Information</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <GraduationCap className="w-4 h-4 inline mr-1" />
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  {...register("qualification")}
                  disabled={isLoading || isSubmitting}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${errors.qualification ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
                    } ${isLoading || isSubmitting ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="e.g., Master's in Mathematics"
                  aria-invalid={errors.qualification ? 'true' : 'false'}
                />
                {errors.qualification && (
                  <p className="mt-1 text-sm text-red-600 flex items-center gap-1" role="alert">
                    <span className="w-3 h-3 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">!</span>
                    {errors.qualification.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2 ${isLoading || isSubmitting
                ? 'bg-blue-400 cursor-not-allowed text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
                }`}            >
              {isLoading || isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding Teacher...
                </>
              ) : (
                'Add Teacher'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeacherModal;