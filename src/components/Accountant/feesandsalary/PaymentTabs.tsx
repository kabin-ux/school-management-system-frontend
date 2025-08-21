import React from 'react';
import type { TabType } from '../../../types/fee-salary.types';

interface PaymentTabsProps {
    activeTab: TabType;
    onTabChange: (tab: TabType) => void;
    children: React.ReactNode;
}

export const PaymentTabs: React.FC<PaymentTabsProps> = ({
    activeTab,
    onTabChange,
    children
}) => {
    const tabs: TabType[] = ['Fee Structure', 'Payment History', 'Add Payment'];

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100">
            <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => onTabChange(tab)}
                            className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === tab
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="p-6">
                {children}
            </div>
        </div>
    );
};
