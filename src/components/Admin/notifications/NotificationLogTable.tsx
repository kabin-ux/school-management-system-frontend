import { Trash2 } from "lucide-react";
import type { Notice } from "../../../hooks/useNotification";

interface NotificationLogTableProps {
    logs: Notice[];
    onDelete: (id: string) => void;
}

export function NotificationLogTable({ logs, onDelete }: NotificationLogTableProps) {
    return (
        <div className="overflow-x-auto">
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
                        {/* <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">
                            Sent by
                        </th> */}
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
                                {log.type?.toString().replace(/_/g, " ").toUpperCase() || "—"}
                            </td>

                            {/* Sent to (comma-separated) */}
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

                            {/* Sent by */}
                            {/* <td className="px-4 py-4">
                                <span className="inline-flex px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700">
                                    {log.publish_by || "System"}
                                </span>
                            </td> */}
                            <td className="px-4 py-4 text-sm text-gray-700">
                                <button
                                    onClick={() => onDelete(log.id)}
                                    className="px-4 py-1 rounded  transition"
                                >
                                    <Trash2 className='text-red-500 hover:text-red-700' />
                                </button>
                            </td>
                        </tr>
                    ))}

                    {logs.length === 0 && (
                        <tr>
                            <td
                                colSpan={6}
                                className="px-4 py-6 text-center text-sm text-gray-500"
                            >
                                No notifications found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
