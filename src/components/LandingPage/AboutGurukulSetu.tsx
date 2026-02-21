import React, { useRef } from 'react';
import { Store, Network, LineChart } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import graduation from '../../assets/Vector.png';

const AboutGurukulSetu = () => {
    const containerRef = useRef(null);

    // Track scroll progress of this specific section
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    // Background moves slower than the cards (Parallax)
    const bgY = useTransform(scrollYProgress, [0, 1], [-50, 50]);
    // The image inside the card can move slightly too
    const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1 }
    };

    return (
        <section ref={containerRef} className="py-20 px-4 overflow-hidden">
            {/* Header Section */}
            <motion.div 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto text-center mb-12"
            >
                <h2 className="text-4xl font-bold text-[#2D3142] mb-2">Learn About GurukulSetu</h2>
                <p className="text-gray-500 max-w-2xl mx-auto">
                    Gain a deeper understanding of how we unify your entire academic network through superior technology and user-centric design.
                </p>
                <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: 48 }}
                    transition={{ duration: 0.8 }}
                    className="h-1 bg-red-500 mx-auto mt-4"
                ></motion.div>
            </motion.div>

            {/* Main Content with Parallax Background */}
            <div className="max-w-6xl mx-auto relative">
                
                {/* Parallax Background Layer */}
                <motion.div 
                    style={{ y: bgY }}
                    className="absolute inset-0 bg-[#EBEBFF] rounded-[40px] z-0"
                />

                <div className="relative z-10 p-8 md:p-12 flex flex-col lg:flex-row gap-8">
                    {/* Left Stats/Image Column */}
                    <motion.div 
                        initial={{ x: -50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/3 flex flex-col gap-6"
                    >
                        {/* Purple Stats Card */}
                        <motion.div 
                            whileHover={{ y: -5, rotate: -1 }}
                            className="bg-[#5D3FD3] text-white p-8 rounded-[30px] flex flex-col items-center text-center shadow-xl"
                        >
                            <motion.span 
                                initial={{ scale: 0.5 }}
                                whileInView={{ scale: 1 }}
                                className="text-7xl font-bold"
                            >
                                1<sup className="text-2xl lowercase">st</sup>
                            </motion.span>
                            <p className="mt-4 text-sm font-semibold leading-tight px-4">
                                Nepal's First Fully SAAS Emerging School Management System
                            </p>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6 text-[10px] opacity-80 border-t border-white/20 pt-4 w-full text-left pl-4">
                                {['SetuAdmin', 'Teacher', 'Admin', 'Student', 'Accountant', 'Parents'].map((role) => (
                                    <span key={role}>• {role}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* Image Card */}
                        <motion.div 
                            whileHover={{ scale: 1.02 }}
                            className="rounded-[30px] overflow-hidden bg-white h-full flex items-end group shadow-lg"
                        >
                            <motion.img
                                style={{ scale: imgScale }}
                                src={graduation}
                                alt="Graduating Student"
                                className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Content Column */}
                    <motion.div 
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-2/2 bg-white rounded-[30px] p-8 md:p-12 shadow-sm border border-white/50"
                    >
                        <h3 className="text-2xl font-bold text-[#2D3142] mb-8 leading-relaxed">
                            <span className="text-[#5D3FD3]">Gurukul-Setu</span> is a comprehensive digital platform engineered to bridge the gap between traditional administration and next-generation technology in Nepal.
                        </h3>

                        <motion.div 
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="space-y-10"
                        >
                            {/* Feature Cards */}
                            {[
                                {
                                    icon: <Store />,
                                    title: "Driven by Innovation",
                                    desc: "Gurukul-Setu leads the way in modernizing school management across Nepal, integrating advanced digital tools."
                                },
                                {
                                    icon: <Network />,
                                    title: "Mastering Complexity",
                                    desc: "We turn complicated administrative tasks into a clear school experience, making data easy to understand for everyone."
                                },
                                {
                                    icon: <LineChart />,
                                    title: "Fueling Institutional Success",
                                    desc: "Automating manual processes provides instant analytics, allowing schools to focus on high-quality education."
                                }
                            ].map((feature, index) => (
                                <motion.div 
                                    key={index}
                                    variants={itemVariants}
                                    whileHover={{ x: 10 }}
                                    className="flex gap-6 group cursor-default"
                                >
                                    <div className="w-14 h-14 shrink-0 bg-[#F3F0FF] rounded-xl flex items-center justify-center group-hover:bg-[#5D3FD3] transition-colors duration-300">
                                        <div className="text-[#5D3FD3] group-hover:text-white transition-colors duration-300">
                                            {/* Cloning the icon to apply standard sizing */}
                                            {React.cloneElement(feature.icon, { className: "w-6 h-6" })}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-bold text-[#2D3142] mb-2 group-hover:text-[#5D3FD3] transition-colors">
                                            {feature.title}
                                        </h4>
                                        <p className="text-gray-500 text-sm leading-relaxed">
                                            {feature.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default AboutGurukulSetu;