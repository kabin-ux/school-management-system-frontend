import { MoreHorizontal } from 'lucide-react';

interface UserCardProps {
  name: string;
  role: string;
  email: string;
  permissions: string;
  status: 'Active' | 'Inactive';
  onEdit: () => void;
  onDelete: () => void;
}

export default function UserCard({ name, role, email, permissions, status, onEdit, onDelete }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <span className="text-blue-600 font-semibold text-sm">
              {name.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">{name}</h3>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            status === 'Active' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
          }`}>
            {status}
          </span>
          <button className="text-gray-400 hover:text-gray-600">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="space-y-2 text-sm">
        <div>
          <span className="text-gray-500">Email:</span>
          <p className="text-gray-900">{email}</p>
        </div>
        <div>
          <span className="text-gray-500">Permissions:</span>
          <p className="text-gray-900">{permissions}</p>
        </div>
      </div>
    </div>
  );
}