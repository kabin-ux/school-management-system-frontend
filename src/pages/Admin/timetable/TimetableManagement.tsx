import { useState } from 'react';
import { Printer, Download, Save } from 'lucide-react';
import TimetableFilters from '../../../components/Admin/timetable/TimetableFilters';
import WeeklyTimetable from '../../../components/Admin/timetable/WeeklyTimetable';
import TimetableSidebar from '../../../components/Admin/timetable/TimetableSidebar';

export default function TimetableManagement() {
    const [selectedClass, setSelectedClass] = useState('Grade 10');
    const [selectedSection, setSelectedSection] = useState('Section A');
    const [selectedSubject, setSelectedSubject] = useState('All Subject');

    return (
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Timetable Management</h1>
                        <p className="text-gray-600 mt-1">Organize and manage class schedules efficiently</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center gap-2">
                            <Printer className="w-4 h-4" />
                            Print Timetable
                        </button>
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center gap-2">
                            <Download className="w-4 h-4" />
                            Export PDF
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
                            <Save className="w-4 h-4" />
                            Save Timetable
                        </button>
                    </div>
                </div>

                {/* Filters */}
                <TimetableFilters
                    selectedClass={selectedClass}
                    selectedSection={selectedSection}
                    selectedSubject={selectedSubject}
                    onClassChange={setSelectedClass}
                    onSectionChange={setSelectedSection}
                    onSubjectChange={setSelectedSubject}
                />

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Timetable - spans 3 columns */}
                    <div className="lg:col-span-3">
                        <WeeklyTimetable />
                    </div>

                    {/* Sidebar - spans 1 column */}
                    <div>
                        <TimetableSidebar />
                    </div>
                </div>
            </div>
        </div>
    );
}