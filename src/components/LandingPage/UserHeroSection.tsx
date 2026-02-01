import React from 'react';
import { CirclePlay } from 'lucide-react';
import HeroMockup from './HeroMockup';
import PartnerLogos from './PartnerLogos';
import { useNavigate } from 'react-router-dom';

const UserHeroSection: React.FC = () => {
    const navigate = useNavigate();
    return (
        <>
            <section className="bg-gradient-to-b from-white from-30% via-white/20 via-20% to-[#CBD72B] pt-8 pb-8 rounded-b-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
                    <div className="flex gap-12 items-center">
                        <div>
                            <h1 className="text-4xl md:text-5xl font-bold text-[#A7AE45] mb-6 leading-tight">
                                Empowering Partnered Schools
                                With <span className="text-[#E7F15E]">Smart Management</span>
                            </h1>
                            <p className="text-[#A7AE45] text-lg mb-8 opacity-90">
                                Connect administrators, teachers, students, and parents with one<br />
                                intelligent platform.
                            </p>

                            <div className="flex items-center space-x-4 mb-8">
                                <button className="bg-[#CBD72B] text-white font-semibold text-xl px-8 py-3 rounded-xl hover:bg-[#A8B122] transition-colors"
                                onClick={() => navigate('/admin')}
                                >
                                    Get Started
                                </button>
                                <button className="bg-white text-lime-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors flex items-center space-x-2">
                                    <CirclePlay className="w-6 h-6" />
                                    <span>Watch Video</span>
                                </button>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="flex -space-x-2">
                                    <div className="w-8 h-8 bg-orange-400 rounded-full border-2 border-white"></div>
                                    <div className="w-8 h-8 bg-blue-400 rounded-full border-2 border-white"></div>
                                    <div className="w-8 h-8 bg-purple-400 rounded-full border-2 border-white"></div>
                                </div>
                                <span className="text-[#888888] text-sm">1000+ Downloads</span>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <HeroMockup />
                        </div>
                    </div>

                </div>
            </section>
            <PartnerLogos />
        </>
    );
};

export default UserHeroSection;