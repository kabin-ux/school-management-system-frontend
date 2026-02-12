import { Edit, Trash2, Users, ArrowUp, X, PowerOff, Power } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import type { Student } from '../../../types/student.types';
import { useState } from 'react';
import { Pagination } from '../../../common/Pagination';
import { usePromoteStudentToNextClass, useUpdateStudentStatus } from '../../../hooks/useStudents';
import { useSectionsByClass } from '../../../hooks/useSection';

interface StudentTableProps {
  students: Student[];
  onEdit: (student: Student) => void;
  onDelete: (id: string) => void;
  classes: any[];
}

interface PromoteFormData {
  class_id: string;
  section_id: string;
}

export default function StudentTable({
  students,
  onEdit,
  onDelete,
  classes,
}: StudentTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [promoteModal, setPromoteModal] = useState<{
    isOpen: boolean;
    student: Student | null;
  }>({ isOpen: false, student: null });

  const itemsPerPage = 10;
  const promoteMutation = usePromoteStudentToNextClass();
  const statusMutation = useUpdateStudentStatus();

  const handleStatusToggle = (student: Student) => {
    const newStatus = student.status === 'active' ? 'inactive' : 'active';
    statusMutation.mutate({ student_id: student.id, status: newStatus });
  };

  const totalPages = Math.ceil(students.length / itemsPerPage);
  const paginatedData = students.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const [selectedClassId, setSelectedClassId] = useState('');

  const handlePromoteClick = (student: Student) => {
    setPromoteModal({ isOpen: true, student });
  };

  const handlePromoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoteModal.student || !selectedClassId) return;

    const formData: PromoteFormData = {
      class_id: selectedClassId,
      section_id: (e.target as any).section_id.value,
    };

    promoteMutation.mutate({
      classId: formData.class_id,
      sectionId: formData.section_id,
      studentId: promoteModal.student.id
    }, {
      onSuccess: () => {
        setPromoteModal({ isOpen: false, student: null });
        setSelectedClassId(''); // Reset
      }
    });
  };

  const handleClosePromote = () => {
    setPromoteModal({ isOpen: false, student: null });
  };

  // Add this component inside StudentTable (before return)
  const DynamicSectionsSelect: React.FC<{
    classId: string;
    name: string;
    required?: boolean;
  }> = ({ classId, name, required }) => {
    const { data: sections = [] } = useSectionsByClass(classId);

    return (
      <select
        name={name}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
        required={required}
        disabled={!classId}
      >
        <option value="">Select section</option>
        {sections.map((section: any) => (
          <option key={section.id} value={section.id}>
            {section.section_name}
          </option>
        ))}
      </select>
    );
  };


  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {/* Table content - unchanged until Actions column */}
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
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">S.N.</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Student Name</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Parent Name</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Class/Section</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">DOB</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Roll Number</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Gender</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Transportation</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-sm font-extralight text-gray-500 tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {!students || students.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-10">
                    <EmptyState
                      title="No Students Found"
                      description="There are currently no students added to this class."
                      icon={<Users className="w-16 h-16 text-gray-400" />}
                    />
                  </td>
                </tr>
              ) : (
                paginatedData.map((student, index) => (
                  <tr key={student.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 text-sm text-gray-900">{index + 1}</td>

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

                    <td className="px-6 py-4 text-sm text-gray-900">{student.parent?.name || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {student.class?.name} '{student.section?.section_name}'
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.rollNumber || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.gender || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{student.address || '-'}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 text-center space-y-1">
                      <div>{student.transportation?.driverName ?? '-'}</div>
                      <div>{student.transportation?.vehicleNumber ?? '-'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                        }`}>
                        {student.status}
                      </span>
                    </td>

                    {/* UPDATED Actions with Promote Button */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          className="text-green-500 hover:text-green-700 p-1.5 rounded-md hover:bg-green-50 transition-all"
                          onClick={() => handlePromoteClick(student)}
                          disabled={promoteMutation.isPending}
                          title="Promote student"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          className={`${student.status === 'active' ? 'text-orange-500 hover:text-orange-700 hover:bg-orange-50' : 'text-emerald-500 hover:text-emerald-700 hover:bg-emerald-50'} p-1.5 rounded-md transition-all`}
                          onClick={() => handleStatusToggle(student)}
                          disabled={statusMutation.isPending}
                          title={student.status === 'active' ? "Deactivate" : "Activate"}
                        >
                          {student.status === 'active' ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                        </button>
                        <button
                          className="text-blue-400 hover:text-blue-600 p-1.5 rounded-md hover:bg-blue-50 transition-all"
                          onClick={() => onEdit(student)}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-400 hover:text-red-600 p-1.5 rounded-md hover:bg-red-50 transition-all"
                          onClick={() => onDelete(student.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )}
      </div>

      {/* PROMOTE MODAL */}
      {promoteModal.isOpen && promoteModal.student && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            {/* Header */}
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ArrowUp className="w-5 h-5" />
                  <div>
                    <h3 className="text-xl font-bold">Promote Student</h3>
                    <p className="text-sm opacity-90">
                      {promoteModal.student.firstName} {promoteModal.student.lastName}
                    </p>
                  </div>
                </div>
                <button onClick={handleClosePromote} className="p-1.5 hover:bg-white/20 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handlePromoteSubmit} className="p-6 space-y-4">
              {/* Class Select */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Target Class *
                </label>
                <select
                  name="class_id"
                  value={selectedClassId}
                  onChange={(e) => {
                    setSelectedClassId(e.target.value);
                  }}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="">Select class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Section Select - DYNAMICALLY FETCHED */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-2">
                  Target Section *
                </label>
                {/* Use useSectionsByClass hook */}
                <DynamicSectionsSelect
                  classId={selectedClassId}
                  name="section_id"
                  required
                />
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleClosePromote}
                  disabled={promoteMutation.isPending}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={promoteMutation.isPending || !selectedClassId}
                  className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center gap-2 transition-colors"
                >
                  {promoteMutation.isPending ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Promoting...
                    </>
                  ) : (
                    'Promote Student'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
