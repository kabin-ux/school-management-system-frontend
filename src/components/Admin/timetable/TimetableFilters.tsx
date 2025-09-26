import React from 'react';
import { Filter, Search } from 'lucide-react';

interface TimetableFiltersProps {
  selectedClass: string;
  selectedSection: string;
  selectedSubject: string;
  onClassChange: (value: string) => void;
  onSectionChange: (value: string) => void;
  onSubjectChange: (value: string) => void;
}

const TimetableFilters: React.FC<TimetableFiltersProps> = ({
  selectedClass,
  selectedSection,
  selectedSubject,
  onClassChange,
  onSectionChange,
  onSubjectChange,
}) => {
  const classes = ['Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'];
  const sections = ['Section A', 'Section B', 'Section C'];
  const subjects = ['All Subject', 'Mathematics', 'English', 'Science', 'History', 'Physics', 'Chemistry'];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Timetables</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Class Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class
          </label>
          <select
            value={selectedClass}
            onChange={(e) => onClassChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>

        {/* Section Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section
          </label>
          <select
            value={selectedSection}
            onChange={(e) => onSectionChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {sections.map((section) => (
              <option key={section} value={section}>
                {section}
              </option>
            ))}
          </select>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subject
          </label>
          <select
            value={selectedSubject}
            onChange={(e) => onSubjectChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search timetables..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableFilters;