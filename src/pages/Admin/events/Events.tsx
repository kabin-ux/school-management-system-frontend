import React, { useState } from 'react';
import { EventsHeader } from '../../../components/Admin/events/EventsHeader';
import { EventsCalendar } from '../../../components/Admin/events/EventsCalendar';
import { EventsTable } from '../../../components/Admin/events/EventsTable';
import { CreateEventForm } from '../../../components/Admin/events/CreateEventForm';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import type { EventForm } from '../../../types/events.types';
import { useAddEvent, useDeleteEvent, useEventsBySchool } from '../../../hooks/useEvents';

const Events: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const { data: events = [], isLoading: loading } = useEventsBySchool();
    const addEventMutation = useAddEvent();
    // const updateEventMutation = useUpdateEvent();
    const deleteEventMutation = useDeleteEvent();


    const handleCreateEvent = async (eventData: EventForm) => {
        addEventMutation.mutate(eventData)
    }

    const handleDeleteEvent = async (eventId: string) => {
        deleteEventMutation.mutate(eventId);
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
                        <EventsHeader />
                        {/* <EventsTabs /> */}

                        <div className="flex gap-8">
                            <div className="flex-1">
                                <EventsCalendar
                                    events={events}
                                    selectedDate={selectedDate}
                                    setSelectedDate={setSelectedDate}
                                />
                            </div>

                            <div className="w-80">
                                <CreateEventForm
                                    onAdd={handleCreateEvent}
                                    isLoading={loading}
                                />
                            </div>
                        </div>
                        <EventsTable
                            events={events}
                            onDelete={handleDeleteEvent}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Events;