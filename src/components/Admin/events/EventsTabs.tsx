import React from 'react';

export const EventsTabs: React.FC = () => {
  return (
    <div className="flex space-x-8 border-b border-gray-200 mb-6">
      <button className="pb-3 px-1 border-b-2 border-blue-600 text-blue-600 font-medium text-sm">Upcoming</button>
      <button className="pb-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 font-medium text-sm">Past Event</button>
      <button className="pb-3 px-1 border-b-2 border-transparent text-gray-600 hover:text-gray-800 font-medium text-sm">All Event</button>
    </div>
  );
};