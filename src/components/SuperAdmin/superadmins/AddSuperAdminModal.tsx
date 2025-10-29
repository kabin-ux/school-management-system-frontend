import React, { useEffect } from 'react';
import { X, User } from 'lucide-react';
import type { SuperAdminForm } from '../../../types/super-admin-dashboard.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { createSuperAdminSchema, type SuperAdmin } from '../../../zod-schema/super-admin';

interface AddSuperAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (superAdmin: SuperAdminForm) => void;
  isLoading?: boolean;
}

const AddSuperAdminModal: React.FC<AddSuperAdminModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, clearErrors, setError } = useForm<SuperAdmin>({
    resolver: zodResolver(createSuperAdminSchema),
    mode: 'onChange',
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      phone_number: '',
      address: '',
      status: 'active',
      created_by: null,
      profile_image: null,
    },
  });

  // Reset form when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const onFormSubmit = async (data: SuperAdmin) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error('Form submission error:', error);
      setError('root', { message: 'Failed to add super admin. Please try again.' });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Add Super Admin</h2>
          </div>
          <button onClick={onClose} disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* First Name */}
            <div>
              <label className="block text-sm font-medium">First Name *</label>
              <input
                type="text"
                {...register('firstName')}
                className={`w-full px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder='Enter First Name'
              />
              {errors.firstName && <p className="text-xs text-red-500">{errors.firstName.message}</p>}
            </div>

            {/* Last Name */}
            <div>
              <label className="block text-sm font-medium">Last Name *</label>
              <input
                type="text"
                {...register('lastName')}
                className={`w-full px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder='Enter Last Name'
              />
              {errors.lastName && <p className="text-xs text-red-500">{errors.lastName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium">Email *</label>
              <input
                type="email"
                {...register('email')}
                className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium">Password *</label>
              <input
                type="password"
                {...register('password')}
                className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.password && <p className="text-xs text-red-500">{errors.password.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium">Phone *</label>
              <input
                type="tel"
                {...register('phone_number')}
                className={`w-full px-3 py-2 border rounded-lg ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.phone_number && <p className="text-xs text-red-500">{errors.phone_number.message}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium">Status</label>
              <select
                {...register('status')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <textarea
              {...register('address')}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            />
            {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>}
          </div>

          {/* Profile Image */}
          <div>
            <label className="block text-sm font-medium">Profile Image (URL)</label>
            <input
              type="url"
              {...register('profile_image')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading || isSubmitting}
              className="px-4 py-2 border rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg"
            >
              {isLoading || isSubmitting ? 'Adding...' : 'Add Super Admin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSuperAdminModal;
