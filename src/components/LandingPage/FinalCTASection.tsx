import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../../assets/logo onlt with out bg.png';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#5D3FD3] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Top Wave Decoration */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C50.7,56.35,123.32,66.67,204.17,66.67A502.6,502.6,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-white p-2 rounded-xl">
            <img src={logo} alt="Gurukul Setu" className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-extrabold tracking-tighter uppercase">Gurukul Setu</h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {/* Column 1 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Company Info</h4>
            <ul className="space-y-4 text-sm text-purple-100 opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Echo System</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plans</a></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Users</h4>
            <ul className="space-y-4 text-sm text-purple-100 opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">School Admin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Accountants</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Students & Teachers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Parents</a></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Login & Signup</h4>
            <ul className="space-y-4 text-sm text-purple-100 opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">SETUSuperAdmin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SETUAdmin</a></li>
              <li><a href="#" className="hover:text-white transition-colors">SETUAccounts</a></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-bold mb-6 text-lg">Availability</h4>
            <ul className="space-y-4 text-sm text-purple-100 opacity-80">
              <li><a href="#" className="hover:text-white transition-colors">IOS & Android</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Watch a Demo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Web Portals</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Websites</a></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold mb-6 text-lg">Get In Touch</h4>
            <ul className="space-y-5 text-sm text-purple-100 opacity-80">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 shrink-0" />
                <span>977-9782367262</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 shrink-0" />
                <span>4517 Washington Ave. Manchester, Kentucky 39495</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 shrink-0" />
                <span>nepfinitytechnologies@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center lg:text-left">
          <p className="text-xs text-purple-100 opacity-70 leading-relaxed max-w-5xl">
            A complete digital education platform designed to connect schools, parents, teachers, and students—making academic management
            smarter, faster, and more transparent. By centralizing complex administrative tasks into a single, high-performance interface, we eliminate
            data silos and empower leadership with real-time insights to drive institutional growth.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;