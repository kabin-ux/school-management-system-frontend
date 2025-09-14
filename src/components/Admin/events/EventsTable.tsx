import React from 'react';
import type { Event } from '../../../types/events.types';
import { Trash2 } from 'lucide-react';

interface EventsTableProps {
  events: Event[];
  onDelete: (eventId: string) => void;
}

export const EventsTable: React.FC<EventsTableProps> = ({ events, onDelete }) => {
  return (
    <div className="border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Audience</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Event Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timing</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {events.map((event, index) => (
              <tr
                key={index}
                className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
              >
                {/* Date */}
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {new Date(event.date).toLocaleDateString()}
                </td>

                {/* Title */}
                <td className="px-6 py-4 text-sm text-gray-700 font-light">
                  {event.title}
                </td>

                {/* Target */}
                <td className="px-6 py-4 text-sm text-gray-600">
                  {event.target}
                </td>

                {/* Event Type with badge */}
                <td className="px-6 py-4 text-sm">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
        ${event.eventType === "holiday"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                      }`}
                  >
                    {event.eventType}
                  </span>
                </td>

                {/* Description (truncate long text) */}
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                  {event.description || "-"}
                </td>

                {/* Time Range */}
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {event.startTime} – {event.endTime}
                </td>

                {/* Actions */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <button
                      className="p-1 rounded hover:bg-gray-200 text-red-500"
                      onClick={() => onDelete(event.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};