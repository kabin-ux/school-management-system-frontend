import React from 'react';
import { Smartphone, Mail, MoreHorizontal } from 'lucide-react';
import StatusBadge from './StatusBadge';
import type { NotificationLog } from '../../interfaces/Notification';

interface NotificationTableProps {
  logs: NotificationLog[];
}

const NotificationTable: React.FC<NotificationTableProps> = ({ logs }) => {
  return (
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
          {logs.map((log, index) => (
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
                <StatusBadge status={log.status} />
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
  );
};

export default NotificationTable;