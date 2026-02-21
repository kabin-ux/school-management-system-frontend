import { useState, type FC } from 'react';
import logo from '../../assets/logo without bg and with text.png';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header: FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);


  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      const targetId = path.replace('#', '');
      const elem = document.getElementById(targetId);
      elem?.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close mobile menu if open
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '#features' },
    { name: 'Testimonials', path: '#testimonials' },
    { name: 'Plans', path: '/plans' },
    { name: 'Request A Demo', path: '#demo' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300d bg-white/90 backdrop-blur-md shadow-lg py-3`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo with slight entrance animation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center flex-shrink-0"
          >
            <img
              src={logo}
              alt="logo"
              className={`w-40 md:w-44 h-auto cursor-pointer transition-all `}
              onClick={() => navigate('/')}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className={`relative font-semibold text-sm tracking-wide transition-colors group text-gray-700 hover:text-[#5D3FD3]`}
                onClick={(e) => scrollToSection(e, link.path)} // Add the click handler
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-current transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </nav>

          {/* Desktop Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center space-x-4"
          >
            <button
              onClick={() => navigate('/login')}
              className={`font-bold px-6 py-2.5 rounded-xl  border text-[#5D3FD3] border-[#5D3FD3] hover:shadow-[0_10px_20px_-5px_rgba(93,63,211,0.4)] transition-all`}
            >
              Login
            </button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/admin')}
              className="bg-[#5D3FD3] text-white font-bold px-7 py-2.5 rounded-xl hover:shadow-[0_10px_20px_-5px_rgba(93,63,211,0.4)] transition-all"
            >
              Register
            </motion.button>
          </motion.div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none transition-colors text-gray-900`}
            >
              {isOpen ? <X size={30} /> : <Menu size={30} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown with AnimatePresence */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white overflow-hidden shadow-2xl border-t border-gray-100"
          >
            <div className="px-6 pt-4 pb-10 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block py-4 text-lg font-bold text-gray-800 border-b border-gray-50 active:text-[#5D3FD3]"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-6 flex flex-col space-y-4">
                <button
                  onClick={() => navigate('/login')}
                  className="w-full text-[#5D3FD3] font-bold border-2 border-[#5D3FD3] px-6 py-4 rounded-2xl"
                >
                  Login
                </button>
                <button
                  onClick={() => navigate('/admin')}
                  className="w-full bg-[#5D3FD3] text-white font-bold px-6 py-4 rounded-2xl shadow-lg"
                >
                  Register
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;