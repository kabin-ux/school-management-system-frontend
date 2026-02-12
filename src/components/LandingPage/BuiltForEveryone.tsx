import { useState } from 'react';
import { Check } from 'lucide-react';
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
            description: "A centralized, high-authority dashboard engineered for total institutional oversight, multi-branch management, and critical data governance.",
            image: built, //
            features: [
                {
                    label: "Elite Enterprise Infrastructure",
                    desc: "Backed by the world's most resilient cloud servers and cutting-edge security protocols to ensure absolute data sovereignty and system availability."
                },
                {
                    label: "Strategic Administrative Hierarchy",
                    desc: "Meticulously designed with a high-level user interface that simplifies complex global configurations, allowing superadmins to manage entire school ecosystems with precision."
                }
            ]
        },
        SetuAccounts: {
            title: "SetuAccounts",
            description: "A comprehensive, high-precision financial suite engineered for absolute fiscal oversight, ledger auditing, and automated institutional billing.",
            image: setuAccount, //
            features: [
                {
                    label: "Advanced Financial Sovereignty",
                    desc: "Backed by real-time reconciliation engines and military-grade encryption to ensure every transaction is secure, traceable, and error-free."
                },
                {
                    label: "Strategic Fiscal Hierarchy",
                    desc: "Meticulously designed to simplify complex school fee structures and vendor management, allowing finance teams to govern budgets with surgical precision."
                }
            ]
        },
        SetuGuru: {
            title: "SetuGuru",
            description: "A streamlined pedagogical workspace that removes administrative friction, allowing educators to reclaim their time for high-impact student mentorship.",
            image: setuGuru, //
            features: [
                {
                    label: "Real-Time Academic Synchronicity",
                    desc: "A unified mobile experience that bridges the gap between lesson delivery and student performance tracking, ensuring no learner is left behind."
                },
                {
                    label: "Effortless Classroom Orchestration",
                    desc: "Intuitively designed to handle the 'heavy lifting' of attendance, scheduling, and grading, empowering teachers to focus on inspiration."
                }
            ]
        },
        SetuStudent: {
            title: "SetuStudent",
            description: "An immersive digital campus engineered to foster student agency, academic accountability, and personalized learning pathways.",
            image: setuStudent,
            features: [
                {
                    label: "Dynamic Progress Visualization",
                    desc: "Provides students with a high-level view of their academic journey, turning milestones into visual achievements that drive consistent engagement."
                },
                {
                    label: "Centralized Resource Hub",
                    desc: "A one-stop repository for assignments, study materials, and performance feedback, accessible anywhere to ensure learning never stops."
                }
            ]
        },
        SetuParents: {
            title: "SetuParents",
            description: "Dedicated window into the student's daily school life, providing parents with real-time reassurance and meaningful engagements.",
            image: setuParent, //
            features: [
                {
                    label: "Proactive Safety and Attendance Alerts",
                    desc: "Instant connectivity that keeps families informed of their child's well-being and campus participation through secure, direct-to-device notifications."
                },
                {
                    label: "Holistic Development Insights",
                    desc: "Beyond just grades, this interface offers a comprehensive view of a child's social and academic evolution, strengthening the bond between home and school."
                }
            ]
        }
    };

    const current = tabData[activeTab as keyof typeof tabData];

    return (
        <section className="py-20 px-4 bg-white">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-4xl font-bold text-[#2D3142] mb-2">Built For Everyone</h2>
                <p className="text-gray-500 mb-4">Connect administrators, teachers, students, and parents with one intelligent platform.</p>
                <div className="w-12 h-1 bg-red-500 mx-auto mb-10"></div>

                {/* Tab Selection */}
                <div className="flex flex-wrap justify-center gap-3 mb-16">
                    {Object.keys(tabData).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2 rounded-xl border text-sm font-semibold transition-all duration-300 ${activeTab === tab
                                    ? 'border-[#5D3FD3] text-[#5D3FD3] bg-[#F3F0FF] shadow-md scale-105'
                                    : 'border-gray-200 text-gray-400 hover:border-gray-300'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content Area with Animation Key to trigger re-renders */}
                <div key={activeTab} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="relative max-w-4xl mx-auto mb-12">
                        <img
                            src={current.image}
                            alt={current.title}
                            className="w-full h-auto object-contain drop-shadow-2xl"
                        />
                    </div>

                    <div className="max-w-4xl mx-auto text-left">
                        <p className="text-gray-600 text-center text-lg font-medium mb-12 px-6">
                            {current.description}
                        </p>

                        <div className="grid gap-10 md:px-10">
                            {current.features.map((feature, idx) => (
                                <div key={idx} className="flex gap-5 items-start">
                                    <div className="mt-1 bg-green-50 p-1.5 rounded-full shrink-0">
                                        <Check className="w-5 h-5 text-green-600 stroke-[3px]" />
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-[#2D3142] mb-2">{feature.label}</h4>
                                        <p className="text-gray-500 leading-relaxed text-base">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BuiltForEveryone;