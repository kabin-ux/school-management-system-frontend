import React from 'react';

interface Contact {
  id: number;
  name: string;
  message: string;
  time: string;
  avatar: string;
  online: boolean;
}

interface ContactListProps {
  contacts: Contact[];
  selectedContact: string;
  setSelectedContact: (contact: string) => void;
}

export const ContactList: React.FC<ContactListProps> = ({ contacts, selectedContact, setSelectedContact }) => {
  return (
    <div className="w-1/3 border-r border-gray-200">
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search students..."
          className="w-full outline-none px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
      
      <div className="p-4">
        <div className="flex space-x-4 mb-4">
          <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">All</button>
          <button className="px-3 py-1 text-gray-600 rounded-full text-sm hover:bg-gray-100">Unread</button>
        </div>
      </div>

      <div className="overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact.name)}
            className={`flex items-center p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50 ${
              selectedContact === contact.name ? 'bg-blue-50 border-r-2 border-r-blue-600' : ''
            }`}
          >
            <div className="relative">
              <img
                src={contact.avatar}
                alt={contact.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {contact.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
              )}
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <h4 className="font-medium text-gray-900 truncate">{contact.name}</h4>
              <p className="text-sm text-gray-600 truncate">{contact.message}</p>
            </div>
            <div className="text-xs text-gray-500">
              {contact.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};