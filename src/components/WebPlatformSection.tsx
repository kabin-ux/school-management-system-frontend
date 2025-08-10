import React from 'react';
import { Grid3X3, Shield, Calculator } from 'lucide-react';
import PlatformCard from './PlatformCard';

const WebPlatformSection: React.FC = () => {
  const platforms = [
    {
      icon: Grid3X3,
      title: "Website Based Super Admin Portal",
      description: "Full control center for managing schools, users, system settings, and configurations with powerful analytics and user tracking."
    },
    {
      icon: Shield,
      title: "Website Based Admin Portal",
      description: "Designed for individual schools to manage students, teachers, classes, schedules, attendance, and internal communication easily."
    },
    {
      icon: Calculator,
      title: "Website Based Accountant Portal",
      description: "Secure portal to manage student billing, fee structures, payment tracking, reports, and financial records with full transparency."
    }
  ];

  return (
    <section className="py-16 bg-white-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Discover Web Platform <span className="text-[#CBD72B]">Overview</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Designed for different user roles with tailored interfaces for<br />
            <strong>PRODUCTIVITY EFFICIENCY</strong>
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {platforms.map((platform, index) => (
            <PlatformCard
              key={index}
              icon={platform.icon}
              title={platform.title}
              description={platform.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebPlatformSection;