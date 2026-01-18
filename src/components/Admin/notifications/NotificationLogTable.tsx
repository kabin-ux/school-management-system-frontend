import { Bell, Trash2 } from "lucide-react";
import type { Notice } from "../../../hooks/useNotification";
import EmptyState from "../../../common/EmptyState";
import { Pagination } from "../../../common/Pagination";
import { useState } from "react";

interface NotificationLogTableProps {
  logs: Notice[];
  onDelete: (id: string) => void;
}

export function NotificationLogTable({ logs, onDelete }: NotificationLogTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [openRecipientsFor, setOpenRecipientsFor] = useState<string | null>(null);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(logs.length / itemsPerPage);
  const paginatedData = logs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const MAX_VISIBLE_RECIPIENTS = 3;

  if (logs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm flex justify-center py-10">
        <EmptyState
          title="No Notices Found"
          description="There are currently no notice records. Click the button above to create a new notice."
          icon={<Bell className="w-14 h-14" />}
        />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
      <table className="w-full">
        <thead>
          {/* ... your existing <th> cells ... */}
        </thead>

        <tbody>
          {paginatedData.map((log) => {
            const hasRecipients =
              Array.isArray(log.recipients) && log.recipients.length > 0;
            const extraCount =
              hasRecipients && log.recipients.length > MAX_VISIBLE_RECIPIENTS
                ? log.recipients.length - MAX_VISIBLE_RECIPIENTS
                : 0;

            return (
              <tr
                key={log.id}
                className="border-b border-gray-200 hover:bg-gray-50 transition"
              >
                {/* Title */}
                <td className="px-4 py-4 text-sm text-gray-900">
                  {log.subject}
                </td>

                {/* Message */}
                <td className="px-4 py-4 text-sm text-gray-600 max-w-xs truncate">
                  {log.message}
                </td>

                {/* Type */}
                <td className="px-4 py-4 text-sm text-gray-700">
                  {log.type ? log.type.replace(/_/g, " ").toUpperCase() : "—"}
                </td>

                {/* Sent to */}
                <td className="px-4 py-4 text-sm text-gray-600">
                  {hasRecipients ? (
                    <div className="space-y-1">
                      <ul className="space-y-1">
                        {log.recipients
                          .slice(0, MAX_VISIBLE_RECIPIENTS)
                          .map((recipient, index) => (
                            <li key={index} className="truncate">
                              {recipient}
                            </li>
                          ))}
                      </ul>

                      {extraCount > 0 && (
                        <button
                          type="button"
                          className="text-xs text-blue-600 hover:underline"
                          onClick={() => setOpenRecipientsFor(log.id)}
                        >
                          +{extraCount} more
                        </button>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">—</span>
                  )}
                </td>

                {/* Sent on */}
                <td className="px-4 py-4 text-sm text-gray-600 whitespace-nowrap">
                  {log.createdAt
                    ? new Date(log.createdAt).toLocaleString()
                    : "N/A"}
                </td>

                {/* Actions */}
                <td className="px-4 py-4 text-sm text-gray-700">
                  <button
                    onClick={() => onDelete(log.id)}
                    className="p-1"
                  >
                    <Trash2 className="text-red-500 hover:text-red-700" />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      )}

      {/* Very simple modal for recipients */}
      {openRecipientsFor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-gray-900">
                All recipients
              </h2>
              <button
                className="text-gray-500 hover:text-gray-700 text-sm"
                onClick={() => setOpenRecipientsFor(null)}
              >
                Close
              </button>
            </div>

            <div className="max-h-64 overflow-y-auto text-sm text-gray-700 space-y-1">
              {logs
                .find((l) => l.id === openRecipientsFor)
                ?.recipients?.map((recipient, idx) => (
                  <div key={idx} className="truncate">
                    {recipient}
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
