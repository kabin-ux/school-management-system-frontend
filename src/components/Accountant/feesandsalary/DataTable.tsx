import React from 'react';
import type { FeeStructureAttributes, Teacher, ViewType } from '../../../types/fee-salary.types';
import { StatusBadge } from './StatusBadge';
import { Edit, Trash2 } from 'lucide-react';
import type { FeeStructureForm } from './AddFeeStructureModal';

interface DataTableProps {
  activeView: ViewType;
  students: FeeStructureAttributes[];
  teachers: Teacher[];
  // onRowClick: (id: string) => void;
  onEdit: (feeStructure: FeeStructureForm) => void;
  onDelete: (feeStructureId: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  activeView,
  students,
  teachers,
  // onRowClick,
  onEdit,
  onDelete
}) => {
  const data = activeView === 'Student' ? students : teachers;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {activeView === 'Student' ? 'Student Fees Details' : 'Teacher Salary Details'}
          </h3>
          <p className="text-gray-600 text-sm">
            {activeView === 'Student'
              ? 'Student fee structure and payment details'
              : 'Teacher salary and payment details'}
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
                {activeView === 'Student' ? 'Fee ID' : 'Teacher ID'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Class' : 'Teacher Name'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Monthly Fee' : 'Department'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Exam Fee' : 'Last Paid'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {activeView === 'Student' ? 'Total' : 'Total Salary'}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, index) => {
              if (activeView === 'Student') {
                const student = item as FeeStructureAttributes;
                const total =
                  Number(student.monthly_fee) +
                  Number(student.exam_fee) +
                  Number(student.tution_fee) +
                  Number(student.other_fee) +
                  Number(student.computer_fee) +
                  Number(student.laboratory_fee);

                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    // onClick={() => onRowClick(student.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      {student.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {student.class?.name ?? '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.monthly_fee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {student.exam_fee}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={student.class?.school?.status ?? 'Unknown'} />
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="text-blue-400 hover:text-gray-600"
                          onClick={() => onEdit(student)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-400 hover:text-gray-600"
                          onClick={() => onDelete(student.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              } else {
                const teacher = item as Teacher;
                return (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onRowClick(teacher.id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 font-medium">
                      {teacher.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {teacher.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {teacher.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {teacher.lastPaid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {teacher.totalSalary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={teacher.status} />
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
