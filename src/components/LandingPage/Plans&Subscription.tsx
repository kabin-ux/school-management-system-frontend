import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './FinalCTASection';
import { useNavigate } from 'react-router-dom';

interface PlanFeature {
    name: string;
    available: boolean;
}

interface Plan {
    id: string;
    title: string;
    description: string;
    features: PlanFeature[];
    accentColor: string;
    isDark?: boolean;
    mobileFeatures: PlanFeature[];
}

const PlansSection: React.FC = () => {
    const navigate = useNavigate();
    const [selectedPlan, setSelectedPlan] = useState<string>('professional');

    const plans: Plan[] = [
        {
            id: 'basic',
            title: '1. Basic Plan',
            accentColor: '#5D3FD3',
            description: "The Basic Plan provides the fundamental digital framework needed to modernize your school's daily operations. It centralizes critical data, moving your institution away from manual processes into a single, unified environment.",
            features: [
                { name: 'Student Management', available: true },
                { name: 'Teacher Management', available: true },
                { name: 'Class Management', available: true },
                { name: 'Section Management', available: true },
                { name: 'Accountant Management', available: true },
                { name: 'Role Management', available: true },
                { name: 'Parent Management', available: true },
                { name: 'Staff Fees Overview', available: true },
                { name: 'Student Fees Overview', available: true },
                { name: 'Support Console', available: true },
            ],
            mobileFeatures: [
                { name: 'Mobile App for Student, Teacher and Parents', available: false },
            ]
        },
        {
            id: 'professional',
            title: '2. Professional Plan',
            accentColor: '#5D3FD3',
            description: "The Professional Plan is engineered for growing schools that require deeper analytical insights and enhanced automation.",
            features: [
                { name: 'Student Management', available: true },
                { name: 'Time Table Management', available: true },
                { name: 'Teacher Management', available: true },
                { name: 'Transportation Management', available: true },
                { name: 'Class Management', available: true },
                { name: 'Administrative Management', available: true },
                { name: 'Section Management', available: true },
                { name: 'Event Management', available: true },
                { name: 'Accountant Management', available: true },
                { name: 'Role Management', available: true },
                { name: 'Parent Management', available: true },
                { name: 'Staff Fees Overview', available: true },
                { name: 'Student Fees Overview', available: true },
                { name: 'Support Console', available: true },
                { name: 'Notice Management', available: true },
            ],
            mobileFeatures: [
                { name: 'Notice', available: true },
                { name: 'Event', available: true },
                { name: 'Time Table', available: true },
                { name: 'Notification', available: true },
            ]
        },
        {
            id: 'enterprise',
            title: '3. Enterprise Plan',
            accentColor: '#FFFFFF',
            isDark: true,
            description: "The Enterprise Plan offers the ultimate high-authority suite for large-scale institutions and multi-branch networks.",
            features: [
                { name: 'Student Management', available: true },
                { name: 'Administrative Management', available: true },
                { name: 'Teacher Management', available: true },
                { name: 'Event Management', available: true },
                { name: 'Class Management', available: true },
                { name: 'Section Management', available: true },
                { name: 'Accountant Management', available: true },
                { name: 'Role Management', available: true },
                { name: 'Parent Management', available: true },
                { name: 'Staff Fees Overview', available: true },
                { name: 'Assignment System', available: true },
                { name: 'Student Fees Overview', available: true },
                { name: 'Assignment Panel', available: true },
                { name: 'Support Console', available: true },
                { name: 'Attendance (Monthly + Daily)', available: true },
                { name: 'Notice Management', available: true },
                { name: 'Exam/Schedule TimeTable Report', available: true },
                { name: 'Time Table Management', available: true },
                { name: 'Student Fee Payment & Report', available: true },
                { name: 'Transportation Management', available: true },
                { name: 'Staff Salary Payment & Report', available: true },
                { name: 'Exam Results & Report', available: true },
            ],
            mobileFeatures: [
                { name: 'Notice', available: true },
                { name: 'Event', available: true },
                { name: 'Time Table', available: true },
                { name: 'Subject time', available: true },
                { name: 'Notification', available: true },
                { name: 'Assignment Submit', available: true },
                { name: 'Assignment Track', available: true },
                { name: 'Attendance ( Monthly / Daily )', available: true },
                { name: 'Exam Schedule / Marks Entry / Report', available: true },
                { name: 'Student Fee Payment & Report', available: true },
                { name: 'Staff Salary Payment & Report', available: true },
                { name: 'Leave Request & Report', available: true },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            {/* Main padding adjusted for mobile (pt-24) vs desktop (pt-32) */}
            <main className="flex-grow pt-24 md:pt-32 pb-12 md:pb-20 px-4 md:px-6">
                <div className="max-w-6xl mx-auto">

                    {/* Header Section */}
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2">
                            Register Your School
                        </h1>
                        <p className="text-sm md:text-base text-gray-500 px-4">
                            Start your journey by setting up your school's digital profile.
                        </p>
                        <div className="flex justify-center mt-4 md:mt-6">
                            <div className="h-1 w-16 md:w-20 bg-red-500 rounded-full" />
                        </div>
                    </div>

                    {/* Main Container: Rounded corners reduced slightly for mobile for better screen usage */}
                    <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] shadow-2xl shadow-purple-100/50 border border-gray-100 p-5 md:p-12">

                        {/* Sub-header icon box */}
                        <div className="flex items-center gap-3 mb-8 md:mb-10 bg-purple-50/50 p-3 md:p-4 rounded-xl md:border border-purple-100">
                            <div className="bg-[#5D3FD3] p-1.5 md:p-2 rounded-lg shadow-lg">
                                <ShieldCheck className="w-4 h-4 md:w-5 md:h-5 text-white" />
                            </div>
                            <h2 className="text-base md:text-lg font-bold text-gray-800 tracking-tight">
                                Subscription and Plan Selection
                            </h2>
                        </div>

                        <div className="space-y-6 md:space-y-10">
                            {plans.map((plan) => (
                                <motion.div
                                    key={plan.id}
                                    whileHover={{ scale: 1.005 }}
                                    className={`relative p-5 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] border-2 transition-all cursor-pointer 
                ${plan.isDark
                                            ? 'bg-[#5D3FD3] border-[#5D3FD3] text-white shadow-xl md:shadow-2xl shadow-purple-300'
                                            : 'bg-white border-gray-100 shadow-sm hover:border-purple-200'
                                        } ${selectedPlan === plan.id ? 'ring-4 ring-purple-100' : ''}`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {/* Selected Badge: Scaled down for mobile */}
                                    {selectedPlan === plan.id && (
                                        <div className="absolute top-4 right-4 md:top-6 md:right-6">
                                            <CheckCircle2 className={`w-6 h-6 md:w-8 md:h-8 ${plan.isDark ? 'text-white' : 'text-[#5D3FD3]'}`} />
                                        </div>
                                    )}

                                    <div className="max-w-3xl">
                                        <h3 className={`text-xl md:text-2xl font-black mb-3 md:mb-4 ${plan.isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {plan.title}
                                        </h3>
                                        <p className={`text-xs md:text-sm leading-relaxed mb-6 md:mb-8 ${plan.isDark ? 'text-purple-100/80' : 'text-gray-500 font-medium'}`}>
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Layout: Stacked on mobile, 2-cols on LG screens */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 md:mb-10">

                                        {/* Left Column: Management Features */}
                                        <div>
                                            <h4 className={`font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] mb-4 md:mb-6 ${plan.isDark ? 'text-white/60' : 'text-gray-400'}`}>
                                                General Management
                                            </h4>
                                            <div className="space-y-2 md:space-y-3">
                                                {plan.features.map((feature, fIdx) => (
                                                    <div key={fIdx} className={`flex items-center justify-between text-[12px] md:text-[13px] border-b pb-2 ${plan.isDark ? 'border-white/10' : 'border-gray-50'}`}>
                                                        <span className="font-semibold opacity-90 pr-2">{feature.name}</span>
                                                        <span className={`font-bold uppercase text-[9px] md:text-[10px] whitespace-nowrap tracking-wider ${feature.available
                                                            ? (plan.isDark ? 'text-green-300' : 'text-green-600')
                                                            : (plan.isDark ? 'text-red-300' : 'text-red-500')
                                                            }`}>
                                                            {feature.available ? '● Available' : '○ N/A'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column: Mobile App Features */}
                                        <div className={`p-4 md:p-6 rounded-2xl md:rounded-3xl ${plan.isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'}`}>
                                            <div className="flex items-center gap-2 mb-4 md:mb-6">
                                                <Smartphone className={`w-3.5 h-3.5 md:w-4 md:h-4 ${plan.isDark ? 'text-purple-200' : 'text-[#5D3FD3]'}`} />
                                                <h4 className={`font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] ${plan.isDark ? 'text-white/60' : 'text-gray-400'}`}>
                                                    Mobile App
                                                </h4>
                                            </div>
                                            <div className="space-y-2 md:space-y-3">
                                                {plan.mobileFeatures.map((mFeature, mIdx) => (
                                                    <div key={mIdx} className={`flex items-center justify-between text-[12px] md:text-[13px] border-b pb-2 ${plan.isDark ? 'border-white/10' : 'border-gray-100'}`}>
                                                        <span className="font-medium opacity-80">- {mFeature.name}</span>
                                                        <span className={`font-bold uppercase text-[8px] md:text-[9px] tracking-wider ${mFeature.available
                                                            ? (plan.isDark ? 'text-green-300' : 'text-green-600')
                                                            : (plan.isDark ? 'text-red-300' : 'text-red-500')
                                                            }`}>
                                                            {mFeature.available ? 'Yes' : 'No'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Button: Larger tap target for mobile */}
                                    <button
                                        className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl font-black text-xs md:text-sm uppercase tracking-widest transition-all ${plan.isDark
                                            ? 'bg-white text-[#5D3FD3] active:bg-gray-200'
                                            : 'bg-[#5D3FD3] text-white active:bg-[#4b32ac] shadow-lg shadow-purple-200'
                                            }`}
                                        onClick={() => navigate('/#demo')}
                                    >
                                        Select {plan.title.split('.')[1].trim()}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PlansSection;