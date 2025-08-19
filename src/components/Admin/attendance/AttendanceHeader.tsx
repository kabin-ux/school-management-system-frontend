import React from 'react';
import {Download } from 'lucide-react';

export const AttendanceHeader: React.FC = () => {

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Monitoring</h1>
        <p className="text-gray-600">View the attendance of staffs and students.</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Download className="w-4 h-4" />
        Download report
      </button>
    </div>
  );
};