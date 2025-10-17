import { Search, Filter } from 'lucide-react';
import type { Grade } from '../../../types/class.types';
import type { FilterValues } from '../../../pages/Admin/parents/ParentManagement';

interface ParentFiltersProps {
  filters: FilterValues;
  classes: Grade[];
  onFiltersChange: (filters: FilterValues) => void;
}

export default function ParentFilters({
  filters,
  classes,
  onFiltersChange
}: ParentFiltersProps) {

  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
       

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-8 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search Parent Names or email..."
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

         <div>
          <div className="flex items-center gap-2 mb-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <label className="text-sm font-medium text-gray-700">All classes</label>
          </div>
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
      </div>
    </div>
  );
}