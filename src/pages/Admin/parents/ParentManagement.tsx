import { useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { ParentStats } from '../../../components/Admin/parents/ParentStats';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { ParentGrid } from '../../../components/Admin/parents/ParentGrid';
import AddParentModal from '../../../components/Admin/parents/AddParentModal';
import type { Parent } from '../../../types/parent.types';
import EditParentModal from '../../../components/Admin/parents/EditParentModal';
import { useStudentsBySchool } from '../../../hooks/useStudents';
import { useAddParent, useDeleteParent, useLinkParentToStudent, useParentDashboardData, useParents, useUpdateParent } from '../../../hooks/useParents';
import ParentFilters from '../../../components/Admin/parents/ParentFilters';
import { useClasses } from '../../../hooks/useClasses';
import type { Student } from '../../../types/student.types';
import LinkParentToStudentModal from '../../../components/Admin/parents/LinkParentToStudentModal';

export interface FilterValues {
    search: string;
    class: string;
}

export default function ParentsManagement() {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        class: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isLinkParentToStudentModalOpen, setIsLinkParentToStudentModalOpen] = useState(false);
    const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

    const { data: parents = [], isLoading: loading } = useParents();
    const { data: students = [] } = useStudentsBySchool();
    const { data: classes = [] } = useClasses();
    const { data: parentDashboardData = { totalParents: 0, totalParentRegisterOnThisMonth: 0, linkedStudents: 0 } } = useParentDashboardData();

    const addParentMutation = useAddParent();
    const updateParentMutation = useUpdateParent();
    const deleteParentMutation = useDeleteParent();
    const linkParentToStudent = useLinkParentToStudent();

    const handleAddParent = async (parentData: any) => {
        addParentMutation.mutate(parentData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditParent = (parent: Parent) => {
        setIsEditModalOpen(true);
        setSelectedParent(parent);
    }

    const handleLinkParent = (parent: Parent) => {
        setIsLinkParentToStudentModalOpen(true);
        setSelectedParent(parent);
    }

    const handleUpdateParent = async (id: string, updateData: any) => {
        updateParentMutation.mutate({ id, updateData }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleLinkParentToStudent = async (updateData: any) => {
        linkParentToStudent.mutate({ updateData }, {
            onSuccess: () => setIsLinkParentToStudentModalOpen(false)
        })
    }

    const handleDeleteParent = async (parentId: string) => {
        deleteParentMutation.mutate(parentId);
    }

    // Filtered students based on current filters
    const filteredParents = useMemo(() => {
        return parents.filter((parent: Parent) => {
            const textinput = `${parent?.name || ""} ${parent?.email || ""}`.toLowerCase();
            const matchesSearch = textinput.includes(filters.search.toLowerCase());
            const matchesClass =
                !filters.class ||
                parent.students?.some((student: Student) => student.class?.name === filters.class);
            return matchesSearch && matchesClass;
        });
    }, [parents, filters]);

    // Filtered students based on current filters
    const filteredStudents = useMemo(() => {
        return students.filter(
            (student: Student) => student.parent === null
        );
    }, [students]);


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
                                <h1 className="text-3xl font-bold text-gray-900">Parents Management</h1>
                                <p className="text-gray-600 mt-1">Organize and manage Parents efficiently</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Parent
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <ParentStats
                            parentDashboardData={parentDashboardData}
                        />

                        {/* Filters */}
                        <ParentFilters
                            classes={classes}
                            filters={filters}
                            onFiltersChange={setFilters}
                        />

                        {/* Parent Grid */}
                        <ParentGrid
                            parents={filteredParents}
                            onEdit={handleEditParent}
                            onDelete={handleDeleteParent}
                            onLinkToStudent={handleLinkParent}
                        />

                        <AddParentModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddParent}
                            isLoading={loading}
                            students={students}
                        />

                        <EditParentModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedParent(null);
                            }}
                            onSubmit={handleUpdateParent}
                            parent={selectedParent}
                        />

                        <LinkParentToStudentModal
                            parent={selectedParent}
                            isOpen={isLinkParentToStudentModalOpen}
                            onClose={() => {
                                setIsLinkParentToStudentModalOpen(false);
                                setSelectedParent(null);
                            }}
                            onSubmit={handleLinkParentToStudent}
                            students={filteredStudents}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}