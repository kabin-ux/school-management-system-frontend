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
                  <p className="font-medium">{getTicketType(selectedTicket.type)}</p>
                </div>
                {/* <div className="mb-2">
                  <span className="text-gray-500 text-sm">Priority</span>
                  <p className="font-medium">High</p>
                </div> */}
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
                        <p className="text-gray-700 leading-relaxed">{selectedTicket.title}</p>
            <p className="text-gray-700 leading-relaxed">
              {selectedTicket?.description}
            </p>
          </div>

          {/* Attachments */}
          {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Attachments</h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">error-screenshot.png</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Paperclip className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium">payment-log.pdf</span>
                </div>
                <button className="text-blue-600 hover:text-blue-800">
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div> */}

          {/* Conversation Thread */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            {/* <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversation Thread</h3> */}
            {/* <div className="space-y-4"> */}
            {/* <div className="text-sm text-gray-500 mb-4">
                Updated 1hr ago check the ticket logs and get back to you within 2 hours.
              </div> */}

            {/* Messages */}
            {/* <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium">SJ</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">on 10/15/2024</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Thanks for the quick response. The issue is quite urgent as we have enrollment
                      deadlines approaching.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">MD</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm">Max Doe</span>
                      <span className="text-xs text-gray-500">on 10/15/2024</span>
                    </div>
                    <p className="text-sm text-gray-700">
                      Your welcome as a developer and the management team we are eager to help
                      our partners and the schools.
                    </p>
                  </div>
                </div>
              </div> */}

            {/* Reply Input */}
            {/* <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">YO</span>
                  </div>
                  <div className="flex-1">
                    <textarea
                      placeholder="Type your reply..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    />
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">Changed Status</span>
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(e.target.value)}
                          className="text-sm border border-gray-300 rounded px-2 py-1"
                        >
                          <option value="Open">Open</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Resolved">Resolved</option>
                        </select>
                      </div>
                      <button
                        onClick={handleSendMessage}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            {/* </div> */}
          </div>

          {/* Internal Notes */}
          {/* <div className="bg-yellow-50 rounded-lg border border-yellow-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Internal Notes</h3>
            <div className="bg-yellow-100 p-3 rounded text-sm text-yellow-800 mb-3">
              Admin Only
            </div>
            <p className="text-sm text-gray-700">
              Initial assessment: Payment gateway configuration issue. Need to check with development team for API updates.
              Escalate after 1 day if not resolved.
            </p>
          </div> */}

          {/* Send Notification */}
          {/* <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Send Notification to User</h3>
            <div className="space-y-3">
              <div>
                <span className="text-sm text-gray-500">Recipient</span>
                <p className="font-medium">Sarah Johnson ( Ticket Submitter )</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notification Message</label>
                <textarea
                  placeholder="e.g. Your ticket has been resolved. The payment gateway issue has been fixed and is now working normally."
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                />
              </div>
              <div className="text-xs text-gray-500">
                Quick Templates
              </div>
              <div className="space-y-1">
                <button className="block text-blue-600 hover:text-blue-800 text-sm">
                  Ticket Resolved Template
                </button>
                <button className="block text-blue-600 hover:text-blue-800 text-sm">
                  Under Investigation Template
                </button>
                <button className="block text-blue-600 hover:text-blue-800 text-sm">
                  Request Information Template
                </button>
              </div>
              <button
                onClick={handleSendNotification}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Notification
              </button>
            </div>
          </div> */}
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