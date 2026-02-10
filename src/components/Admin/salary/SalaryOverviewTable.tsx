import React, { useState } from "react";
import type { Salary } from "../../../types/fee-salary.types";
import EmptyState from "../../../common/EmptyState";
import { HandCoins } from "lucide-react";
import { getRoleAction } from "../../../lib/utils";
import { Pagination } from "../../../common/Pagination";

interface SalaryOverviewTableProps {
    salaryData: Salary[];
}

export const SalaryOverviewTable: React.FC<SalaryOverviewTableProps> = ({ salaryData }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const totalPages = Math.ceil(salaryData.length / itemsPerPage);

    const paginatedData = salaryData.slice(
        (currentPage - 1) * itemsPerPage, currentPage * itemsPerPage
    )

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            {!salaryData || salaryData.length === 0 ? (
                <EmptyState
                    title="No salary structure found"
                    description="There are currently no any salary structure in the system."
                    icon={<HandCoins className="w-14 h-14" />}
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
                                    Employee Name
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
                            {paginatedData.map((record, index) => {
                                const total =
                                    Number(record.basic) +
                                    Number(record.allowances)

                                return (
                                    <tr
                                        key={record.id}
                                        className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer"
                                    >
                                        <td className="p-4 text-gray-600">{index + 1}</td>
                                        <td className="p-4 text-gray-900 font-medium">
                                            {record.role === "teacher" && record.teacherEmployee
                                                ? `${record.teacherEmployee.firstName} ${record.teacherEmployee.lastName}`
                                                : record.role === "accountant" && record.accountantEmployee
                                                    ? `${record.accountantEmployee.firstName} ${record.accountantEmployee.lastName}`
                                                    : "N/A"}
                                        </td>
                                        <td className="p-4 text-gray-600">Rs. {Number(record.basic).toLocaleString()}</td>
                                        <td className="p-4 text-gray-600">Rs. {Number(record.allowances).toLocaleString()}</td>
                                        <td className="p-4 text-gray-600">{(() => {
                                            const statusInfo = getRoleAction(record.role);
                                            return (
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium  ${statusInfo.bgColor} ${statusInfo.textColor}`}
                                                >
                                                    {statusInfo.label}
                                                </span>
                                            );
                                        })()}</td>
                                        <td className="p-4 text-gray-600">{record.creator.firstName} {record.creator.lastName}</td>
                                        <td className="p-4 text-gray-600 font-semibold">
                                            Rs. {total.toLocaleString()}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
            {
                totalPages > 1 && (
                    <Pagination
                        currentPage={currentPage}
                        onPageChange={setCurrentPage}
                        totalPages={totalPages}
                    />
                )
            }
        </div>
    );
};
