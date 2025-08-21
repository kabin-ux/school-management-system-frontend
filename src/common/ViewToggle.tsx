import React from 'react';
import type { ViewType } from '../types/fee-salary.types';

interface ViewToggleProps {
    activeView: ViewType;
    onViewChange: (view: ViewType) => void;
}

export const ViewToggle: React.FC<ViewToggleProps> = ({ activeView, onViewChange }) => {
    return (
        <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">View Type:</label>
            <div className="flex space-x-4">
                <button
                    onClick={() => onViewChange('Student')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeView === 'Student'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Student
                </button>
                <button
                    onClick={() => onViewChange('Teacher')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${activeView === 'Teacher'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                >
                    Teacher
                </button>
            </div>
        </div>
    );
};
