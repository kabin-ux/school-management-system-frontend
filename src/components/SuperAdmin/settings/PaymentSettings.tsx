import { useState } from 'react';

export default function PaymentSettings() {
  const [defaultCurrency, setDefaultCurrency] = useState('NPR (Nepalese Currency)');
  const [paymentDueDays, setPaymentDueDays] = useState('30 Days');
  const [feeReminder, setFeeReminder] = useState(false);
  const [autoInvoicing, setAutoInvoicing] = useState(false);
  const [defaultLanguage, setDefaultLanguage] = useState('English');
  const [timeZone, setTimeZone] = useState('UTC +05:45 (Nepal)');
  const [dateFormat, setDateFormat] = useState('DD/MM/YY');

  const paymentGateways = [
    { name: 'E-SEWA', enabled: true },
    { name: 'IME Khalti', enabled: true },
    { name: 'Bank Transfer', enabled: true }
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Default Currency */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
          <select
            value={defaultCurrency}
            onChange={(e) => setDefaultCurrency(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>NPR (Nepalese Currency)</option>
            <option>USD (US Dollar)</option>
            <option>INR (Indian Rupee)</option>
          </select>
        </div>

        {/* Linked Payment Gateway */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Linked Payment Gateway</label>
          <div className="space-y-2">
            {paymentGateways.map((gateway) => (
              <div key={gateway.name} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-700">{gateway.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Default Payment Due Dates */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Default Payment Due Dates</label>
        <select
          value={paymentDueDays}
          onChange={(e) => setPaymentDueDays(e.target.value)}
          className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option>30 Days</option>
          <option>15 Days</option>
          <option>45 Days</option>
          <option>60 Days</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automatic Fee Reminder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Automatic Fee Reminder</label>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={feeReminder}
                onChange={(e) => setFeeReminder(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm text-gray-600">Before 15 days of Payment Date</span>
          </div>
        </div>

        {/* Auto-Invoicing */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Invoicing</label>
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoInvoicing}
                onChange={(e) => setAutoInvoicing(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
            <span className="text-sm text-gray-600">Generate invoices automatically</span>
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