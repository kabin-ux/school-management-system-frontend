import { useMemo, useState } from 'react';
import { ArrowUp, ShieldCheck, UserPlus } from 'lucide-react';
import { StudentStats } from '../../../components/Admin/students/StudentStats';
import StudentFilters from '../../../components/Admin/students/StudentFilters';
import StudentTable from '../../../components/Admin/students/StudentTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { AddStudentModal } from '../../../components/Admin/students/AddStudentModal';
import EditStudentModal from '../../../components/Admin/students/EditStudentModal';
import type { Student, StudentForm } from '../../../types/student.types';
import { useAddStudent, useDeleteStudent, useInactiveStudentsBySchool, useStudentDashboardData, useStudentsBySchool, useUpdateStudent } from '../../../hooks/useStudents';
import { useClasses } from '../../../hooks/useClasses';
import { useAllTransportation } from '../../../hooks/useTransportation';
import BulkPromoteStudentModal from '../../../components/Admin/students/BulkPromoteStudentModal';
import BulkStudentStatusUpdateModal from '../../../components/Admin/students/BulkStatusUpdateModal';

export interface FilterValues {
    search: string;
    section: string;
    class: string;
    status: string;
}

export default function StudentManagement() {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        section: '',
        class: '',
        status: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isBulkPromoteModalOpen, setIsBulkPromoteModalOpen] = useState(false);
    const [isStatusUpdateModalOpen, setIsStatusUpdateModalOpen] = useState(false);

    const { data: activeStudents = [], isLoading: loading } = useStudentsBySchool();
    const { data: inactiveStudents = [] } = useInactiveStudentsBySchool();
    const { data: classes = [] } = useClasses();
    const { data: transportations = [] } = useAllTransportation();
    const { data: studentDashboardData = { totalStudents: 0, totalStudentRegisterOnThisMonth: 0 } } = useStudentDashboardData();

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

    const allStudents = useMemo(() => {
        return [...activeStudents, ...inactiveStudents];
    }, [activeStudents, inactiveStudents]);

    // Filtered students based on current filters
    const filteredStudents = useMemo(() => {
        return allStudents.filter((student: Student) => {
            const fullName = `${student?.firstName || ""} ${student?.lastName || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesSection = !filters.section || student.section.section_name === filters.section;
            const matchesClass = !filters.class || student.class.name === filters.class;
            const matchesStatus = !filters.status || student.status === filters.status; 

            return matchesSearch && matchesSection && matchesClass && matchesStatus;
        });
    }, [allStudents, filters]);

    return (
        <div className="flex h-full bg-gray-50 overflow-hidden">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1 overflow-hidden">
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
                            <div className="flex items-center gap-3">
                                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                    onClick={() => setIsModalOpen(true)}
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Add Student
                                </button>
                                <button
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors font-medium flex items-center gap-2"
                                    onClick={() => setIsBulkPromoteModalOpen(true)}
                                >
                                    <ArrowUp className="w-4 h-4" />
                                    Bulk Promote
                                </button>
                                <button
                                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors font-medium flex items-center gap-2"
                                    onClick={() => setIsStatusUpdateModalOpen(true)}
                                >
                                    <ShieldCheck className="w-4 h-4" />
                                    Bulk Status Update
                                </button>
                            </div>
                        </div>

                        {/* Stats Cards */}
                        <StudentStats
                            studentDashboardData={studentDashboardData}
                        />

                        {/* Filters */}
                        <StudentFilters
                            classes={classes}
                            filters={filters}
                            onFiltersChange={setFilters}
                        />

                        {/* Student Table */}
                        <StudentTable
                            students={filteredStudents}
                            onEdit={handleEditStudent}
                            onDelete={handleDeleteStudent}
                            classes={classes}
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
                                setSelectedStudent(null);
                            }}
                            onSubmit={handleUpdateStudent}
                            student={selectedStudent}
                            classes={classes}
                            isLoading={loading}
                            transportations={transportations}
                        />

                        <BulkPromoteStudentModal
                            isOpen={isBulkPromoteModalOpen}
                            onClose={() => setIsBulkPromoteModalOpen(false)}
                            classes={classes}
                            students={allStudents} // All students data
                        />

                        <BulkStudentStatusUpdateModal
                            isOpen={isStatusUpdateModalOpen}
                            onClose={() => setIsStatusUpdateModalOpen(false)}
                            students={allStudents}
                            classes={classes}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}