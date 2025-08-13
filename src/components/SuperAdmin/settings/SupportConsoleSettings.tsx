import { useState } from 'react';
import { Edit } from 'lucide-react';

export default function SupportConsoleSettings() {
  const [autoCloseDays, setAutoCloseDays] = useState('7 days');
  const [defaultPriority, setDefaultPriority] = useState('Medium');
  const [internalNotes, setInternalNotes] = useState(true);
  const [fileAttachments, setFileAttachments] = useState(true);
  const [chatThreadView, setChatThreadView] = useState(true);
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC +05:45 (Nepal)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YY');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Auto Close After */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auto Close After</label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={autoCloseDays}
              onChange={(e) => setAutoCloseDays(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="text-blue-600 hover:text-blue-800">
              <Edit className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Default Ticket Priority */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Ticket Priority</label>
          <select
            value={defaultPriority}
            onChange={(e) => setDefaultPriority(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>
      </div>

      {/* Feature Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Internal Notes */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Internal Notes</h4>
          <p className="text-sm text-gray-600 mb-3">Allow staff-only notes</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={internalNotes}
              onChange={(e) => setInternalNotes(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* File Attachments */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">File Attachments</h4>
          <p className="text-sm text-gray-600 mb-3">Allow file uploads</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={fileAttachments}
              onChange={(e) => setFileAttachments(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>

        {/* Chat Thread View */}
        <div>
          <h4 className="font-medium text-gray-900 mb-2">Chat Thread View</h4>
          <p className="text-sm text-gray-600 mb-3">Enable conversation UI</p>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={chatThreadView}
              onChange={(e) => setChatThreadView(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Default Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Language</label>
          <select
            value={defaultLanguage}
            onChange={(e) => setDefaultLanguage(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>English</option>
            <option>Nepali</option>
            <option>Hindi</option>
          </select>
        </div>

        {/* Time Zone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
          <select
            value={timeZone}
            onChange={(e) => setTimeZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>UTC +05:45 (Nepal)</option>
            <option>UTC +05:30 (India)</option>
            <option>UTC +00:00 (GMT)</option>
          </select>
        </div>

        {/* Date Format */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date Format</label>
          <select
            value={dateFormat}
            onChange={(e) => setDateFormat(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>DD/MM/YY</option>
            <option>MM/DD/YY</option>
            <option>YYYY-MM-DD</option>
          </select>
        </div>
      </div>

      {/* Last Saved */}
      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <p className="text-sm text-gray-500">Last saved: Today at 2:30 PM</p>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            Reset All
          </button>
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}