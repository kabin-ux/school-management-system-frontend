import React from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import type {
  AddSchoolOnSubscriptionDto,
} from '../../../hooks/useSubscription';
import type { SchoolData } from '../../../types/partner-school.types';

interface SchoolSubscriptionModalProps {
  schools: SchoolData[];
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddSchoolOnSubscriptionDto) => Promise<void> | void;
  isLoading: boolean;
  subscriptionId: string; // <-- add this
}

export const AddSchoolSubscriptionModal: React.FC<SchoolSubscriptionModalProps> = ({
  schools,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  subscriptionId,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<AddSchoolOnSubscriptionDto>({
    mode: 'onChange',
    defaultValues: {
      school_id: '',
      subscription_id: subscriptionId,
    },
  });

  const onFormSubmit = async (data: AddSchoolOnSubscriptionDto) => {
    try {
      await onSubmit({
        ...data,
        subscription_id: subscriptionId, // ensure subscription id is sent
      });
      reset();
      onClose();
    } catch {
      setError('root', {
        message: 'Failed to add subscription. Please try again.',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-md rounded-lg bg-white border-b border-gray-200 p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            Add School to Subscription
          </h2>
          <button
            type="button"
            className="rounded p-1 hover:bg-gray-100"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
          {/* Hidden subscription id */}
          <input
            type="hidden"
            value={subscriptionId}
            {...register('subscription_id', { required: true })}
          />

          {/* School select */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              School <span className="text-red-500">*</span>
            </label>
            <select
              className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 transition-colors
                                ${errors.school_id
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }
                                ${isLoading || isSubmitting
                  ? "bg-gray-100 cursor-not-allowed text-gray-500"
                  : ""
                }
                            `}
              {...register('school_id', { required: 'School is required' })}
            >
              <option value="">-- Select a School --</option>
              {schools.map((school) => (
                <option key={school.id} value={school.id}>
                  {school.name}
                </option>
              ))}
            </select>
            {errors.school_id && (
              <p className="mt-1 text-xs text-red-500">
                {errors.school_id.message}
              </p>
            )}
          </div>

          {/* Root error */}
          {errors.root?.message && (
            <p className="text-xs text-red-500">{errors.root.message}</p>
          )}

          {/* Footer */}
          <div className="mt-4 flex justify-end gap-2">
            <button
              type="button"
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className={`px-6 py-2 rounded-md transition-colors flex items-center gap-2
                            ${isLoading || isSubmitting
                  ? "bg-blue-400 cursor-not-allowed text-white"
                  : "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                }
                        `}            >
              {isSubmitting || isLoading ? 'Saving...' : 'Add School'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
