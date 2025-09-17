import React, { useState } from 'react';
import type { SupportTicketForm } from '../../../types/support.types';

interface NewSupportTicketProps {
  isLoading: boolean;
  onAdd: (ticket: SupportTicketForm) => void;
}

export const NewSupportTicket: React.FC<NewSupportTicketProps> = ({ isLoading, onAdd }) => {

  const [formData, setFormData] = useState<SupportTicketForm>({
    title: "",
    description: "",
    // status: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    onAdd(formData);

    setFormData({
      title: "",
      description: "",
      // status: ""
    })
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">New Support Ticket</h3>
      <p className="text-gray-600 text-sm mb-6">Submit a new support request</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Issue Title *</label>
          <input
            type="text"
            name='title'
            placeholder="Write title of the issue"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* <div>
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
        </div> */}

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            placeholder="Provide the description of the issues"
            name='description'
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <button
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
              <span>Sending...</span>
            </>
          ) : (
            "Send Ticket"
          )}
        </button>
      </div>
    </div>
  );
};