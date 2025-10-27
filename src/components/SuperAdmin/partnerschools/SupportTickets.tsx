import { Ticket } from "lucide-react";
import EmptyState from "../../../common/EmptyState";
import { getStatusAction, getTicketType } from "../../../lib/utils";
import type { SupportTicket } from "../../../types/support.types";

interface SupportTicketsProps {
  supportTickets: SupportTicket[];
}

export const SupportTickets: React.FC<SupportTicketsProps> = ({ supportTickets }) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Support Tickets</h3>
        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded">
          {supportTickets ? supportTickets?.length : 0} {supportTickets?.length === 1 ? 'ticket' : 'tickets'}
        </span>
      </div>

      <div className="space-y-4">
        {!supportTickets || supportTickets.length === 0 ? (
          <EmptyState
            title="No support tickets found"
            description="There are currently no any support tickets in the system."
            icon={<Ticket className="w-14 h-14" />}
          />
        ) : (
          supportTickets?.map((ticket) => (
            <div key={ticket.id} className="border-l-4 border-l-blue-500 pl-4 py-2">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-blue-600">{ticket.id}</span>
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
                  </div>
                  <p className="text-sm text-gray-900 mb-2">{ticket.title}</p>
                  <div className="flex items-center justify-between gap-4 text-xs text-gray-500">
                    <span>Type: <span className={`font-medium`}>{getTicketType(ticket.type)}</span></span>
                    {/* <span>👤 {ticket.created_by}</span> */}
                    <span>⏰ {new Date(ticket.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}