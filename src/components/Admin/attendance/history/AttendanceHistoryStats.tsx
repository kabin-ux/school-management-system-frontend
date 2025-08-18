import React from 'react';
import { User, CheckCircle, XCircle, Clock } from 'lucide-react';

export const AttendanceHistoryStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-7 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Attendance Rate This Month</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">95%</p>
            <p className="text-sm text-green-600 mt-1">▲ 2.3% from Previous Week</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <User className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-7 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Today's Attendance</h3>
            <p className="text-3xl font-bold text-green-600 mt-1">Present</p>
            <p className="text-sm text-gray-600 mt-1">Same as yesterday</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-7 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Absent this Month</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">5</p>
            <p className="text-sm text-red-600 mt-1">-3 from previous month</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <XCircle className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-7 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Leave approved</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">4</p>
            <p className="text-sm text-yellow-600 mt-1">+3 from previous month</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
};