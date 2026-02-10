import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DeletePolicyPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleBackToAdmin = () => {
        setIsLoading(true);
        navigate('/admin');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12 bg-white p-10 rounded-2xl shadow-xl border border-slate-200">
                    <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
                        Delete Policy
                    </h1>
                    <p className="text-xl text-slate-600 font-medium">
                        School Management System - Data Deletion Guidelines
                    </p>
                </div>

                {/* Policy Sections */}
                <div className="space-y-8 mb-16">
                    {/* Purpose */}
                    <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-blue-500 pb-4">
                            1. Purpose
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            This policy outlines the procedures for data deletion within the School
                            Management System to ensure compliance with data protection regulations
                            and to maintain data integrity.
                        </p>
                    </section>

                    {/* Scope */}
                    <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-blue-500 pb-4">
                            2. Scope
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            This policy applies to all personal data including student records,
                            staff information, attendance data, and academic records stored within
                            the system.
                        </p>
                    </section>

                    {/* Deletion Procedures */}
                    <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-blue-500 pb-4">
                            3. Deletion Procedures
                        </h2>
                        <ul className="space-y-3 text-lg text-slate-700">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Only authorized administrators can initiate data deletion processes.
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                All deletion requests must be documented with justification and approval from the school principal.
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Soft delete (archiving) is preferred over permanent deletion where possible.
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Permanent deletion requires a 30-day recovery window before complete data purge.
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                System audit logs will maintain deletion records for 5 years.
                            </li>
                        </ul>
                    </section>

                    {/* Authorized Personnel */}
                    <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-blue-500 pb-4">
                            4. Authorized Personnel
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            Only users with "Super Admin" privileges can access deletion functions.
                            Regular staff members have read-only access to sensitive data.
                        </p>
                    </section>

                    {/* Data Recovery */}
                    <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-blue-500 pb-4">
                            5. Data Recovery
                        </h2>
                        <ul className="space-y-3 text-lg text-slate-700">
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Deleted records are moved to a recovery bin for 30 days.
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Admins can restore accidentally deleted data within this period.
                            </li>
                            <li className="flex items-start">
                                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                After 30 days, data is permanently purged and irrecoverable.
                            </li>
                        </ul>
                    </section>

                    {/* Compliance */}
                    <section className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b-4 border-blue-500 pb-4">
                            6. Compliance
                        </h2>
                        <p className="text-lg text-slate-700 leading-relaxed">
                            This policy complies with GDPR, local data protection laws, and
                            educational data retention standards applicable to our institution.
                        </p>
                    </section>
                </div>

                {/* Footer */}
                <div className="text-center bg-white p-8 rounded-xl shadow-lg border border-slate-200 mb-12">
                    <p className="text-slate-600 mb-2">Last updated: February 10, 2026</p>
                    <p className="text-sm text-slate-500">&copy; 2026 School Management System. All rights reserved.</p>
                </div>

                {/* Back Button */}
                <div className="flex justify-center">
                    <button
                        className={`
              px-12 py-4 text-lg font-semibold rounded-2xl shadow-xl transform transition-all duration-300
              bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800
              hover:shadow-2xl hover:-translate-y-1 active:translate-y-0
              disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3
              ${isLoading ? 'animate-pulse' : ''}
            `}
                        onClick={handleBackToAdmin}
                        disabled={isLoading}
                    >
                        {isLoading && (
                            <svg className="animate-spin -ml-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{isLoading ? 'Returning...' : 'Back to Admin'}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeletePolicyPage;
