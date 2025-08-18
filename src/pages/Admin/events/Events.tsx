import React, { useState } from 'react';
import { EventsHeader } from '../../../components/Admin/events/EventsHeader';
import { EventsTabs } from '../../../components/Admin/events/EventsTabs';
import { EventsCalendar } from '../../../components/Admin/events/EventsCalendar';
import { EventsTable } from '../../../components/Admin/events/EventsTable';
import { CreateEventForm } from '../../../components/Admin/events/CreateEventForm';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';

const Events: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [eventTitle, setEventTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [targetAudience, setTargetAudience] = useState('');
    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [description, setDescription] = useState('');

    const events = Array.from({ length: 6 }, () => ({
        date: '9th July',
        type: 'Parents Teacher Meeting',
        audience: 'All P.T.S',
        description: 'All the parents teachers and students are requested to attend this meeting'
    }));

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
                        <EventsHeader />
                        <EventsTabs />

                        <div className="flex gap-8">
                            <div className="flex-1">
                                <EventsCalendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
                                <EventsTable events={events} />
                            </div>

                            <div className="w-80">
                                <CreateEventForm
                                    eventTitle={eventTitle}
                                    setEventTitle={setEventTitle}
                                    eventType={eventType}
                                    setEventType={setEventType}
                                    targetAudience={targetAudience}
                                    setTargetAudience={setTargetAudience}
                                    startDate={startDate}
                                    setStartDate={setStartDate}
                                    startTime={startTime}
                                    setStartTime={setStartTime}
                                    endTime={endTime}
                                    setEndTime={setEndTime}
                                    description={description}
                                    setDescription={setDescription}
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Events;