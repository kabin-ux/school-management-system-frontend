import React from 'react';
import { Search } from 'lucide-react';
import type { FilterOptions, ViewType } from '../../../types/fee-salary.types';
import { ViewToggle } from '../../../common/ViewToggle';

interface FilterSectionProps {
  activeView: ViewType;
  filters: FilterOptions;
  onViewChange: (view: ViewType) => void;
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export const FilterSection: React.FC<FilterSectionProps> = ({
  activeView,
  filters,
  onViewChange,
  onFilterChange
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-200 mb-6">
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
    {/* View Toggle */}
    <ViewToggle activeView={activeView} onViewChange={onViewChange} />

    {/* Search */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value })}
          placeholder={activeView === "Student" ? "Search Students..." : "Search Employees..."}
          className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    {/* Status */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {activeView === "Student" ? "Payment Status" : "Salary Status"}
      </label>
      <select
        value={filters.status}
        onChange={(e) => onFilterChange({ status: e.target.value })}
        className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="">All</option>
        <option value="Paid">Paid</option>
        <option value="Unpaid">Unpaid</option>
        <option value="Pending">Pending</option>
      </select>
    </div>
    

    {/* Class/Department + Action */}
    <div className="flex flex-col gap-3">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {activeView === "Student" ? "Class" : "Department"}
        </label>
        <select
          value={filters.classOrDepartment}
          onChange={(e) => onFilterChange({ classOrDepartment: e.target.value })}
          className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          
          {activeView === "Student" ? (
            <>
              <option value="">All Classes</option>
              <option value="10">Grade 10</option>
              <option value="11">Grade 11</option>
              <option value="12">Grade 12</option>
            </>
          ) : (
            <>
              <option value="">All Departments</option>
              <option value="Science">Science</option>
              <option value="Management">Management</option>
              <option value="Arts">Arts</option>
            </>
          )}
        </select>
      </div>

    
    </div>
  </div>
</div>

  );
};
