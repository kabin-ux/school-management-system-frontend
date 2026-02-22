import React, { useState } from "react";
import EmptyState from "../../../common/EmptyState";
import { HandCoins } from "lucide-react";
import { Pagination } from "../../../common/Pagination";
import type { PartnerSchoolPayment } from "../../../hooks/useSubscriptionPayment";

interface InvoiceOverviewTableProps {
  payments: PartnerSchoolPayment[];
}

export const InvoiceOverviewTable: React.FC<InvoiceOverviewTableProps> = ({
  payments,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil((payments?.length || 0) / itemsPerPage);
  const paginatedData = payments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {!payments || payments.length === 0 ? (
        <EmptyState
          title="No payments found"
          description="There are currently no subscription payments in the system."
          icon={<HandCoins className="w-14 h-14" />}
        />
      ) : (
        <div className="overflow-x-auto">
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    S.N
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    School
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    Subscription
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    Amount
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    Discount
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    Method
                  </th>
                  <th className="text-left p-4 text-sm text-gray-700 uppercase tracking-wider font-extralight">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((payment, index) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-gray-50 transition-colors duration-150"
                  >
                    <td className="p-4 text-gray-600 font-medium">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="p-4 text-gray-900 font-medium">
                      <div className="flex flex-col">
                        <span>{payment.school?.name}</span>
                        <span className="text-xs text-gray-500">
                          {payment.school?.city} • {payment.school?.email}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-600">
                      <div className="flex flex-col">
                        <span className="font-semibold">
                          {payment.subscription?.name}
                        </span>
                        <span className="text-xs text-gray-500">
                          {payment.subscription?.subscription_type}
                        </span>
                      </div>
                    </td>
                    <td className="p-4 text-gray-700">
                      Rs. {Number(payment.amount).toLocaleString()}
                    </td>
                    <td className="p-4 text-gray-700">
                      {payment.discount
                        ? `Rs. ${Number(payment.discount).toLocaleString()}`
                        : "-"}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
                        {payment.status}
                      </span>
                    </td>
                    <td className="p-4 text-gray-700">
                      {payment.method || "-"}
                    </td>
                    <td className="p-4 text-gray-700">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

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
