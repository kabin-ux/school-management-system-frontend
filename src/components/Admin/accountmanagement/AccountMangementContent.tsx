import React from 'react';
import { Users, FileText, Landmark } from 'lucide-react';
import type { Accountant } from '../../../features/accountantSlice';
import EmptyState from '../../../common/EmptyState';

// interface Accountant {
//   id: string | number;
//   name: string;
//   email: string;
//   status: "Active" | "On Leave";
//   lastModified: string;
//   permissions: {
//     category: string;
//     iconColor: string;
//     items: {
//       label: string;
//       description: string;
//       assigned: boolean;
//     }[];
//   }[];
// }

interface AccountantManagementContentProps {
  accountantBySchool: Accountant[];
  onEdit: (accountant: Accountant) => void;
  onRemove?: (id: string | number) => void;
}

export const AccountantManagementContent: React.FC<AccountantManagementContentProps> = ({
  accountantBySchool,
  onEdit,
  onRemove,
}) => {

  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Total Accountants</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {accountantBySchool.length} out of {accountantBySchool.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">On Leave</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {/* {accountantBySchool?.filter((a) => a.status === "On Leave").length} */}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Accountants Grid */}
      <div className='bg-gray-50'>

        {
          !accountantBySchool || accountantBySchool.length === 0 ? (
            <EmptyState
              title='No Accountants found'
              description='There are currently no accounts added to this school. Click on button above to add an accountant'
              icon={<Landmark className='w-14 h-14' />}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {accountantBySchool?.map((acct) => (
                <div
                  key={acct.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{acct.firstName} {acct.lastName}</h3>
                        <p className="text-sm text-gray-600">Accountant</p>
                        <p className="text-xs text-gray-500">{acct.email}</p>
                        <p className="text-xs text-gray-500">
                          Last modified: {acct?.updatedAt ? new Date(acct.updatedAt).toLocaleString() : "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${acct.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                          }`}
                      >
                        {acct.status}
                      </span>
                      <button
                        className="text-blue-500 hover:text-blue-700"
                        onClick={() => onEdit?.(acct)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => onRemove?.(acct.id)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      {acct.permissions?.reduce(
                        (sum, cat) =>
                          sum + cat.items.filter((i) => i.assigned).length,
                        0
                      )}{" "}
                      /{" "}
                      {acct.permissions?.reduce(
                        (sum, cat) => sum + cat.items.length,
                        0
                      )}{" "}
                      permissions assigned
                    </p>
                  </div>

                  {/* Permissions */}
                  <div className="space-y-4">
                    {acct.permissions?.map((cat, idx) => (
                      <div key={idx} className="border-t border-gray-300 pt-3">
                        <div className="flex items-center gap-2 mb-2">
                          <FileText
                            className={`w-4 h-4 ${cat.iconColor}`}
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {cat.category}
                          </span>
                        </div>

                        <div className="ml-6 space-y-2">
                          {cat.items.map((perm, i) => (
                            <div key={i} className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                defaultChecked={perm.assigned}
                                className="rounded border-gray-300"
                              />
                              <div>
                                <p className="text-sm font-medium text-gray-900">
                                  {perm.label}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {perm.description}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    {/* <div className="flex gap-2 pt-4">
                    <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                      Restore Default
                    </button>
                    <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                      Save changes
                    </button>
                  </div> */}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};
