import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { SectionForm } from '../../../types/class.types';

interface AddSectionModalProps {
    classId: string;
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (section: Omit<SectionForm, 'id'>) => void;
}

const AddSectionModal: React.FC<AddSectionModalProps> = ({
    classId,
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<Omit<SectionForm, 'id'>>({
        section_name: '',
        class_id: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                section_name: '',
                class_id: classId,
            });
            setErrors({});
            setTouched({});
        }
    }, [isOpen]);

    const validateField = (name: string, value: any) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return !value.trim()
                    ? `${name === 'firstName' ? 'First' : 'Last'} name is required`
                    : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value))
                    return 'Please enter a valid email address';
                return '';
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!/^\+?\d{7,15}$/.test(value))
                    return 'Please enter a valid phone number';
                return '';
            case 'dateOfBirth':
                if (!value) return 'Date of birth is required';
                return '';
            case 'password':
                if (!value.trim()) return 'Password is required';
                if (value.length < 6) return 'Password must be at least 6 characters';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors((prev) => ({ ...prev, [name]: error }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(
                key,
                formData[key as keyof typeof formData]
            );
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const allFields = Object.keys(formData);
        setTouched(allFields.reduce((acc, f) => ({ ...acc, [f]: true }), {}));
        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900">Add New Section</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6 text-gray-500" />
                    </button>
                </div>

                {/* Body */}
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Section Name *
                        </label>
                        <input
                            type="text"
                            name="section_name"
                            value={formData.section_name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.section_name ? "border-red-500" : "border-gray-300"
                                }`}
                            placeholder="Enter section name"
                        />
                        {errors.section_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.section_name}</p>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Add Section
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddSectionModal;
