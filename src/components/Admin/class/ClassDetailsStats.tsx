import { Book, School } from 'lucide-react';
import React from 'react';

export const ClassDetailsStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Sections</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">12</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 rounded"><School className='text-blue-500'/></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Students</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">95</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 rounded"><Book className='text-emerald-600'/></div>
          </div>
        </div>
      </div>
    </div>
  );
};