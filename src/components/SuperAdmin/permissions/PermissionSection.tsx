import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import type { Permission } from '../../../types/permission.types';

interface PermissionSectionProps {
  title: string;
  icon: React.ReactNode;
  permissions: Permission[];
  onPermissionChange: (sectionTitle: string, permissionId: string, enabled: boolean) => void;
}

export default function PermissionSection({ title, icon, permissions, onPermissionChange }: PermissionSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="text-blue-600">
            {icon}
          </div>
          <span className="font-medium text-gray-900">{title}</span>
        </div>
        {isExpanded ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronRight className="w-4 h-4 text-gray-500" />
        )}
      </button>
      
      {isExpanded && (
        <div className="p-4 space-y-3">
          {permissions.map((permission) => (
            <div key={permission.id} className="flex items-start gap-3">
              <input
                type="checkbox"
                id={permission.id}
                checked={permission.enabled}
                onChange={(e) => onPermissionChange(title, permission.id, e.target.checked)}
                className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <div className="flex-1">
                <label htmlFor={permission.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {permission.name}
                </label>
                <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}