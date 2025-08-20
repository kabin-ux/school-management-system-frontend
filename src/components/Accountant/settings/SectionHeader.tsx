import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface SectionHeaderProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  icon: Icon,
  iconColor,
  title,
  description,
  action
}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center">
        <Icon className={`h-5 w-5 ${iconColor} mr-2`} />
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
};
