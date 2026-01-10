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
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Add School to Subscription</h2>
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
              className="w-full rounded border px-3 py-2 text-sm"
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
              className="rounded border px-3 py-1 text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="rounded bg-blue-600 px-3 py-1 text-sm text-white disabled:opacity-60"
            >
              {isSubmitting || isLoading ? 'Saving...' : 'Add School'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
