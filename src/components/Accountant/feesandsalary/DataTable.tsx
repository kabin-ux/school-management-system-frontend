import React from 'react';
import type { Student, Teacher, ViewType } from '../../../types/fee-salary.types';
import { StatusBadge } from './StatusBadge';

interface DataTableProps {
  activeView: ViewType;
  students: Student[];
  teachers: Teacher[];
  onRowClick: (id: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  activeView,
  students,
  teachers,
  onRowClick
}) => {
  const data = activeView === 'Student' ? students : teachers;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {activeView === 'Student' ? 'Student Details' : 'Teacher Details'}
          </h3>
          <p className="text-gray-600 text-sm">
            {activeView === 'Student' ? 'Student payment details' : 'Teacher Salary details'}
          </p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Student ID' : 'Teacher ID'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Student Name' : 'Teacher Name'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Class' : 'Department'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Date' : 'Last Paid'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Amount' : 'Total Salary'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Due Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="hover:bg-gray-50 transition-colors cursor-pointer"
                onClick={() => onRowClick(item.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                  {item.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {item.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {activeView === 'Student' ? (item as Student).class : (item as Teacher).department}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                  {activeView === 'Student' ? (item as Student).date : (item as Teacher).lastPaid}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {activeView === 'Student' ? (item as Student).amount : (item as Teacher).totalSalary}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {item.dueAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={item.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
