import React from 'react';
import { Home, BookOpen, User } from 'lucide-react';
import LoginCard from './LoginCard';

const WebPortalSection: React.FC = () => {
    const loginCards = [
        {
            icon: Home,
            title: "Login as Super Admin",
            description: "The Principals are the super admin who controls everything.",
            buttonText: "Login as Super Admin"
        },
        {
            icon: BookOpen,
            title: "Login as Super Admin",
            description: "The Principal Schools are Admin who manage all the features.",
            buttonText: "Login as Admin"
        },
        {
            icon: User,
            title: "Login as Accountant",
            description: "Accountant is hired by Schools to manage the accounts.",
            buttonText: "Login as Accountant"
        }
    ];

    return (
        <section className="py-16 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-4xl font-bold text-gray-900 mb-2">
                    Continue with <span className="text-[#CBD72B]">Web Portal</span>
                </h2>
                <p className="text-gray-600 mb-12 font-normal">
                    For school administrators and account managers —<br />
                    access advanced school management features here.
                </p>

                <div className="grid md:grid-cols-3 gap-8">
                    {loginCards.map((card, index) => (
                        <LoginCard
                            key={index}
                            icon={card.icon}
                            title={card.title}
                            description={card.description}
                            buttonText={card.buttonText}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WebPortalSection;