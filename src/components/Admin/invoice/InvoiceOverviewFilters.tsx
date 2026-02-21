import { Search } from 'lucide-react';
import React from 'react';
import type { FilterValues } from '../../../pages/SuperAdmin/invoice/InvoiceOvervew';

interface InvoiceOverviewFiltersProps {
  filters: FilterValues
  onFiltersChange: (filters: FilterValues) => void;
}

export const InvoiceOverviewFilters: React.FC<InvoiceOverviewFiltersProps> = ({
  filters,
  onFiltersChange
}) => {
  const handleFilterChange = (key: keyof FilterValues, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };
  return (
    <div className="mb-6">
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Enter Subscription Name"
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Month</label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) => handleFilterChange('date', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};