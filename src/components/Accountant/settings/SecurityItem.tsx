import React from 'react';
import { Lock, Smartphone, Shield, Eye } from 'lucide-react';
import type { SecurityItem as SecurityItemType } from '../../../types/settings.types';

interface SecurityItemProps {
  item: SecurityItemType;
  onAction: (id: string) => void;
}

const iconMap = {
  lock: Lock,
  smartphone: Smartphone,
  shield: Shield,
  eye: Eye
};

const buttonVariantClasses = {
  primary: 'text-blue-600 border-blue-600 hover:bg-blue-50',
  secondary: 'text-gray-600 border-gray-300 hover:bg-gray-50',
  success: 'bg-green-600 text-white hover:bg-green-700',
  danger: 'bg-red-600 text-white hover:bg-red-700'
};

const iconBgClasses = {
  lock: 'bg-blue-100 text-blue-600',
  smartphone: 'bg-green-100 text-green-600',
  shield: 'bg-green-100 text-green-600',
  eye: 'bg-gray-100 text-gray-600'
};

export const SecurityItem: React.FC<SecurityItemProps> = ({ item, onAction }) => {
  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Shield;
  
  return (
    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
      <div className="flex items-center">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 ${iconBgClasses[item.icon as keyof typeof iconBgClasses]}`}>
          <IconComponent className="h-5 w-5" />
        </div>
        <div>
          <h4 className="font-medium text-gray-900">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.description}</p>
        </div>
      </div>
      {item.status ? (
        <span className="text-gray-500 text-sm">{item.status}</span>
      ) : (
        <button 
          onClick={() => onAction(item.id)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            item.buttonVariant === 'success' || item.buttonVariant === 'danger' 
              ? buttonVariantClasses[item.buttonVariant]
              : `border ${buttonVariantClasses[item.buttonVariant]}`
          }`}
        >
          {item.buttonText}
        </button>
      )}
    </div>
  );
};
