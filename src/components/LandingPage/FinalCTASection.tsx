import React, { memo } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';
import logo from '../../assets/logo onlt with out bg.png';

// Memoize to prevent unnecessary re-renders
const Footer: React.FC = memo(() => {

  const footerLinks = [
    {
      title: "Company Info",
      links: ["About Us", "Echo System", "Features", "Plans"],
    },
    {
      title: "Users",
      links: ["School Admin", "Accountants", "Students & Teachers", "Parents"],
    },
    {
      title: "Login & Signup",
      links: ["SETUSuperAdmin", "SETUAdmin", "SETUAccounts"],
    },
    {
      title: "Availability",
      links: ["IOS & Android", "Watch a Demo", "Web Portals", "Websites"],
    },
  ];

  return (
    <footer className="bg-[#5D3FD3] text-white pt-20 pb-12 relative overflow-hidden">
      {/* 1. Static Wave (Removed animation to save CPU cycles) */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] transform rotate-180 opacity-20">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] fill-white">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V46.35C50.7,56.35,123.32,66.67,204.17,66.67A502.6,502.6,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>

      {/* 2. Simplified Entrance Animation */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} // Extremely important for performance
        transition={{ duration: 0.6 }}
        className="max-w-7xl mx-auto px-6 relative z-10"
      >
        {/* Brand Section */}
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-white p-2 rounded-xl shadow-lg">
            <img src={logo} alt="Gurukul Setu" className="w-8 h-8 object-contain" loading="lazy" />
          </div>
          <h2 className="text-2xl font-black tracking-tighter uppercase">Gurukul Setu</h2>
        </div>

        {/* Links Grid - Using standard CSS transitions instead of Framer Motion for links */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          {footerLinks.map((section, idx) => (
            <div key={idx}>
              <h4 className="font-bold mb-5 text-lg tracking-wide">{section.title}</h4>
              <ul className="space-y-3 text-sm">
                {section.links.map((link, linkIdx) => (
                  <li key={linkIdx}>
                    <a
                      href="#"
                      className="text-purple-100/60 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="col-span-2 lg:col-span-1">
            <h4 className="font-bold mb-5 text-lg tracking-wide">Get In Touch</h4>
            <ul className="space-y-4 text-sm text-purple-100/70">
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4 mt-1 shrink-0 text-white" />
                <span>977-9782367262</span>
              </li>
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                <MapPin className="w-4 h-4 mt-1 shrink-0 text-white" />
                <span className="leading-relaxed">Washington Ave. Manchester, KY</span>
              </li>
              <li className="flex items-start gap-3 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4 mt-1 shrink-0 text-white" />
                <span className="break-all">nepfinity@example.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 text-center lg:text-left flex flex-col lg:flex-row justify-between items-center gap-6">
          <p className="text-[11px] text-purple-100/40 italic max-w-2xl">
            A complete digital education platform connecting schools and parents smarter and faster.
          </p>
          <div className="text-[10px] text-purple-100/30 uppercase tracking-widest font-bold">
            © 2026 Nepfinity Technologies
          </div>
        </div>
      </motion.div>
    </footer>
  );
});

export default Footer;