import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import ParentStats from '../../../components/Admin/parents/ParentStats';
import TeacherFilters from '../../../components/Admin/teachers/TeacherFilters';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getStudentsBySchool } from '../../../features/studentSlice';
import { addParent, deleteParent, getAllParents, updateParent } from '../../../features/parentSlice';
import { ParentGrid } from '../../../components/Admin/parents/ParentGrid';
import AddParentModal from '../../../components/Admin/parents/AddParentModal';
import toast from 'react-hot-toast';
import type { Parent } from '../../../types/parent.types';
import EditParentModal from '../../../components/Admin/parents/EditParentModal';

export default function ParentsManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('All classes');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedParent, setSelectedParent] = useState<Parent | null>(null);

    const dispatch = useAppDispatch();
    const { parents } = useAppSelector(state => state.parent)
    const { students } = useAppSelector(state => state.student)

    useEffect(() => {
        dispatch(getAllParents())
        dispatch(getStudentsBySchool())
    }, [dispatch])

    const handleAddParent = async (parentData: any) => {
        try {
            const res = await dispatch(addParent(parentData))
            if (addParent.fulfilled.match(res)) {
                toast.success('Parent added successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to add parent'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error adding teacher')
            console.error('Error adding teacher', error)
        }
    }

    const handleEditParent = (parent: Parent) => {
        setIsEditModalOpen(true);
        setSelectedParent(parent);
    }

    const handleUpdateParent = async (parentData: any) => {
        try {
            const res = await dispatch(updateParent(parentData))
            if (updateParent.fulfilled.match(res)) {
                toast.success('Parent updated successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to update parent'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error updating parent')
            console.error('Error updating parent', error)
        }
    }

    const handleDeleteParent = async (parentId: number) => {
        try {
            const res = await dispatch(deleteParent(parentId))
            if (deleteParent.fulfilled.match(res)) {
                toast.success('Parent removed successfully')
            } else {
                toast.error('Error removing parent')
            }
        } catch (error) {
            toast.error('Error removing parent')
            console.error('Error removing parent', error)
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
                        <TeacherFilters
                            searchTerm={searchTerm}
                            selectedClass={selectedClass}
                            selectedSubject={selectedSubject}
                            selectedDepartment={selectedDepartment}
                            onSearchChange={setSearchTerm}
                            onClassChange={setSelectedClass}
                            onSubjectChange={setSelectedSubject}
                            onDepartmentChange={setSelectedDepartment}
                        />

                        {/* Parent Grid */}
                        <ParentGrid
                            parents={parents}
                            onEdit={handleEditParent}
                            onDelete={handleDeleteParent}
                        />

                        <AddParentModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddParent}
                            isLoading={false}
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