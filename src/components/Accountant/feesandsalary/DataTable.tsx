import React from 'react';
import type { FeeStructureAttributes, Salary, ViewType } from '../../../types/fee-salary.types';
import { StatusBadge } from './StatusBadge';
import { DollarSign, Edit, Trash2 } from 'lucide-react';
import EmptyState from '../../../common/EmptyState';
import { getRoleAction } from '../../../lib/utils';

interface DataTableProps {
  activeView: ViewType;
  students: FeeStructureAttributes[];
  teachers: Salary[];
  // onRowClick: (id: string) => void;
  onEdit: (feeStructure: FeeStructureAttributes) => void;
  onDelete: (feeStructureId: string) => void;
  onEditSalary: (salary: Salary) => void;
  onDeleteSalary: (salaryId: string) => void;
}

export const DataTable: React.FC<DataTableProps> = ({
  activeView,
  students,
  teachers,
  // onRowClick,
  onEdit,
  onDelete,
  onEditSalary,
  onDeleteSalary
}) => {
  const structure = activeView === 'Student' ? students : teachers;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {activeView === 'Student' ? 'Student Fees Details' : 'Employee Salary Details'}
          </h3>
          <p className="text-gray-600 text-sm">
            {activeView === 'Student'
              ? 'Student fee structure and payment details'
              : 'Employee salary and payment details'}
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        {!structure || structure.length === 0 ? (
          (activeView === 'Student' ? (
            <EmptyState
              title="No fee structure found"
              description="There are currently no any fee structure in the system. Click on button above to create a fee structure"
              icon={<DollarSign className="w-14 h-14" />}
            />
          ) : (
            <EmptyState
              title="No salary structure found"
              description="There are currently no any salary structure in the system. Click on button above to create a salary structure"
              icon={<DollarSign className="w-14 h-14" />}
            />
          ))
        ) : (
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  S.N
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeView === 'Student' ? 'Class' : 'Employee Name'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeView === 'Student' ? 'Monthly Fee' : 'Basic Salary'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeView === 'Student' ? 'Exam Fee' : 'Allowances'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeView === 'Student' ? 'Status' : 'Role'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeView === 'Student' ? 'Total Fees' : 'Creator'}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {activeView === 'Student' ? 'Actions' : 'Total Salary'}
                </th>
                {activeView !== 'Student' && (
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                )}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {structure?.map((item, index) => {
                if (activeView === 'Student') {
                  const student = item as FeeStructureAttributes;
                  const total =
                    Number(student.monthly_fee) +
                    Number(student.exam_fee) +
                    Number(student.tution_fee) +
                    Number(student.other_fee) +
                    Number(student.computer_fee) +
                    Number(student.laboratory_fee) 
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    // onClick={() => onRowClick(student.id)}
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {student.class?.name ?? '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Rs. {Number(student.monthly_fee).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Rs.{Number(student.exam_fee).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={student.class?.school?.status ?? 'Unknown'} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-semibold">
                        Rs. {Number(total).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-blue-400 hover:text-gray-600"
                            onClick={() => onEdit(student)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-400 hover:text-gray-600"
                            onClick={() => onDelete(student.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                } else {
                  const employee = item as Salary;
                  const totalSalary =
                    Number(employee?.basic) +
                    Number(employee?.allowances)
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {employee.role === "teacher" && employee.teacherEmployee
                          ? `${employee.teacherEmployee.firstName} ${employee.teacherEmployee.lastName}`
                          : employee.role === "accountant" && employee.accountantEmployee
                            ? `${employee.accountantEmployee.firstName} ${employee.accountantEmployee.lastName}`
                            : "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">
                        Rs. {Number(employee.basic).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        Rs. {Number(employee.allowances).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {(() => {
                          const statusInfo = getRoleAction(employee.role);
                          return (
                            <span
                              className={`inline-flex px-3 py-1 rounded-full text-xs font-medium  ${statusInfo.bgColor} ${statusInfo.textColor}`}
                            >
                              {statusInfo.label}
                            </span>
                          );
                        })()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {employee.creator?.firstName} {employee.creator?.lastName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-600">
                        Rs. {Number(totalSalary).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            className="text-blue-400 hover:text-gray-600"
                            onClick={() => onEditSalary(employee)}
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            className="text-red-400 hover:text-gray-600"
                            onClick={() => onDeleteSalary(employee.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
