import React from "react";
import { Edit, Trash2, Plus, ClipboardClock } from "lucide-react";
import type { TimeSlot } from "../../../types/timetable.types";
import EmptyState from "../../../common/EmptyState";

interface Timeslot {
  id: string;
  dayOfWeek: string; // e.g., "sunday"
  label: string;     // e.g., "First Period"
  startTime: string; // "08:00:00"
  endTime: string;   // "09:00:00"
  subject?: string;
  teacher?: string;
}

interface Timetable {
  id: string;
  name: string;
  timeslots: Timeslot[];
}

interface WeeklyTimetableProps {
  timetables: Timetable[];
  onEditTimeSlot: (timeSlot: TimeSlot) => void;
  onDeleteTimeSlot: (timeSlotId: string) => void;
  onDeleteTimeTable: (timetableId: string) => void;
}

export const WeeklyTimetable: React.FC<WeeklyTimetableProps> = ({
  timetables,
  onEditTimeSlot,
  onDeleteTimeSlot,
  onDeleteTimeTable
}) => {

  if (!timetables || timetables.length === 0) {
    return (
      <EmptyState
        title="No Timetables found"
        description="Create a new timetable to get started"
        icon={<ClipboardClock className="w-14 h-14" />}
      />
    );
  }

  return (
    <div className="space-y-8">
      {timetables?.map((timetable) => {
        // Collect unique time slots across all days
        const allTimes = timetable.timeslots && timetable.timeslots.length > 0
          ? Array.from(new Set(timetable.timeslots.map(ts => ts.startTime))).sort()
          : ["10:00", "10:45", "11:30", "12:15", "13:00", "13:45", "14:30", "15:15"];

        // Group timeslots by day
        const days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
        const slotsByDay: Record<string, Timeslot[]> = {};
        days.forEach(day => {
          slotsByDay[day] = timetable.timeslots ? timetable.timeslots.filter(ts => ts.dayOfWeek === day) : [];
        });

        return (
          <div key={timetable.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">{timetable.name}</h2>
                <div className="flex gap-2">
                  {/* <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button> */}
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => onDeleteTimeTable(timetable.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
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
                          <td key={index} className="px-2 py-4 text-center">
                            {slot ? (
                              <div className="group relative p-3 rounded-lg bg-blue-100 text-blue-800 min-h-16 flex flex-col justify-center hover:bg-blue-200 transition-colors">
                                <div className="font-medium text-sm">{slot.subject || slot.label}</div>
                                <div className="text-xs mt-1">{slot.startTime} - {slot.endTime}</div>
                                {slot.teacher && (
                                  <div className="text-xs text-blue-600 mt-1">{slot.teacher}</div>
                                )}
                                <div className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                                  <button className="p-1 bg-white rounded text-blue-600 hover:bg-blue-50"
                                    onClick={() => onEditTimeSlot(slot)}
                                  >
                                    <Edit className="w-3 h-3" />
                                  </button>
                                  <button className="p-1 bg-white rounded text-red-600 hover:bg-red-50"
                                    onClick={() => onDeleteTimeSlot(slot.id)}
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <button
                                className="w-full h-16 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm flex items-center justify-center gap-2"
                              >
                                <Plus className="w-4 h-4" />
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
