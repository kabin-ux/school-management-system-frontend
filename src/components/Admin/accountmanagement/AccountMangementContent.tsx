import React from 'react';
import { Users, FileText } from 'lucide-react';

export const AccountantManagementContent: React.FC = () => {
  return (
    <div>
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-gray-600 text-sm font-medium">Total Accountants</h3>
              <p className="text-3xl font-bold text-gray-900 mt-1">2 out of 2</p>
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
              <p className="text-3xl font-bold text-gray-900 mt-1">1</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Accountants Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Emma Davis */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Emma Davis</h3>
                <p className="text-sm text-gray-600">Accountant</p>
                <p className="text-xs text-gray-500">emma.davis@greenwood.edu</p>
                <p className="text-xs text-gray-500">Last modified: 2024-01-15 08:41</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Active</span>
              <button className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">7 / 7 permissions assigned</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Permission Settings</h4>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:text-blue-800">Select All</button>
                  <button className="text-xs text-gray-600 hover:text-gray-800">Clear All</button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fee Management</p>
                    <p className="text-xs text-gray-500">Collect student fees</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fee Collection</p>
                    <p className="text-xs text-gray-500">Collect student fees</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Scholarship Management</p>
                    <p className="text-xs text-gray-500">Manage student scholarship</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Discount Management</p>
                    <p className="text-xs text-gray-500">Apply fee discounts</p>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Financial Records</span>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Expense Records</p>
                        <p className="text-xs text-gray-500">Track school expenses</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payroll Tracking</p>
                        <p className="text-xs text-gray-500">Manage staff payroll</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Invoice Generation</p>
                        <p className="text-xs text-gray-500">Generate financial invoices</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Reporting</span>
                  </div>
                  
                  <div className="ml-6">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Report Downloading</p>
                        <p className="text-xs text-gray-500">Download financial reports</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Restore Default
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save changes
              </button>
            </div>
          </div>
        </div>

        {/* Dior Parow */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Dior Parow</h3>
                <p className="text-sm text-gray-600">Accountant</p>
                <p className="text-xs text-gray-500">parowdior@greenwood.edu</p>
                <p className="text-xs text-gray-500">Last modified: 2024-01-15 08:41</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded">Active</span>
              <button className="text-red-500 hover:text-red-700">Remove</button>
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">6 / 7 permissions assigned</p>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900">Permission Settings</h4>
                <div className="flex gap-2">
                  <button className="text-xs text-blue-600 hover:text-blue-800">Select All</button>
                  <button className="text-xs text-gray-600 hover:text-gray-800">Clear All</button>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fee Management</p>
                    <p className="text-xs text-gray-500">Collect student fees</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Fee Collection</p>
                    <p className="text-xs text-gray-500">Collect student fees</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Scholarship Management</p>
                    <p className="text-xs text-gray-500">Manage student scholarship</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Discount Management</p>
                    <p className="text-xs text-gray-500">Apply fee discounts</p>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-medium text-gray-900">Financial Records</span>
                  </div>
                  
                  <div className="ml-6 space-y-2">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Expense Records</p>
                        <p className="text-xs text-gray-500">Track school expenses</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payroll Tracking</p>
                        <p className="text-xs text-gray-500">Manage staff payroll</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Invoice Generation</p>
                        <p className="text-xs text-gray-500">Generate financial invoices</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-300 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText className="w-4 h-4 text-purple-600" />
                    <span className="text-sm font-medium text-gray-900">Reporting</span>
                  </div>
                  
                  <div className="ml-6">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">Report Downloading</p>
                        <p className="text-xs text-gray-500">Download financial reports</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                Restore Default
              </button>
              <button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};