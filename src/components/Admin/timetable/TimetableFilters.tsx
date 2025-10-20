import React from 'react';
import { Filter, Search } from 'lucide-react';
import type { FilterValues } from '../../../pages/Admin/timetable/TimetableManagement';
import type { Grade } from '../../../types/class.types';
import { useSectionsByClass } from '../../../hooks/useSection';

interface TimetableFiltersProps {
  filters: FilterValues;
  classes: Grade[];
  onFiltersChange: (filters: FilterValues) => void;
}

const TimetableFilters: React.FC<TimetableFiltersProps> = ({
  filters,
  classes,
  onFiltersChange
}) => {
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const selectedClass = classes.find((cls) => cls.id === filters.class)
  const { data: sections = [] } = useSectionsByClass(selectedClass ? selectedClass.id : "");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="flex items-center gap-4 mb-4">
        <Filter className="w-5 h-5 text-gray-600" />
        <h3 className="text-lg font-semibold text-gray-900">Filter Timetables</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Class Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Class
          </label>
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange('class', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls.id}>{cls.name}</option>
            ))
            }
          </select>
        </div>

        {/* Section Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section
          </label>
          <select
            value={filters.section}
            onChange={(e) => handleFilterChange('section', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Section</option>
            {sections.map((section, index) => (
              <option key={index} value={section.id}>
                {section.section_name}
              </option>
            ))}
          </select>
        </div>


      </div>
    </div>
  );
};

export default TimetableFilters;