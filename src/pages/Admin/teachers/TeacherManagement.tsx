import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import TeacherStats from '../../../components/Admin/teachers/TeacherStats';
import TeacherFilters from '../../../components/Admin/teachers/TeacherFilters';
import TeacherGrid from '../../../components/Admin/teachers/TeacherGrid';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addTeacher, getAllTeachers } from '../../../features/teacherSlice';
import AddTeacherModal from '../../../components/Admin/teachers/AddTeacherModal';
import toast from 'react-hot-toast';

export default function TeacherManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('All classes');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

    const dispatch = useAppDispatch();
    const { teachers } = useAppSelector((state) => state.teacher)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllTeachers())
    }, [dispatch])

      const handleAddTeacher = (teacherData: any) => {
        try {
          console.log(teacherData)
          dispatch(addTeacher(teacherData))
          toast.success('Teacher added successfully')
        } catch (error) {
          console.error('Error adding school', error)
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
                        />

                        <AddTeacherModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddTeacher}
                            // classes={classes}
                            // subjects={subjects}
                            isLoading={false}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}