import React, { useState } from 'react';
import type { SchoolData } from './AddSchoolModal';
import EmptyState from '../../../common/EmptyState';
import { School } from 'lucide-react';

interface PartnerSchoolTableProps {
  schoolData?: SchoolData[];
  onViewPartnerSchoolDetails: (schoolCode: any) => void;
}

export const PartnerSchoolsTable: React.FC<PartnerSchoolTableProps> = ({ schoolData, onViewPartnerSchoolDetails }) => {
  const [subscription, setSubscription] = useState('All Status');
  const [payment, setPayment] = useState('Payment');

  const getStatusBadge = (status: string | undefined) => {
    return status === 'Active'
      ? 'bg-green-100 text-green-800'
      : 'bg-red-100 text-red-800';
  };

  const getSubscriptionBadge = (sub: string | undefined) => {
    return sub === 'Premium'
      ? 'bg-blue-100 text-blue-800'
      : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-red-100 rounded flex items-center justify-center">
              <span className="text-red-600 text-sm">⚠</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Partnered Schools</h2>
              <p className="text-sm text-gray-600">List of all the partnered school</p>
            </div>
          </div>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
            View All
          </button>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-4 overflow-hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search All the partnered Schools..."
              className="pl-4 pr-4 py-2 w-80 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <select
              value={subscription}
              onChange={(e) => setSubscription(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <select
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Payment</option>
              <option>Fully paid</option>
              <option>Partial paid</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Sch Code</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">SCHOOL</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Location</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Students</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Teachers</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Parents</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">STATUS</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Subscription</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Payment</th>
            </tr>
          </thead>
          <tbody>

            {!schoolData || schoolData.length === 0 ?
              (
                <tr>
                  <td colSpan={9} className="py-10">
                    <div className="flex justify-center items-center">
                      <EmptyState
                        title='No Partner Schools'
                        description='You haven’t added any partner schools yet. Add a school to get started managing your school network.'
                        icon={<School className='w-12 h-12 text-gray-400' />}
                      />
                    </div>
                  </td>
                </tr>
              ) : (
                schoolData?.map((school, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 cursor-pointer"
                    onClick={() => onViewPartnerSchoolDetails?.(school.id)}
                  >
                    <td className="py-4 px-6 text-sm text-blue-600 font-medium">{school.school_code || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-900 font-medium">{school.name || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-600">{school.address || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{school.totalStudents || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{school.totalTeachers || '-'}</td>
                    <td className="py-4 px-6 text-sm text-gray-900">{school.totalParents || '-'}</td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(school?.status)}`}>
                        {school.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadge(school.subscription)}`}>
                        {school.subscription || '-'}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-sm text-gray-900">{school?.payment || '-'}</td>
                  </tr>
                ))
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
};