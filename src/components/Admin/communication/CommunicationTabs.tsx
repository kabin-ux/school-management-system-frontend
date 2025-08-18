import React from 'react';

interface CommunicationTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const CommunicationTabs: React.FC<CommunicationTabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="mb-6">
      <div className="flex space-x-8 border-b border-gray-200">
        {['Students', 'Teachers', 'Parents'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-1 border-b-2 font-medium text-sm ${
              activeTab === tab
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between mt-4">
        <input
          type="text"
          placeholder="Search students..."
          className="px-4 py-2 w-full outline-none border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <div className="flex gap-2">
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Class</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg">
            <option>Section</option>
          </select>
        </div>
      </div>
    </div>
  );
};