import { useEffect, useState, useMemo } from 'react';
import { Mail, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Assets
import logo from '../assets/logo onlt with out bg.png';
import image from '../assets/setuparent.png';
import Header from '../components/LandingPage/Header';
import Footer from '../components/LandingPage/FinalCTASection';
import playStore from '../assets/Play store.png';
import appStore from '../assets/apple store.png';

// Hooks
import {
    useAuthUser,
    useLoginSuperAdmin,
    useLoginAdmin,
    useLoginAccountant
} from '../hooks/useAuth';

const LoginPortal = () => {
    const navigate = useNavigate();
    const { data: user } = useAuthUser();

    // 1. Authentication Mutations
    const loginSuperAdmin = useLoginSuperAdmin();
    const loginAdmin = useLoginAdmin();
    const loginAccountant = useLoginAccountant();

    // 2. Local State
    const [activeTab, setActiveTab] = useState('SUPER');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // 3. Animation Variants (Memoized for performance)
    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const containerVariants = {
        hidden: { opacity: 0, scale: 0.98 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.5, staggerChildren: 0.1 }
        }
    };

    // 4. Persistence Logic
    useEffect(() => {
        const savedRememberMe = localStorage.getItem("rememberMe") === "true";
        if (savedRememberMe) {
            setRememberMe(true);
            setEmail(localStorage.getItem("rememberedEmail") || '');
            setPassword(localStorage.getItem("rememberedPassword") || '');
            setActiveTab(localStorage.getItem("rememberedRole") || 'SUPER');
        }
    }, []);

    // 5. Handle Redirects (Fixed dependency logic)
    useEffect(() => {
        if (user) {
            const routes: Record<string, string> = {
                SUPER: '/super-admin/dashboard',
                ADMIN: '/admin/dashboard',
                ACCOUNTS: '/accountant/dashboard'
            };
            // Use the user's actual role from the data if available, 
            // otherwise fallback to current tab.
            navigate(routes[user.role] || routes[activeTab]);
        }
    }, [user, navigate]); // Removed activeTab to prevent loop on tab switch

    const handleLoginSuccess = (role: string) => {
        if (rememberMe) {
            localStorage.setItem("rememberedEmail", email);
            localStorage.setItem("rememberedPassword", password);
            localStorage.setItem("rememberedRole", role);
            localStorage.setItem("rememberMe", "true");
        } else {
            ["rememberedEmail", "rememberedPassword", "rememberedRole", "rememberMe"].forEach(k => localStorage.removeItem(k));
        }

        const routes: Record<string, string> = {
            SUPER: "/super-admin/dashboard",
            ADMIN: "/admin/dashboard",
            ACCOUNTS: "/accountant/dashboard"
        };
        navigate(routes[role]);
    };

    const roles = useMemo(() => [
        { id: 'SUPER', label: 'SETU SUPER', placeholderEmail: 'setusuper@gmail.com' },
        { id: 'ADMIN', label: 'SETU ADMIN', placeholderEmail: 'setuadmin@gmail.com' },
        { id: 'ACCOUNTS', label: 'SETU ACCOUNTS', placeholderEmail: 'setuaccount@gmail.com' },
    ], []);

    const currentRole = roles.find(r => r.id === activeTab);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const loginData = { email, password };

        const config = { onSuccess: () => handleLoginSuccess(activeTab) };

        if (activeTab === 'SUPER') loginSuperAdmin.mutate({ ...loginData, rememberMe }, config);
        else if (activeTab === 'ADMIN') loginAdmin.mutate({ ...loginData, rememberMe }, config);
        else if (activeTab === 'ACCOUNTS') loginAccountant.mutate({ ...loginData, rememberMe }, config);
    };

    const isLoggingIn = loginSuperAdmin.isPending || loginAdmin.isPending || loginAccountant.isPending;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative overflow-hidden">
            <div className="w-full max-w-7xl z-30 p-4">
                <Header />
            </div>

            {/* Background Decorations */}
            <motion.div
                animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-200/30 blur-3xl rounded-full"
            />

            <main className="flex-1 flex flex-col items-center justify-center w-full z-10 py-16 px-4">
                <motion.div {...fadeInUp} className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Login Your Account</h1>
                    <p className="text-slate-500 mt-3 max-w-md mx-auto">Choose your role to access your dashboard.</p>
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: 64 }}
                        className="h-1.5 bg-red-500 mx-auto mt-5 rounded-full"
                    />
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-6xl overflow-hidden border border-slate-100 flex flex-col"
                >
                    {/* Tab Navigation */}
                    <div className="bg-slate-100 p-2 m-6 mb-2 rounded-2xl flex gap-2 relative">
                        {roles.map((role) => (
                            <button
                                key={role.id}
                                onClick={() => setActiveTab(role.id)}
                                className={`relative flex-1 py-4 text-sm font-bold rounded-xl transition-colors duration-300 z-10 ${activeTab === role.id ? 'text-white' : 'text-slate-400 hover:text-slate-600'
                                    }`}
                            >
                                {activeTab === role.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-[#5D3FD3] rounded-xl shadow-md"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                    />
                                )}
                                <span className="relative z-20">{role.label}</span>
                            </button>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row p-8 pt-4 gap-8">
                        {/* Login Form Side */}
                        <motion.div layout className="w-full md:w-[40%] bg-gradient-to-br from-[#5D3FD3] to-indigo-900 rounded-[2rem] p-8 text-white relative">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <div className="flex flex-col items-center text-center mb-8">
                                        <div className="bg-white p-3 rounded-xl mb-4 shadow-lg">
                                            <img src={logo} alt="Logo" className="w-10 h-10 object-contain" />
                                        </div>
                                        <h2 className="text-xl font-bold tracking-tight">SETU SMS - {activeTab}</h2>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-5">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Email Address</label>
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder={currentRole?.placeholderEmail}
                                                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                                    required
                                                />
                                                <Mail className="absolute right-4 top-3.5 opacity-40" size={18} />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-widest opacity-70 ml-1">Password</label>
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className="w-full bg-white/10 border border-white/20 text-white px-4 py-3.5 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
                                                    required
                                                />
                                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-3.5 opacity-40 hover:opacity-100 transition-opacity">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </button>
                                            </div>
                                        </div>

                                        <label className="flex items-center gap-2 cursor-pointer group w-fit">
                                            <input
                                                type="checkbox"
                                                checked={rememberMe}
                                                onChange={(e) => setRememberMe(e.target.checked)}
                                                className="rounded border-white/20 bg-white/10 accent-indigo-400"
                                            />
                                            <span className="text-xs opacity-80 group-hover:opacity-100 select-none">Remember Me</span>
                                        </label>

                                        <motion.button
                                            whileHover={{ scale: 1.01 }}
                                            whileTap={{ scale: 0.99 }}
                                            disabled={isLoggingIn}
                                            className="w-full bg-indigo-500 hover:bg-indigo-400 py-4 rounded-xl font-bold shadow-lg transition-colors disabled:opacity-50"
                                        >
                                            {isLoggingIn ? "Authenticating..." : "Login Now"}
                                        </motion.button>
                                    </form>
                                </motion.div>
                            </AnimatePresence>
                        </motion.div>

                        {/* App Showcase Side */}
                        <div className="flex-1 flex flex-col items-center justify-center p-4">
                            <motion.img
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                src={image}
                                alt="App Preview"
                                className="max-h-[400px] w-auto drop-shadow-2xl"
                            />
                            <div className="text-center mt-6">
                                <h3 className="font-bold text-slate-800 text-lg">Download the Edu-Setu App</h3>
                                <div className="flex gap-3 mt-4">
                                    <motion.img whileHover={{ scale: 1.05 }} src={playStore} className="h-10 cursor-pointer" />
                                    <motion.img whileHover={{ scale: 1.05 }} src={appStore} className="h-10 cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </main>
            <div className="w-full">
                <Footer />
            </div>
        </div>
    );
};

export default LoginPortal;