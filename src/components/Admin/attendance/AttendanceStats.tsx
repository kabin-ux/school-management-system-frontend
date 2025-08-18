import React from 'react';
import { Users, UserCheck, UserX, Clock } from 'lucide-react';

export const AttendanceStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-8 rounded-2xl shadow-sm border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Attendance Rate Today</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">50%</p>
            <p className="text-sm text-green-600 mt-1">▲ 2.3% from yesterday</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-2xl shadow-sm border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Present</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">244</p>
            <p className="text-sm text-green-600 mt-1">▲ 3.2% from yesterday</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <UserCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Absent</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">28</p>
            <p className="text-sm text-red-600 mt-1">▼ 1.5% from yesterday</p>
          </div>
          <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <UserX className="w-6 h-6 text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Late Check-ins</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">8</p>
            <p className="text-sm text-yellow-600 mt-1">▲ 1.7% from yesterday</p>
          </div>
          <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </div>
    </div>
  );
};