import React from 'react';
import { supportTicketSchema, type SupportTicket } from '../../../zod-schema/support-ticket';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

interface NewSupportTicketProps {
  isLoading: boolean;
  onAdd: (ticket: SupportTicket) => void;
}

const issueTypes = [
  { key: "FEATURE REQUEST", value: "feature_request" },
  { key: "BUG REPORT", value: "bug_report" },
  { key: "GENERAL INQUIRY", value: "general_inquiry" },
  { key: "BILLING", value: "billing" },
  { key: "OTHER", value: "other" },
];


export const NewSupportTicket: React.FC<NewSupportTicketProps> = ({ isLoading, onAdd }) => {

  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm<SupportTicket>({
    resolver: zodResolver(supportTicketSchema),
    mode: 'onChange',
    defaultValues: {
      title: "",
      description: "",
      type: "general_inquiry"
    },
  });

  const onFormSubmit = async (data: SupportTicket) => {
    try {
      await onAdd(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setError("root", {
        message: "Failed to add support ticket. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Support Ticket</h3>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title *</label>
          <input
            type="text"
            {...register("title")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter support ticket title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            {...register("description")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter description"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select issue type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("type")}
            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
          >
            <option value="" disabled>-- Select Issue Type --</option>
            {issueTypes.map(type => (
              <option key={type.key} value={type.value}>
                {type.key}
              </option>
            ))}
          </select>
          {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
        </div>

        <button
          type='submit'
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          disabled={isLoading || isSubmitting}  // Check both conditions
        >
          {isLoading || isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Sending...</span>
            </>
          ) : (
            "Send Ticket"
          )}
        </button>
      </form>
    </div>
  );
};