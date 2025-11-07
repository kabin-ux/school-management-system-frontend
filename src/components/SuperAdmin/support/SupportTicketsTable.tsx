import { EyeIcon, Tags, Trash2 } from "lucide-react";
import { getStatusAction, getTicketType } from "../../../lib/utils";
import type { SupportTicket } from "../../../types/support.types";
import EmptyState from "../../../common/EmptyState";
import { useState } from "react";
import { Pagination } from "../../../common/Pagination";

interface SupportTicketsTableProps {
  tickets: SupportTicket[];
  onViewTicket: (ticketId: string) => void;
  onDeleteTicket: (ticketId: string) => void;
}

export default function SupportTicketsTable({ tickets, onViewTicket, onDeleteTicket }: SupportTicketsTableProps) {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const paginatedData = tickets.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  )
  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Support Tickets</h2>
      </div>

      {!tickets || tickets.length === 0 ? (
        <EmptyState
          title="No Support Tickets found"
          description="There are currently no support tickets."
          icon={<Tags className="w-14 h-14 text-gray-400" />}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.N.
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  School
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Issue Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descrption
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Latest Modified
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedData.map((ticket, index) => (
                <tr key={ticket.id} className={index % 2 === 0 ? 'bg-white cursor-pointer' : 'bg-gray-50 cursor-pointer'}>
                  <td className="px-4 py-4 text-sm font-medium text-blue-600">
                    {index + 1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {ticket.school?.name}
                  </td>
                  <td className="p-4 text-sm whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">
                        {getTicketType(ticket.type)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500 font-semibold text-sm">
                    {ticket.title}
                  </td>
                  <td className="px-6 py-4 text-gray-500 text-sm truncate max-w-54">
                    {ticket.description}
                  </td>
                  <td className="px-6 py-4">
                    {(() => {
                      const statusInfo = getStatusAction(ticket.status);
                      return (
                        <span
                          className={`inline-flex px-3 py-1 rounded-full text-xs font-medium  ${statusInfo.bgColor} ${statusInfo.textColor}`}
                        >
                          {statusInfo.label}
                        </span>
                      );
                    })()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {ticket?.updatedAt ? new Date(ticket.updatedAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : "N/A"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ticket?.updatedAt ? new Date(ticket.updatedAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ""}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onViewTicket(ticket.id)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <EyeIcon className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onDeleteTicket(ticket.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
      }

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      )}

    </div>
  );
}