import React from 'react';
import { Plus } from 'lucide-react';

export const SupportConsoleHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Support Console</h1>
        <p className="text-gray-600">List of all the tickets</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Plus className="w-4 h-4" />
        Add Accountant
      </button>
    </div>
  );
};