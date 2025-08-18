import React from 'react';
import { Plus } from 'lucide-react';

interface ClassHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export const ClassHeader: React.FC<ClassHeaderProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Class & Subject Management</h1>
          <p className="text-gray-600">Organize and manage class efficiently</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Class
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search classes or subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none focus:border-transparent"
        />
      </div>
    </>
  );
};