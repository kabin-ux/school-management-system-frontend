import React from 'react';
import { Clock, Users, BookOpen, Calendar } from 'lucide-react';

const TimetableSidebar: React.FC = () => {
  const subjects = [
    { name: 'Mathematics', color: 'bg-blue-100 text-blue-800', teacher: 'Mr. Smith' },
    { name: 'English', color: 'bg-green-100 text-green-800', teacher: 'Ms. Johnson' },
    { name: 'Science', color: 'bg-purple-100 text-purple-800', teacher: 'Dr. Brown' },
    { name: 'History', color: 'bg-orange-100 text-orange-800', teacher: 'Mrs. Davis' },
    { name: 'Physics', color: 'bg-red-100 text-red-800', teacher: 'Dr. Wilson' },
    { name: 'Chemistry', color: 'bg-yellow-100 text-yellow-800', teacher: 'Ms. Taylor' },
  ];

  const timeSlots = [
    '08:00 - 09:00',
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '12:00 - 13:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
  ];

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Quick Stats
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Total Classes</span>
            <span className="font-semibold text-gray-900">24</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Free Periods</span>
            <span className="font-semibold text-gray-900">8</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Teachers</span>
            <span className="font-semibold text-gray-900">6</span>
          </div>
        </div>
      </div>

      {/* Available Subjects */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Available Subjects
        </h3>
        <div className="space-y-2">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${subject.color.split(' ')[0]}`}></div>
                <div>
                  <div className="font-medium text-sm text-gray-900">{subject.name}</div>
                  <div className="text-xs text-gray-500">{subject.teacher}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Time Slots */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Time Slots
        </h3>
        <div className="space-y-2">
          {timeSlots.map((slot, index) => (
            <div
              key={index}
              className="p-2 text-sm text-gray-700 bg-gray-50 rounded border hover:bg-gray-100 cursor-pointer transition-colors"
            >
              {slot}
            </div>
          ))}
        </div>
      </div>

      {/* Teachers */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Teachers
        </h3>
        <div className="space-y-2">
          {subjects.map((subject, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-xs font-medium text-gray-600">
                  {subject.teacher.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <div className="text-sm font-medium text-gray-900">{subject.teacher}</div>
                <div className="text-xs text-gray-500">{subject.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TimetableSidebar;