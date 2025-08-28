import React from 'react';
import { Plus } from 'lucide-react';

interface AccountantManagementHeaderProps {
  onAddAccountant: () => void;
}

export const AccountantManagementHeader: React.FC<AccountantManagementHeaderProps> = ({ onAddAccountant }) => {
  return (
    <div className="flex justify-between items-start mb-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Accountant Management</h1>
        <p className="text-gray-600">Organize and manage Accountant efficiently</p>
      </div>
      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        onClick={onAddAccountant}
      >
        <Plus className="w-4 h-4" />
        Add Accountant
      </button>
    </div>
  );
};