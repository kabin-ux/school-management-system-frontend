'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { X, Users, ArrowUp, Filter } from 'lucide-react';
import type { Student } from '../../../types/student.types';
import type { Grade } from '../../../types/class.types';
import { useSectionsByClass } from '../../../hooks/useSection';
import { usePromoteStudentsBulk } from '../../../hooks/useStudents';
import toast from 'react-hot-toast';

interface BulkPromoteStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    classes: Grade[];
    students: Student[];
}

const BulkPromoteStudentModal: React.FC<BulkPromoteStudentModalProps> = ({
    isOpen,
    onClose,
    classes,
    students,
}) => {
    const [formData, setFormData] = useState({
        source_class_id: '',    // ✅ Source class (where students currently are)
        target_class_id: '',    // ✅ Target class (where to promote to)
        target_section_id: '',  // ✅ Target section
    });
    const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);

    const promoteMutation = usePromoteStudentsBulk();

    // ✅ Target sections load based on TARGET class selection
    const { data: targetSections = [] } = useSectionsByClass(formData.target_class_id);

    // ✅ Filter students based on SOURCE class selection
    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            return String(student.class_id) === formData.source_class_id;
        });
    }, [students, formData.source_class_id]);

    // Auto-select all filtered students when source class changes
    useEffect(() => {
        if (formData.source_class_id) {
            setSelectedStudentIds(filteredStudents.map(s => s.id));
        } else {
            setSelectedStudentIds([]);
        }
    }, [filteredStudents, formData.source_class_id]);

    // Reset form when modal opens/closes
    useEffect(() => {
        if (isOpen) {
            setFormData({
                source_class_id: '',
                target_class_id: '',
                target_section_id: ''
            });
            setSelectedStudentIds([]);
        }
    }, [isOpen]);

    const handleSourceClassChange = (classId: string) => {
        setFormData({ ...formData, source_class_id: classId });
    };

    const handleTargetClassChange = (classId: string) => {
        setFormData({
            ...formData,
            target_class_id: classId,
            target_section_id: '' // Reset section when class changes
        });
    };

    const handleTargetSectionChange = (sectionId: string) => {
        setFormData({ ...formData, target_section_id: sectionId });
    };

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
        if (!formData.source_class_id || !formData.target_class_id || !formData.target_section_id || selectedStudentIds.length === 0) {
            toast.error('Please select source class, target class/section, and at least one student');
            return;
        }

        promoteMutation.mutate({
            students: selectedStudentIds,
            classId: formData.target_class_id,      // ✅ Target class from user input
            sectionId: formData.target_section_id,  // ✅ Target section from user input
        }, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                {/* Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white p-6 rounded-t-xl flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <Users className="w-6 h-6" />
                        <h2 className="text-2xl font-bold">Bulk Promote Students</h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-lg transition-all">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* ✅ 3 INPUT FIELDS - Source + Target Class/Section */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gray-50 p-6 rounded-xl">
                            {/* Source Class */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Source Class * <span className="text-xs text-gray-500">(Current students)</span>
                                </label>
                                <select
                                    value={formData.source_class_id}
                                    onChange={(e) => handleSourceClassChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select source class</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Target Class */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Target Class * <span className="text-xs text-gray-500">(Promote to)</span>
                                </label>
                                <select
                                    value={formData.target_class_id}
                                    onChange={(e) => handleTargetClassChange(e.target.value)}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Select target class</option>
                                    {classes.map((cls) => (
                                        <option key={cls.id} value={cls.id}>
                                            {cls.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Target Section */}
                            <div>
                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                    Target Section * <span className="text-xs text-gray-500">(Destination)</span>
                                </label>
                                <select
                                    value={formData.target_section_id}
                                    onChange={(e) => handleTargetSectionChange(e.target.value)}
                                    disabled={!formData.target_class_id || targetSections.length === 0}
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    required
                                >
                                    <option value="">Select target section</option>
                                    {targetSections.map((section: any) => (
                                        <option key={section.id} value={section.id}>
                                            {section.section_name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Students Selection List */}
                        <div className="space-y-4">
                            <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
                                <div className="p-4 border-b border-gray-200 bg-gray-50 rounded-t-xl">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2">
                                            <Filter className="w-5 h-5 text-indigo-600" />
                                            <span className="font-semibold text-gray-900">
                                                Students from {classes.find(c => c.id === formData.source_class_id)?.name || 'No class selected'} (
                                                {selectedStudentIds.length} / {filteredStudents.length})
                                            </span>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={handleSelectAll}
                                            className="px-3 py-1 text-sm font-medium rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors flex items-center gap-1 disabled:opacity-50"
                                            disabled={filteredStudents.length === 0}
                                        >
                                            {selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0
                                                ? 'Deselect All'
                                                : 'Select All'}
                                        </button>
                                    </div>
                                </div>

                                {/* Students List */}
                                <div className="max-h-96 overflow-y-auto">
                                    {filteredStudents.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500">
                                            {formData.source_class_id
                                                ? 'No students found in source class'
                                                : 'Select source class to see students'
                                            }
                                        </div>
                                    ) : (
                                        filteredStudents.map((student) => (
                                            <label
                                                key={student.id}
                                                className="flex items-center p-4 hover:bg-gray-50 border-b border-gray-50 last:border-b-0 cursor-pointer group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedStudentIds.includes(student.id)}
                                                    onChange={() => handleStudentToggle(student.id)}
                                                    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-indigo-500"
                                                />
                                                <div className="ml-3 flex-1 min-w-0">
                                                    <div className="font-medium text-gray-900 group-hover:text-indigo-600 truncate">
                                                        {student.firstName} {student.lastName}
                                                    </div>
                                                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-0.5">
                                                        <span>{student.class?.name} - {student.section?.section_name}</span>
                                                    </div>
                                                </div>
                                            </label>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={promoteMutation.isPending}
                                className="px-6 py-2.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={promoteMutation.isPending || selectedStudentIds.length === 0 || !formData.source_class_id || !formData.target_class_id || !formData.target_section_id}
                                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-blue-700 disabled:opacity-50 flex items-center gap-2 transition-all"
                            >
                                {promoteMutation.isPending ? (
                                    <>
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        Promoting...
                                    </>
                                ) : (
                                    <>
                                        <ArrowUp className="w-4 h-4" />
                                        Promote {selectedStudentIds.length} Student{selectedStudentIds.length !== 1 ? 's' : ''}
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

export default BulkPromoteStudentModal;
