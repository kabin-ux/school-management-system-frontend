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
          description="There are currently no any fee structure in the system. Click on button above to create a fee structure"
          icon={<DollarSign className="w-14 h-14" />}
        />
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Class
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  School
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Monthly Fee
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Exam Fee
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Tuition Fee
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Transport
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Total
                </th>
                <th className="text-left p-4 font-medium text-gray-900 border-gray-200">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {feeData.map((record) => {
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
                    className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleShowDetails(record.id)}
                  >
                    <td className="p-4 text-gray-900">{record.class?.name}</td>
                    <td className="p-4 text-gray-900">{record.class?.school?.name}</td>
                    <td className="p-4 text-gray-900">{Number(record.monthly_fee).toLocaleString()}</td>
                    <td className="p-4 text-gray-900">{Number(record.exam_fee).toLocaleString()}</td>
                    <td className="p-4 text-gray-900">{Number(record.tution_fee).toLocaleString()}</td>
                    <td className="p-4 text-gray-900">
                      {record.transportation
                        ? `${record.transportation.vehicleNumber} (${record.transportation.price.toLocaleString()})`
                        : "N/A"}
                    </td>
                    <td className="p-4 text-gray-900 font-semibold">
                      {total.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleShowDetails(record.id);
                        }}
                        className="text-blue-600 hover:text-blue-800 text-sm font-medium"
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
