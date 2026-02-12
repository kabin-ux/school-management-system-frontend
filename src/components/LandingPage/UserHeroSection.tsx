import React from 'react';
import { PlayCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import schoolGirl from '../../assets/schoolgirl.png';

const UserHeroSection: React.FC = () => {
    const navigate = useNavigate();

    return (
        <section className="relative bg-[#5D3FD3] min-h-[600px] flex items-center overflow-hidden">
            {/* Background Decorative Waves (Simplified SVG or use an image) */}
            <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <path d="M0 50 C 20 40, 40 60, 100 30" stroke="white" fill="transparent" strokeWidth="0.5" />
                    <path d="M0 60 C 30 50, 60 70, 100 40" stroke="white" fill="transparent" strokeWidth="0.5" />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10 py-20">

                {/* Left Content */}
                <div className="text-white">
                    <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                        Empowering Partnered Schools <br />
                        With Smarter Management
                    </h1>

                    <p className="text-purple-100 text-xl mb-10 max-w-lg leading-relaxed opacity-90">
                        Connect administrators, teachers, students, and parents with one
                        intelligent platform.
                    </p>

                    <div className="flex flex-wrap items-center gap-4 mb-10">
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-white text-[#5D3FD3] font-bold px-10 py-4 cursor-pointer rounded-xl hover:bg-gray-100 transition-all shadow-lg"
                        >
                            Get Started
                        </button>

                        <button className="flex items-center gap-2 text-white font-semibold px-6 py-4 cursor-pointer hover:opacity-80 transition-opacity">
                            <PlayCircle className="w-8 h-8" />
                            <span>Watch Video</span>
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="flex -space-x-3">
                            {/* Replace these with actual images from your assets */}
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 overflow-hidden">
                                <img src="https://via.placeholder.com/40" alt="user" />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400 overflow-hidden">
                                <img src="https://via.placeholder.com/40" alt="user" />
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-500 overflow-hidden">
                                <img src="https://via.placeholder.com/40" alt="user" />
                            </div>
                        </div>
                        <span className="text-sm font-medium text-purple-100">500+ Downloads</span>
                    </div>
                </div>

                {/* Right Content - Hero Image */}
                <div className="relative flex justify-center lg:justify-end">
                    {/* Abstract colorful shapes behind the girl */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] pointer-events-none">
                        <div className="absolute top-10 right-10 w-24 h-24 bg-orange-400 rounded-full blur-2xl opacity-60"></div>
                        <div className="absolute bottom-10 left-10 w-32 h-32 bg-red-500 rounded-full blur-3xl opacity-40"></div>
                    </div>

                    {/* Main Image */}
                    <img
                        src={schoolGirl}
                        alt="Student with books"
                        className="relative z-10 w-full max-w-lg object-contain"
                    />
                </div>
            </div>
        </section>
    );
};

export default UserHeroSection;