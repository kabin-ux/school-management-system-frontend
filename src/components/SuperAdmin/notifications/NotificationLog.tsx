import  { useState } from 'react';
import { Mail, Smartphone, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';
import type { NotificationLog } from '../../../types/super-admin-notification.types';

export default function NotificationLog() {
  const [activeTab, setActiveTab] = useState('All');

  const notificationLogs: NotificationLog[] = [
    { id: '1', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'App Push', sentOn: 'May 15, 2024 10:30 AM', status: 'Sent' },
    { id: '2', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'Email', sentOn: 'May 15, 2024 10:30 AM', status: 'Failed' },
    { id: '3', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'App Push', sentOn: 'May 15, 2024 10:30 AM', status: 'Sent' },
    { id: '4', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'Email', sentOn: 'May 15, 2024 10:30 AM', status: 'Failed' },
    { id: '5', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'App Push', sentOn: 'May 15, 2024 10:30 AM', status: 'Sent' },
    { id: '6', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'Email', sentOn: 'May 15, 2024 10:30 AM', status: 'Scheduled' },
    { id: '7', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'App Push', sentOn: 'May 15, 2024 10:30 AM', status: 'Sent' },
    { id: '8', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'Email', sentOn: 'May 15, 2024 10:30 AM', status: 'Sent' },
    { id: '9', title: 'Monthly maintenance Reminder for November NOV-001', sentTo: 'All users', type: 'App Push', sentOn: 'May 15, 2024 10:30 AM', status: 'Failed' }
  ];

  const getStatusBadge = (status: string) => {
    const statusClasses = {
      'Sent': 'bg-green-100 text-green-800',
      'Failed': 'bg-red-100 text-red-800', 
      'Scheduled': 'bg-blue-100 text-blue-800'
    };
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusClasses[status as keyof typeof statusClasses]}`}>
        {status}
      </span>
    );
  };

  const tabCounts = {
    'All': 9,
    'Sent': 4,
    'Scheduled': 1,
    'Failed': 4
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Notification Log</h2>
      </div>

      {/* Filter Tabs */}
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

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notification Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent to
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sent on
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {notificationLogs.map((log, index) => (
              <tr key={log.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                  {log.title}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {log.sentTo}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    {log.type === 'App Push' ? (
                      <Smartphone className="w-4 h-4" />
                    ) : (
                      <Mail className="w-4 h-4" />
                    )}
                    {log.type}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {log.sentOn}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(log.status)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <button className="text-gray-400 hover:text-gray-600">
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
        <div className="text-sm text-gray-700">
          Showing 1-9 of 9 notifications
        </div>
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>
          <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            1
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors">
            2
          </button>
          <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors flex items-center gap-1">
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}