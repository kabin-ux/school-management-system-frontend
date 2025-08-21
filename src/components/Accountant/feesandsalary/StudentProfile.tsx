import React from 'react';
import { User } from 'lucide-react';
import type { StudentProfile as StudentProfileType } from '../../../types/fee-salary.types';

interface StudentProfileProps {
    profile: StudentProfileType;
}

export const StudentProfile: React.FC<StudentProfileProps> = ({ profile }) => {
    return (
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
            <div className="text-center mb-6">
                <div className="w-24 h-24 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="h-12 w-12 text-gray-500" />
                </div>
                <p className="text-sm text-gray-600">ID: {profile.id}</p>
            </div>

            <div className="space-y-4">
                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Personal Information</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="text-gray-900">{profile.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="text-gray-900">{profile.phone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Class:</span>
                            <span className="text-gray-900">{profile.class}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-900">{profile.email}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 className="font-medium text-gray-900 mb-3">Connected Parents</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-600">Name:</span>
                            <span className="text-gray-900">{profile.parentName}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Relation:</span>
                            <span className="text-gray-900">{profile.parentRelation}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="text-gray-900">{profile.parentPhone}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="text-gray-900">{profile.parentEmail}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
