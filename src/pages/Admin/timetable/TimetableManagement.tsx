import { useMemo, useState } from 'react';
import {  Plus } from 'lucide-react';
import TimetableFilters from '../../../components/Admin/timetable/TimetableFilters';
import { WeeklyTimetable } from '../../../components/Admin/timetable/WeeklyTimetable';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { CreateTimeTableModal, type TimetableAttributes, type TimeTableForm } from '../../../components/Admin/timetable/CreateTimeTableModal';
import { EditTimeSlotModal, type EditTimeSlotForm } from '../../../components/Admin/timetable/EditTimeSlotModal';
import type { TimeSlot } from '../../../types/timetable.types';
import { useClasses } from '../../../hooks/useClasses';
import { useAllTimetables, useCreateTimetable, useDeleteTimetable } from '../../../hooks/useTimeTable';
import { useDeleteTimeSlot, useUpdateTimeSlot } from '../../../hooks/useTimeSlot';

export interface FilterValues {
    search: string;
    section: string;
    class: string;
}

export default function TimetableManagement() {
    const [filters, setFilters] = useState<FilterValues>({
        search: '',
        section: '',
        class: ''
    });

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);

    const { data: classes = [] } = useClasses();
    const { data: timetables = [], isLoading: loading } = useAllTimetables();
    const createTimeTableMutation = useCreateTimetable();
    const deleteTimeTableMutation = useDeleteTimetable();

    const updateTimeslotMutation = useUpdateTimeSlot();
    const deleteTimeslotMutation = useDeleteTimeSlot();

    const handleCreateTimetable = async (timetableData: TimeTableForm) => {
        createTimeTableMutation.mutate(timetableData, {
            onSuccess: () => setIsModalOpen(false)
        })
    };

    const handleDeleteTimeTable = async (timetableId: string) => {
        deleteTimeTableMutation.mutate(timetableId)
    }

    const handleEditTimeSlot = (timeSlot: TimeSlot) => {
        setIsEditModalOpen(true);
        setSelectedTimeSlot(timeSlot);
    }

    const handleUpdateTimeSlot = async (id: string, timeslotData: EditTimeSlotForm) => {
        updateTimeslotMutation.mutate({ id, timeslotData }, {
            onSuccess: () => setIsEditModalOpen(false)
        })
    }

    const handleDeleteTimeSlot = async (timeSlotId: string) => {
        deleteTimeslotMutation.mutate(timeSlotId)
    }

    // Filtered students based on current filters
    const filteredTimeTable = useMemo(() => {
        return timetables.filter((timetable: TimetableAttributes) => {
            const fullName = `${timetable?.name || ""}`.toLowerCase();
            const matchesSearch = fullName.includes(filters.search.toLowerCase());
            const matchesSection = !filters.section || timetable.sectionId === filters.section;
            const matchesClass = !filters.class || timetable.classId === filters.class;

            return matchesSearch && matchesSection && matchesClass;
        });
    }, [timetables, filters]);

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
                            </div>
                        </div>

                        {/* Filters */}
                        <TimetableFilters
                            classes={classes}
                            filters={filters}
                            onFiltersChange={setFilters}
                        />

                        {/* Main Content */}
                        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                            {/* Timetable - spans 3 columns */}
                            <div className="lg:col-span-3">
                                <WeeklyTimetable
                                    timetables={filteredTimeTable}
                                    onEditTimeSlot={handleEditTimeSlot}
                                    onDeleteTimeSlot={handleDeleteTimeSlot}
                                    onDeleteTimeTable={handleDeleteTimeTable}
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