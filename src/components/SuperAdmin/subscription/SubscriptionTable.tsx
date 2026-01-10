import React, { useState } from 'react';
import EmptyState from '../../../common/EmptyState';
import { Edit, School, Trash2 } from 'lucide-react';
import { Pagination } from '../../../common/Pagination';
import type { Subscription } from '../../../hooks/useSubscription';

interface SubscriptionTableProps {
  subscriptions: Subscription[];
  onViewSubscriptionDetails: (subscriptionId: string) => void;
  onAddSchoolSubscription: (subscription_id: string) => void;
  onEdit: (subscription: Subscription) => void;
  onDelete: (subscription_id: string) => void;
}

export const SubscriptionTable: React.FC<SubscriptionTableProps> = ({
  subscriptions,
  onViewSubscriptionDetails,
  onAddSchoolSubscription,
  onEdit,
  onDelete
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(subscriptions?.length / itemsPerPage);

  const paginatedData = subscriptions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getSubscriptionBadge = (subType: string | undefined) => {
    switch (subType) {
      case 'GOLD':
        return 'bg-yellow-100 text-yellow-800';
      case 'SILVER':
        return 'bg-gray-100 text-gray-800';
      case 'BRONZE':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  if (!subscriptions || subscriptions?.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="py-10">
          <div className="flex justify-center items-center">
            <EmptyState
              title="No Subscriptions"
              description="You haven’t created any partner school subscriptions yet."
              icon={<School className="w-12 h-12 text-gray-400" />}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr
            >
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Name
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Type
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Total Fee
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Discount
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Remarks
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Schools Count
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Created At
              </th>
              <th className="text-left py-3 px-6 font-medium text-gray-600 text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((sub) => (
              <tr
                key={sub.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                  {sub.name}
                </td>
                <td className="py-4 px-6">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSubscriptionBadge(
                      sub.subscription_type,
                    )}`}
                  >
                    {sub.subscription_type}
                  </span>
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {sub.total_fee}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {sub.discount ?? 0}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {sub.remarks || '-'}
                </td>
                <td className="py-4 px-6 text-sm text-gray-900">
                  {sub.schools?.length ?? 0}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  {new Date(sub.createdAt).toLocaleDateString()}
                </td>
                <td className="py-4 px-6 text-sm text-gray-600">
                  <button
                    onClick={() => onAddSchoolSubscription(sub.id)}
                  >
                    Add School
                  </button>
                  <button
                    onClick={() => onViewSubscriptionDetails(sub.id)}
                  >
                    View Details
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-blue-600"
                    onClick={() => onEdit(sub)}
                  >
                    <Edit className='w-4 h-4' />
                  </button>
                  <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-red-600"
                    onClick={() => onDelete(sub.id)}
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </td>
              </tr>
            ))}
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
