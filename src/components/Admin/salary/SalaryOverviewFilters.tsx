import React from 'react';
import type { FilterValues } from '../../../pages/Admin/salaryoverview/SalaryOverview';
import { Search } from 'lucide-react';
import type { Role } from '../roles/AddRoleModal';

interface SalaryOverviewFilterProps {
  filters: FilterValues
  onFiltersChange: (filters: FilterValues) => void;
  roles: Role[];
}

export const SalaryOverviewFilter: React.FC<SalaryOverviewFilterProps> = ({
  filters,
  onFiltersChange,
  roles
}) => {
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };
  return (
    <div className="mb-6">
      {/* Tabs */}

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search Employee"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div>
          <select
            value={filters.role}
            onChange={(e) => handleFilterChange('role', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 outline-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Role</option>
            {roles.map((role, index) => (
              <option key={index} value={role.name}>{role.name}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};