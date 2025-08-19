import React from 'react';
import { useNavigate } from 'react-router-dom';

interface FeeRecord {
  code: string,
  id: number;
  name: string;
  classSection: string;
  totalFee: number;
  paidAmount: number;
  dueAmount: number;
  status: string;
}

interface FeeOverviewTableProps {
  feeData: FeeRecord[];
}

export const FeeOverviewTable: React.FC<FeeOverviewTableProps> = ({ feeData }) => {
  const navigate = useNavigate();
  const handleShowDetails = (id: number) => {
    navigate(`/admin/fee-overview/details/${id}`)
  }
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">ID</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Name</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Class and Section</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Total Fee Remaining</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Due Total</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">STATUS</th>
              <th className="text-left p-4 font-medium text-gray-900 border-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {feeData.map((record, index) => (
              <tr key={index} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                onClick={() => handleShowDetails(record.id)}
              >
                <td className="p-4">
                  <span className="text-blue-600 font-medium">{record.code}</span>
                </td>
                <td className="p-4 text-gray-900">{record.name}</td>
                <td className="p-4 text-gray-900">{record.classSection}</td>
                <td className="p-4 text-gray-900">{record.totalFee.toLocaleString()}</td>
                <td className="p-4 text-gray-900">{record.dueAmount.toLocaleString()}</td>
                <td className="p-4">
                  <span className="inline-flex px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                    {record.status}
                  </span>
                </td>
                <td className="p-4">
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                    View Bill
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 flex justify-center">
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
      </div>
    </div>
  );
};