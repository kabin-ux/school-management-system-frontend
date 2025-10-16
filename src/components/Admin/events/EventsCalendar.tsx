import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventsCalendarProps {
  selectedDate: number | null;
  setSelectedDate: (date: number | null) => void;
  events: { date: string; eventType: string }[]; 
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({
  selectedDate,
  setSelectedDate,
  events
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Number of days in this month
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Day of week for the 1st (0=Sunday, 6=Saturday)
  const startDay = new Date(year, month, 1).getDay();

  // Generate array with null for empty slots
  const calendar: (number | null)[][] = [];
  let week: (number | null)[] = [];

  // Fill leading empty slots
  for (let i = 0; i < startDay; i++) {
    week.push(null);
  }

  // Fill days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    week.push(day);
    if (week.length === 7) {
      calendar.push(week);
      week = [];
    }
  }

  // Fill trailing empty slots
  if (week.length > 0) {
    while (week.length < 7) {
      week.push(null);
    }
    calendar.push(week);
  }

  const getDateClass = (date: number | null) => {
    if (!date) return 'invisible';

    // Find event for this date
    const event = events.find(
      (e) => {
        const d = new Date(e.date); 
        return (
          d.getFullYear() === year &&
          d.getMonth() === month &&
          d.getDate() === date
        );
      }
    );

    if (event?.eventType === 'holiday') return 'bg-red-100 text-red-700';
    if (event) return 'bg-yellow-100 text-yellow-700';

    if (selectedDate === date) return 'bg-blue-500 text-white';

    return 'text-gray-900 hover:bg-gray-100';
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">
            {currentMonth.toLocaleString('default', { month: 'long' })} {year}
          </h2>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        {/* <input
          type="text"
          placeholder="Search Event..."
          className="px-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>Day View</option>
          <option>Week View</option>
          <option>Month View</option>
        </select> */}
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {dayNames.map((day) => (
            <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-4">
          {calendar.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((date, dateIndex) => (
                <div key={dateIndex} className="aspect-square">
                  <button
                    className={`w-full h-full rounded-lg flex items-center justify-center text-lg font-semibold transition-colors ${getDateClass(
                      date
                    )}`}
                    onClick={() => date && setSelectedDate(date)}
                  >
                    {date}
                  </button>
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
