import React, { useState } from 'react';
import EmptyState from '../../../common/EmptyState';
import { School } from 'lucide-react';
import type { SchoolData } from '../../../types/partner-school.types';
import { Pagination } from '../../../common/Pagination';

interface PartnerSchoolTableProps {
  schoolData: SchoolData[];
  onViewPartnerSchoolDetails: (schoolCode: any) => void;
}

export const PartnerSchoolsTable: React.FC<PartnerSchoolTableProps> = ({ schoolData, onViewPartnerSchoolDetails }) => {
 
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(schoolData.length / itemsPerPage);

  const paginatedData = schoolData.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  )

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
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Sch Code</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">School</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Location</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Students</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Teachers</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Total Parents</th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">Status</th>
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
                paginatedData?.map((school, index) => (
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

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          onPageChange={setCurrentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
};