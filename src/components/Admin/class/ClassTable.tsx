import React from 'react';
import { ChevronDown, ChevronRight, Eye, Trash2 } from 'lucide-react';
import type { Grade } from '../../../interfaces/types';

interface ClassTableProps {
  grades: Grade[];
  expandedGrades: number[];
  toggleGrade: (gradeId: number) => void;
}

export const ClassTable: React.FC<ClassTableProps> = ({ grades, expandedGrades, toggleGrade }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm">
  <div className="overflow-x-auto">
    <table className="w-full border border-gray-200">
      <thead className="bg-gray-50 border-b border-gray-200">
        <tr>
          <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Class</th>
          <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Sections</th>
          <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Total Subjects</th>
          <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Total Students</th>
          <th className="text-left p-4 font-medium text-gray-900 border-r border-gray-200">Class Teacher</th>
          <th className="text-left p-4 font-medium text-gray-900">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {grades.map((grade) => (
          <React.Fragment key={grade.id}>
            <tr className="hover:bg-gray-50 cursor-pointer">
              <td className="p-4 border-r border-gray-200">
                <button 
                  onClick={() => toggleGrade(grade.id)}
                  className="flex items-center gap-2 text-gray-900 hover:text-blue-600"
                >
                  {expandedGrades.includes(grade.id) ? (
                    <ChevronDown className="w-4 h-4" />
                  ) : (
                    <ChevronRight className="w-4 h-4" />
                  )}
                  {grade.name}
                </button>
              </td>
              <td className="p-4 border-r border-gray-200">
                <div className="flex gap-2">
                  {grade.sections.map(section => (
                    <span key={section} className="inline-flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-800 text-sm rounded">
                      {section}
                    </span>
                  ))}
                </div>
              </td>
              <td className="p-4 border-r border-gray-200 text-gray-900">{grade.totalSubjects}</td>
              <td className="p-4 border-r border-gray-200 text-gray-900">{grade.totalStudents}</td>
              <td className="p-4 border-r border-gray-200 text-gray-900">{grade.teacher}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-red-600">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
            {expandedGrades.includes(grade.id) && grade.subjects.length > 0 && (
              <tr>
                <td colSpan={6} className="p-4 bg-gray-50 border-t border-gray-200">
                  <div className="ml-6">
                    <h4 className="font-medium text-gray-900 mb-4">Subjects for {grade.name}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {grade.subjects.map((subject, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900">{subject.name}</h5>
                            <button className="text-red-500 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">{subject.code}</p>
                          <p className="text-sm text-gray-600 mb-2">{subject.teacher}</p>
                          <p className="text-sm text-gray-600">{subject.periods} periods/week</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
};