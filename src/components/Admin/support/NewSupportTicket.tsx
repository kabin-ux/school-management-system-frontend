import React, { useState } from 'react';

export const NewSupportTicket: React.FC = () => {
  const [issueTitle, setIssueTitle] = useState('');
  const [issueCategory, setIssueCategory] = useState('App');
  const [description, setDescription] = useState('');

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Support Ticket</h3>
      <p className="text-gray-600 text-sm mb-6">Submit a new support request</p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title *</label>
          <input
            type="text"
            placeholder="Write title of the issue"
            value={issueTitle}
            onChange={(e) => setIssueTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Category *</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="App"
                checked={issueCategory === 'App'}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="mr-2"
              />
              App
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="Website"
                checked={issueCategory === 'Website'}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="mr-2"
              />
              Website
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="category"
                value="Others"
                checked={issueCategory === 'Others'}
                onChange={(e) => setIssueCategory(e.target.value)}
                className="mr-2"
              />
              Others
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            placeholder="Provide the description of the issues"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors">
          Send Ticket
        </button>
      </div>
    </div>
  );
};