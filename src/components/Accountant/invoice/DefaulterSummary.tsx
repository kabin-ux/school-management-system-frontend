import React from 'react';
import { type DefaulterSummary as DefaulterSummaryType } from '../../../types/invoice.types';

interface DefaulterSummaryProps {
    summaryData: DefaulterSummaryType[];
}

export const DefaulterSummary: React.FC<DefaulterSummaryProps> = ({ summaryData }) => {
    const getTextColor = (color: string): string => {
        if (color.includes('red')) return 'text-red-600';
        if (color.includes('orange')) return 'text-orange-600';
        if (color.includes('yellow')) return 'text-yellow-600';
        return 'text-purple-600';
    };

    return (
        <div className="px-6 py-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            {summaryData.map((item, index) => (
                <div key={index} className="text-center">
                    <div className={`text-2xl font-bold ${getTextColor(item.color)}`}>
                        {item.count}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">{item.type}</div>
                </div>
            ))}
        </div>
    );
};
