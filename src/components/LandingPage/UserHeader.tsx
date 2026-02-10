import React from 'react';
import { Droplets } from 'lucide-react';

const UserHeader: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Droplets className="w-8 h-8 text-lime-500" />
            <span className="ml-2 text-xl font-bold text-gray-800">NAME</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-gray-600 hover:text-lime-500 font-medium">Home</a>
            <a href="#" className="text-gray-600 hover:text-lime-500 font-medium">Features</a>
             <a href="/terms&conditions" className="text-[#CBD72B] hover:text-[#A8B122]">Terms & Conditions</a>
            <a href="/privacy-policy" className="text-[#CBD72B] hover:text-[#A8B122]">Privacy Policy</a>
          </nav>
          <button className="bg-lime-500 text-white px-6 py-2 rounded-full hover:bg-lime-600 transition-colors font-medium">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default UserHeader;