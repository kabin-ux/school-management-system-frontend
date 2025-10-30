import React, { useEffect, useState } from 'react';
import { Mail, Lock } from 'lucide-react';
import { FaApple, FaGooglePlay } from 'react-icons/fa';
import MobileAppMockups from '../../../components/LandingPage/MobileAppMockups';
import { useNavigate } from 'react-router-dom';
import { useAuthUser, useLoginAdmin,  useSendPasswordResetMailAdmin } from '../../../hooks/useAuth';
import toast from 'react-hot-toast';

const AdminLoginPage: React.FC = () => {
    const loginMutation = useLoginAdmin();
    const resetMutation = useSendPasswordResetMailAdmin();

    const { data: user, isLoading } = useAuthUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const [showResetDialog, setShowResetDialog] = useState(false);
    const [resetEmail, setResetEmail] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/admin/dashboard');
        }
    }, [user])

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        loginMutation.mutate({ email, password, rememberMe });
    }

    const handlePasswordReset = () => {
        if (!resetEmail) {
            toast.error("Please enter your email");
            return;
        }

        resetMutation.mutate(
            { email: resetEmail }, {
            onSuccess: () => {
                setShowResetDialog(false);
                setResetEmail("");
            },
        }
        );
    };

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
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-2">
                                School Email ID
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Superaddress@email.com"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
                                    required
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none"
                                    required
                                />
                                <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                            </div>
                        </div>
                        {loginMutation.isError && <p className="text-red-500 text-sm">{loginMutation.isError}</p>}
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center text-sm text-gray-500'>
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className='mr-2 h-4 w-4 text-lime-400 border-gray-300 rounded focus:ring-lime-400'
                                />
                                Remember Me
                            </label>
                        </div>
                        <div className="text-right">
                            <button
                                type="button"
                                onClick={() => setShowResetDialog(true)}
                                className="text-sm text-lime-600 hover:underline"
                            >
                                Forgot Password?
                            </button>
                        </div>
                        <a href="#" className='text-sm text-[#CBD72B] hover:underline'>Forgot Password</a>
                        <button
                            type="submit"
                            disabled={loginMutation.isPending}
                            className="w-full bg-[#E6F242] text-white py-3 rounded-lg font-semibold hover:bg-[#dbe465] transition-colors"
                        >
                            {isLoading ? "Logging in..." : "Login"}
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

            {/* Reset Password Dialog */}
            {showResetDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-lg font-semibold mb-4">Reset Password</h2>
                        <input
                            type="email"
                            value={resetEmail}
                            onChange={(e) => setResetEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-lime-400 focus:outline-none mb-4"
                        />
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowResetDialog(false)}
                                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handlePasswordReset}
                                className="px-4 py-2 rounded-lg bg-[#E6F242] text-white font-semibold hover:bg-[#dbe465]"
                            >
                                Send Reset Link
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
};

export default AdminLoginPage;