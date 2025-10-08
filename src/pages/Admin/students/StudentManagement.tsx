import {  useState } from 'react';
import { UserPlus } from 'lucide-react';
import StudentStats from '../../../components/Admin/students/StudentStats';
import StudentFilters from '../../../components/Admin/students/StudentFilters';
import StudentTable from '../../../components/Admin/students/StudentTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { AddStudentModal } from '../../../components/Admin/students/AddStudentModal';
import EditStudentModal from '../../../components/Admin/students/EditStudentModal';
import type { Student, StudentForm } from '../../../types/student.types';
import { useAddStudent, useDeleteStudent, useStudentsBySchool, useUpdateStudent } from '../../../hooks/useStudents';
import { useClasses } from '../../../hooks/useClasses';

export default function StudentManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('Grade 10');
    const [selectedSection, setSelectedSection] = useState('Section A');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    const { data: students = [], isLoading: loading } = useStudentsBySchool();
    const { data: classes = [] } = useClasses();

    const addStudentMutation = useAddStudent();
    const updateStudentMutation = useUpdateStudent();
    const deleteStudentMutation = useDeleteStudent();

    const handleAddStudent = async (studentData: any) => {
        addStudentMutation.mutate(studentData, {
            onSuccess: () => setIsModalOpen(false),
        });
    };

    const handleEditStudent = (student: Student) => {
        setIsEditModalOpen(true);
        setSelectedStudent(student)
    }

    const handleUpdateStudent = (updates: StudentForm, id: string) => {
        updateStudentMutation.mutate({ updates, id }, {
            onSuccess: () => setIsEditModalOpen(false),
        });
    };

    const handleDeleteStudent = (id: string) => {
        deleteStudentMutation.mutate(id);
    };

    return (
        <div className="flex h-full bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <AdminDashboardHeader />
                <main className="flex-1 p-6 overflow-y-auto">

                    <div className="max-w-7xl mx-auto">
                        {/* Header */}
                        <div className="flex justify-between items-center mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                                <p className="text-gray-600 mt-1">Organize and manage Students efficiently</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Student
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <StudentStats />

                        {/* Filters */}
                        <StudentFilters
                            searchTerm={searchTerm}
                            selectedClass={selectedClass}
                            selectedSection={selectedSection}
                            onSearchChange={setSearchTerm}
                            onClassChange={setSelectedClass}
                            onSectionChange={setSelectedSection}
                        />

                        {/* Student Table */}
                        <StudentTable
                            students={students}
                            onEdit={handleEditStudent}
                            onDelete={handleDeleteStudent}
                        />

                        <AddStudentModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddStudent}
                            classes={classes}
                            loading={loading}
                        />

                        <EditStudentModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                            }}
                            onSubmit={handleUpdateStudent}
                            student={selectedStudent}
                            classes={classes}
                            isLoading={loading}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}