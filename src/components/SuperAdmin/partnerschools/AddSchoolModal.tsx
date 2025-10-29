import React, { useEffect, useState } from "react";
import { X, School, MapPin, Phone, User, Users } from "lucide-react";
import { createSchoolSchema, type SchoolSchema } from "../../../zod-schema/school";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface AddSchoolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: SchoolSchema) => void;
    isLoading: boolean;
}

export const AddSchoolModal: React.FC<AddSchoolModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    isLoading
}) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        clearErrors,
        setError,
        
    } = useForm<SchoolSchema>({
        resolver: zodResolver(createSchoolSchema),
        mode: 'onChange',
        defaultValues: {
            // Basic Info
            name: "",
            school_code: 0,
            school_type: "public",
            grade_range: "",
            established_year: new Date().getFullYear(),
            student_capacity: 1,
            
            // Location
            address: "",
            district: "",
            city: "",
            state: "",
            postal_code: 0,
            latitude: 0,
            longitude: 0,
            
            // Contact
            phone: "",
            email: "",
            password: "",
            image: "",
            school_logo: "",
            
            // Administration
            verified: false,
            principal_name: "",
            principal_contact: "",
            
            // Additional
            has_transport: false,
            has_hostel: false, // Ensure this is always a boolean
            details: "",
        },
    });

    const [currentTab, setCurrentTab] = useState("basic");

    useEffect(() => {
        if (!isOpen) {
            reset();
            clearErrors();
        }
    }, [isOpen, reset, clearErrors]);

    const onFormSubmit = async (data: SchoolSchema) => {
        try {
            await onSubmit(data);
            reset();
            onClose();
        } catch (error) {
            console.error("Form submission error:", error);
            setError("root", {
                message: "Failed to add school. Please try again.",
            });
        }
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
                                {...register("name")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Code *</label>
                            <input
                                type="number"
                                {...register("school_code", { valueAsNumber: true })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.school_code && <p className="text-red-500 text-sm mt-1">{errors.school_code.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Type *</label>
                            <select
                                {...register("school_type")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="public">Public</option>
                                <option value="private">Private</option>
                            </select>
                            {errors.school_type && <p className="text-red-500 text-sm mt-1">{errors.school_type.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Grade Range *</label>
                            <input
                                type="text"
                                {...register("grade_range")}
                                placeholder="e.g., K-12, 1-8"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.grade_range && <p className="text-red-500 text-sm mt-1">{errors.grade_range.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Established Year</label>
                            <input
                                type="number"
                                {...register("established_year", { valueAsNumber: true })}
                                min="1800"
                                max="2025"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.established_year && <p className="text-red-500 text-sm mt-1">{errors.established_year.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Student Capacity</label>
                            <input
                                type="number"
                                {...register("student_capacity", { valueAsNumber: true })}
                                min="1"
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.student_capacity && <p className="text-red-500 text-sm mt-1">{errors.student_capacity.message}</p>}
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
                                {...register("address")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address.message}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                                <input
                                    type="text"
                                    {...register("city")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State *</label>
                                <input
                                    type="text"
                                    {...register("state")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">District *</label>
                                <input
                                    type="text"
                                    {...register("district")}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.district && <p className="text-red-500 text-sm mt-1">{errors.district.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                                <input
                                    type="number"
                                    {...register("postal_code", { valueAsNumber: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code.message}</p>}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Latitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    {...register("latitude", { valueAsNumber: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.latitude && <p className="text-red-500 text-sm mt-1">{errors.latitude.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Longitude</label>
                                <input
                                    type="number"
                                    step="any"
                                    {...register("longitude", { valueAsNumber: true })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                {errors.longitude && <p className="text-red-500 text-sm mt-1">{errors.longitude.message}</p>}
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
                                {...register("phone")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                            <input
                                type="email"
                                {...register("email")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Image URL</label>
                            <input
                                type="url"
                                {...register("image")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Logo URL</label>
                            <input
                                type="url"
                                {...register("school_logo")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.school_logo && <p className="text-red-500 text-sm mt-1">{errors.school_logo.message}</p>}
                        </div>
                    </div>
                );

            case 'administration':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Name *</label>
                            <input
                                type="text"
                                {...register("principal_name")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.principal_name && <p className="text-red-500 text-sm mt-1">{errors.principal_name.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Principal Contact *</label>
                            <input
                                type="tel"
                                {...register("principal_contact")}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.principal_contact && <p className="text-red-500 text-sm mt-1">{errors.principal_contact.message}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                {...register("verified")}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Verified School</label>
                        </div>
                        {errors.verified && <p className="text-red-500 text-sm mt-1">{errors.verified.message}</p>}
                    </div>
                );

            case 'additional':
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">School Details *</label>
                            <textarea
                                {...register("details")}
                                rows={4}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Describe the school's facilities, programs, and highlights (minimum 50 characters)..."
                            />
                            {errors.details && <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>}
                        </div>

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                {...register("has_transport")}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Has Transportation</label>
                        </div>
                        {errors.has_transport && <p className="text-red-500 text-sm mt-1">{errors.has_transport.message}</p>}

                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                {...register("has_hostel")}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="text-sm font-medium text-gray-700">Has Hostel Facilities</label>
                        </div>
                        {errors.has_hostel && <p className="text-red-500 text-sm mt-1">{errors.has_hostel.message}</p>}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800">Add New School</h2>
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
                <form onSubmit={handleSubmit(onFormSubmit)} className="flex flex-col h-full">
                    <div className="p-6 overflow-y-auto flex-1">
                        {renderTabContent()}
                        {errors.root && (
                            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                <p className="text-red-600 text-sm">{errors.root.message}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end space-x-4 p-6 border-t border-gray-200 bg-gray-50">
                        <button
                            type="button"
                            disabled={isLoading || isSubmitting}
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading || isSubmitting}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
                        >
                            {isLoading || isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Adding School...</span>
                                </>
                            ) : (
                                'Add School'
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};