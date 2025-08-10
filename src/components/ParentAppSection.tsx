import type React from "react";
import ParentMockup from "./ParentMockup";


const ParentAppSection: React.FC = () => {
    return (
        <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-gray-900 mb-6">
                            Parent App Portal
                        </h2>
                        <p className="text-gray-600 leading-relaxed mb-8">
                            The Parent App bridges the communication gap between school and home. Parents get instant updates on their child’s attendance, academic performance, behavior reports, and fee payments. They can also receive school announcements, exam schedules, and communicate with teachers directly through the app. With clear visuals and timely alerts, the app helps parents stay involved and supportive in their child’s learning journey.
                        </p>
                    </div>

                    <div className="flex justify-center">
                        <ParentMockup />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParentAppSection;