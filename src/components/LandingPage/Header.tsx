import { type FC } from 'react';
import logo from '../../assets/logo without bg and with text.png';
import { useNavigate } from 'react-router-dom';

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-2">
          <div className="flex items-center">
            <img src={logo} alt="logo" className="w-48 h-auto" />
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-black hover:text-purple">Home</a>
            <a href="/" className="text-black hover:text-purple">Overview</a>
            <a href="/terms&conditions" className="text-black hover:text-purple">Terms & Conditions</a>
            <a href="/privacy-policy" className="text-black hover:text-purple">Privacy Policy</a>
          </nav>
          <div className='space-x-4'>
            <button
              onClick={() => navigate('/login')}
              className="bg-white text-[#5D3FD3] font-bold border border-[#5D3FD3] px-6 py-2 cursor-pointer rounded-lg hover:bg-gray-100 transition-all shadow-lg"
            >
              Login
            </button>
            <button className="bg-[#5D3FD3] text-white font-bold px-6 py-2 rounded-lg hover:bg-[#5D3FD3] transition-colors"
              onClick={() => navigate('/admin')}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;