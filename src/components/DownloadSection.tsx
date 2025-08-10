import React from 'react';
import { Download } from 'lucide-react';

const DownloadSection: React.FC = () => {
  return (
    <section className="bg-gradient-to-br bg-[#CED327] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-4">
          Download The Education App
        </h2>
        <p className="text-white text-lg mb-8 opacity-90">
          Begin your app start collecting to new things and new experience
        </p>
        
        <div className="flex justify-center space-x-4">
          <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
            <Download className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-75">GET IT ON</div>
              <div className="font-semibold">Google Play</div>
            </div>
          </button>
          <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
            <Download className="w-6 h-6" />
            <div className="text-left">
              <div className="text-xs opacity-75">Download on the</div>
              <div className="font-semibold">App Store</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DownloadSection;