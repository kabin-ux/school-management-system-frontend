import React from 'react';

interface Event {
  date: string;
  type: string;
  audience: string;
  description: string;
}

interface EventsTableProps {
  events: Event[];
}

export const EventsTable: React.FC<EventsTableProps> = ({ events }) => {
  return (
    <div className="border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Date</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Meeting Type</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Audience</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Regards</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer">
                <td className="p-4 text-gray-900 border-gray-200">{event.date}</td>
                <td className="p-4 text-gray-900 border-gray-200">{event.type}</td>
                <td className="p-4 text-gray-900 border-gray-200">{event.audience}</td>
                <td className="p-4 text-gray-900 border-gray-200">{event.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};