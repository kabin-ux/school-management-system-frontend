import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import type { SuperAdmin } from '../../../hooks/useSuperAdmin';
import type { SuperAdminForm } from '../../../types/super-admin-super-admins.types';

interface EditSuperAdminModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, superAdmin: SuperAdminForm) => void;
    superAdmin: SuperAdmin | null;
    isLoading?: boolean;
}

const EditSuperAdminModal: React.FC<EditSuperAdminModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    superAdmin,
    isLoading
}) => {
    const [formData, setFormData] = useState<SuperAdminForm>({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone_number: '',
        address: '',
        status: 'active',
        created_by: null,
        profile_image: null,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [touched, setTouched] = useState<Record<string, boolean>>({});

    useEffect(() => {
        if (isOpen && superAdmin) {
            setFormData({
                ...superAdmin,
                password: '', // Don't pre-fill password for security
            });
            setErrors({});
            setTouched({});
        } else if (!isOpen) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                phone_number: '',
                address: '',
                status: 'active',
                created_by: null,
                profile_image: null,
            });
            setErrors({});
            setTouched({});
        }
    }, [isOpen, superAdmin]);

    const validateField = (name: string, value: any) => {
        switch (name) {
            case 'firstName':
            case 'lastName':
                return !value.trim() ? `${name === 'firstName' ? 'First' : 'Last'} name is required` : '';
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!value.trim()) return 'Email is required';
                if (!emailRegex.test(value)) return 'Invalid email address';
                return '';
            case 'phone_number':
                if (!value.trim()) return 'Phone number is required';
                if (!/^\d{10,15}$/.test(value)) return 'Enter a valid phone number';
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
        // Skip password validation for edit (it's optional)
        const fieldsToValidate = ['firstName', 'lastName', 'email', 'phone_number'];
        fieldsToValidate.forEach(key => {
            const error = validateField(key, formData[key as keyof typeof formData]);
            if (error) newErrors[key] = error;
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));
        if (validateForm() && superAdmin) {
            // If password is empty, remove it from the update data
            const updateData = { ...formData };
            if (!updateData || !updateData.password?.trim()) {
                delete updateData.password;
            }
            onSubmit(superAdmin?.id, updateData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                {/* Header */}
                <div className="bg-green-600 text-white p-4 flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">Edit Super Admin</h2>
                    </div>
                    <button onClick={onClose} disabled={isLoading}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* First Name */}
                        <div>
                            <label className="block text-sm font-medium">First Name *</label>
                            <input
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.firstName && <p className="text-xs text-red-500">{errors.firstName}</p>}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="block text-sm font-medium">Last Name *</label>
                            <input
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.lastName && <p className="text-xs text-red-500">{errors.lastName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium">Password (leave blank to keep current)</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter new password or leave blank"
                            />
                            {errors.password && <p className="text-xs text-red-500">{errors.password}</p>}
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-sm font-medium">Phone *</label>
                            <input
                                type="tel"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleInputChange}
                                onBlur={handleBlur}
                                className={`w-full px-3 py-2 border rounded-lg ${errors.phone_number ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.phone_number && <p className="text-xs text-red-500">{errors.phone_number}</p>}
                        </div>

                        {/* Status */}
                        <div>
                            <label className="block text-sm font-medium">Status</label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            >
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <label className="block text-sm font-medium">Address</label>
                        <textarea
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            rows={3}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-medium">Profile Image (URL)</label>
                        <input
                            type="url"
                            name="profile_image"
                            value={formData.profile_image ?? ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                        >
                            {isLoading ? 'Updating...' : 'Update Super Admin'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditSuperAdminModal;