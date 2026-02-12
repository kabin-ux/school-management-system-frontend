import { useEffect, useState } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Assets
import logo from '../assets/logo onlt with out bg.png';
import image from '../assets/setuparent.png';
import Header from '../components/LandingPage/Header';

// Hooks
import {
    useAuthUser,
    useLoginSuperAdmin,
    useLoginAdmin,
    useLoginAccountant
} from '../hooks/useAuth';

const LoginPortal = () => {
    const navigate = useNavigate();
    const { data: user } = useAuthUser(); // Check if user is already logged in

    // Authentication Mutations
    const loginSuperAdmin = useLoginSuperAdmin();
    const loginAdmin = useLoginAdmin();
    const loginAccountant = useLoginAccountant();

    // Local State
    const [activeTab, setActiveTab] = useState('SUPER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    useEffect(() => {
        const savedRememberMe = localStorage.getItem("rememberMe") === "true";
        if (savedRememberMe) {
            setRememberMe(true);
            const savedEmail = localStorage.getItem("rememberedEmail");
            const savedPassword = localStorage.getItem("rememberedPassword");
            const savedRole = localStorage.getItem("rememberedRole");

            if (savedEmail) setEmail(savedEmail);
            if (savedPassword) setPassword(savedPassword);
            if (savedRole) setActiveTab(savedRole);
        }
    }, []);

    const handleLoginSuccess = (role: string) => {
        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password); // Note: Encoding this is safer, but this follows your flow
            localStorage.setItem("rememberedRole", activeTab);
            localStorage.setItem("rememberMe", "true");
        } else {
            // If they login without rememberMe, clear existing saved credentials
            localStorage.removeItem("rememberedEmail");
            localStorage.removeItem("rememberedPassword");
            localStorage.removeItem("rememberedRole");
            localStorage.removeItem("rememberMe");
        }

        // Navigate based on role
        const routes: Record<string, string> = {
            SUPER: "/super-admin/dashboard",
            ADMIN: "/admin/dashboard",
            ACCOUNTS: "/accountant/dashboard"
        };
        navigate(routes[role]);
    };

    const roles = [
        { id: 'SUPER', label: 'SETU SUPER', placeholderEmail: 'setusuper@gmail.com' },
        { id: 'ADMIN', label: 'SETU ADMIN', placeholderEmail: 'setuadmin@gmail.com' },
        { id: 'ACCOUNTS', label: 'SETU ACCOUNTS', placeholderEmail: 'setuaccount@gmail.com' },
    ];

    const currentRole = roles.find(r => r.id === activeTab);

    // Handle existing session redirect
    useEffect(() => {
        if (user) {
            if (activeTab === 'SUPER') navigate('/super-admin/dashboard');
            else if (activeTab === 'ADMIN') navigate('/admin/dashboard');
            else if (activeTab === 'ACCOUNTS') navigate('/accountant/dashboard');
        }
    }, [user, activeTab, navigate]);

    // Handle Form Submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Create the base data
        const loginData = { email, password };

        if (activeTab === 'SUPER') {
            loginSuperAdmin.mutate({ ...loginData, rememberMe }, {
                onSuccess: () => {
                    handleLoginSuccess('SUPER')
                    navigate("/super-admin/dashboard")
                }
            });
        } else if (activeTab === 'ADMIN') {
            loginAdmin.mutate({ ...loginData, rememberMe }, {
                onSuccess: () => {
                    handleLoginSuccess('ADMIN')
                    navigate("/admin/dashboard")
                }
            });
        } else if (activeTab === 'ACCOUNTS') {
            loginAccountant.mutate({ ...loginData, rememberMe }, {
                onSuccess: () => {
                    handleLoginSuccess('ACCOUNTS')
                    navigate("/accountant/dashboard")
                }
            });
        }
    };

    // Determine loading state for button
    const isLoggingIn = loginSuperAdmin.isPending || loginAdmin.isPending || loginAccountant.isPending;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4 font-sans relative overflow-hidden">
            {/* Header */}
            <div className="w-full max-w-7xl z-30">
                <Header />
            </div>

            {/* Decorative Background Blobs */}
            <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-3xl rounded-full" style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 40%' }}></div>
            <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-indigo-600 opacity-20 blur-3xl rounded-full" style={{ borderRadius: '60% 40% 30% 70% / 50% 40% 40% 60%' }}></div>

            <div className="flex-1 flex flex-col items-center justify-center w-full z-10 py-8">
                {/* Page Title */}
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Login Your Account</h1>
                    <p className="text-slate-500 mt-3 max-w-md mx-auto">
                        Choose your role and login into your website portal and start managing.
                    </p>
                    <div className="w-16 h-1.5 bg-red-500 mx-auto mt-5 rounded-full"></div>
                </div>

                {/* Main Card */}
                <div className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-6xl overflow-hidden border border-white flex flex-col">

                    {/* Role Tab Navigation */}
                    <div className="bg-gray-100 p-2 m-8 mb-4 rounded-2xl flex gap-2">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => {
                                    setActiveTab(role.id);
                                    if (!rememberMe) { // Only clear if not remembering
                                        setEmail('');
                                        setPassword('');
                                    }
                                }}
                                className={`flex-1 py-4 text-sm font-bold rounded-xl transition-all duration-300 transform active:scale-95 ${activeTab === role.id ? 'bg-[#5D3FD3] text-white shadow-lg' : 'text-gray-400 hover:bg-gray-200 hover:text-gray-600'
                                    }`}
                            >
                                {role.label}
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row p-8 pt-4 gap-12">
                        {/* Left Side: Dynamic Login Form */}
                        <div className="w-full md:w-[38%] bg-gradient-to-br from-[#5D3FD3] via-[#5D3FD3] to-indigo-900 rounded-[2rem] p-10 text-white shadow-xl">
                            <div className="flex flex-col items-center text-center mb-10">
                                <div className="bg-white p-4 rounded-2xl mb-5 shadow-lg">
                                    <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">GURUKUL-SETU SMS</h2>
                                <p className="text-indigo-200 text-[10px] mt-2 uppercase tracking-[0.2em] font-semibold">
                                    Login as SETU-{activeTab}
                                </p>
                            </div>

                            <form className="space-y-6" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <label className="text-xs font-semibold ml-1 opacity-80 uppercase tracking-wider">
                                        {currentRole?.label} Email
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={currentRole?.placeholderEmail}
                                            className="w-full bg-white/10 border border-white/20 text-white px-5 py-4 rounded-2xl text-sm focus:outline-none focus:bg-white/20 transition-all"
                                            required
                                        />
                                        <div className="absolute right-0 top-0 h-full w-12 bg-blue-500 rounded-r-2xl flex items-center justify-center">
                                            <Mail size={18} className="text-white" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-semibold ml-1 opacity-80 uppercase tracking-wider">Password</label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Enter your password"
                                            className="w-full bg-white/10 border border-white/20 text-white px-5 py-4 rounded-2xl text-sm focus:outline-none focus:bg-white/20 transition-all placeholder:text-white/40"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-0 h-full w-12 bg-blue-500 rounded-r-2xl flex items-center justify-center hover:bg-blue-400 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} className="text-white" /> : <Eye size={18} className="text-white" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2 ml-1">
                                    <input
                                        type="checkbox"
                                        id="remember"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="rounded border-white/20 bg-white/10"
                                    />
                                    <label htmlFor="remember" className="text-xs opacity-80 cursor-pointer">
                                        Remember Me
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoggingIn}
                                    className="w-full bg-blue-500 hover:bg-blue-400 py-4 rounded-2xl font-bold text-lg shadow-xl transition-all transform hover:-translate-y-1 active:scale-[0.98] mt-4 disabled:opacity-70"
                                >
                                    {isLoggingIn ? "Logging in..." : "Login Now"}
                                </button>
                            </form>
                        </div>

                        {/* Right Side: App Showcase */}
                        <div className="w-full md:w-[62%] flex flex-col items-center justify-center relative py-6">
                            <div className="relative w-full max-w-lg flex justify-center animate-float">
                                <img src={image} alt="Edu-Setu App Showcase" className="w-full h-auto drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)] object-contain" />
                            </div>

                            <div className="text-center mt-10">
                                <h3 className="text-2xl font-extrabold text-slate-800">Download The Edu-Setu App</h3>
                                <p className="text-slate-500 text-sm mt-2">Register and start Managing in less than 2 minutes.</p>
                                <div className="flex gap-4 mt-8 justify-center">
                                    <button className="bg-black text-white px-6 py-2 rounded-xl flex items-center gap-3 transition-transform hover:scale-105">
                                        <div className="text-left leading-tight">
                                            <p className="text-[10px] uppercase opacity-70">Get it on</p>
                                            <p className="text-lg font-bold">Google Play</p>
                                        </div>
                                    </button>
                                    <button className="bg-black text-white px-6 py-2 rounded-xl flex items-center gap-3 transition-transform hover:scale-105">
                                        <div className="text-left leading-tight">
                                            <p className="text-[10px] uppercase opacity-70">Download on the</p>
                                            <p className="text-lg font-bold">App Store</p>
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style>
                {`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                }
                .animate-float {
                    animation: float 5s ease-in-out infinite;
                }
            `}
            </style>
        </div>
    );
};

export default LoginPortal;