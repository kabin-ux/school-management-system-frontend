import { Store, Network, LineChart } from 'lucide-react';
import graduation from '../../assets/Vector.png'

const AboutGurukulSetu = () => {
    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold text-[#2D3142] mb-2">Learn About GurukulSetu</h2>
                <p className="text-gray-500">Gain a deeper understanding of how we unify your entire academic network through superior technology and user-centric design.</p>
                <div className="w-12 h-1 bg-red-500 mx-auto mt-4"></div>
            </div>

            <div className="max-w-6xl mx-auto bg-[#EBEBFF] rounded-[40px] p-8 md:p-12 flex flex-col lg:flex-row gap-8">

                {/* Left Stats/Image Column */}
                <div className="lg:w-1/3 flex flex-col gap-6">
                    <div className="bg-[#5D3FD3] text-white p-8 rounded-[30px] flex flex-col items-center text-center">
                        <span className="text-7xl font-bold">1<sup className="text-2xl lowercase">st</sup></span>
                        <p className="mt-4 text-sm font-semibold leading-tight px-4">
                            Nepal's First Fully SAAS Emerging School Management System
                        </p>
                        <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6 text-[10px] opacity-80 border-t border-white/20 pt-4 w-full">
                            <span>• SetuAdmin</span><span>• Teacher</span>
                            <span>• Admin</span><span>• Student</span>
                            <span>• Accountant</span><span>• Parents</span>
                        </div>
                    </div>
                    <div className="rounded-[30px] overflow-hidden bg-white h-full flex items-end">
                        <img
                            src={graduation}
                            alt="Graduating Student"
                            className="w-full h-auto object-cover grayscale"
                        />
                    </div>
                </div>

                {/* Right Content Column */}
                <div className="lg:w-2/3 bg-white rounded-[30px] p-8 md:p-12">
                    <h3 className="text-2xl font-bold text-[#2D3142] mb-8">
                        <span className="text-[#5D3FD3]">Gurukul-Setu</span> is a comprehensive digital platform engineered to bridge the gap between traditional administration and next-generation technology in Nepal.
                    </h3>

                    <div className="space-y-10">
                        {/* Feature 1 */}
                        <div className="flex gap-6">
                            <div className="w-14 h-14 shrink-0 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
                                <Store className="text-[#5D3FD3] w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#2D3142] mb-2">Driven by Innovation</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Gurukul-Setu leads the way in modernizing school management across Nepal, integrating advanced digital tools that simplify how institutions operate and evolve in a competitive landscape.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="flex gap-6">
                            <div className="w-14 h-14 shrink-0 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
                                <Network className="text-[#5D3FD3] w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#2D3142] mb-2">Mastering Complexity</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    We turn complicated administrative tasks into a clear school experience. From fee structures to academic records, our platform ensures every piece of data is easy to understand for both administrators and guardians.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="flex gap-6">
                            <div className="w-14 h-14 shrink-0 bg-[#F3F0FF] rounded-xl flex items-center justify-center">
                                <LineChart className="text-[#5D3FD3] w-6 h-6" />
                            </div>
                            <div>
                                <h4 className="text-lg font-bold text-[#2D3142] mb-2">Fueling Institutional Success</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    By automating manual processes and providing instant analytics, our system allows schools to focus on high-quality education while improving their financial health and student retention rates.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default AboutGurukulSetu;