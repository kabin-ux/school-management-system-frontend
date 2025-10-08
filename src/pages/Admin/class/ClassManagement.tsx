import React, { useEffect, useState } from 'react';
import { ClassHeader } from '../../../components/Admin/class/ClassHeader';
import { ClassStats } from '../../../components/Admin/class/ClassStats';
import { ClassTable } from '../../../components/Admin/class/ClassTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { AddClassModal } from '../../../components/Admin/class/AddClassModal';
import { useNavigate } from 'react-router-dom';
import type { Grade } from '../../../types/class.types';
import EditClassModal from '../../../components/Admin/class/EditClassModal';
import { AssignClassTeacherModal, type AssignClassTeacherForm } from '../../../components/Admin/class/AssignClassTeacherModal';
import { assignClassTeacher, getAllTeachers } from '../../../features/teacherSlice';
import { useAddClass, useClasses, useDeleteClass, useUpdateClass } from '../../../hooks/useClasses';

const ClassManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<Grade | null>(null);
    const [isAssignClassTeacherModalOpen, setIsAssignClassTeacherModalOpen] = useState(false);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { data: classes = [], isLoading: loading } = useClasses();
    const addClassMutation = useAddClass();
    const updateClassMutation = useUpdateClass();
    const deleteClassMutation = useDeleteClass();

    const { teachers } = useAppSelector(state => state.teacher)

    useEffect(() => {
        dispatch(getAllTeachers())
    }, [dispatch])

    const handleAddClass = async (classData: any) => {
        addClassMutation.mutate(classData, {
            onSuccess: () => setIsModalOpen(false),
        });
    }

    const handleEditClass = (cls: Grade) => {
        setIsEditModalOpen(true);
        setSelectedClass(cls);
    }

    const handleUpdateClass = async (updates: any) => {
        updateClassMutation.mutate({ updates }, {
            onSuccess: () => setIsEditModalOpen(false),
        });
    }

    const handleDeleteClass = async (classId: any) => {
        deleteClassMutation.mutate(classId);
    }

    const navigateToDetail = (classId: number) => {
        navigate(`/admin/class-management/details/${classId}`)
    };

    const navigateToSubject = (classId: number) => {
        navigate(`/admin/class-management/subject/${classId}`)
    };

    const addClassTeacher = (cls: Grade) => {
        setSelectedClass(cls)
        setIsAssignClassTeacherModalOpen(true);
    };

    const handleAssignClassTeacher = async (data: AssignClassTeacherForm) => {
        try {
            const res = await dispatch(assignClassTeacher(data))
            if (assignClassTeacher.fulfilled.match(res)) {
                toast.success('Class Teacher assigned successfully')
            } else {
                toast.error('Error assigning Class Teacher')
            }
        } catch (error) {
            toast.error('Error assigning Class teacher')
            console.error('Error assigning Class teacher', error)
        }
    }

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

                        <ClassHeader
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            onAdd={() => setIsModalOpen(true)}
                        />
                        <ClassStats />
                        <ClassTable
                            grades={classes}
                            onNavigateToSection={navigateToDetail}
                            onNavigateToSubject={navigateToSubject}
                            onAssignClassTeacher={addClassTeacher}
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

                        <AssignClassTeacherModal
                            isOpen={isAssignClassTeacherModalOpen}
                            onClose={() => setIsAssignClassTeacherModalOpen(false)}
                            classId={selectedClass?.id}
                            onSubmit={handleAssignClassTeacher}
                            isLoading={loading}
                            teachers={teachers}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClassManagement;