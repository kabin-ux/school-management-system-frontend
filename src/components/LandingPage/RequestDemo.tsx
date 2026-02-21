import { useState, type FC } from 'react';
import { ChevronDown, Send } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useRequestDemo, type DemoRequestData } from '../../hooks/useSchools';
import toast from 'react-hot-toast';

const RequestDemo: FC = () => {
    const { mutate: requestMutation, isPending } = useRequestDemo();

    // 1. Initialize form state
    const [formData, setFormData] = useState<DemoRequestData>({
        school_name: "",
        location: "",
        date: "",
        time: "",
        email: "",
        phone: "" // Note: Ensure your hook/interface includes phone
    });

    const [ampm, setAmpm] = useState("AM");

    // 2. Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Combine time with AM/PM for the backend
        const submissionData = {
            ...formData,
            time: `${formData.time} ${ampm}`
        };

        requestMutation(submissionData, {
            onSuccess: () => {
                // Optional: Reset form on success
                toast.success("Demo request submitted successfully")
                setFormData({ school_name: "", location: "", date: "", time: "", email: "", phone: "" });
            }
        });
    };

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

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <section id="demo" className="py-24 px-4 bg-white overflow-hidden scroll-mt-20">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="max-w-4xl mx-auto bg-white rounded-[40px] p-8 md:p-14 border-[16px] md:border-[32px] border-[#F3F0FF] shadow-[0_0_60px_rgba(243,240,255,0.8)] relative"
            >
                <div className="text-center mb-12">
                    <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-black text-[#2D3142] mb-4 tracking-tight">
                        Request A Demo Video
                    </motion.h2>
                    <motion.p variants={itemVariants} className="text-gray-500 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
                        Select a convenient date and time to schedule a personalized walkthrough.
                    </motion.p>
                </div>

                <motion.form variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10" onSubmit={handleSubmit}>

                    {/* School Name */}
                    <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] transition-all">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 font-bold uppercase">School name</label>
                        <input
                            name="school_name"
                            value={formData.school_name}
                            onChange={handleChange}
                            type="text"
                            required
                            placeholder="ABCXYZ School"
                            className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                        />
                    </div>

                    {/* Location */}
                    <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] transition-all">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 font-bold uppercase">Location</label>
                        <input
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            type="text"
                            required
                            placeholder="Enter location"
                            className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                        />
                    </div>

                    {/* Date */}
                    <div className="relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3] transition-all">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 font-bold uppercase">Select Date</label>
                        <input
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            type="date"
                            required
                            className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                        />
                    </div>

                    {/* Time & AM/PM */}
                    <div className="flex gap-4">
                        <div className="flex-1 relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3]">
                            <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 font-bold uppercase">Time</label>
                            <input
                                name="time"
                                value={formData.time}
                                onChange={handleChange}
                                type="time"
                                required
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                            />
                        </div>
                        <div className="w-28 relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3]">
                            <select
                                value={ampm}
                                onChange={(e) => setAmpm(e.target.value)}
                                className="w-full bg-transparent outline-none px-2 text-sm text-gray-700 appearance-none"
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-3 top-5 text-[#5D3FD3] pointer-events-none" />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="md:col-span-2 relative border border-gray-300 rounded-xl p-4 focus-within:border-[#5D3FD3]">
                        <label className="absolute -top-3 left-4 bg-white px-2 text-[12px] text-gray-400 font-bold uppercase">Email Address</label>
                        <input
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            type="email"
                            required
                            placeholder="adam@example.com"
                            className="w-full bg-transparent outline-none px-2 text-sm text-gray-800"
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="md:col-span-2 mt-4 flex justify-center">
                        <motion.button
                            whileHover={{ scale: 1.02, backgroundColor: "#4b32b1" }}
                            whileTap={{ scale: 0.98 }}
                            disabled={isPending}
                            type="submit"
                            className="w-full bg-[#5D3FD3] text-white font-black py-5 rounded-2xl shadow-lg transition-all tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {isPending ? (
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                />
                            ) : (
                                <>Request A Demo <Send size={18} /></>
                            )}
                        </motion.button>
                    </div>
                </motion.form>
            </motion.div>
        </section>
    );
};

export default RequestDemo;