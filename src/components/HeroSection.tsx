import React from 'react';
import { Download } from 'lucide-react';
import MobileAppMockups from './MobileAppMockups';

const HeroSection: React.FC = () => {
    return (
        <section className="bg-gradient-to-b from-white to-[#CBD72B] pt-16 pb-8 rounded-b-4xl">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center ">
                <h1 className="text-4xl md:text-4xl font-bold text-[#A7AE45] mb-8 leading-tight">
                    Whether you're a <span className="text-[#E7F15E]">student, teacher, or parent</span> — manage<br />
                    your academic journey right from your mobile device.
                </h1>

                <MobileAppMockups />

                <h2 className="text-3xl font-bold text-white mb-6">Download The Education App</h2>

                <div className="flex justify-center space-x-4">
                    <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                        <Download className="w-5 h-5" />
                        <span>Google Play</span>
                    </button>
                    <button className="bg-black text-white px-6 py-3 rounded-lg flex items-center space-x-2 hover:bg-gray-800 transition-colors">
                        <Download className="w-5 h-5" />
                        <span>App Store</span>
                    </button>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;