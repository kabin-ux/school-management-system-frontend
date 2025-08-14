import { useState } from 'react';
import { ArrowLeft, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentDetailViewProps {
  onBack?: () => void;
}

export default function PaymentDetailView({ onBack }: PaymentDetailViewProps) {
  const [activeTab, setActiveTab] = useState('Monthly');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(`/super-admin/payments/schools`)
  }

  const paymentHistory = [
    { invoiceId: 'INV-2024-001', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-002', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-003', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-004', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-005', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-006', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-007', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-008', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-009', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' },
    { invoiceId: 'INV-2024-010', date: 'Dec 16, 2024', amount: '$2,850', method: 'Bank Transfer', status: 'Paid', invoice: '↓', notes: 'Monthly subscription fee' }
  ];

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: i + 1,
    value: Math.random() * 100 + 50
  }));

  return (
    <div className="flex-1 p-6 overflow-y-auto" >
      {/* Header */}
     

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* School Information Summary */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">School Information Summary</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">School Name</span>
                  <p className="font-medium text-gray-900">Greenwood Academy</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">School Code</span>
                  <p className="font-medium text-gray-900">GWA-2024-001</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Address</span>
                  <p className="font-medium text-gray-900">1421 Oak Street, Springfield & 45701</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">School Type</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full font-medium">Premium</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">Active</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-500">Start Date</span>
                  <p className="font-medium text-gray-900">Jan 5, 2024</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">End Date</span>
                  <p className="font-medium text-gray-900">Jan 5, 2025</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Assigned Admin</span>
                  <p className="font-medium text-gray-900">🅰️ Dr. Sarah Johnson</p>
                  <p className="font-medium text-gray-900">🅰️ Michael Chen</p>
                </div>
                <div>
                  <span className="text-sm text-gray-500">Contact Information</span>
                  <p className="font-medium text-gray-900">📧 admin@greenwoodacademy.edu</p>
                  <p className="font-medium text-gray-900">📞 +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Amount Paid</span>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$34,200</p>
              <p className="text-sm text-green-600">↑ 12 payments made</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Total Due Amount</span>
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$2,850</p>
              <p className="text-sm text-orange-600">Due in 5 days</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Last Payment</span>
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <p className="text-2xl font-bold text-gray-900">$2,850</p>
              <p className="text-sm text-gray-600">Dec 16, 2024</p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Payment Method</span>
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              </div>
              <p className="text-lg font-bold text-gray-900">💳 Bank Transfer</p>
              <p className="text-sm text-gray-600">Last Payment via Bank Transfer</p>
            </div>
          </div>

          {/* Fee Collection Trend Chart */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Fee Collection Trend</h3>
                <p className="text-sm text-gray-600">Total in range: <span className="font-medium">$34,200</span> • Average per day: <span className="font-medium">$2,850</span></p>
              </div>
              <div className="flex bg-gray-100 rounded-lg p-1">
                {['Monthly', 'Quarterly', 'Yearly'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${activeTab === tab
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Simple Bar Chart */}
            <div className="flex items-end justify-between h-32 gap-2">
              {chartData.map((bar, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{ height: `${bar.value}%` }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Payment History</h3>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Invoice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {paymentHistory.map((payment, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-6 py-4 text-sm font-medium text-blue-600">{payment.invoiceId}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.date}</td>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{payment.amount}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.method}</td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full font-medium">
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-blue-600 cursor-pointer">{payment.invoice}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{payment.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-700">Showing 1-9 of 9 payments</p>
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Previous</button>
                <button className="px-3 py-1 text-sm bg-blue-600 text-white rounded">1</button>
                <button className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50">Next</button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Fee Payment Progress */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">Fee Payment Progress</h4>
              <span className="text-blue-600">ℹ️</span>
            </div>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle cx="50" cy="50" r="40" stroke="#3b82f6" strokeWidth="8" fill="none" strokeDasharray={`${73 * 2.51} ${(100 - 73) * 2.51}`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">73%</span>
              </div>
            </div>
            <p className="text-center text-sm text-gray-600 mb-2">$11,950 of $34,200 paid</p>
            <p className="text-center text-xs text-red-600">$2,850 remaining</p>
          </div>

          {/* Highest Payment */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">Highest Payment</h4>
              <span className="text-yellow-500">👑</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">$2,850</p>
            <p className="text-sm text-gray-600 mb-2">Monthly subscription</p>
            <p className="text-xs text-gray-500">Consistent payment amount</p>
          </div>

          {/* Monthly Average */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">Monthly Average</h4>
              <span className="text-blue-500">📊</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mb-1">$2,613</p>
            <p className="text-sm text-gray-600 mb-2">Over 12 months</p>
            <p className="text-xs text-green-600">Consistent trend</p>
          </div>

          {/* Next Payment Due */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">Next Payment Due</h4>
              <span className="text-orange-500">📅</span>
            </div>
            <p className="text-lg font-bold text-gray-900 mb-1">Jan 16, 2025</p>
            <p className="text-sm text-gray-600 mb-2">$2,850 expected</p>
            <p className="text-xs text-orange-600">Due in 5 days</p>
          </div>

          {/* Payment Actions */}
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-medium text-gray-600">Payment Actions</h4>
              <span className="text-purple-500">⚙️</span>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-3">We have comprehensive actions to control billing</p>
              <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                Notify for Due Payment
              </button>
              <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Reset Payment Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}