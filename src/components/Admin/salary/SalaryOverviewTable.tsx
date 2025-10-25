import React from "react";
import { useNavigate } from "react-router-dom";
import type { Salary } from "../../../types/fee-salary.types";
import EmptyState from "../../../common/EmptyState";
import { DollarSign } from "lucide-react";
import { getRoleAction } from "../../../lib/utils";

interface SalaryOverviewTableProps {
    salaryData: Salary[];
}

export const SalaryOverviewTable: React.FC<SalaryOverviewTableProps> = ({ salaryData }) => {
    const navigate = useNavigate();

    const handleShowDetails = (id: string) => {
        navigate(`/admin/fee-overview/details/${id}`);
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {!salaryData || salaryData.length === 0 ? (
                <EmptyState
                    title="No salary structure found"
                    description="There are currently no any salary structure in the system."
                    icon={<DollarSign className="w-14 h-14" />}
                />
            ) : (
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    S.N
                                </th>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    Teacher Name
                                </th>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    Basic Salary
                                </th>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    Allowences
                                </th>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    Role
                                </th>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    Creator
                                </th>
                                <th className="text-left p-4 font-extralight uppercase text-sm text-gray-500 border-gray-200 tracking-wider">
                                    Total Salary
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {salaryData.map((record, index) => {
                                const total =
                                    Number(record.basic) +
                                    Number(record.allowances)

                                return (
                                    <tr
                                        key={record.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <td className="p-4 text-gray-900">{index + 1}</td>
                                        <td className="p-4 text-gray-900">
                                            {record.role === "teacher" && record.teacherEmployee
                                                ? `${record.teacherEmployee.firstName} ${record.teacherEmployee.lastName}`
                                                : record.role === "accountant" && record.accountantEmployee
                                                    ? `${record.accountantEmployee.firstName} ${record.accountantEmployee.lastName}`
                                                    : "N/A"}
                                        </td>
                                        <td className="p-4 text-gray-900">Rs. {Number(record.basic).toLocaleString()}</td>
                                        <td className="p-4 text-gray-900">Rs. {Number(record.allowances).toLocaleString()}</td>
                                        <td className="p-4 text-gray-900">{(() => {
                                            const statusInfo = getRoleAction(record.role);
                                            return (
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium  ${statusInfo.bgColor} ${statusInfo.textColor}`}
                                                >
                                                    {statusInfo.label}
                                                </span>
                                            );
                                        })()}</td>
                                        <td className="p-4 text-gray-900">{record.creator.firstName} {record.creator.lastName}</td>
                                        <td className="p-4 text-gray-900 font-semibold">
                                            Rs. {total.toLocaleString()}
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
