import { useState } from 'react';
import { Search } from 'lucide-react';
import type { SchoolPayment } from '../../../types/payments.types';

interface SchoolPaymentTableProps {
  onViewSchool?: (schoolCode: string) => void;
}

export default function SchoolPaymentTable({ onViewSchool }: SchoolPaymentTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [subscriptionFilter, setSubscriptionFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All Status');
  const [paymentFilter, setPaymentFilter] = useState('All');

  const schoolData: SchoolPayment[] = [
    { id: '1', schoolCode: 'TIC-001', school: 'Springfield High School', location: 'Chitwan', totalStudents: 1800, totalTeachers: 122, totalParents: 1000, status: 'Active', subscription: 'Premium', payment: 'Fully paid' },
    { id: '2', schoolCode: 'TIC-002', school: 'Oakwood Academy', location: 'Biratnagar', totalStudents: 950, totalTeachers: 88, totalParents: 600, status: 'Inactive', subscription: 'Basic', payment: 'Fully paid' },
    { id: '3', schoolCode: 'TIC-003', school: 'Riverside School', location: 'Kathmandu', totalStudents: 2200, totalTeachers: 156, totalParents: 1400, status: 'Active', subscription: 'Premium', payment: 'Partial paid' },
    { id: '4', schoolCode: 'TIC-004', school: 'Greenfield College', location: 'Butwal', totalStudents: 1200, totalTeachers: 98, totalParents: 800, status: 'Active', subscription: 'Premium', payment: 'Fully paid' },
    { id: '5', schoolCode: 'TIC-001', school: 'Springfield High School', location: 'Chitwan', totalStudents: 1800, totalTeachers: 122, totalParents: 1000, status: 'Active', subscription: 'Premium', payment: 'Fully paid' },
    { id: '6', schoolCode: 'TIC-002', school: 'Oakwood Academy', location: 'Biratnagar', totalStudents: 950, totalTeachers: 88, totalParents: 600, status: 'Inactive', subscription: 'Basic', payment: 'Fully paid' },
    { id: '7', schoolCode: 'TIC-003', school: 'Riverside School', location: 'Kathmandu', totalStudents: 2200, totalTeachers: 156, totalParents: 1400, status: 'Active', subscription: 'Premium', payment: 'Partial paid' },
    { id: '8', schoolCode: 'TIC-004', school: 'Greenfield College', location: 'Butwal', totalStudents: 1200, totalTeachers: 98, totalParents: 800, status: 'Active', subscription: 'Premium', payment: 'Fully paid' }
  ];

  const getStatusBadge = (status: string) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        status === 'Active' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    );
  };

  const getSubscriptionBadge = (subscription: string) => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        subscription === 'Premium' 
          ? 'bg-blue-100 text-blue-800' 
          : 'bg-orange-100 text-orange-800'
      }`}>
        {subscription}
      </span>
    );
  };

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xs">🏫</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Partnered Schools</h2>
              <p className="text-sm text-gray-600">List of all Partnered school</p>
            </div>
          </div>
          <button 
            onClick={() => console.log('View All clicked')}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            View All
          </button>
        </div>
        
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search All the partnered Schools..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={subscriptionFilter}
            onChange={(e) => setSubscriptionFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Subscription</option>
            <option>Premium</option>
            <option>Basic</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option>Payment</option>
            <option>Fully paid</option>
            <option>Partial paid</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sch Code
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SCHOOL
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Location
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Students
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Teachers
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Parents
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                STATUS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subscription
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {schoolData.map((school, index) => (
              <tr 
                key={school.id} 
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 cursor-pointer transition-colors`}
                onClick={() => onViewSchool?.(school.schoolCode)}
              >
                <td className="px-6 py-4 text-sm font-medium text-blue-600">
                  {school.schoolCode}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {school.school}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.location}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.totalStudents}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.totalTeachers}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.totalParents}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(school.status)}
                </td>
                <td className="px-6 py-4">
                  {getSubscriptionBadge(school.subscription)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {school.payment}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Alphabet Navigation */}
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 justify-center">
          {alphabet.map((letter) => (
            <button
              key={letter}
              className="w-8 h-8 text-sm font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
            >
              {letter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}