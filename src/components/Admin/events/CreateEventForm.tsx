import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { eventCreateSchema, type EventCreateSchema } from "../../../zod-schema/event";

interface CreateEventFormProps {
  onAdd: (event: EventCreateSchema) => void;
  isLoading: boolean;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onAdd, isLoading }) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, setError } = useForm<EventCreateSchema>({
    resolver: zodResolver(eventCreateSchema),
    mode: 'onChange',
    defaultValues: {
      title: "",
      description: "",
      eventType: "academic",
      target: "all",
      date: "",
      startTime: "",
      endTime: "",
    },
  });

  const onFormSubmit = async (data: EventCreateSchema) => {
    try {
      await onAdd(data);
      reset();
    } catch (error) {
      console.error("Form submission error:", error);
      setError("root", {
        message: "Failed to add event. Please try again.",
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Create Event</h3>

      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title *
          </label>
          <input
            type="text"
            {...register("title")}
            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.title ? "border-red-500" : "border-gray-300"}`}
            placeholder="Enter event title"
          />
          {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type *
          </label>
          <select
            {...register("eventType")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="sports">Sports</option>
            <option value="academic">Academic</option>
            <option value="holiday">Holiday</option>
            <option value="ptm">PTM</option>
            <option value="exam">Exam</option>
            {errors.eventType && <p className="mt-1 text-sm text-red-600">{errors.eventType.message}</p>}
          </select>
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Targeted Audience *
          </label>
          <select
            {...register("target")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="parents">Parents</option>
            <option value="staff">Staffs</option>
            <option value="all">All</option>
            {errors.target && <p className="mt-1 text-sm text-red-600">{errors.target.message}</p>}
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date *
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <input
              type="time"
              {...register("startTime")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.startTime && <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <input
              type="time"
              {...register("endTime")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.endTime && <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            {...register('description')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading || isSubmitting}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 
  transition-colors 
  ${isLoading || isSubmitting
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              <span>Posting...</span>
            </>
          ) : (
            "Post event"
          )}
        </button>
      </form>
    </div>
  );
};
