import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface EventsCalendarProps {
  selectedDate: number | null;
  setSelectedDate: (date: number | null) => void;
}

export const EventsCalendar: React.FC<EventsCalendarProps> = ({ selectedDate, setSelectedDate }) => {
  const calendar = [
    [null, null, null, null, null, null, 1],
    [2, 3, 4, 5, 6, 7, 8],
    [9, 10, 11, 12, 13, 14, 15],
    [16, 17, 18, 19, 20, 21, 22],
    [23, 24, 25, 26, 27, 28, 29],
    [30, 31]
  ];

  const getDateClass = (date: number | null) => {
    if (!date) return 'invisible';
    if ([7, 14, 21, 28].includes(date)) return 'bg-red-100 text-red-700';
    if ([9, 11, 19, 30].includes(date)) return 'bg-yellow-100 text-yellow-700';
    return 'text-gray-900 hover:bg-gray-100';
  };

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
      {/* Calendar Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h2 className="text-lg font-semibold text-gray-900">July 2025</h2>
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Search Event..."
          className="px-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <select className="px-3 py-2 border border-gray-300 rounded-lg">
          <option>Day View</option>
          <option>Week View</option>
          <option>Month View</option>
        </select>
      </div>

      {/* Calendar Grid */}
      <div className="p-6">
        <div className="grid grid-cols-7 gap-4 mb-4">
          {dayNames.map(day => (
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
                    className={`w-full h-full rounded-lg flex items-center justify-center text-lg font-semibold transition-colors ${getDateClass(date)}`}
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