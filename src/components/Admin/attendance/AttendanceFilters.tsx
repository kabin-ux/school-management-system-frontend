import React from 'react';

interface AttendanceFiltersProps {
  viewType: string;
  setViewType: (type: string) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedClass: string;
  setSelectedClass: (className: string) => void;
  selectedSection: string;
  setSelectedSection: (section: string) => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  viewType,
  setViewType,
  selectedDate,
  setSelectedDate,
  selectedClass,
  setSelectedClass,
  selectedSection,
  setSelectedSection
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">View Type:</label>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button 
            className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
              viewType === 'Student' ? 'bg-white text-black shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setViewType('Student')}
          >
            Student
          </button>
          <button 
            className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
              viewType === 'Teacher' ? 'bg-white text-black shadow-sm' : 'text-gray-600'
            }`}
            onClick={() => setViewType('Teacher')}
          >
            Teacher
          </button>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Date:</label>
        <input 
          type="text"
          placeholder="mm/dd/yyyy"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Class:</label>
        <select 
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>Select Class</option>
          <option>Class 1</option>
          <option>Class 2</option>
          <option>Class 12</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section:</label>
        <select 
          value={selectedSection}
          onChange={(e) => setSelectedSection(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>Select Section</option>
          <option>Section A</option>
          <option>Section B</option>
        </select>
      </div>
    </div>
  );
};