import React, { useEffect, useState } from "react";
import type { Event, EventForm } from "../../../types/events.types";
import { Calendar, X } from "lucide-react";

interface EditEventModalProps {
    isOpen: boolean
    event: Event | null
    onSubmit: (id: string, event: EventForm) => void;
    onClose: () => void;
    isLoading: boolean;
}

export const EditEventModal: React.FC<EditEventModalProps> = ({ isOpen, event, onSubmit, onClose, isLoading }) => {
    const [formData, setFormData] = useState<EventForm>({
        title: "",
        description: "",
        eventType: "",
        target: "",
        date: "",
        startTime: "",
        endTime: "",
    });

    useEffect(() => {
        if (isOpen && event) {
            setFormData({ ...event });
        } else if (!isOpen) {
            setFormData({
                title: "",
                description: "",
                eventType: "",
                target: "",
                date: "",
                startTime: "",
                endTime: "",
            });
        }
    }, [isOpen, event]);

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

        if (event) {

            onSubmit(event.id, formData);
            onClose()
        }

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
    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50" >
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">Edit Event</h2>
                    </div>
                    <button onClick={onClose} disabled={isLoading}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4 p-6 ">
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
                        type="submit"
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
        </div>

    );
};
