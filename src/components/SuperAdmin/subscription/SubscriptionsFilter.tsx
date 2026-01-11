import { Search } from 'lucide-react'
import React from 'react'
import type { FilterValues } from '../../../pages/SuperAdmin/subscription/Subscription';

interface SubscriptionsFilterProps {
    filters: FilterValues;
    onFiltersChange: (filters: FilterValues) => void;
}

export const SubscriptionsFilter: React.FC<SubscriptionsFilterProps> = ({ filters, onFiltersChange }) => {
    const handleFilterChange = (key: keyof FilterValues, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };
    return (
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative w-full">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search all the subscription packages..."
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
