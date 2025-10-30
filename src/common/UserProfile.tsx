import React from 'react';
import {
    X,
    MapPin,
    Phone,
    Mail,
    User,
    Calendar,
    Users,
    Building,
    Shield,
    Bus,
    Home,
    GraduationCap,
    Info,
    CheckCircle,
    XCircle
} from 'lucide-react';
import type { SchoolData } from '../types/partner-school.types';

interface UserProfileProps {
    isOpen?: boolean;
    onClose?: () => void;
    schoolData: SchoolData;
}

export const UserProfile: React.FC<UserProfileProps> = ({
    isOpen = true,
    onClose,
    schoolData
}) => {
    if (!isOpen) return null;

    const getSchoolTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case 'private':
                return 'bg-purple-100 text-purple-800';
            case 'public':
                return 'bg-blue-100 text-blue-800';
            case 'charter':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="w-20 h-20 bg-white rounded-full p-2 shadow-lg">
                            <img
                                src={schoolData.school_logo}
                                alt="School Logo"
                                className="w-full h-full object-cover rounded-full"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = 'https://images.pexels.com/photos/1454360/pexels-photo-1454360.jpeg?auto=compress&cs=tinysrgb&w=200';
                                }}
                            />
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold">{schoolData.name}</h1>
                                {schoolData.verified ? (
                                    <CheckCircle className="w-6 h-6 text-green-300" />
                                ) : (
                                    <XCircle className="w-6 h-6 text-red-300" />
                                )}
                            </div>
                            <p className="text-blue-100 mb-1">{schoolData.details}</p>
                            <div className="flex items-center gap-4 text-sm text-blue-100">
                                <span className="flex items-center gap-1">
                                    <Building className="w-4 h-4" />
                                    Code: {schoolData.school_code}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSchoolTypeColor(schoolData.school_type)}`}>
                                    {schoolData.school_type.charAt(0).toUpperCase() + schoolData.school_type.slice(1)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* School Image */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    School Campus
                                </h3>
                                <img
                                    src={schoolData.image}
                                    alt="School Building"
                                    className="w-full h-48 object-cover rounded-lg shadow-md"
                                    onError={(e) => {
                                        const target = e.target as HTMLImageElement;
                                        target.src = 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800';
                                    }}
                                />
                            </div>

                            {/* Contact Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Phone className="w-5 h-5" />
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{schoolData.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{schoolData.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{schoolData.principal_contact}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Location */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Location
                                </h3>
                                <div className="space-y-2 text-gray-700">
                                    <p>{schoolData.address}</p>
                                    <p>{schoolData.city}, {schoolData.state} {schoolData.postal_code}</p>
                                    <p className="text-sm text-gray-500">District: {schoolData.district}</p>
                                    <div className="text-xs text-gray-400 mt-2">
                                        <p>Coordinates: {schoolData.latitude}, {schoolData.longitude}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Principal Information */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Principal Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700 font-medium">{schoolData.principal_name}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span className="text-gray-700">{schoolData.principal_contact}</span>
                                    </div>
                                </div>
                            </div>

                            {/* School Details */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Info className="w-5 h-5" />
                                    School Details
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Established</p>
                                            <p className="font-medium text-gray-700">{schoolData.established_year}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Capacity</p>
                                            <p className="font-medium text-gray-700">{schoolData.student_capacity}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <GraduationCap className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Grade Range</p>
                                            <p className="font-medium text-gray-700">{schoolData.grade_range}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Shield className="w-4 h-4 text-gray-500" />
                                        <div>
                                            <p className="text-xs text-gray-500">Status</p>
                                            <p className={`font-medium ${schoolData.verified ? 'text-green-600' : 'text-red-600'}`}>
                                                {schoolData.verified ? 'Verified' : 'Unverified'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Facilities */}
                            <div className="bg-gray-50 rounded-lg p-4">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Facilities
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex items-center gap-3">
                                        <Bus className={`w-5 h-5 ${schoolData.has_transport ? 'text-green-500' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Transportation</p>
                                            <p className={`text-xs ${schoolData.has_transport ? 'text-green-600' : 'text-gray-500'}`}>
                                                {schoolData.has_transport ? 'Available' : 'Not Available'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Home className={`w-5 h-5 ${schoolData.has_hostel ? 'text-green-500' : 'text-gray-400'}`} />
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">Hostel</p>
                                            <p className={`text-xs ${schoolData.has_hostel ? 'text-green-600' : 'text-gray-500'}`}>
                                                {schoolData.has_hostel ? 'Available' : 'Not Available'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                <h3 className="text-lg font-semibold text-blue-900 mb-2">About the School</h3>
                                <p className="text-blue-800 text-sm leading-relaxed">{schoolData.details}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                            Last updated: {schoolData.updatedAt ? new Date(schoolData.updatedAt).toLocaleDateString() : new Date().toLocaleDateString()}
                        </div>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};