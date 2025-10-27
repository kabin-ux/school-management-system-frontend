import React, { useState } from "react";
import type { FeeStructureAttributes } from "../../../types/fee-salary.types";
import EmptyState from "../../../common/EmptyState";
import { DollarSign } from "lucide-react";
import { Pagination } from "../../../common/Pagination";

interface FeeOverviewTableProps {
  feeData: FeeStructureAttributes[];
}

export const FeeOverviewTable: React.FC<FeeOverviewTableProps> = ({ feeData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalPages = Math.ceil(feeData.length / itemsPerPage);

  const paginatedData = feeData.slice(
    (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
  )

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {!feeData || feeData.length === 0 ? (
        <EmptyState
          title="No fee structure found"
          description="There are currently no any fee structure in the system."
          icon={<DollarSign className="w-14 h-14" />}
        />
      ) : (
        <div className="overflow-x-auto">
          <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    S.N
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    School
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Class
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Monthly Fee
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Exam Fee
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Tuition Fee
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Transport Fee
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Total Fees
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData?.map((record, index) => {
                  const total =
                    Number(record.monthly_fee) +
                    Number(record.exam_fee) +
                    Number(record.tution_fee) +
                    Number(record.computer_fee) +
                    Number(record.laboratory_fee) +
                    Number(record.other_fee) +
                    (record.transportation?.price ?? 0);

                  return (
                    <tr
                      key={record.id}
                      className="hover:bg-blue-50 transition-colors duration-150 cursor-pointer group"
                    >
                      <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                      <td className="p-4 text-gray-900 font-medium">
                        {record.class?.school?.name}
                      </td>
                      <td className="p-4 text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-green-100 text-green-700">
                          {record.class?.name}
                        </span>
                      </td>
                      <td className="p-4 text-gray-700">
                        Rs. {Number(record.monthly_fee).toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-700">
                        Rs. {Number(record.exam_fee).toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-700">
                        Rs. {Number(record.tution_fee).toLocaleString()}
                      </td>
                      <td className="p-4 text-gray-700">
                        {record.transportation ? (
                          <div className="flex flex-col">
                            <span className="text-xs text-gray-500">
                              {record.transportation.vehicleNumber}
                            </span>
                            <span className="font-medium">
                              Rs. {record.transportation.price.toLocaleString()}
                            </span>
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">N/A</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="text-gray-900 font-bold text-base">
                          Rs. {total.toLocaleString()}
                        </span>
                      </td>
                    </tr>
                  );
                })}
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
