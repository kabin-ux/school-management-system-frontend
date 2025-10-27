import { Book, School } from 'lucide-react';
import React from 'react';
import type { SubjectDashboardData } from '../../../../hooks/useSubjects';

interface SubjectStatsProps {
  subjectDashboardData: SubjectDashboardData
}

export const SubjectStats: React.FC<SubjectStatsProps> = ({ subjectDashboardData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Subjects</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{subjectDashboardData.totalSubjects}</p>
          </div>
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 rounded"><School className='text-blue-500' /></div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm ">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-gray-600 text-sm font-medium">Total Teachers</h3>
            <p className="text-3xl font-bold text-gray-900 mt-1">{subjectDashboardData.totalTeacher}</p>
          </div>
          <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <div className="w-6 h-6 rounded"><Book className='text-emerald-600' /></div>
          </div>
        </div>
      </div>
    </div>
  );
};