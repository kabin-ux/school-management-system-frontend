import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import TeacherStats from '../../../components/Admin/teachers/TeacherStats';
import TeacherFilters from '../../../components/Admin/teachers/TeacherFilters';
import TeacherGrid from '../../../components/Admin/teachers/TeacherGrid';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addTeacher, deleteTeacher, getAllTeachers, updateTeacher } from '../../../features/teacherSlice';
import AddTeacherModal from '../../../components/Admin/teachers/AddTeacherModal';
import toast from 'react-hot-toast';
import type { Teacher } from '../../../types/admin-dashboard.types';
import EditTeacherModal from '../../../components/Admin/teachers/EditTeacherModal';

export default function TeacherManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('All classes');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

    const dispatch = useAppDispatch();
    const { teachers } = useAppSelector((state) => state.teacher)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

    useEffect(() => {
        dispatch(getAllTeachers())
    }, [dispatch])

    const handleAddTeacher = async (teacherData: any) => {
        try {
            console.log(teacherData)
            const res = await dispatch(addTeacher(teacherData))
            if (addTeacher.fulfilled.match(res)) {
                toast.success('Teacher added successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to add teacher'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error adding teacher')
            console.error('Error adding teacher', error)
        }
    }

    const handleEditTeacher = (teacher: Teacher) => {
        setIsEditModalOpen(true);
        setSelectedTeacher(teacher);
    }

    const handleUpdateTeacher = async (teacherData: any) => {
        try {
            const res = await dispatch(updateTeacher(teacherData))
            if (updateTeacher.fulfilled.match(res)) {
                toast.success('Teacher updated successfully')
            } else {
                toast.error('Error updating teacher')
            }
        } catch (error) {
            toast.error('Error updating teacher')
            console.error('Error updating teacher', error)
        }
    }

    const handleDeleteTeacher = async (teacherId: number) => {
        try {
            const res = dispatch(deleteTeacher(teacherId))
            if (deleteTeacher.fulfilled.match(res)) {
                toast.success('Teacher removed successfully')
            } else {
                toast.error('Error removing teacher')
            }
        } catch (error) {
            toast.error('Error removing teacher')
            console.error('Error removing teacher', error)
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
                            searchTerm={searchTerm}
                            selectedClass={selectedClass}
                            selectedSubject={selectedSubject}
                            selectedDepartment={selectedDepartment}
                            onSearchChange={setSearchTerm}
                            onClassChange={setSelectedClass}
                            onSubjectChange={setSelectedSubject}
                            onDepartmentChange={setSelectedDepartment}
                        />

                        {/* Teacher Grid */}
                        <TeacherGrid
                            teachers={teachers}
                            onEdit={handleEditTeacher}
                            onDelete={handleDeleteTeacher}
                        />

                        <AddTeacherModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddTeacher}
                            // classes={classes}
                            // subjects={subjects}
                            isLoading={false}
                        />

                        <EditTeacherModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                                setSelectedTeacher(null);
                            }}
                            onSubmit={handleUpdateTeacher}
                            teacher={selectedTeacher}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}