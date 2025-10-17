import { useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import TeacherStats from '../../../components/Admin/teachers/TeacherStats';
import TeacherFilters from '../../../components/Admin/teachers/TeacherFilters';
import TeacherGrid from '../../../components/Admin/teachers/TeacherGrid';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import AddTeacherModal from '../../../components/Admin/teachers/AddTeacherModal';
import EditTeacherModal from '../../../components/Admin/teachers/EditTeacherModal';
import { useAddTeacher, useDeleteTeacher, useTeachers, useUpdateTeacher } from '../../../hooks/useTeachers';
import type { Teacher } from '../../../types/teacher.types';
import { useClasses } from '../../../hooks/useClasses';

export interface FilterValues {
    search: string;
    subject: string;
    class: string;
}

export default function TeacherManagement() {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        subject: '',
        class: ''
    });
    const { data: teachers = [], isLoading: loading } = useTeachers();
    const addTeacherMutation = useAddTeacher();
    const updateTeacherMutation = useUpdateTeacher();
    const deleteTeacherMutation = useDeleteTeacher();

    const { data: classes = [] } = useClasses();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    const handleAddTeacher = async (teacherData: any) => {
        addTeacherMutation.mutate(teacherData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditTeacher = (teacher: Teacher) => {
        setIsEditModalOpen(true);
        setSelectedTeacher(teacher);
    }

    const handleUpdateTeacher = async (id: string, teacherData: any) => {
        updateTeacherMutation.mutate({ id, teacherData }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteTeacher = async (teacherId: string) => {
        deleteTeacherMutation.mutate(teacherId);
    }

    // Filtered teachers based on current filters
    const filteredTeachers = useMemo(() => {
        return teachers.filter((teacher: Teacher) => {
            const fullName = `${teacher?.firstName || ""} ${teacher?.lastName || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            // const matchesSection = !filters.subject || teacher.subjects.includes(filters.subject);
            // const matchesClass = !filters.class || teacher?.class?.name === filters.class;

            return matchesSearch ;
        });
    }, [teachers, filters]);

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
                                <h1 className="text-3xl font-bold text-gray-900">Teacher Management</h1>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Teacher
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <TeacherStats />

                        {/* Filters */}
                        <TeacherFilters
                            classes={classes}
                            filters={filters}
                            onFiltersChange={setFilters}
                        />

                        {/* Teacher Grid */}
                        <TeacherGrid
                            teachers={filteredTeachers}
                            onEdit={handleEditTeacher}
                            onDelete={handleDeleteTeacher}
                        />

                        <AddTeacherModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddTeacher}
                            // classes={classes}
                            // subjects={subjects}
                            isLoading={loading}
                        />

                        <EditTeacherModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedTeacher(null);
                            }}
                            onSubmit={handleUpdateTeacher}
                            teacher={selectedTeacher}
                            isLoading={loading}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}