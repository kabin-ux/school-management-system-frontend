import React, { useState } from "react";
import type { EventForm } from "../../../types/events.types";

interface CreateEventFormProps {
  onAdd: (event: EventForm) => void;
  isLoading: boolean;
}

export const CreateEventForm: React.FC<CreateEventFormProps> = ({ onAdd, isLoading }) => {
  const [formData, setFormData] = useState<EventForm>({
    title: "",
    description: "",
    eventType: "",
    target: "",
    date: "",
    startTime: "",
    endTime: "",
  });

  // generic handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    onAdd(formData);

    setFormData({
      title: "",
      description: "",
      eventType: "",
      target: "",
      date: "",
      startTime: "",
      endTime: "",
    })
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Create Event</h3>

      <div className="space-y-4">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter event title.."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Event Type *
          </label>
          <select
            name="eventType"
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="sports">Sports</option>
            <option value="academic">Academic</option>
            <option value="holiday">Holiday</option>
            <option value="ptm">PTM</option>
            <option value="exam">Exam</option>
          </select>
        </div>

        {/* Audience */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Targeted Audience *
          </label>
          <select
            name="target"
            value={formData.target}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select</option>
            <option value="students">Students</option>
            <option value="teachers">Teachers</option>
            <option value="parents">Parents</option>
            <option value="staff">Staffs</option>
            <option value="all">All</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Date *
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Times */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time *
            </label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time *
            </label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="button"
          disabled={isLoading || !formData.title || !formData.description || !formData.eventType || !formData.target || !formData.date || !formData.startTime || !formData.endTime}
          className={`w-full py-2 px-4 rounded-lg flex items-center justify-center gap-2 
  transition-colors 
  ${isLoading ||
              !formData.title ||
              !formData.description ||
              !formData.eventType ||
              !formData.target ||
              !formData.date ||
              !formData.startTime ||
              !formData.endTime
              ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          onClick={handleSubmit}
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
      </div>
    </div>
  );
};
