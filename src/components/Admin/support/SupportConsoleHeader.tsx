import React from 'react';

export const SupportConsoleHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Console</h1>
        <p className="text-gray-600">List of all the tickets</p>
      </div>
    </div>
  );
};