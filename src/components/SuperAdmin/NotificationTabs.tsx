import React from 'react';

interface NotificationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabCounts: Record<string, number>;
}

const NotificationTabs: React.FC<NotificationTabsProps> = ({ 
  activeTab, 
  setActiveTab, 
  tabCounts 
}) => {
  return (
    <div className="border-b border-gray-200">
      <div className="flex">
        {Object.entries(tabCounts).map(([tab, count]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab} ({count})
          </button>
        ))}
      </div>
    </div>
  );
};

export default NotificationTabs;