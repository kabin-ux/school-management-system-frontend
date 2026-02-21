import { useState, type FC } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { motion, type Variants } from 'framer-motion'; // Added Variants import

const RequestDemo: FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setTimeout(() => setIsSubmitting(false), 2000);
    };

    //  Explicitly type as Variants to resolve 'ease' string mismatch
    const containerVariants: Variants = {
        hidden: { opacity: 0, y: 40 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    //  Explicitly type as Variants
    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="demo" className="py-24 px-4 bg-white overflow-hidden">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-14 border-[16px] md:border-[32px] border-[#F3F0FF] shadow-[0_0_60px_rgba(243,240,255,0.8)] relative"
            >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#5D3FD3]/5 rounded-full blur-3xl" />

                <div className="text-center mb-12">
                    <motion.h2
                        variants={itemVariants}
                        className="text-3xl md:text-4xl font-black text-[#2D3142] mb-4 tracking-tight"
                    >
                        Request A Demo Video
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto"
                    >
                        Select a convenient date and time to schedule a personalized walkthrough <br className="hidden md:block" />
                        with our product experts and explore our digital ecosystem.
                    </motion.p>
                </div>

                <motion.form
                    variants={itemVariants}
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10"
                    onSubmit={handleSubmit}
                >
                    {/* School Name */}
                    <motion.div variants={itemVariants} className="relative group">
                        <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] focus-within:ring-2 focus-within:ring-[#5D3FD3]/10 transition-all duration-300">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 focus-within:text-[#5D3FD3] font-bold uppercase tracking-wider">
                                School name
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="ABCXYZ Secondary Boarding School"
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                            />
                        </div>
                    </motion.div>

                    {/* Location */}
                    <motion.div variants={itemVariants} className="relative group">
                        <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] focus-within:ring-2 focus-within:ring-[#5D3FD3]/10 transition-all duration-300">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 focus-within:text-[#5D3FD3] font-bold uppercase tracking-wider">
                                Location
                            </label>
                            <input
                                type="text"
                                required
                                placeholder="Enter school location"
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                            />
                        </div>
                    </motion.div>

                    {/* Select Date */}
                    <motion.div variants={itemVariants} className="relative group">
                        <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] focus-within:ring-2 focus-within:ring-[#5D3FD3]/10 transition-all duration-300">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 focus-within:text-[#5D3FD3] font-bold uppercase tracking-wider">
                                Select Date
                            </label>
                            <input
                                type="date"
                                required
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-800 cursor-pointer"
                            />
                        </div>
                    </motion.div>

                    {/* Time Group */}
                    <motion.div variants={itemVariants} className="flex gap-4">
                        <div className="flex-1 relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] transition-all">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 font-bold uppercase tracking-wider">Time</label>
                            <input
                                type="time"
                                required
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                            />
                        </div>
                        <div className="w-28 relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] group transition-all">
                            <label className="absolute -top-3 left-2 bg-white px-2 text-[10px] text-gray-400 font-bold uppercase tracking-tighter">Am-Pm</label>
                            <div className="relative flex items-center h-full">
                                <select className="w-full bg-transparent outline-none px-2 text-sm text-gray-700 appearance-none cursor-pointer">
                                    <option>AM</option>
                                    <option>PM</option>
                                </select>
                                <ChevronDown size={16} className="absolute right-0 text-[#5D3FD3] pointer-events-none group-focus-within:rotate-180 transition-transform" />
                            </div>
                        </div>
                    </motion.div>

                    {/* Email */}
                    <motion.div variants={itemVariants} className="md:col-span-2 relative group">
                        <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] focus-within:ring-2 focus-within:ring-[#5D3FD3]/10 transition-all duration-300">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 focus-within:text-[#5D3FD3] font-bold uppercase tracking-wider">
                                Email Address
                            </label>
                            <input
                                type="email"
                                required
                                placeholder="adamjoe987@gmail.com"
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                            />
                        </div>
                    </motion.div>

                    {/* Submit Button */}
                    <motion.div variants={itemVariants} className="md:col-span-2 mt-4 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#4b32b1" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isSubmitting}
                            type="submit"
                            className="w-full bg-[#5D3FD3] text-white font-black py-5 rounded-2xl shadow-lg transition-all tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {isSubmitting ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>
                                    Request A Demo
                                    <Send size={18} />
                                </>
                            )}
                        </motion.button>
                    </motion.div>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default RequestDemo;