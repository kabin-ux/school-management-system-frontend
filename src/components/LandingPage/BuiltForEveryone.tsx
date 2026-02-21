import { useState } from 'react';
import { Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import built from '../../assets/built.png';
import setuStudent from '../../assets/setustudent.png';
import setuAccount from '../../assets/laptop.png';
import setuParent from '../../assets/setuparent.png';
import setuGuru from '../../assets/setuguru.png';

const BuiltForEveryone = () => {
    const [activeTab, setActiveTab] = useState('SetuSchool');

    const tabData = {
        SetuSchool: {
            title: "SetuSchool",
            color: "#5D3FD3", // Purple
            glow: "rgba(93, 63, 211, 0.15)",
            image: built,
            description: "A centralized, high-authority dashboard engineered for total institutional oversight...",
            features: [
                { label: "Elite Enterprise Infrastructure", desc: "Backed by the world's most resilient cloud servers..." },
                { label: "Strategic Administrative Hierarchy", desc: "Meticulously designed with a high-level user interface..." }
            ]
        },
        SetuAccounts: {
            title: "SetuAccounts",
            color: "#0ea5e9", // Sky Blue
            glow: "rgba(14, 165, 233, 0.15)",
            image: setuAccount,
            description: "A comprehensive, high-precision financial suite engineered for absolute fiscal oversight...",
            features: [
                { label: "Advanced Financial Sovereignty", desc: "Backed by real-time reconciliation engines..." },
                { label: "Strategic Fiscal Hierarchy", desc: "Meticulously designed to simplify complex structures..." }
            ]
        },
        SetuGuru: {
            title: "SetuGuru",
            color: "#10b981", // Emerald
            glow: "rgba(16, 185, 129, 0.15)",
            image: setuGuru,
            description: "A streamlined pedagogical workspace that removes administrative friction...",
            features: [
                { label: "Real-Time Academic Synchronicity", desc: "A unified mobile experience..." },
                { label: "Effortless Classroom Orchestration", desc: "Intuitively designed to handle the 'heavy lifting'..." }
            ]
        },
        SetuStudent: {
            title: "SetuStudent",
            color: "#f59e0b", // Amber
            glow: "rgba(245, 158, 11, 0.15)",
            image: setuStudent,
            description: "An immersive digital campus engineered to foster student agency...",
            features: [
                { label: "Dynamic Progress Visualization", desc: "Provides students with a high-level view..." },
                { label: "Centralized Resource Hub", desc: "A one-stop repository for assignments..." }
            ]
        },
        SetuParents: {
            title: "SetuParents",
            color: "#ef4444", // Red
            glow: "rgba(239, 68, 68, 0.15)",
            image: setuParent,
            description: "Dedicated window into the student's daily school life...",
            features: [
                { label: "Proactive Safety Alerts", desc: "Instant connectivity through notifications..." },
                { label: "Holistic Development Insights", desc: "Strengthening the bond between home and school..." }
            ]
        }
    };

    const current = tabData[activeTab as keyof typeof tabData];

    return (
        <section className="relative py-20 px-4 bg-white overflow-hidden transition-colors duration-700">
            {/* Dynamic Background Glow */}
            <motion.div 
                animate={{ backgroundColor: current.glow }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none z-0"
                transition={{ duration: 0.8 }}
            />

            <div className="max-w-6xl mx-auto text-center relative z-10">
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
                    <h2 className="text-4xl font-bold text-[#2D3142] mb-2">Built For Everyone</h2>
                    <p className="text-gray-500 mb-4">One intelligent platform for all stakeholders.</p>
                    <motion.div animate={{ backgroundColor: current.color }} className="w-12 h-1 mx-auto mb-10 transition-colors duration-500" />
                </motion.div>

                {/* Tab Selection */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {Object.keys(tabData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative px-8 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${
                                activeTab === tab ? 'text-white' : 'border-gray-200 text-gray-400 hover:border-gray-300'
                            }`}
                        >
                            <span className="relative z-10">{tab}</span>
                            {activeTab === tab && (
                                <motion.div 
                                    layoutId="activeTabBG"
                                    className="absolute inset-0 rounded-xl"
                                    style={{ backgroundColor: current.color }}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Image Container with Mouse Interaction */}
                        <motion.div 
                            className="relative max-w-4xl mx-auto mb-12 cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={current.image}
                                alt={current.title}
                                className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative z-10"
                            />
                        </motion.div>

                        <div className="max-w-4xl mx-auto">
                            <motion.p className="text-gray-600 text-center text-lg font-medium mb-12 px-6">
                                {current.description}
                            </motion.p>

                            <div className="grid md:grid-cols-2 gap-8 text-left">
                                {current.features.map((feature, idx) => (
                                    <motion.div 
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-transparent hover:border-gray-100 hover:shadow-xl transition-all"
                                    >
                                        <div className="flex gap-4">
                                            <div className="mt-1 shrink-0">
                                                <Check style={{ color: current.color }} className="w-6 h-6 stroke-[3px]" />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold text-[#2D3142] mb-2">{feature.label}</h4>
                                                <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default BuiltForEveryone;