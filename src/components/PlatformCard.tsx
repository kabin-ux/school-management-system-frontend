import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface PlatformCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

const PlatformCard: React.FC<PlatformCardProps> = ({ icon: Icon, title, description }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-sm border-[#CBD72B] border-2 hover:shadow-lg transition-shadow items-left text-left cursor-pointer">
      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mx-auto mb-6">
        <Icon className="w-16 h-16 text-[#CBD72B]" />
      </div>
      <h3 className="text-xl font-semibold text-[#CBD72B] mb-4 text-center leading-tight">
        {title}
      </h3>
      <p className="text-gray-600 text-left leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default PlatformCard;