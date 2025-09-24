import React from 'react';

interface SalaryOverviewFilterProps {
  searchStudent: string;
  setSearchStudent: (value: string) => void;
  selectedClass: string;
  setSelectedClass: (value: string) => void;
  selectedSection: string;
  setSelectedSection: (value: string) => void;
  selectedTerminal: string;
  setSelectedTerminal: (value: string) => void;
  selectedDateRange: string;
  setSelectedDateRange: (value: string) => void;
}

export const SalaryOverviewFilter: React.FC<SalaryOverviewFilterProps> = ({
  searchStudent,
  setSearchStudent,
  selectedClass,
  setSelectedClass,
  selectedSection,
  setSelectedSection,
  selectedTerminal,
  setSelectedTerminal,
  selectedDateRange,
  setSelectedDateRange
}) => {
  return (
    <div className="mb-6">
      {/* Tabs */}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div>
          <input
            type="text"
            placeholder="Search Employee"
            value={searchStudent}
            onChange={(e) => setSearchStudent(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Classes</option>
            <option value="class-12">Class 12</option>
            <option value="class-11">Class 11</option>
          </select>
        </div>
        <div>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Sections</option>
            <option value="a">Section A</option>
            <option value="b">Section B</option>
          </select>
        </div>
        <div>
          <select
            value={selectedTerminal}
            onChange={(e) => setSelectedTerminal(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Terminal</option>
            <option value="first">First Terminal</option>
            <option value="second">Second Terminal</option>
          </select>
        </div>
        <div>
          <select
            value={selectedDateRange}
            onChange={(e) => setSelectedDateRange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Date Range</option>
            <option value="this-month">This Month</option>
            <option value="last-month">Last Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};