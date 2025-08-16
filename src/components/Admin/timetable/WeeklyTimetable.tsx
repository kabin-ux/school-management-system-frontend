interface TimeSlot {
  time: string;
  subject?: string;
  teacher?: string;
  color?: string;
}

interface TimetableDay {
  day: string;
  slots: TimeSlot[];
}

export default function WeeklyTimetable() {
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM'];
  
  const timetableData: TimetableDay[] = [
    {
      day: 'Sunday',
      slots: [
        { time: '9:00 AM', subject: 'Math', teacher: 'Mr. Poudel', color: 'bg-blue-100 text-blue-800' },
        { time: '10:00 AM', subject: 'English', teacher: 'Mr. Sharma', color: 'bg-green-100 text-green-800' },
        { time: '11:00 AM', subject: 'Science', teacher: 'Mr. Poudel', color: 'bg-purple-100 text-purple-800' },
        { time: '12:00 AM', subject: 'Social', teacher: 'Mrs. Sharma', color: 'bg-orange-100 text-orange-800' },
        { time: '1:00 AM' },
        { time: '2:00 AM' },
        { time: '3:00 AM' },
        { time: '4:00 AM' }
      ]
    },
    {
      day: 'Monday',
      slots: [
        { time: '9:00 AM', subject: 'English', teacher: 'Mr. Sharma', color: 'bg-green-100 text-green-800' },
        { time: '10:00 AM', subject: 'Math', teacher: 'Mr. Poudel', color: 'bg-blue-100 text-blue-800' },
        { time: '11:00 AM', subject: 'Social', teacher: 'Mrs. Sharma', color: 'bg-orange-100 text-orange-800' },
        { time: '12:00 AM' },
        { time: '1:00 AM' },
        { time: '2:00 AM' },
        { time: '3:00 AM' },
        { time: '4:00 AM' }
      ]
    },
    {
      day: 'Tuesday',
      slots: [
        { time: '9:00 AM', subject: 'Math', teacher: 'Mr. Poudel', color: 'bg-blue-100 text-blue-800' },
        { time: '10:00 AM', subject: 'Science', teacher: 'Mr. Poudel', color: 'bg-purple-100 text-purple-800' },
        { time: '11:00 AM' },
        { time: '12:00 AM' },
        { time: '1:00 AM' },
        { time: '2:00 AM' },
        { time: '3:00 AM' },
        { time: '4:00 AM' }
      ]
    },
    {
      day: 'Wednesday',
      slots: Array.from({ length: 8 }, (_, i) => ({ time: timeSlots[i] }))
    },
    {
      day: 'Thursday',
      slots: Array.from({ length: 8 }, (_, i) => ({ time: timeSlots[i] }))
    },
    {
      day: 'Friday',
      slots: Array.from({ length: 8 }, (_, i) => ({ time: timeSlots[i] }))
    }
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Weekly Timetable - Grade 10 Section A</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-600 w-24">
                Time/ Day
              </th>
              {timeSlots.map((time) => (
                <th key={time} className="px-4 py-3 text-center text-sm font-medium text-gray-600 min-w-32">
                  {time}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {timetableData.map((day) => (
              <tr key={day.day}>
                <td className="px-4 py-6 text-sm font-medium text-gray-900 bg-gray-50">
                  {day.day}
                </td>
                {day.slots.map((slot, index) => (
                  <td key={index} className="px-2 py-6 text-center">
                    {slot.subject ? (
                      <div className={`p-3 rounded-lg ${slot.color} min-h-16 flex flex-col justify-center`}>
                        <div className="font-medium text-sm">{slot.subject}</div>
                        <div className="text-xs mt-1">{slot.teacher}</div>
                      </div>
                    ) : (
                      <button className="w-full h-16 border-2 border-dashed border-gray-300 rounded-lg text-gray-400 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm">
                        Add Subject
                      </button>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-gray-50 text-center">
        <p className="text-sm text-gray-600">
          <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
          Lunch break is from 12:00 PM to 1:00 PM
        </p>
      </div>
    </div>
  );
}