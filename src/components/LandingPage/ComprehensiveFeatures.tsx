import { motion, type Variants } from 'framer-motion'; // Import Variants type
import cuate from '../../assets/cuate.png';
import rafiki from '../../assets/rafiki.png';
import pana from '../../assets/pana.png';

const ComprehensiveFeatures = () => {
    const features = [
        {
            title: "Student Management",
            description: "Efficiently track student records, performance, and behavior in one centralized hub.",
            image: cuate,
        },
        {
            title: "Staff Coordination",
            description: "Manage teacher schedules, attendance, and payroll with automated reporting tools.",
            image: rafiki,
        },
        {
            title: "Financial Tracking",
            description: "Simplify fee collection and expense management with detailed financial analytics.",
            image: pana,
        }
    ];

    // 1. Explicitly type as Variants
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    // 2. Explicitly type as Variants to resolve the 'ease' string error
    const cardVariants: Variants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        },
    };

    return (
        <section id="features" className="py-20 px-4 bg-white">
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={containerVariants}
                className="max-w-6xl mx-auto bg-[#F3F0FF] rounded-[40px] p-8 md:p-12 border-2 border-white shadow-sm"
            >
                <div className="text-center mb-16">
                    <motion.h2
                        variants={cardVariants}
                        className="text-3xl md:text-4xl font-bold text-[#2D3142] mb-4"
                    >
                        Our Comprehensive Features
                    </motion.h2>
                    <motion.p
                        variants={cardVariants}
                        className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base"
                    >
                        Explore the powerful tools EduSetu provides to empower students, teachers, and administrators across our unified ecosystem.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -10 }}
                            className="bg-[#5D3FD3] rounded-[30px] overflow-hidden shadow-xl flex flex-col h-full"
                        >
                            <div className="h-64 flex items-center justify-center p-8 bg-[#5D3FD3] relative overflow-hidden">
                                <div className="absolute inset-0 bg-white/5 rounded-full scale-150 blur-3xl" />
                                <motion.img
                                    src={feature.image}
                                    alt={feature.title}
                                    className="w-full h-full object-contain relative z-10"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: index * 0.5
                                    }}
                                />
                            </div>
                            <div className="p-8 text-white bg-white/10 backdrop-blur-md flex-grow border-t border-white/10">
                                <h4 className="font-bold text-xl mb-3">{feature.title}</h4>
                                <p className="text-white/80 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

export default ComprehensiveFeatures;