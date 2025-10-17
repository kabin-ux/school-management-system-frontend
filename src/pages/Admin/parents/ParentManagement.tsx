import { useMemo, useState } from 'react';
import { UserPlus } from 'lucide-react';
import ParentStats from '../../../components/Admin/parents/ParentStats';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { ParentGrid } from '../../../components/Admin/parents/ParentGrid';
import AddParentModal from '../../../components/Admin/parents/AddParentModal';
import type { Parent } from '../../../types/parent.types';
import EditParentModal from '../../../components/Admin/parents/EditParentModal';
import { useStudentsBySchool } from '../../../hooks/useStudents';
import { useAddParent, useDeleteParent, useParents, useUpdateParent } from '../../../hooks/useParents';
import ParentFilters from '../../../components/Admin/parents/ParentFilters';
import { useClasses } from '../../../hooks/useClasses';
import type { Student } from '../../../types/student.types';

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
    const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

    const { data: parents = [], isLoading: loading } = useParents();
    const { data: students = [] } = useStudentsBySchool();
    const { data: classes = [] } = useClasses();

    const addParentMutation = useAddParent();
    const updateParentMutation = useUpdateParent();
    const deleteParentMutation = useDeleteParent();

    const handleAddParent = async (parentData: any) => {
        addParentMutation.mutate(parentData, {
            onSuccess: () => setIsModalOpen(false)
        })
    }

    const handleEditParent = (parent: Parent) => {
        setIsEditModalOpen(true);
        setSelectedParent(parent);
    }

    const handleUpdateParent = async (id: string, updateData: any) => {
        console.log("updatedata", updateData)
        updateParentMutation.mutate({ id, updateData }, {
            onSuccess: () => setIsEditModalOpen(false)
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
            // console.log("cls", parent?.students.class.name)
            const matchesClass =
                !filters.class ||
                parent.students?.some((student: Student) => student.class?.name === filters.class);
            return matchesSearch && matchesClass;
        });
    }, [parents, filters]);

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
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Parent
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <ParentStats />

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
                    </div>
                </main>
            </div>
        </div>
    );
}