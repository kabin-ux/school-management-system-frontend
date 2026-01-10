import React, { useMemo, useState } from 'react';
import { ClassHeader } from '../../../components/Admin/class/ClassHeader';
import { ClassStats } from '../../../components/Admin/class/ClassStats';
import { ClassTable } from '../../../components/Admin/class/ClassTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/AdminDashboardHeader';
import { AddClassModal } from '../../../components/Admin/class/AddClassModal';
import { useNavigate } from 'react-router-dom';
import type { Grade } from '../../../types/class.types';
import EditClassModal from '../../../components/Admin/class/EditClassModal';
import { useAddClass, useClassDashboardData, useClasses, useDeleteClass, useUpdateClass } from '../../../hooks/useClasses';

export interface FilterValues {
    search: string;
}

const ClassManagement: React.FC = () => {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
    });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<Grade | null>(null);

    const navigate = useNavigate();

    const { data: classes = [], isLoading: loading } = useClasses();
    const { data: classDashboardData = { totalClasses: 0, totalSubjects: 0 } } = useClassDashboardData();

    const addClassMutation = useAddClass();
    const updateClassMutation = useUpdateClass();
    const deleteClassMutation = useDeleteClass();


    const handleAddClass = async (classData: any) => {
        addClassMutation.mutate(classData, {
            onSuccess: () => setIsModalOpen(false),
        });
    }

    const handleEditClass = (cls: Grade) => {
        setIsEditModalOpen(true);
        setSelectedClass(cls);
    }

    const handleUpdateClass = async (id: string, updates: any) => {
        updateClassMutation.mutate({ id, updates }, {
            onSuccess: () => setIsEditModalOpen(false),
        });
    }

    const handleDeleteClass = async (classId: any) => {
        deleteClassMutation.mutate(classId);
    }

    const navigateToDetail = (classId: string) => {
        navigate(`/admin/class-management/details/${classId}`)
    };

    const navigateToSubject = (classId: string) => {
        navigate(`/admin/class-management/subject/${classId}`)
    };

    const filteredClasses = useMemo(() => {
        return classes.filter((cls: Grade) => {
            const textinput = `${cls?.name || ""}`.toLowerCase();
            const matchesSearch = textinput.includes(filters.search.toLowerCase());

            return matchesSearch;
        });
    }, [classes, filters]);

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

                        <ClassHeader
                            filters={filters}
                            onFiltersChange={setFilters}
                            onAdd={() => setIsModalOpen(true)}
                        />
                        <ClassStats
                            classDashboardData={classDashboardData}
                        />
                        <ClassTable
                            grades={filteredClasses}
                            onNavigateToSection={navigateToDetail}
                            onNavigateToSubject={navigateToSubject}
                            onEdit={handleEditClass}
                            onDelete={handleDeleteClass}
                        />

                        <AddClassModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddClass}
                            isLoading={loading}
                        />

                        <EditClassModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedClass(null);
                            }}
                            onSubmit={handleUpdateClass}
                            cls={selectedClass}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClassManagement;