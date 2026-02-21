import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Smartphone } from 'lucide-react';
import { motion } from 'framer-motion';
import Header from './Header';
import Footer from './FinalCTASection';

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

            <main className="flex-grow pt-32 pb-20 px-6">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Register Your School</h1>
                        <p className="text-gray-500">Start your journey by setting up your school's digital profile.</p>
                        <div className="flex justify-center mt-6">
                            <div className="h-1 w-20 bg-red-500 rounded-full" />
                        </div>
                    </div>

                    <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-purple-100/50 border border-gray-100 p-8 md:p-12">
                        <div className="flex items-center gap-3 mb-10 bg-purple-50/50 p-4 rounded-2xl border border-purple-100">
                            <div className="bg-[#5D3FD3] p-2 rounded-lg shadow-lg shadow-purple-200">
                                <ShieldCheck className="w-5 h-5 text-white" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-800 tracking-tight">Subscription and Plan Selection</h2>
                        </div>

                        <div className="space-y-10">
                            {plans.map((plan) => (
                                <motion.div
                                    key={plan.id}
                                    whileHover={{ scale: 1.005 }}
                                    className={`relative p-8 md:p-10 rounded-[2.5rem] border-2 transition-all cursor-pointer ${plan.isDark
                                        ? 'bg-[#5D3FD3] border-[#5D3FD3] text-white shadow-2xl shadow-purple-300'
                                        : 'bg-white border-gray-100 shadow-sm hover:border-purple-200'
                                        } ${selectedPlan === plan.id ? 'ring-4 ring-purple-100' : ''}`}
                                    onClick={() => setSelectedPlan(plan.id)}
                                >
                                    {selectedPlan === plan.id && (
                                        <div className="absolute top-6 right-6">
                                            <CheckCircle2 className={`w-8 h-8 ${plan.isDark ? 'text-white' : 'text-[#5D3FD3]'}`} />
                                        </div>
                                    )}

                                    <div className="max-w-3xl">
                                        <h3 className={`text-2xl font-black mb-4 ${plan.isDark ? 'text-white' : 'text-gray-800'}`}>
                                            {plan.title}
                                        </h3>
                                        <p className={`text-sm leading-relaxed mb-8 ${plan.isDark ? 'text-purple-100/80' : 'text-gray-500 font-medium'}`}>
                                            {plan.description}
                                        </p>
                                    </div>

                                    {/* Two Column Layout for Features */}
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-10">
                                        {/* Left Column: Key Features */}
                                        <div>
                                            <h4 className={`font-bold text-xs uppercase tracking-[0.2em] mb-6 ${plan.isDark ? 'text-white/60' : 'text-gray-400'}`}>General Management</h4>
                                            <div className="space-y-3">
                                                {plan.features.map((feature, fIdx) => (
                                                    <div key={fIdx} className={`flex items-center justify-between text-[13px] border-b pb-2 ${plan.isDark ? 'border-white/10' : 'border-gray-50'}`}>
                                                        <span className="font-semibold opacity-90">{feature.name}</span>
                                                        <span className={`font-bold uppercase text-[10px] tracking-wider ${feature.available
                                                            ? (plan.isDark ? 'text-green-300' : 'text-green-600')
                                                            : (plan.isDark ? 'text-red-300' : 'text-red-500')
                                                            }`}>
                                                            {feature.available ? '● Available' : '○ Not Available'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Right Column: Mobile App Features */}
                                        <div className={`p-6 rounded-3xl ${plan.isDark ? 'bg-white/5 border border-white/10' : 'bg-gray-50 border border-gray-100'}`}>
                                            <div className="flex items-center gap-2 mb-6">
                                                <Smartphone className={`w-4 h-4 ${plan.isDark ? 'text-purple-200' : 'text-[#5D3FD3]'}`} />
                                                <h4 className={`font-bold text-xs uppercase tracking-[0.2em] ${plan.isDark ? 'text-white/60' : 'text-gray-400'}`}>Mobile App Features</h4>
                                            </div>
                                            <div className="space-y-3">
                                                {plan.mobileFeatures.map((mFeature, mIdx) => (
                                                    <div key={mIdx} className={`flex items-center justify-between text-[13px] border-b pb-2 ${plan.isDark ? 'border-white/10' : 'border-gray-100'}`}>
                                                        <span className="font-medium opacity-80">- {mFeature.name}</span>
                                                        <span className={`font-bold uppercase text-[9px] tracking-wider ${mFeature.available
                                                            ? (plan.isDark ? 'text-green-300' : 'text-green-600')
                                                            : (plan.isDark ? 'text-red-300' : 'text-red-500')
                                                            }`}>
                                                            {mFeature.available ? 'Available' : 'Not Available'}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${plan.isDark
                                            ? 'bg-white text-[#5D3FD3] hover:bg-gray-100'
                                            : 'bg-[#5D3FD3] text-white hover:bg-[#4b32ac] shadow-lg shadow-purple-200'
                                            }`}
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