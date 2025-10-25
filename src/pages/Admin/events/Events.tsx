import React, { useState } from 'react';
import { EventsHeader } from '../../../components/Admin/events/EventsHeader';
import { EventsCalendar } from '../../../components/Admin/events/EventsCalendar';
import { EventsTable } from '../../../components/Admin/events/EventsTable';
import { CreateEventForm } from '../../../components/Admin/events/CreateEventForm';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
import type { Event, EventForm } from '../../../types/events.types';
import { useAddEvent, useDeleteEvent, useEventsBySchool, useUpdateEvent } from '../../../hooks/useEvents';
import { EditEventModal } from '../../../components/Admin/events/EditEventModal';

const Events: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const { data: events = [], isLoading: loading } = useEventsBySchool();
  const addEventMutation = useAddEvent();
  const updateEventMutation = useUpdateEvent();
  const deleteEventMutation = useDeleteEvent();

  const handleCreateEvent = async (eventData: EventForm) => {
    addEventMutation.mutate(eventData)
  }

  const handleEditEvent = (event: Event) => {
    setIsEditModalOpen(true);
    setSelectedEvent(event);
  }
  const handleUpdateEvent = async (id: string, updateData: EventForm) => {
    updateEventMutation.mutate({ id, updateData }, {
      onSuccess: () => setIsEditModalOpen(false)
    })
  }

  const handleDeleteEvent = async (eventId: string) => {
    deleteEventMutation.mutate(eventId);
  }

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <AdminDashboardHeader />

        {/* Scrollable Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Page Header */}
            <EventsHeader />

            {/* Calendar + Form */}
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Calendar */}
              <div className="flex-1">
                <EventsCalendar
                  events={events}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>

              {/* Form */}
              <div className="lg:w-80 flex-shrink-0">
                <CreateEventForm
                  onAdd={handleCreateEvent}
                  isLoading={loading}
                />
              </div>
            </div>

            {/* Events Table */}
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <EventsTable
                events={events}
                onEdit={handleEditEvent}
                onDelete={handleDeleteEvent}
              />
            </div>

            {/* Edit Event Modal */}
            <EditEventModal
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setSelectedEvent(null);
              }}
              onSubmit={handleUpdateEvent}
              event={selectedEvent}
              isLoading={loading}
            />
          </div>
        </main>
      </div>
    </div>

  );
};

export default Events;