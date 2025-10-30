import React from 'react';

export const AttendanceHeader: React.FC = () => {

  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Attendance Monitoring</h1>
        <p className="text-gray-600">View the attendance of staffs and students.</p>
      </div>
    </div>
  );
};