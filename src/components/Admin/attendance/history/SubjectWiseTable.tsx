import React from 'react';
import type { Subject } from '../../../../types/attendance-record.types';

interface SubjectWiseTableProps {
  subjects: Subject[];
}

export const SubjectWiseTable: React.FC<SubjectWiseTableProps> = ({ subjects }) => {

  return (
    <div className="bg-white rounded-lg shadow-sm  mb-8">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Subject Wise Attendance History (This Month)
        </h3>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Subject</th>
              <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Total Class</th>
              <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Attended Class</th>
              <th className="text-left p-4 font-medium text-gray-900">Total Attendance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {subjects.map((subject, index) => (
              <tr key={index} className="hover:bg-gray-50 cursor-pointer"
              >
                <td className="p-4 text-gray-900 border-r font-semibold border-gray-200">{subject.name}</td>
                <td className="p-4 text-gray-900 border-r border-gray-200">{subject.totalClass}</td>
                <td className="p-4 text-gray-900 border-r border-gray-200">{subject.attendedClass}</td>
                <td className="p-4">
                  <span className="text-green-600 font-medium">{subject.attendance}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center text-sm text-gray-600">
        <span>Showing 1 to 6 of 8 results</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-100">Previous Month</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>

  );
};