import React from 'react';
import { Search } from 'lucide-react';
import type { FilterValues } from '../../../types/invoice.types';
import type { Grade } from '../../../types/class.types';

interface InvoiceFiltersProps {
    filters: FilterValues;
    classes: Grade[];
    onFiltersChange: (filters: FilterValues) => void;
}

export const InvoiceFilters: React.FC<InvoiceFiltersProps> = ({
    filters,
    classes,
    onFiltersChange
}) => {
    const handleFilterChange = (key: keyof FilterValues, value: string) => {
        onFiltersChange({ ...filters, [key]: value });
    };

    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">View Type</label>
                    <select
                        value={filters.viewType}
                        onChange={(e) => handleFilterChange('viewType', e.target.value as 'Student' | 'Teacher')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                    <div className="relative">
                        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            value={filters.search}
                            onChange={(e) => handleFilterChange('search', e.target.value)}
                            placeholder={filters.viewType === 'Student' ? 'Search Students' : 'Search Teachers'}
                            className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                    <select
                        value={filters.paymentStatus}
                        onChange={(e) => handleFilterChange('paymentStatus', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">Select Status</option>
                        <option value="Completed">Completed</option>
                        <option value="Failed">Failed</option>
                        <option value="Pending">Pending</option>
                        <option value="Refunded">Refunded</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        {filters.viewType === 'Student' ? 'Class' : 'Department'}
                    </label>
                    <select
                        value={filters.class}
                        onChange={(e) => handleFilterChange('class', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {filters.viewType === 'Student' ? (
                            <>
                                <option value="">Select Class</option>
                                {classes.map((cls, index) => (
                                    <option key={index} value={cls.name}>{cls.name}</option>
                                ))
                                }
                            </>
                        ) : (
                            <>
                                <option value="">Select Department</option>
                                <option value="Science">Science</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="English">English</option>
                                <option value="Management">Management</option>
                            </>
                        )}
                    </select>
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
        </div>
    );
};
