'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { X, Power, Filter, CheckCircle, AlertCircle } from 'lucide-react';
import type { Student } from '../../../types/student.types';
import type { Grade } from '../../../types/class.types';
import { useSectionsByClass } from '../../../hooks/useSection';
import toast from 'react-hot-toast';
import { useUpdateStudentStatusBulk } from '../../../hooks/useStudents';

interface BulkStatusUpdateModalProps {
    isOpen: boolean;
    onClose: () => void;
    classes: Grade[];
    students: Student[];
}

const BulkStatusUpdateModal: React.FC<BulkStatusUpdateModalProps> = ({
    isOpen,
    onClose,
    classes,
    students,
}) => {
    const [formData, setFormData] = useState({
        source_class_id: '',
        source_section_id: '',
        target_status: '' as 'ACTIVE' | 'INACTIVE' | '',
    });
    const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

    const statusMutation = useUpdateStudentStatusBulk();

    // Fetch sections for the selected class
    const { data: sourceSections = [] } = useSectionsByClass(formData.source_class_id);

    // Filter students based on source class + section
    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesClass = String(student.class_id) === formData.source_class_id;
            const matchesSection = !formData.source_section_id || String(student.section_id) === formData.source_section_id;
            return matchesClass && matchesSection;
        });
    }, [students, formData.source_class_id, formData.source_section_id]);

    // Auto-select students when filters change
    useEffect(() => {
        if (formData.source_class_id) {
            setSelectedStudentIds(filteredStudents.map(s => s.id));
        } else {
            setSelectedStudentIds([]);
        }
    }, [filteredStudents, formData.source_class_id, formData.source_section_id]);

    // Reset form when modal opens
    useEffect(() => {
        if (isOpen) {
            setFormData({
                source_class_id: '',
                source_section_id: '',
                target_status: '',
            });
            setSelectedStudentIds([]);
        }
    }, [isOpen]);

    const handleSelectAll = () => {
        if (selectedStudentIds.length === filteredStudents.length) {
            setSelectedStudentIds([]);
        } else {
            setSelectedStudentIds(filteredStudents.map(s => s.id));
        }
    };

    const handleStudentToggle = (studentId: string) => {
        setSelectedStudentIds(prev =>
            prev.includes(studentId)
                ? prev.filter(id => id !== studentId)
                : [...prev, studentId]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.source_class_id || !formData.target_status || selectedStudentIds.length === 0) {
            toast.error('Please select a class, status, and at least one student');
            return;
        }

        statusMutation.mutate({
            students_id: selectedStudentIds,
            status: formData.target_status,
        }, {
            onSuccess: () => {
                toast.success('Statuses updated successfully');
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-t-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Power className="w-6 h-6" />
                        <h2 className="text-2xl font-bold">Bulk Status Update</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Filters & Status Select */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Source Class *</label>
                                <select
                                    value={formData.source_class_id}
                                    onChange={(e) => setFormData({ ...formData, source_class_id: e.target.value, source_section_id: '' })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500"
                                    required
                                >
                                    <option value="">Select class</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>{cls.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">Source Section</label>
                                <select
                                    value={formData.source_section_id}
                                    onChange={(e) => setFormData({ ...formData, source_section_id: e.target.value })}
                                    disabled={!formData.source_class_id || sourceSections.length === 0}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 disabled:bg-gray-100"
                                >
                                    <option value="">All Sections</option>
                                    {sourceSections.map((section: any) => (
                                        <option key={section.id} value={section.id}>{section.section_name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">New Status *</label>
                                <select
                                    value={formData.target_status}
                                    onChange={(e) => setFormData({ ...formData, target_status: e.target.value as any })}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 font-medium"
                                    required
                                >
                                    <option value="">Set status to...</option>
                                    <option value="ACTIVE" className="text-green-600 font-semibold">ACTIVE</option>
                                    <option value="INACTIVE" className="text-red-600 font-semibold">INACTIVE</option>
                                </select>
                            </div>
                        </div>

                        {/* Selection Area */}
                        <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl flex justify-between items-center">
                                    <div className="flex items-center gap-2">
                                        <Filter className="w-5 h-5 text-emerald-600" />
                                        <span className="font-semibold text-gray-900">
                                            Students Selected: ({selectedStudentIds.length} / {filteredStudents.length})
                                        </span>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={handleSelectAll}
                                        disabled={filteredStudents.length === 0}
                                        className="px-3 py-1 text-sm font-medium rounded-lg bg-emerald-600 text-white hover:bg-emerald-700 disabled:opacity-50"
                                    >
                                        {selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0 ? 'Deselect All' : 'Select All'}
                                    </button>
                                </div>

                                <div className="max-h-80 overflow-y-auto">
                                    {filteredStudents.length === 0 ? (
                                        <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-2">
                                            <AlertCircle className="w-8 h-8 opacity-20" />
                                            <p>{formData.source_class_id ? 'No students found matching these filters.' : 'Please select a source class to view students.'}</p>
                                        </div>
                                    ) : (
                                        filteredStudents.map((student) => (
                                            <label key={student.id} className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 cursor-pointer group">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudentIds.includes(student.id)}
                                                    onChange={() => handleStudentToggle(student.id)}
                                                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                                                />
                                                <div className="ml-3 flex-1">
                                                    <div className="font-medium text-gray-900 group-hover:text-emerald-600 transition-colors">
                                                        {student.firstName} {student.lastName}
                                                    </div>
                                                    <div className="text-xs text-gray-500">
                                                        Current Status:
                                                        <span className={`ml-1 font-bold ${student.status === 'ACTIVE' ? 'text-green-600' : 'text-red-500'}`}>
                                                            {student.status}
                                                        </span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={statusMutation.isPending}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={statusMutation.isPending || selectedStudentIds.length === 0 || !formData.target_status}
                                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg hover:from-emerald-700 hover:to-teal-700 disabled:opacity-50 flex items-center gap-2 shadow-lg transition-all"
                            >
                                {statusMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    <>
                                        <CheckCircle className="w-4 h-4" />
                                        Update {selectedStudentIds.length} Student{selectedStudentIds.length !== 1 ? 's' : ''}
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BulkStatusUpdateModal;