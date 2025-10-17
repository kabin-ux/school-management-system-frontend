import { Search } from 'lucide-react';
import type { FilterValues } from '../../../pages/Admin/students/StudentManagement';
import type { Grade } from '../../../types/class.types';
import { useSectionsByClass } from '../../../hooks/useSection';

interface StudentFiltersProps {
  filters: FilterValues;
  classes: Grade[];
  onFiltersChange: (filters: FilterValues) => void;
}

export default function StudentFilters({
  filters,
  classes,
  onFiltersChange
}: StudentFiltersProps) {

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const selectedClass = classes.find((cls) => cls.name === filters.class)
  const { data: sections = [] } = useSectionsByClass(selectedClass ? selectedClass.id : "");

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search Student :</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Student name..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Class :</label>
          <select
            value={filters.class}
            onChange={(e) => handleFilterChange('class', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Class</option>
            {classes.map((cls, index) => (
              <option key={index} value={cls.name}>{cls.name}</option>
            ))
            }
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Section :</label>
          <select
            value={filters.section}
            onChange={(e) => handleFilterChange('section', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select Section</option>
            {sections.map((section, index) => (
              <option key={index} value={section.section_name}>{section.section_name}</option>
            ))
            }
          </select>
        </div>
      </div>
      {/* 
      <div className="bg-purple-100 rounded-lg p-3">
        <p className="text-purple-800 text-sm">
          <span className="font-medium">Current Selection :</span> Grade 10 - Section A
          <span className="float-right text-purple-600 cursor-pointer">Click on time slots to add/edit subjects</span>
        </p>
      </div> */}
    </div>
  );
}