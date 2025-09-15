import React, { useEffect, useState } from 'react';
import { ClassHeader } from '../../../components/Admin/class/ClassHeader';
import { ClassStats } from '../../../components/Admin/class/ClassStats';
import { ClassTable } from '../../../components/Admin/class/ClassTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addClass, deleteClass, getAllClassesBySchool, updateClass } from '../../../features/classSlice';
import { AddClassModal } from '../../../components/Admin/class/AddClassModal';
import { useNavigate } from 'react-router-dom';
import type { Grade } from '../../../types/class.types';
import EditClassModal from '../../../components/Admin/class/EditClassModal';

const ClassManagement: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState<Grade | null>(null);

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { classes, loading } = useAppSelector(state => state.class)

    useEffect(() => {
        dispatch(getAllClassesBySchool())
    }, [dispatch])

    const handleAddClass = async (classData: any) => {
        try {
            const res = await dispatch(addClass(classData))
            if (addClass.fulfilled.match(res)) {
                toast.success('Class added successfully')
                setIsModalOpen(false)
            } else {
                const errorMessage = typeof res.payload === "string" ? res.payload : 'Error adding class'
                toast.error(errorMessage);;
            }
        } catch (error) {
            toast.error('Error adding class')
            console.error('Error adding class', error)
        }
    }

    const handleEditClass = (cls: Grade) => {
        setIsEditModalOpen(true);
        setSelectedClass(cls);
    }

    const handleUpdateClass = async (classData: any) => {
        try {
            const res = await dispatch(updateClass(classData))
            if (updateClass.fulfilled.match(res)) {
                toast.success('Class updated successfully')
            } else {
                toast.error('Error updating class')
            }
        } catch (error) {
            toast.error('Error updating class')
            console.error('Error updating class', error)
        }
    }

    const handleDeleteClass = async (classId: any) => {
        try {
            const res = await dispatch(deleteClass(classId))
            if (deleteClass.fulfilled.match(res)) {
                toast.success('Class deleted successfully')
            } else {
                toast.error('Error deleting class')
            }
        } catch (error) {
            toast.error('Error deleting class')
            console.error('Error deleting class', error)
        }
    }

    const navigateToDetail = (classId: number) => {
        navigate(`/admin/class-management/details/${classId}`)
    };

     const navigateToSubject = (classId: number) => {
        navigate(`/admin/class-management/subject/${classId}`)
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