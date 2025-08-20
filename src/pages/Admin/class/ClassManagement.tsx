import React, { useState } from 'react';
import type { Grade } from '../../../types/types';
import { ClassHeader } from '../../../components/Admin/class/ClassHeader';
import { ClassStats } from '../../../components/Admin/class/ClassStats';
import { ClassTable } from '../../../components/Admin/class/ClassTable';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
const ClassManagement: React.FC = () => {
    const [expandedGrades, setExpandedGrades] = useState<number[]>([1]);
    const [searchTerm, setSearchTerm] = useState('');

    const grades: Grade[] = [
        {
            id: 1,
            name: 'Grade 1',
            sections: ['A', 'B'],
            totalSubjects: 8,
            totalStudents: 45,
            teacher: 'Sarah Johnson',
            subjects: [
                { name: 'English', code: 'ENG101', teacher: 'Sarah Johnson', periods: 6 },
                { name: 'English', code: 'ENG102', teacher: 'Sarah Johnson', periods: 6 },
                { name: 'English', code: 'ENG103', teacher: 'Sarah Johnson', periods: 6 },
                { name: 'English', code: 'ENG201', teacher: 'Sarah Johnson', periods: 6 },
                { name: 'English', code: 'ENG202', teacher: 'Sarah Johnson', periods: 6 },
                { name: 'English', code: 'ENG301', teacher: 'Sarah Johnson', periods: 6 },
            ]
        },
        ...Array.from({ length: 11 }, (_, i) => ({
            id: i + 2,
            name: `Grade ${i + 2}`,
            sections: ['A', 'B'],
            totalSubjects: 8,
            totalStudents: 45,
            teacher: 'Sarah Johnson',
            subjects: []
        }))
    ];

    const toggleGrade = (gradeId: number) => {
        setExpandedGrades(prev =>
            prev.includes(gradeId)
                ? prev.filter(id => id !== gradeId)
                : [...prev, gradeId]
        );
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

                        <ClassHeader searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
                        <ClassStats />
                        <ClassTable
                            grades={grades}
                            expandedGrades={expandedGrades}
                            toggleGrade={toggleGrade}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ClassManagement;