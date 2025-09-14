import React, { useEffect, useState } from 'react';
import { EventsHeader } from '../../../components/Admin/events/EventsHeader';
import { EventsTabs } from '../../../components/Admin/events/EventsTabs';
import { EventsCalendar } from '../../../components/Admin/events/EventsCalendar';
import { EventsTable } from '../../../components/Admin/events/EventsTable';
import { CreateEventForm } from '../../../components/Admin/events/CreateEventForm';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { createEvent, deleteEvent, getAllEventsBySchool } from '../../../features/eventsSlice';
import toast from 'react-hot-toast';
import type { EventForm } from '../../../types/events.types';

const Events: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);

    const dispatch = useAppDispatch();
    const { events, loading } = useAppSelector(state => state.event);

    useEffect(() => {
        dispatch(getAllEventsBySchool())
    }, [dispatch])

    const handleCreateEvent = async (eventData: EventForm) => {
        try {
            const res = await dispatch(createEvent(eventData))
            if (createEvent.fulfilled.match(res)) {
                toast.success('Event created successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to create event'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error creating event')
            console.error('Error creating event', error)
        }
    }

    const handleDeleteEvent = async (eventId: string) => {
        try {
            const res = await dispatch(deleteEvent(eventId))
            if (deleteEvent.fulfilled.match(res)) {
                toast.success('Event deleted successfully')
            } else {
                const errorMsg = typeof res.payload === 'string' ? res.payload : 'Failed to delete event'
                toast.error(errorMsg)
            }
        } catch (error) {
            toast.error('Error deleting event')
            console.error('Error deleting event', error)
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