import React from 'react';
import { Download } from 'lucide-react';

export const AttendanceHistoryHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance History of Biswas Poudel</h1>
        <p className="text-gray-600">View the detailed attendance of Biswas Poudel</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Download className="w-4 h-4" />
        Download report
      </button>
    </div>
  );
};