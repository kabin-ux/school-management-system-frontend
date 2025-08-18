import React from 'react';
import { ChatArea } from './ChatArea';
import { ContactList } from './ContactList';

interface Contact {
    id: number;
    name: string;
    message: string;
    time: string;
    avatar: string;
    online: boolean;
}

interface Message {
    type: string;
    content: string;
    isImage?: boolean;
}

interface ChatInterfaceProps {
    contacts: Contact[];
    messages: Message[];
    selectedContact: string;
    setSelectedContact: (contact: string) => void;
    message: string;
    setMessage: (message: string) => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
    contacts,
    messages,
    selectedContact,
    setSelectedContact,
    message,
    setMessage
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full flex">
            <ContactList
                contacts={contacts}
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
            />
            <ChatArea
                messages={messages}
                message={message}
                setMessage={setMessage}
            />
        </div>
    );
};