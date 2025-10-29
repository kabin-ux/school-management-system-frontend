import { ArrowLeft } from 'lucide-react';
import { getStatusAction, getTicketType } from '../../../lib/utils';
import type { SupportTicket } from '../../../types/support.types';

interface TicketDetailProps {
  selectedTicket: SupportTicket;
  onAccept: (id: string) => void;
  onResolve: (id: string) => void;
  onClose: (id: string) => void;
  onBack: () => void;
  isLoading?: boolean
}

export default function TicketDetail({ selectedTicket, onAccept, onResolve, onBack, onClose, isLoading }: TicketDetailProps) {
  const handleClick = () => {
    if (selectedTicket?.status === 'in_progress') {
      onResolve(selectedTicket.id);
    } else if (selectedTicket?.status === "open") {
      onAccept(selectedTicket.id);
    }
  }

  const handleClose = () => {
    if (selectedTicket) {
      onClose(selectedTicket.id);
    }
  }

  const statusInfo = getStatusAction(selectedTicket?.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-600" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Support Ticket Detail</h1>
            <p className="text-gray-600 mt-1">Detail information, date, status, chats of the following ticket</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Ticket Info */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedTicket?.id}</h2>
                <div className="mt-2 space-y-1 text-sm">
                  <p><span className="text-gray-500">Submitted by:</span> <span className="font-medium">{selectedTicket?.school?.name}</span></p>
                  {/* <p><span className="text-gray-500">Admin • Springfield High School</span></p> */}
                </div>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-gray-500 text-sm">Issue Type</span>
                  <p className="font-medium">{getTicketType(selectedTicket?.type)}</p>
                </div>
                <div>
                  <span className="text-gray-500 text-sm">Status</span>
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium">
                    {statusInfo.label}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Issue Description */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Issue Description</h3>
            <p className="text-gray-700 leading-relaxed">{selectedTicket?.title}</p>
            <p className="text-gray-700 leading-relaxed">
              {selectedTicket?.description}
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <div className="space-y-2">
                <button
                  className={`w-full py-2 text-white rounded-lg font-medium flex items-center justify-center  gap-2 transition-colors
    ${selectedTicket?.status === "in_progress"
                      ? "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"
                      : selectedTicket?.status === "resolved"
                        ? "bg-gray-600 hover:bg-gray-700 disabled:bg-gray-300"
                        : "bg-amber-400 hover:bg-amber-500 disabled:bg-amber-500"
                    }`}
                  onClick={handleClick}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending...</span>
                    </>
                  ) : (
                    selectedTicket?.status === "in_progress"
                      ? "Resolve Ticket"
                      : selectedTicket?.status === "open"
                        ? "Accept Ticket"
                        : "Reopen Ticket"
                  )}
                </button>
                <button
                  className="w-full bg-red-600 text-white py-2 rounded-lg 
             hover:bg-red-700 transition-colors 
             disabled:bg-red-300 disabled:text-gray-200 disabled:cursor-not-allowed
             font-medium flex items-center justify-center gap-2"
                  disabled={isLoading || selectedTicket?.status === 'closed'}
                  onClick={handleClose}
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Closing...</span>
                    </>
                  ) : (
                    "Close Support Ticket"
                  )}
                </button>

              </div>
            </div>
          </div>

          {/* Analytical Overview */}
          {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytical Overview</h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Total Tickets Resolved</span>
                </div>
                <div className="text-2xl font-bold text-gray-900">250</div>
                <div className="text-xs text-gray-500">+7.5% from last month</div>
              </div>

              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Success Rate</span>
                  <span className="text-sm font-medium text-gray-900">94.2%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '94.2%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-1">Very high success rate</div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}