import { useEffect, useState } from 'react';
import { Printer, Download, Save, Plus } from 'lucide-react';
import TimetableFilters from '../../../components/Admin/timetable/TimetableFilters';
import { WeeklyTimetable } from '../../../components/Admin/timetable/WeeklyTimetable';
import TimetableSidebar from '../../../components/Admin/timetable/TimetableSidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getAllTimetables, createTimetable } from '../../../features/timetableSlice';
import { getAllTimeSlotsByTimetableId, createTimeSlot, updateTimeSlot, deleteTimeSlot } from '../../../features/timeSlotSlice';
import toast from 'react-hot-toast';
import { getEndTime } from '../../../lib/utils';
import { CreateTimeTableModal, type TimeTableForm } from '../../../components/Admin/timetable/CreateTimeTableModal';
import { EditTimeSlotModal, type EditTimeSlotForm } from '../../../components/Admin/timetable/EditTimeSlotModal';
import type { TimeSlot } from '../../../types/timetable.types';
import { useClasses } from '../../../hooks/useClasses';

export default function TimetableManagement() {
    const [selectedClass, setSelectedClass] = useState('Grade 10');
    const [selectedSection, setSelectedSection] = useState('Section A');
    const [selectedSubject, setSelectedSubject] = useState('All Subject');

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

    const dispatch = useAppDispatch();
    const { data: classes = [] } = useClasses();
    const { timetables, loading } = useAppSelector(state => state.timetable);
    const { slots } = useAppSelector(state => state.timeSlot);

    useEffect(() => {
        dispatch(getAllTimetables())
    }, [dispatch])

    const handleCreateTimetable = async (timetableData: TimeTableForm) => {
        try {
            const res = await dispatch(createTimetable(timetableData));
            if (createTimetable.fulfilled.match(res)) {
                toast.success('Timetable created successfully')
                setIsModalOpen(false)
            } else {
                toast.error('Error creating timetable')
            }
        } catch (error) {
            console.error('Error creating timetable', error)
        }
    };

    const handleAddTimeSlot = async (timetableId: string, dayOfWeek: string, startTime: string) => {
        const newTimeSlot = {
            timetableId,
            dayOfWeek,
            startTime,
            endTime: getEndTime(startTime),
            label: 'New Subject',
            subject: 'New Subject',
            teacher: 'TBD'
        };
        const res = await dispatch(createTimeSlot(newTimeSlot));
        if (createTimeSlot.fulfilled.match(res)) {
            toast.success('Time Slot added successfully')
        } else {
            const errorMessage = typeof res.payload === "string" ? res.payload : 'Error adding time slot'
            toast.error(errorMessage);
        }
    };

    const handleEditTimeSlot = (timeSlot: TimeSlot) => {
        setIsEditModalOpen(true);
        setSelectedTimeSlot(timeSlot);
        console.log(timeSlot)
    }

    const handleUpdateTimeSlot = async (timeslotData: EditTimeSlotForm, id: string) => {
        try {
            const res = await dispatch(updateTimeSlot({ timeslotData, id }))
            if (updateTimeSlot.fulfilled.match(res)) {
                toast.success('Timeslot updated successfully')
            } else {
                toast.error('Error updating timeslot')
            }
        } catch (error) {
            toast.error('Error updating timeslot')
            console.error('Error updating timeslot', error)
        }
    }

    const handleDeleteTimeSlot = async (timeSlotId: string) => {
        try {
            const res = await dispatch(deleteTimeSlot(timeSlotId))
            if (deleteTimeSlot.fulfilled.match(res)) {
                toast.success('Timeslot removed successfully')
            } else {
                toast.error('Error removing timeslot')
            }
        } catch (error) {
            toast.error('Error removing timeslot')
            console.error('Error removing timeslot', error)
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
                                <h1 className="text-3xl font-bold text-gray-900">Timetable Management</h1>
                                <p className="text-gray-600 mt-1">Organize and manage class schedules efficiently</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Create Timetable
                                </button>
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
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                            {/* Timetable - spans 3 columns */}
                            <div className="lg:col-span-3">
                                <WeeklyTimetable
                                    timetables={timetables}
                                    onAddTimeSlot={handleAddTimeSlot}
                                    onEditTimeSlot={handleEditTimeSlot}
                                    onDeleteTimeSlot={handleDeleteTimeSlot}
                                />
                            </div>

                            {/* Sidebar - spans 1 column */}
                            {/* <div>
                                <TimetableSidebar />
                            </div> */}
                        </div>
                    </div>
                    <CreateTimeTableModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleCreateTimetable}
                        classes={classes}
                        isLoading={loading}
                    />

                    <EditTimeSlotModal
                        isOpen={isEditModalOpen}
                        onClose={() => {
                            setIsEditModalOpen(false);
                            setSelectedTimeSlot(null);
                        }}
                        onSubmit={handleUpdateTimeSlot}
                        timeSlot={selectedTimeSlot}
                        isLoading={loading}
                    />
                </main>
            </div>
        </div>
    );
}