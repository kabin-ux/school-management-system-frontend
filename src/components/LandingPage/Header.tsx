import { type FC } from 'react';
import logo from '../../assets/logo onlt with out bg.png';

const Header: FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-24 h-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-[#CBD72B] hover:text-[#A8B122]">Home</a>
            <a href="#" className="text-[#CBD72B] hover:text-[#A8B122]">Overview</a>
            <a href="/terms&conditions" className="text-[#CBD72B] hover:text-[#A8B122]">Terms & Conditions</a>
            <a href="/privacy-policy" className="text-[#CBD72B] hover:text-[#A8B122]">Privacy Policy</a>
          </nav>
          <button className="bg-[#CBD72B] text-white font-bold px-6 py-2 rounded-full hover:bg-[#A8B122] transition-colors">
            Get Started
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;