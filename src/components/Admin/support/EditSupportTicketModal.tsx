import React, { useEffect, useState } from 'react';
import type { SupportTicket, SupportTicketForm } from '../../../types/support.types';
import { Ticket, X } from 'lucide-react';

interface EditSupportTicketModalProps {
    isOpen: boolean;
    ticket: SupportTicket | null;
    onSubmit: (id: string, ticket: SupportTicketForm) => void;
    onClose: () => void;
    isLoading: boolean;
}

const issueTypes = [
    { key: "FEATURE REQUEST", value: "feature_request" },
    { key: "BUG REPORT", value: "bug_report" },
    { key: "GENERAL INQUIRY", value: "general_inquiry" },
    { key: "BILLING", value: "billing" },
    { key: "OTHER", value: "other" },
];


export const EditSupportTicketModal: React.FC<EditSupportTicketModalProps> = ({ isOpen, ticket, onClose, onSubmit, isLoading }) => {

    const [formData, setFormData] = useState<SupportTicketForm>({
        title: "",
        description: "",
        type: "general_inquiry"
        // status: ""
    });
    useEffect(() => {
        if (isOpen && ticket) {
            setFormData({ ...ticket });
        } else if (!isOpen) {
            setFormData({
                title: "",
                description: "",
                type: "general_inquiry"
            });
        }
    }, [isOpen, ticket]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isLoading) return;

        if (ticket) {
            onSubmit(ticket.id, formData);
            onClose();
        }
        setFormData({
            title: "",
            description: "",
            type: "general_inquiry"
        })
    };

    if (!isOpen) return null;

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50'>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <Ticket className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">Edit Support Ticket</h2>
                    </div>
                    <button onClick={onClose} disabled={isLoading}>
                        <X className="w-5 h-5" />
                    </button>
                </div>
                <div className="p-6 space-y-4">
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

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Select issue type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500`}
                        >
                            <option value="">-- Select Issue Type --</option>
                            {issueTypes.map(type => (
                                <option key={type.key} value={type.value}>
                                    {type.key}
                                </option>
                            ))}
                        </select>
                    </div>

                    <button
                        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        onClick={handleSubmit}
                        disabled={isLoading || !formData.title || !formData.description}
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
        </div>
    );
};