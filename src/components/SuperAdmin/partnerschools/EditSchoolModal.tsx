import React, { useState } from "react";
import { X, School, MapPin, Phone, User, Users } from "lucide-react";
import type { SchoolData } from "./AddSchoolModal";

// interface SchoolData {
//     name: string;
//     address: string;
//     district: string;
//     city: string;
//     state: string;
//     postal_code: string | number;
//     latitude: string | number;
//     longitude: string | number;
//     phone: string;
//     email: string;
//     password: string;
//     image: string;
//     verified: boolean;
//     principal_name: string;
//     principal_contact: string;
//     contact: string;
//     school_type: string;
//     has_transport: boolean;
//     established_year: string | number;
//     student_capacity: string | number;
//     school_code: string | number;
//     details: string;
//     grade_range: string;
//     has_hostel: boolean;
//     school_logo: string;
// }

interface EditSchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SchoolData, id: any) => void;
    school?: SchoolData
}

export const EditSchoolModal: React.FC<EditSchoolModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    school,
}) => {
    const [formData, setFormData] = useState<SchoolData>({
        name: "",
        address: "",
        district: "",
        city: "",
        state: "",
        postal_code: "",
        latitude: "",
        longitude: "",
        phone: "",
        email: "",
        password: "",
        image: "",
        verified: false,
        principal_name: "",
        principal_contact: "",
        contact: "",
        school_type: "public",
        has_transport: false,
        established_year: "",
        student_capacity: "",
        school_code: "",
        details: "",
        grade_range: "",
        has_hostel: false,
        school_logo: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [currentTab, setCurrentTab] = useState("basic");

    const handleInputChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]:
                type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.state) newErrors.state = "State is required";

        if (formData.postal_code && isNaN(Number(formData.postal_code))) {
            newErrors.postal_code = "Postal code must be a number";
        }

        if (formData.latitude && isNaN(Number(formData.latitude))) {
            newErrors.latitude = "Latitude must be a number";
        }

        if (formData.longitude && isNaN(Number(formData.longitude))) {
            newErrors.longitude = "Longitude must be a number";
        }

        if (formData.established_year && isNaN(Number(formData.established_year))) {
            newErrors.established_year = "Established year must be a number";
        }

        if (formData.student_capacity && isNaN(Number(formData.student_capacity))) {
            newErrors.student_capacity = "Student capacity must be a number";
        }

        if (formData.school_code && isNaN(Number(formData.school_code))) {
            newErrors.school_code = "School code must be a number";
        }

        if (formData.image && !/^https?:\/\/.+\..+/.test(formData.image)) {
            newErrors.image = "Invalid URL";
        }

        if (formData.school_logo && !/^https?:\/\/.+\..+/.test(formData.school_logo)) {
            newErrors.school_logo = "Invalid URL";
        }

        if (formData.details) {
            const wordCount = formData.details.trim().split(/\s+/).length;
            if (wordCount < 10) {
                newErrors.details = "School details should be at least 50 words";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        console.log("Submit clicked");  // Debug

        if (!validateForm()) return;

        const payload: SchoolData = {
            ...formData,
            postal_code: Number(formData.postal_code) || "",
            latitude: Number(formData.latitude) || "",
            longitude: Number(formData.longitude) || "",
            established_year: Number(formData.established_year) || "",
            student_capacity: Number(formData.student_capacity) || "",
            school_code: Number(formData.school_code) || "",
        };
        console.log(payload)

        onSubmit(payload, school?.id);
        onClose();
    };

    if (!isOpen) return null;

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: School },
        { id: 'location', label: 'Location', icon: MapPin },
        { id: 'contact', label: 'Contact', icon: Phone },
        { id: 'administration', label: 'Administration', icon: User },
        { id: 'additional', label: 'Additional', icon: Users }
    ];

    const renderTabContent = () => {
        switch (currentTab) {
            case 'basic':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={school?.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Code *</label>
                            <input
                                type="number"
                                name="school_code"
                                value={school?.school_code}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.school_code && <p className="text-red-500 text-sm mt-1">{errors.school_code}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Type *</label>
                            <select
                                name="school_type"
                                value={school?.school_type}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                                <option value="charter">Charter</option>
                            </select>
                            {errors.school_type && <p className="text-red-500 text-sm mt-1">{errors.school_type}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Range</label>
                            <input
                                type="text"
                                name="grade_range"
                                value={school?.grade_range}
                                onChange={handleInputChange}
                                placeholder="e.g., K-12, 1-8"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.grade_range && <p className="text-red-500 text-sm mt-1">{errors.grade_range}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                            <input
                                type="number"
                                name="established_year"
                                value={school?.established_year}
                                onChange={handleInputChange}
                                min="1800"
                                max="2024"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.established_year && <p className="text-red-500 text-sm mt-1">{errors.established_year}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student Capacity</label>
                            <input
                                type="number"
                                name="student_capacity"
                                value={school?.student_capacity}
                                onChange={handleInputChange}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.student_capacity && <p className="text-red-500 text-sm mt-1">{errors.student_capacity}</p>}
                        </div>
                    </div>
                );

            case 'location':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                            <input
                                type="text"
                                name="address"
                                value={school?.address}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                <input
                                    type="text"
                                    name="city"
                                    value={school?.city}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                <input
                                    type="text"
                                    name="state"
                                    value={school?.state}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District</label>
                                <input
                                    type="text"
                                    name="district"
                                    value={school?.district}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="text"
                                    name="postal_code"
                                    value={school?.postal_code}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    name="latitude"
                                    value={school?.latitude}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    name="longitude"
                                    value={school?.longitude}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude}</p>}
                            </div>
                        </div>
                    </div>
                );

            case 'contact':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Primary Phone *</label>
                            <input
                                type="tel"
                                name="phone"
                                value={school?.phone}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Alternative Contact</label>
                            <input
                                type="tel"
                                name="contact"
                                value={school?.contact}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.contact && <p className="text-red-500 text-sm mt-1">{errors.contact}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                name="email"
                                value={school?.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                            <input
                                type="password"
                                name="password"
                                value={school?.password}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Image URL</label>
                            <input
                                type="url"
                                name="image"
                                value={school?.image}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Logo URL</label>
                            <input
                                type="url"
                                name="school_logo"
                                value={school?.school_logo}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.school_logo && <p className="text-red-500 text-sm mt-1">{errors.school_logo}</p>}
                        </div>
                    </div>
                );

            case 'administration':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name</label>
                            <input
                                type="text"
                                name="principal_name"
                                value={school?.principal_name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.principal_name && <p className="text-red-500 text-sm mt-1">{errors.principal_name}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Contact</label>
                            <input
                                type="tel"
                                name="principal_contact"
                                value={school?.principal_contact}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.principal_contact && <p className="text-red-500 text-sm mt-1">{errors.principal_contact}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="verified"
                                checked={school?.verified}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Verified School</label>
                            {errors.verified && <p className="text-red-500 text-sm mt-1">{errors.verified}</p>}
                        </div>
                    </div>
                );

            case 'additional':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Details</label>
                            <textarea
                                name="details"
                                value={school?.details}
                                onChange={handleInputChange}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Describe the school's facilities, programs, and highlights..."
                            />
                            {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="has_transport"
                                checked={school?.has_transport}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Has Transportation</label>
                            {errors.has_transport && <p className="text-red-500 text-sm mt-1">{errors.has_transport}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="has_hostel"
                                checked={school?.has_hostel}
                                onChange={handleInputChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Has Hostel Facilities</label>
                            {errors.has_hostel && <p className="text-red-500 text-sm mt-1">{errors.has_hostel}</p>}

                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Edit School</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex overflow-x-auto border-b border-gray-200">
                    {tabs.map((tab) => {
                        const IconComponent = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setCurrentTab(tab.id)}
                                className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${currentTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <IconComponent size={16} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Form Content */}
                <div className="flex flex-col h-full">
                    <div className="p-6 overflow-y-auto flex-1">
                        {renderTabContent()}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Add School
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};