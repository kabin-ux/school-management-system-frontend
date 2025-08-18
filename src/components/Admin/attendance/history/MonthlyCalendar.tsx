import React from 'react';

export const MonthlyCalendar: React.FC = () => {
  const calendar = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30, 31]
  ];

  const getDateStatus = (date: number) => {
    if ([2, 18, 21, 29].includes(date)) return 'absent';
    if ([9, 11, 14, 19, 30].includes(date)) return 'late';
    return 'present';
  };

  const getDateClass = (status: string) => {
    switch (status) {
      case 'present': return 'bg-green-500 text-white';
      case 'absent': return 'bg-red-500 text-white';
      case 'late': return 'bg-yellow-500 text-white';
      default: return 'bg-gray-100 text-gray-400';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Monthly Attendance History (This Month)</h3>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-7 gap-4 max-w-2xl">
          {calendar.map((week, weekIndex) => (
            <React.Fragment key={weekIndex}>
              {week.map((date) => (
                <div key={date} className="aspect-square">
                  <div className={`w-full h-full rounded-lg flex items-center justify-center text-lg font-semibold ${getDateClass(getDateStatus(date))}`}>
                    {date}
                  </div>
                </div>
              ))}
              {weekIndex === calendar.length - 1 && week.length < 7 && (
                Array.from({ length: 7 - week.length }).map((_, emptyIndex) => (
                  <div key={`empty-${emptyIndex}`} className="aspect-square"></div>
                ))
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="px-6 py-4 border border-gray-200 bg-gray-50 flex justify-between items-center text-sm text-gray-600">
        <span>Showing 1 to 5 of 8 results</span>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-100">Previous Month</button>
          <button className="px-3 py-1 bg-blue-600 text-white rounded">1</button>
          <button className="px-3 py-1 border border-gray-200 rounded text-gray-600 hover:bg-gray-100">Next</button>
        </div>
      </div>
    </div>
  );
};