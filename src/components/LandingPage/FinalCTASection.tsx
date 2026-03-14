import React, { memo } from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';
import logo from '../../assets/logo onlt with out bg.png';

const Footer: React.FC = memo(() => {
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Check if the path is a hash link (starts with /# or #)
    const isHashLink = path.startsWith('#') || path.startsWith('/#');

    // Get current location
    const isHomePage = window.location.pathname === '/';

    if (isHashLink && isHomePage) {
      // We are on Home and it's a hash link: prevent reload and scroll smoothly
      e.preventDefault();
      const id = path.replace('/#', '').replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // Else: Let the default link behavior handle the redirect to "/" or "/plans"
  };

  const footerLinks = [
    {
      title: "Company Info",
      links: [
        { name: "About Us", href: "/#about-us" },
        { name: "Echo System", href: "#" },
        { name: "Features", href: "/#features" }, // Hash link for homepage section
        { name: "Plans", href: "/plans" },       // Internal route
      ],
    },
    {
      title: "Users",
      links: [
        { name: "School Admin", href: "#" },
        { name: "Accountants", href: "#" },
        { name: "Students & Teachers", href: "#" },
        { name: "Parents", href: "#" },
      ],
    },
    {
      title: "Login & Signup",
      links: [
        { name: "SETUSuperAdmin", href: "/login" },
        { name: "SETUAdmin", href: "/login" },
        { name: "SETUAccounts", href: "/login" },
      ],
    },
    {
      title: "Availability",
      links: [
        { name: "IOS & Android", href: "#" },
        { name: "Watch a Demo", href: "#" },
        { name: "Web Portals", href: "#" },
        { name: "Websites", href: "#" },
      ],
    },
  ];

  return (
    <footer className="w-full bg-white font-sans">
      {/* Wave Section Header */}
      <div className="relative w-full overflow-hidden leading-[0]">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[120px] md:h-[200px]"
        >
          {/* Layer 1: The solid purple background base */}
          <path
            fill="#6149cd"
            d="M0,190 C320,300 420,50 720,185 C1050,270 1120,50 1440,190 V320 H0 Z"
          />

          {/* Layer 2: The white "negative space" wave line */}
          <path
            fill="none"
            stroke="#ffffff"
            strokeWidth="52"
            d="M0,130 C320,270 420,20 720,130 C1020,240 1120,20 1440,130"
          />

          {/* Layer 3: The top purple "ribbon" border */}
          <path
            fill="none"
            stroke="#6149cd"
            strokeWidth="52"
            d="M-10,105 C320,245 420,-50 720,105 C1020,215 1120,-50 1450,110"
          />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="bg-[#6149cd] text-white px-8 md:px-16 lg:px-24 pb-12">
        <div className="max-w-7xl mx-auto">

          {/* Brand Identity */}
          <div className="flex items-center gap-4 mb-16">
            <div className="bg-white p-2 rounded-xl shadow-lg">
              <img
                src={logo}
                alt="Gurukul Setu"
                className="w-10 h-10 object-contain"
                onError={(e) => (e.currentTarget.src = "https://via.placeholder.com/40")}
              />
            </div>
            <h2 className="text-4xl font-bold tracking-wider uppercase">Gurukul Setu</h2>
          </div>

          {/* Navigation Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
            {footerLinks.map((section, idx) => (
              <div key={idx}>
                <h4 className="font-bold text-[16px] mb-6">{section.title}</h4>
                <ul className="space-y-4 text-[14px] font-medium opacity-90">
                  {section.links.map((link, linkIdx) => (
                    <li key={linkIdx}>
                      {/* Use 'a' for hash links/external and 'Link' for app routes */}
                      <a href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="hover:text-white/70 transition-colors">
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Contact Column */}
            <div>
              <h4 className="font-bold text-[16px] mb-6">Get In Touch</h4>
              <ul className="space-y-5 text-[13px] font-medium">
                <li className="flex items-center gap-3">
                  <Phone size={18} fill="white" className="text-[#6149cd]" />
                  <span>+977-9817788454</span>
                </li>
                <li className="flex items-start gap-3 leading-tight">
                  <MapPin size={18} fill="white" className="text-[#6149cd] shrink-0 mt-0.5" />
                  <span>New Baneshwor, Kathmandu</span>
                </li>
                <li className="flex items-center gap-3 whitespace-nowrap">
                  <Mail size={18} fill="white" className="text-[#6149cd] shrink-0" />
                  <span>gurukulsetu@nepfinitytechnologies.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Legal / Description Footer */}
          <div className="pt-10 border-t border-white/40">
            <p className="text-[14px] leading-relaxed opacity-80 font-light">
              A complete digital education platform designed to connect schools, parents, teachers, and students—making academic management
              smarter, faster, and more transparent. By centralizing complex administrative tasks into a single, high-performance interface, we eliminate
              data silos and empower leadership with real-time insights to drive institutional growth.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;