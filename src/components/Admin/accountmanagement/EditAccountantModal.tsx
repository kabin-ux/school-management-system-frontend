import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import type { Accountant, AccountantForm } from '../../../types/accountant-dashboard.types';

interface EditAccountantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (id: string, updates: AccountantForm) => void;
    accountant?: Accountant | null;
    isLoading?: boolean;
}

const EditAccountantModal: React.FC<EditAccountantModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    accountant,
    isLoading = false,
}) => {
    const [formData, setFormData] = useState<AccountantForm>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        address: '',
        district: '',
        city: '',
        state: '',
        postal_code: '',
        school_id: '',
        password: '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen && accountant) {
            setFormData({ ...accountant });
            setErrors({});
        } else if (!isOpen) {
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dateOfBirth: '',
                address: '',
                district: '',
                city: '',
                state: '',
                postal_code: '',
                school_id: '',
                password: '',
            });
            setErrors({});
        }
    }, [isOpen, accountant]);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'district', 'city', 'state', 'postal_code'];
        requiredFields.forEach(field => {
            if (!formData[field as keyof typeof formData]?.toString().trim()) {
                newErrors[field] = `${field} is required`;
            }
        });
        if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm() && accountant) {
            onSubmit(accountant.id, formData);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
                {/* Header */}
                <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        <h2 className="text-lg font-semibold">Edit Accountant</h2>
                    </div>
                    <button onClick={onClose} disabled={isLoading}>
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {['firstName', 'lastName', 'email', 'phone', 'dateOfBirth', 'address', 'district', 'city', 'state', 'postal_code', 'password'].map(field => (
                            <div key={field}>
                                <label className="block text-sm font-medium">
                                    {field === 'password' ? 'Password' : field.charAt(0).toUpperCase() + field.slice(1)}{field !== 'password' ? ' *' : ''}
                                </label>
                                {field === 'address' ? (
                                    <textarea
                                        name={field}
                                        value={formData[field as keyof typeof formData] ? String(formData[field as keyof typeof formData]) : ''}
                                        onChange={handleInputChange}
                                        rows={3}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                ) : (
                                    <input
                                        type={field === 'password' ? 'password' : field === 'dateOfBirth' ? 'date' : 'text'}
                                        name={field}
                                        value={formData[field as keyof typeof formData] ? String(formData[field as keyof typeof formData]) : ''}
                                        onChange={handleInputChange}
                                        className={`w-full px-3 py-2 border rounded-lg ${errors[field] ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                )}
                                {errors[field] && <p className="text-xs text-red-500">{errors[field]}</p>}
                            </div>
                        ))}
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
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {isLoading ? 'Updating...' : 'Update Accountant'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditAccountantModal;
