import React from 'react';
import { Phone, Video, MoreHorizontal, Mic, Image, Smile, Send } from 'lucide-react';
import type { Message } from '../../../types/communication.types';

interface ChatAreaProps {
  messages: Message[];
  message: string;
  setMessage: (message: string) => void;
}

export const ChatArea: React.FC<ChatAreaProps> = ({ messages, message, setMessage }) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center">
          <img
            src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=150&h=150&fit=crop&crop=face"
            alt="Aura margaret"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="ml-3">
            <h4 className="font-medium text-gray-900">Sofia Carter</h4>
            <p className="text-sm text-green-600">online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Phone className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Video className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                msg.type === 'sent' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white text-gray-900 shadow-sm'
              }`}>
                {msg.isImage ? (
                  <div className="w-48 h-32 bg-gray-200 rounded-lg"></div>
                ) : (
                  <div className="w-48 h-16 bg-current opacity-20 rounded"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200 bg-white">
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Mic className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Image className="w-5 h-5" />
          </button>
          <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg">
            <Smile className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your message..."
            className="flex-1 outline-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};