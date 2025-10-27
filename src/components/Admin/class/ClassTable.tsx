import React, { useState } from 'react';
import { BookCheck, BookOpenCheck, BookUser, Edit, Eye, Trash2 } from 'lucide-react';
import type { Grade } from '../../../types/class.types';
import EmptyState from '../../../common/EmptyState';
import { Pagination } from '../../../common/Pagination';

interface ClassTableProps {
  grades: Grade[];
  onNavigateToSection: (classId: string) => void;
  onNavigateToSubject: (classId: string) => void;
  onAssignClassTeacher: (cls: Grade) => void;
  onEdit: (cls: Grade) => void;
  onDelete: (classId: string) => void;
}

export const ClassTable: React.FC<ClassTableProps> = ({ grades, onNavigateToSection, onNavigateToSubject, onAssignClassTeacher, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(grades.length / itemsPerPage);

  const paginatedData = grades.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  )

  return (
    <div className="bg-white rounded-lg shadow-sm">

      {!grades || grades.length === 0 ? (
        <div className='flex justify-center'>
          <EmptyState
            title='No Classes Found'
            description='There are currently no class records. Click the button above to add a new class.'
            icon={<BookUser className='w-14 h-14' />}
          />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Class</th>
                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Total Sections</th>
                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Total Subjects</th>
                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Total Students</th>
                <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Class Teacher</th>
                <th className="text-left p-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {
                paginatedData.map((grade) => (
                  <tr key={grade.id} className="hover:bg-gray-50 cursor-pointer"
                  >
                    <td className="p-4 border-r border-gray-200">
                      <button
                        // onClick={() => toggleGrade(grade.id)}
                        className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
                      >
                        {/* {expandedGrades.includes(grade.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )} */}
                        {grade.name}
                      </button>
                    </td>
                    <td className="p-4 border-r border-gray-200">
                      {grade?.totalSection}
                    </td>
                    <td className="p-4 border-r border-gray-200 text-gray-900">{grade?.totalSubject}</td>
                    <td className="p-4 border-r border-gray-200 text-gray-900">{grade?.totalStudent}</td>
                    <td className="p-4 border-r border-gray-200 text-gray-900">{grade?.classTeacher?.firstName} {grade?.classTeacher?.lastName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600"
                          onClick={() => onNavigateToSection(grade.id)}
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600"
                          onClick={() => onNavigateToSubject(grade.id)}
                        >
                          <BookCheck className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600"
                          onClick={() => onAssignClassTeacher(grade)}
                        >
                          <BookOpenCheck className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600"
                          onClick={() => onEdit(grade)}
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-red-600"
                          onClick={() => onDelete(grade.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )}

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>

  );
};