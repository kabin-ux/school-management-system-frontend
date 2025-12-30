import { Bell, Trash2 } from "lucide-react";
import type { Notice } from "../../../hooks/useNotification";
import EmptyState from "../../../common/EmptyState";

interface NotificationLogTableProps {
    logs: Notice[];
    onDelete: (id: string) => void;
}

export function NotificationLogTable({ logs, onDelete }: NotificationLogTableProps) {
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
                    <tr className="border-b border-gray-200">
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Notification Title
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Message
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Type
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Sent to
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Sent on
                        </th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Actions
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {logs.map((log) => (
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
                                {log.type
                                    ? log.type.replace(/_/g, " ").toUpperCase()
                                    : "—"}
                            </td>

                            {/* Sent to */}
                            <td className="px-4 py-4 text-sm text-gray-600">
                                {Array.isArray(log.recipients) && log.recipients.length > 0 ? (
                                    <ul className="space-y-1">
                                        {log.recipients.map((recipient, index) => (
                                            <li key={index} className="truncate">
                                                {recipient}
                                            </li>
                                        ))}
                                    </ul>
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
                    ))}
                </tbody>
            </table>
        </div>
    );
}
