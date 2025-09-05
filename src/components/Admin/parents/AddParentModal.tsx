import React, { useState, useEffect } from 'react';
import { X, User, Mail, Phone, MapPin, Users } from 'lucide-react'; // Added Users icon
import type { Student } from '../../../features/studentSlice';

interface Parent {
    id?: number;
    name: string;
    email: string;
    phone: string;
    address?: string;
    relation: string;
    occupation: string;
    student_id: string; // New field
}

interface AddParentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (parent: Omit<Parent, 'id'>) => void;
    isLoading?: boolean;
    students: Student[]; // Provided list of students
}

const AddParentModal: React.FC<AddParentModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading = false,
    students
}) => {
    const [formData, setFormData] = useState<Omit<Parent, 'id'>>({
        name: '',
        email: '',
        phone: '',
        relation: '',
        occupation: '',
        address: '',
        student_id: '', 
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                relation: '',
                occupation: '',
                address: '',
                student_id: '',
            });
            setErrors({});
            setTouched({});
        }
    }, [isOpen]);

    const validateField = (name: string, value: any) => {
        switch (name) {
            case 'name':
                if (!value.trim()) return 'Name is required';
                return '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value)) return 'Please enter a valid email address';
                return '';
            case 'phone':
                if (!value.trim()) return 'Phone number is required';
                if (!/^\+?[\d\s-()]{10,}$/.test(value)) return 'Please enter a valid phone number';
                return '';
            case 'student_id':
                if (!value.trim()) return 'Student selection is required';
                return '';
            default:
                return '';
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        Object.keys(formData).forEach(key => {
            if (key !== 'address') {
                const error = validateField(key, formData[key as keyof typeof formData]);
                if (error) newErrors[key] = error;
            }
        });

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Mark all fields as touched
        const allFields = Object.keys(formData);
        setTouched(allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}));

        if (validateForm()) {
            onSubmit(formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <User className="w-6 h-6" />
                        <h2 className="text-xl font-semibold">Add New Parent</h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-white hover:text-gray-200 transition-colors"
                        disabled={isLoading}
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Form */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-medium text-gray-900 border-b pb-2">Personal Information</h3>

                            {/* Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    First Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter first name"
                                />
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Mail className="w-4 h-4 inline mr-1" />
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter email address"
                                />
                                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Phone className="w-4 h-4 inline mr-1" />
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter phone number"
                                />
                                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                            </div>

                            {/* Address */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <MapPin className="w-4 h-4 inline mr-1" />
                                    Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Enter address"
                                />
                            </div>
                        </div>

                        {/* Professional Information */}
                        <div className="space-y-4">
                            {/* Occupation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Occupation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="occupation"
                                    value={formData.occupation}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.occupation ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter occupation"
                                />
                                {errors.occupation && <p className="text-red-500 text-xs mt-1">{errors.occupation}</p>}
                            </div>

                            {/* Relation */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Relation <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="relation"
                                    value={formData.relation}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.relation ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                    placeholder="Enter relation"
                                />
                                {errors.relation && <p className="text-red-500 text-xs mt-1">{errors.relation}</p>}
                            </div>

                            {/* Student Dropdown */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    <Users className="w-4 h-4 inline mr-1" />
                                    Select Student <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="student_id"
                                    value={formData.student_id}
                                    onChange={handleInputChange}
                                    onBlur={handleBlur}
                                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.student_id ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                >
                                    <option value="">-- Select a student --</option>
                                    {students.map(student => (
                                        <option key={student.id} value={student.id}>
                                            {student.firstName} {student.lastName}
                                        </option>
                                    ))}
                                </select>
                                {errors.student_id && <p className="text-red-500 text-xs mt-1">{errors.student_id}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Form Actions */}
                    <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
                            onClick={handleSubmit}
                        >
                            {isLoading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    Adding Parent...
                                </>
                            ) : (
                                'Add Parent'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddParentModal;
