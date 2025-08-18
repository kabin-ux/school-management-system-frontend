import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import TeacherStats from '../../../components/Admin/dashboard/teachers/TeacherStats';
import TeacherFilters from '../../../components/Admin/dashboard/teachers/TeacherFilters';
import TeacherGrid from '../../../components/Admin/dashboard/teachers/TeacherGrid';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';

export default function TeacherManagement() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedClass, setSelectedClass] = useState('All classes');
    const [selectedSubject, setSelectedSubject] = useState('All Subjects');
    const [selectedDepartment, setSelectedDepartment] = useState('All Departments');

    return (
        <div className="flex h-screen bg-gray-50">
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
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
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
                        <TeacherGrid />
                    </div>
                </main>
            </div>
        </div>
    );
}