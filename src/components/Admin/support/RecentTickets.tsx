import React, { useState } from 'react';
import type { SupportTicket } from '../../../types/support.types';
import EmptyState from '../../../common/EmptyState';
import { Edit, Tags, Trash2 } from 'lucide-react';
import { getStatusAction, getTicketType } from '../../../lib/utils';
import { Pagination } from '../../../common/Pagination';

interface RecentTicketsProps {
  tickets: SupportTicket[];
  onEdit: (ticket: SupportTicket) => void;
  onDelete: (ticketId: string) => void;
}

export const RecentTickets: React.FC<RecentTicketsProps> = ({ tickets, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(tickets.length / itemsPerPage);

  const paginatedData = tickets.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent tickets</h3>
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
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Date</th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Issue Type</th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Title</th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Description</th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Status</th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Latest Modified</th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((ticket, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-100 hover:bg-blue-50 cursor-pointer transition-all duration-200 hover:shadow-sm group"
                // onClick={() => handleViewTicket(ticket.id)}
                >
                  {/* Created Date */}
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        }) : "N/A"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ticket?.createdAt ? new Date(ticket.createdAt).toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit'
                        }) : ""}
                      </span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="p-4 text-sm whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                      <span className="font-medium text-gray-900">
                        {getTicketType(ticket.type)}
                      </span>
                    </div>
                  </td>

                  {/* Title */}
                  <td className="p-4 text-sm whitespace-nowrap">
                    <div className="max-w-xs">
                      <p className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors truncate">
                        {ticket.title}
                      </p>
                    </div>
                  </td>

                  {/* Description */}
                  <td className="p-4 text-sm">
                    <div className="max-w-sm">
                      <p className="text-gray-600 line-clamp-2 leading-relaxed">
                        {ticket.description}
                      </p>
                    </div>
                  </td>

                  {/* Status Badge */}
                  <td className="p-4">
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

                  {/* Updated Date */}
                  <td className="p-4 text-sm text-gray-600 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-800">
                        {ticket?.updatedAt
                          ? new Date(ticket.updatedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })
                          : "N/A"}
                      </span>
                      <span className="text-xs text-gray-500">
                        {ticket?.updatedAt
                          ? new Date(ticket.updatedAt).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit'
                          })
                          : ""}
                      </span>
                    </div>
                  </td>
                  <td className="mt-4 flex justify-center">
                    <button
                      onClick={() => onEdit(ticket)}
                      className="p-2 rounded hover:bg-gray-100 transition"
                    >
                      <Edit className="w-4 h-4 text-blue-500 hover:text-blue-700" />
                    </button>
                    <button
                      onClick={() => onDelete(ticket.id)}
                      className=" p-2 rounded hover:bg-gray-100 transition"
                    >
                      <Trash2 className="w-4 h-4 text-red-500 hover:text-red-700" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {
        totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalPages={totalPages}
          />
        )
      }
    </div>
  );
};