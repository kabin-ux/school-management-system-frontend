import React, { useState } from 'react';
import { CommunicationHeader } from '../../../components/Admin/communication/CommunicationHeader';
import { CommunicationTabs } from '../../../components/Admin/communication/CommunicationTabs';
import { ChatInterface } from '../../../components/Admin/communication/ChatInterface';
import { Sidebar } from '../../../components/Admin/layout/Sidebar';
import { AdminDashboardHeader } from '../../../components/Admin/layout/DashboardHeader';
const Communication: React.FC = () => {
    const [activeTab, setActiveTab] = useState('Students');
    const [message, setMessage] = useState('');
    const [selectedContact, setSelectedContact] = useState('Aura margaret');

    const contacts = [
        {
            id: 1,
            name: "Sophia Carter",
            message: "Hey! Are we still on for tonight?",
            time: "09:15",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            online: true,
        },
        {
            id: 2,
            name: "Liam Johnson",
            message: "Sent you the files.",
            time: "10:22",
            avatar: "https://randomuser.me/api/portraits/men/46.jpg",
            online: false,
        },
        {
            id: 3,
            name: "Olivia Brown",
            message: "That’s awesome news 🎉",
            time: "11:05",
            avatar: "https://randomuser.me/api/portraits/women/65.jpg",
            online: true,
        },
        {
            id: 4,
            name: "Ethan Miller",
            message: "Call me when you're free.",
            time: "12:40",
            avatar: "https://randomuser.me/api/portraits/men/52.jpg",
            online: false,
        },
        {
            id: 5,
            name: "Ava Davis",
            message: "Let’s grab lunch tomorrow.",
            time: "13:25",
            avatar: "https://randomuser.me/api/portraits/women/32.jpg",
            online: true,
        },
        {
            id: 6,
            name: "Noah Wilson",
            message: "Check your email please.",
            time: "14:10",
            avatar: "https://randomuser.me/api/portraits/men/71.jpg",
            online: true,
        },
        {
            id: 7,
            name: "Isabella Martinez",
            message: "Thanks for your help ❤️",
            time: "15:45",
            avatar: "https://randomuser.me/api/portraits/women/12.jpg",
            online: false,
        },
        {
            id: 8,
            name: "James Anderson",
            message: "Let’s finish that project.",
            time: "16:30",
            avatar: "https://randomuser.me/api/portraits/men/18.jpg",
            online: true,
        },
        {
            id: 9,
            name: "Mia Thomas",
            message: "Haha 😂 that’s funny!",
            time: "16:48",
            avatar: "https://randomuser.me/api/portraits/women/50.jpg",
            online: false,
        },
        {
            id: 10,
            name: "Benjamin Lee",
            message: "I’ll be there in 5 mins.",
            time: "17:05",
            avatar: "https://randomuser.me/api/portraits/men/28.jpg",
            online: true,
        },
        {
            id: 11,
            name: "Amelia Taylor",
            message: "Can you send me the link?",
            time: "18:20",
            avatar: "https://randomuser.me/api/portraits/women/19.jpg",
            online: true,
        },
        {
            id: 12,
            name: "Lucas Moore",
            message: "Good morning ☀️",
            time: "08:30",
            avatar: "https://randomuser.me/api/portraits/men/36.jpg",
            online: false,
        },
        {
            id: 13,
            name: "Harper White",
            message: "See you at the meeting.",
            time: "19:00",
            avatar: "https://randomuser.me/api/portraits/women/77.jpg",
            online: true,
        },
        {
            id: 14,
            name: "Elijah Harris",
            message: "Congrats on your promotion 🎊",
            time: "20:45",
            avatar: "https://randomuser.me/api/portraits/men/85.jpg",
            online: false,
        },
        {
            id: 15,
            name: "Charlotte Clark",
            message: "Let’s catch up this weekend.",
            time: "21:30",
            avatar: "https://randomuser.me/api/portraits/women/29.jpg",
            online: true,
        },
    ];


    const messages = [
        { type: 'received', content: '', isImage: true },
        { type: 'sent', content: '' },
        { type: 'received', content: '' },
        { type: 'sent', content: '' },
        { type: 'received', content: '' },
        { type: 'sent', content: '' }
    ];

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-col flex-1">
                {/* Header */}
                <AdminDashboardHeader />
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="max-w-7xl mx-auto">
                        <CommunicationHeader />
                        <CommunicationTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                        <ChatInterface
                            contacts={contacts}
                            messages={messages}
                            selectedContact={selectedContact}
                            setSelectedContact={setSelectedContact}
                            message={message}
                            setMessage={setMessage}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Communication;