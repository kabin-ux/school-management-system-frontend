import React from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AttendanceHistoryHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/admin/attendance-monitoring`)
  };
  return (
    <div className="flex justify-between items-center mb-8">
      {/* Left Section: Back + Title */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Attendance History of Biswas Poudel</h1>
          <p className="text-gray-600 text-sm">View the detailed attendance of Biswas Poudel</p>
        </div>
      </div>

      {/* Right Section: Download */}
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
        <Download className="w-4 h-4" />
        Download report
      </button>
    </div>

  );
};