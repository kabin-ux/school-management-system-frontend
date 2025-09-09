import { useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import StudentStats from '../../../components/Admin/students/StudentStats';
import StudentFilters from '../../../components/Admin/students/StudentFilters';
import StudentTable from '../../../components/Admin/students/StudentTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addStudent, deleteStudent, getStudentsBySchool, updateStudent, type Student } from '../../../features/studentSlice';
import toast from 'react-hot-toast';
import { AddStudentModal } from '../../../components/Admin/students/AddStudentModal';
import EditStudentModal from '../../../components/Admin/students/EditStudentModal';
import { getAllClassesBySchool } from '../../../features/classSlice';

export default function StudentManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('Grade 10');
    const [selectedSection, setSelectedSection] = useState('Section A');


    const dispatch = useAppDispatch();
    const { students } = useAppSelector((state) => state.student)
    const { classes } = useAppSelector(state => state.class)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

    useEffect(() => {
        dispatch(getStudentsBySchool())
        dispatch(getAllClassesBySchool())
    }, [dispatch])

    const handleAddStudent = async (studentData: any) => {
        try {
            const res = await dispatch(addStudent(studentData))
            if (addStudent.fulfilled.match(res)) {
                toast.success('Student added successfully')
            } else {
                toast.error('Error adding student')
            }
        } catch (error) {
            console.error('Error adding student', error)
        }
    }

    const handleEditStudent = (student: Student) => {
        setIsEditModalOpen(true);
        setSelectedStudent(student)
    }

    const handleUpdateStudent = async (updates: Student, id: number) => {
        try {
            const res = await dispatch(updateStudent({ updates, id }))
            if (updateStudent.fulfilled.match(res)) {
                toast.success('Student details updated successfully')
            } else {
                toast.error('Error updating student')
            }
        } catch (error) {
            console.error('Error editing super admin', error)
        }
    }

    const handleDeleteStudent = (id: any) => {
        try {
            dispatch(deleteStudent(id))
            toast.success('Student removed successfully')
        } catch (error) {
            console.error('Error removing student', error)
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
                                <h1 className="text-3xl font-bold text-gray-900">Student Management</h1>
                                <p className="text-gray-600 mt-1">Organize and manage Students efficiently</p>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                                onClick={() => setIsModalOpen(true)}
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Student
                            </button>
                        </div>

                        {/* Stats Cards */}
                        <StudentStats />

                        {/* Filters */}
                        <StudentFilters
                            searchTerm={searchTerm}
                            selectedClass={selectedClass}
                            selectedSection={selectedSection}
                            onSearchChange={setSearchTerm}
                            onClassChange={setSelectedClass}
                            onSectionChange={setSelectedSection}
                        />

                        {/* Student Table */}
                        <StudentTable
                            students={students}
                            onEdit={handleEditStudent}
                            onDelete={handleDeleteStudent}
                        />

                        <AddStudentModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            onSubmit={handleAddStudent}
                            classes={classes}
                        />

                        <EditStudentModal
                            isOpen={isEditModalOpen}
                            onClose={() => {
                                setIsEditModalOpen(false);
                            }}
                            onSubmit={handleUpdateStudent}
                            student={selectedStudent}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}