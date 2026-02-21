import React from 'react';
import { PlayCircle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, useMotionValue, useTransform, useSpring, type Variants } from 'framer-motion';
import schoolGirl from '../../assets/schoolgirl.png';

const UserHeroSection: React.FC = () => {
    const navigate = useNavigate();

    // Mouse Tracking for Parallax Effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth out the movement for a high-end feel
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 150 });
    const smoothY = useSpring(mouseY, { damping: 30, stiffness: 150 });

    // Background moves less than foreground to create depth
    const bgMoveX = useTransform(smoothX, [0, 1920], [30, -30]);
    const bgMoveY = useTransform(smoothY, [0, 1080], [30, -30]);

    const handleMouseMove = (e: React.MouseEvent) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };

    // Animation Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Custom cubic-bezier for smoothness
        },
    };

    return (
        <section
            id="home"
            onMouseMove={handleMouseMove}
            className="relative bg-[#5D3FD3] min-h-screen flex items-center overflow-hidden px-6 lg:px-20 py-16"
        >
            {/* 1. Animated Topographic Background Lines */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.svg
                    style={{ x: bgMoveX, y: bgMoveY }}
                    className="absolute w-full h-full opacity-20 scale-110"
                    viewBox="0 0 1000 1000"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,500 Q250,400 500,500 T1000,500 M0,600 Q250,500 500,600 T1000,600 M0,700 Q250,600 500,700 T1000,700"
                        fill="none" stroke="white" strokeWidth="0.5"
                    />
                </motion.svg>
            </div>

            <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 items-center relative z-10">

                {/* 2. Left Content with Staggered Animations */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="text-white max-w-2xl mt-16"
                >
                    <motion.h1 variants={itemVariants} className="text-4xl md:text-7xl font-bold leading-tight mb-6 tracking-tight">
                        Empowering Partnered Schools <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-white/70">
                            With Smarter Management
                        </span>
                    </motion.h1>

                    <motion.p variants={itemVariants} className="text-purple-100/90 text-lg md:text-xl mb-10 max-w-lg leading-relaxed font-light">
                        Connect administrators, teachers, students, and parents with one intelligent, unified platform.
                    </motion.p>

                    <motion.div variants={itemVariants} className="flex flex-wrap items-center gap-6 mb-12">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)" }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => navigate('/login')}
                            className="bg-white text-[#5D3FD3] font-bold px-10 py-5 rounded-xl transition-all text-lg flex items-center gap-2 group"
                        >
                            Get Started
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </motion.button>

                        <motion.button
                            whileHover={{ x: 5 }}
                            className="flex items-center gap-3 text-white font-semibold hover:text-purple-200 transition-colors"
                        >
                            <PlayCircle className="w-10 h-10 fill-white/10" />
                            <span className="text-lg">Watch Video</span>
                        </motion.button>
                    </motion.div>

                    {/* 3. Social Proof / Avatar Animation */}
                    <motion.div variants={itemVariants} className="flex items-center gap-5">
                        <div className="flex -space-x-3">
                            {[1, 2, 3, 4].map((i) => (
                                <motion.img
                                    key={i}
                                    whileHover={{ y: -5, scale: 1.1 }}
                                    className="w-11 h-11 rounded-full border-2 border-[#5D3FD3] bg-gray-200 cursor-pointer transition-transform"
                                    src={`https://i.pravatar.cc/100?img=${i + 15}`}
                                    alt="User"
                                />
                            ))}
                        </div>
                        <div className="h-10 w-[1px] bg-white/20 mx-2" />
                        <div>
                            <p className="text-sm font-bold text-white">500+ Downloads</p>
                            <p className="text-xs text-purple-200/60 font-medium">Trusted by Leading Schools</p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* 4. Right Side: Visual Asset with Floating & Parallax */}
                <div className="relative mt-16 lg:mt-0 flex justify-center lg:justify-end">
                    {/* Pulsing Decorative Blobs */}
                    <motion.div
                        style={{ x: bgMoveX, y: bgMoveY }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[130%] h-[130%] z-0"
                    >
                        <motion.div
                            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
                            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute top-10 right-20 w-40 h-40 bg-orange-400 rounded-full blur-[80px]"
                        />
                        <motion.div
                            animate={{ scale: [1.1, 1, 1.1], opacity: [0.3, 0.5, 0.3] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute bottom-20 left-10 w-56 h-56 bg-red-500 rounded-full blur-[100px]"
                        />
                    </motion.div>

                    {/* Main Image with Constant Floating Animation */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: -2 }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            rotate: 0,
                            y: [0, -20, 0] // Constant bobbing
                        }}
                        transition={{
                            opacity: { duration: 1 },
                            scale: { duration: 1 },
                            y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                        }}
                        className="relative z-10"
                    >
                        <img
                            src={schoolGirl}
                            alt="Student"
                            className="w-full max-w-md lg:max-w-xl h-auto object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.4)]"
                        />

                        {/* 5. Floating UI Element (Badge) */}
                        <motion.div
                            animate={{ y: [10, -10, 10] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -right-8 top-1/4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl hidden md:block"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                                <p className="text-white text-sm font-semibold tracking-wide">Live Dashboard</p>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default UserHeroSection;