import React from 'react';
import type { Grade } from '../../../types/class.types';
import type { FilterValues } from '../../../pages/Admin/attendance/AttendanceMonitoring';
import { useSectionsByClass } from '../../../hooks/useSection';

interface AttendanceFiltersProps {
  classes: Grade[]
  filters: FilterValues
  onFiltersChange: (filters: FilterValues) => void;
}

export const AttendanceFilters: React.FC<AttendanceFiltersProps> = ({
  classes,
  filters,
  onFiltersChange
}) => {
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const selectedClass = classes.find((cls) => cls.name === filters.class)
  const { data: sections = [] } = useSectionsByClass(selectedClass ? selectedClass.id : "");

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Class:</label>
        <select
          value={filters.class}
          onChange={(e) => handleFilterChange('class', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Class</option>
          {classes.map((cls, index) => (
            <option key={index} value={cls.name}>{cls.name}</option>
          ))
          }
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Section:</label>
        <select
          value={filters.section}
          onChange={(e) => handleFilterChange('section', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Select Section</option>
          {sections.map((section, index) => (
            <option key={index} value={section.section_name}>{section.section_name}</option>
          ))
          }
        </select>
      </div>
    </div>
  );
};