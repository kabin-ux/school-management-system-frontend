import { Edit, Trash2, Users } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import type { Student } from '../../../types/student.types';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
}

export default function StudentTable({ students, onEdit, onDelete }: StudentTableProps) {

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Students ({students.length})</h2>
            <p className="text-sm text-gray-600">Manage and monitor student information</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Student Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Admission Number
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Class/Section
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                DOB
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gender
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {!students || students.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-10">
                  <div className="flex justify-center items-center">
                    <EmptyState
                      title="No Students Found"
                      description="There are currently no students added to this class. Click the button below to add a new student."
                      icon={<Users className="w-16 h-16 text-gray-400" />}
                    />
                  </div>
                </td>
              </tr>
            ) : (
              students?.map((student, index) => (
                <tr
                  key={student.id}
                  className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  {/* Name & Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        {student.firstName?.[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {student.firstName + ' ' + student.lastName || '-'}
                        </p>
                        <p className="text-sm text-gray-500">{student.email || '-'}</p>
                      </div>
                    </div>
                  </td>

                  {/* Roll Number */}
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {student.rollNumber || '-'}
                  </td>

                  {/* Class & Section */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.class?.name} '{student.section?.section_name}'
                  </td>


                  {/* Date of Birth */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(student.dateOfBirth).toLocaleDateString()}
                  </td>

                  {/* Gender */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.gender || '-'}
                  </td>

                  <td className="px-6 py-4 text-sm text-gray-500">
                    {student.address || '-'}
                  </td>

                  {/* Actions */}
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

              )
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}