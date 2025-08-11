import type { LucideIcon } from 'lucide-react';
import React from 'react';

interface LoginCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  buttonText: string;
}

const LoginCard: React.FC<LoginCardProps> = ({ icon: Icon, title, description, buttonText }) => {
  return (
    <div className="bg-white px-8 py-16 rounded-3xl hover:shadow-lg transition-shadow border-[#CBD72B] border-2 cursor-pointer">
      <div className="w-16 h-16 bg-[#CBD72B] rounded-lg flex items-center justify-center mx-auto mb-4">
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6">
        {description}
      </p>
      <button className="w-full bg-[#CBD72B] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#A8B122] transition-colors">
        {buttonText}
      </button>
    </div>
  );
};

export default LoginCard;