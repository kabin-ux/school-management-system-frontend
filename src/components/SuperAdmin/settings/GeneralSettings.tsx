import  { useState } from 'react';
import { Upload } from 'lucide-react';

export default function GeneralSettings() {
  const [appName, setAppName] = useState('EDUCATION APP');
  const [primaryColor, setPrimaryColor] = useState('#2563eb');
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC +05:45 (Nepal)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YY');

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* App Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">App Name</label>
          <input
            type="text"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Primary Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
          <div className="flex items-center gap-3">
            <div 
              className="w-12 h-10 rounded border border-gray-300"
              style={{ backgroundColor: primaryColor }}
            ></div>
            <input
              type="text"
              value={primaryColor}
              onChange={(e) => setPrimaryColor(e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Upload Logo */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Upload Logo</label>
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
            <Upload className="w-6 h-6 text-gray-400" />
          </div>
          <div>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Choose File
            </button>
            <p className="text-sm text-gray-500 mt-1">PNG, JPG up to 2MB</p>
          </div>
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