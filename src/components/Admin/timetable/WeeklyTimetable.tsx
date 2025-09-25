import React, { useEffect, useState } from "react";

interface Timeslot {
  id: string;
  dayOfWeek: string; // e.g., "sunday"
  label: string;     // e.g., "First Period"
  startTime: string; // "08:00:00"
  endTime: string;   // "09:00:00"
}

interface Timetable {
  id: string;
  name: string;
  timeslots: Timeslot[];
}

interface WeeklyTimetableProps {
  timetables: Timetable[];
}

export const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({ timetables }) => {

  if (timetables?.length === 0) return <p>Loading...</p>;

  return (
    <div className="space-y-8">
      {timetables?.map((timetable) => {
        // ✅ Collect unique time slots across all days
        const allTimes = Array.from(
          new Set(timetable.timeslots.map(ts => ts.startTime))
        ).sort();

        // ✅ Group timeslots by day
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
        const slotsByDay: Record<string, Timeslot[]> = {};
        days.forEach(day => {
          slotsByDay[day] = timetable.timeslots.filter(ts => ts.dayOfWeek === day);
        });

        return (
          <div key={timetable.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">{timetable.name}</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-24">
                      Day
                    </th>
                    {allTimes.map((time) => (
                      <th key={time} className="px-4 py-3 text-center text-sm font-medium text-gray-600 min-w-32">
                        {time}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {days.map((day) => (
                    <tr key={day}>
                      <td className="px-4 py-6 text-sm font-medium text-gray-900 bg-gray-50 capitalize">
                        {day}
                      </td>
                      {allTimes.map((time, index) => {
                        const slot = slotsByDay[day]?.find(ts => ts.startTime === time);
                        return (
                          <td key={index} className="px-2 py-6 text-center">
                            {slot ? (
                              <div className="p-3 rounded-lg bg-blue-100 text-blue-800 min-h-16 flex flex-col justify-center">
                                <div className="font-medium text-sm">{slot.label}</div>
                                <div className="text-xs mt-1">{slot.startTime} - {slot.endTime}</div>
                              </div>
                            ) : (
                              <button className="w-full h-16 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                                Add Subject
                              </button>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      })}
    </div>
  );
}
