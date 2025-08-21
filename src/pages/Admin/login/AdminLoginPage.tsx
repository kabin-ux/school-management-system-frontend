import React from 'react';
import { Mail, Lock } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import MobileAppMockups from '../../../components/MobileAppMockups';

const AdminLoginPage: React.FC = () => {
    return (
        <section className="min-h-screen bg-gray-50 flex">
            {/* Left Side - Login Form */}
            <div className="w-1/3 bg-white p-12 flex flex-col justify-center">
                <div className="max-w-sm mx-auto w-full">
                    {/* Logo */}
                    <div className="mb-8">
                        <div className="bg-[#E6F242] text-white px-6 py-3 rounded-lg text-center font-bold text-lg mb-4">
                            LOGO
                        </div>
                        <h1 className="text-3xl text-center font-bold text-gray-900 mb-2">EDU SANSTHA</h1>
                        <p className="text-gray-600 text-center font-semibold">Login as Admin</p>
                    </div>

                    {/* Login Form */}
                    <form className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                School Email ID
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Superaddress@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
                                />
                                <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
                                />
                                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#E6F242] text-white py-3 rounded-lg font-semibold hover:bg-[#dbe465] transition-colors"
                        >
                            Login Now
                        </button>

                        <div className="text-center">
                            <span className="text-gray-400 text-sm">OR</span>
                        </div>

                        <button
                            type="button"
                            className="w-full border border-[#E6F242] text-[#E6F242] py-3 rounded-lg font-semibold hover:bg-lime-50 transition-colors"
                        >
                            Signup Now
                        </button>
                    </form>
                </div>
            </div>

            {/* Right Side - Mobile Mockups and Download Section */}
            <div className="w-2/3 bg-gradient-to-b from-white from-20%  to-[#CBD72B] relative overflow-hidden">
                {/* Header Navigation */}
                <div className="absolute top-6 right-8 z-20">
                    <nav className="flex space-x-8 text-[#CBD72B]">
                        <a href="/" className="hover:text-[#dbe465]">Home</a>
                        <a href="#" className="hover:text-[#dbe465]">Overview</a>
                        <a href="#" className="hover:text-[#dbe465]">Testimonials</a>
                        <a href="#" className="hover:text-[#dbe465]">FAQ</a>
                        <button className="bg-lime-300 text-lime-800 px-6 py-2 rounded-full font-semibold">
                            Download
                        </button>
                    </nav>
                </div>

                {/* Mobile Mockups */}
                <div className='flex justify-center items-center mt-48'>
                    <MobileAppMockups />
                </div>
                {/* Download Section */}
                <div className="absolute bottom-16 left-0 right-0 text-center text-white">
                    <h2 className="text-4xl font-bold mb-4">Download The Education App</h2>
                    <p className="text-lg mb-8 opacity-90">Register and start ordering in less than 2 minutes</p>

                    <div className="flex justify-center space-x-4">
                        <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
                            <span className="text-white font-bold text-xs"><FaGooglePlay className='w-8 h-8' /></span>
                            <div className="text-left">
                                <div className="text-xs opacity-75">GET IT ON</div>
                                <div className="font-semibold">Google Play</div>
                            </div>
                        </button>
                        <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center space-x-3 hover:bg-gray-800 transition-colors">
                            <span className="text-white font-bold text-xs"><FaApple className='w-8 h-8' /></span>
                            <div className="text-left">
                                <div className="text-xs opacity-75">Download on the</div>
                                <div className="font-semibold">App Store</div>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLoginPage;