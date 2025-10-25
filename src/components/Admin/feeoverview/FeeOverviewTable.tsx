import React from "react";
import { useNavigate } from "react-router-dom";
import type { FeeStructureAttributes } from "../../../types/fee-salary.types";
import EmptyState from "../../../common/EmptyState";
import { DollarSign } from "lucide-react";

interface FeeOverviewTableProps {
  feeData: FeeStructureAttributes[];
}

export const FeeOverviewTable: React.FC<FeeOverviewTableProps> = ({ feeData }) => {
  const navigate = useNavigate();

  const handleShowDetails = (id: string) => {
    navigate(`/admin/fee-overview/details/${id}`);
  };

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
                    Transport
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Total
                  </th>
                  <th className="text-left p-4 font-extralight text-gray-700 text-sm uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {feeData?.map((record, index) => {
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
                      onClick={() => handleShowDetails(record.id)}
                    >
                      <td className="p-4 text-gray-600 font-medium">{index + 1}</td>
                      <td className="p-4 text-gray-900 font-medium">
                        {record.class?.school?.name}
                      </td>
                      <td className="p-4 text-gray-900">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
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
                      <td className="p-4">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleShowDetails(record.id);
                          }}
                          className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium text-blue-600 hover:text-white hover:bg-blue-600 transition-all duration-200 border border-blue-600 group-hover:shadow-md"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* Pagination (optional - can adapt later) */}
      {/* <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-center">
        <div className="flex space-x-1">
          {Array.from({ length: 26 }, (_, i) => (
            <button
              key={i}
              className="w-8 h-8 text-sm border border-gray-200 rounded text-gray-700 hover:bg-gray-100"
            >
              {String.fromCharCode(65 + i)}
            </button>
          ))}
        </div>
      </div> */}
    </div>
  );
};
