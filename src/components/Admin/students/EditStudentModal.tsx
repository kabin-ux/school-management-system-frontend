import React, { useState, useEffect } from 'react';
import { X, User } from 'lucide-react';
import type { Grade } from '../../../types/class.types';
import type { Student, StudentForm } from '../../../types/student.types';
import { useSectionsByClass } from '../../../hooks/useSection';
import type { Transportation } from '../../../types/admin-transportation.types';
import { useUnassignTransportationFromStudent } from '../../../hooks/useTransportation';

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updates: StudentForm, id: string) => void;
  student?: Student | null;
  classes: Grade[];
  isLoading?: boolean;
  transportations: Transportation[];
}

const EditStudentModal: React.FC<EditStudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  classes,
  isLoading,
  transportations
}) => {
  const [formData, setFormData] = useState<StudentForm>({
    firstName: '',
    lastName: '',
    email: '',
    class_id: '',
    section_id: '',
    gender: 'Male', // default gender
    address: '',
    dateOfBirth: '',
    transport_id: '',
    rollNumber: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const unAssignMutation = useUnassignTransportationFromStudent();

  useEffect(() => {
    if (isOpen && student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        class_id: student.class_id,
        section_id: student.section_id ?? '',
        gender: student.gender,
        dateOfBirth: student.dateOfBirth.toString(),
        address: student.address ?? '',
        transport_id: student.transport_id ?? '',
        rollNumber: student.rollNumber ?? '',
      });
      setErrors({});
      setTouched({});
    } else if (!isOpen) {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        class_id: '',
        section_id: '',
        gender: 'पुरुष',
        address: '',
        dateOfBirth: '',
        transport_id: '',
        rollNumber: '',
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, student]);

  const { data: sections = [] } = useSectionsByClass(formData.class_id);

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
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const fieldsToValidate = ['firstName', 'lastName', 'email'];
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
    if (validateForm() && student) {
      onSubmit(formData, student.id);
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
            <h2 className="text-lg font-semibold">Edit Student</h2>
          </div>
          <button onClick={onClose} disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                className={`w-full px-3 py-2 border rounded-lg ${errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                className={`w-full px-3 py-2 border rounded-lg ${errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                className={`w-full px-3 py-2 border rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
              />
              {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* Class */}
            <div>
              <label className="block text-sm font-medium">Class</label>

              <select
                name="class_id"
                value={formData.class_id}
                onChange={handleInputChange}
                disabled={isLoading}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.class ? 'border-red-500' : 'border-gray-300'
                  } ${isLoading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
              >
                <option value="">Select class</option>
                {classes.map((cls) => (
                  <option key={cls.id} value={cls.id}>
                    {cls.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block text-sm font-medium">Section</label>
              <select
                name="section_id"
                value={formData.section_id}
                onChange={handleInputChange}
                disabled={isLoading || !formData.class_id}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.section ? 'border-red-500' : 'border-gray-300'
                  } ${(isLoading || !formData.class_id) ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
              >
                <option value="">Select section</option>
                {sections.map((section: any) => (
                  <option key={section.id} value={section.id}>
                    {section.section_name}
                  </option>
                ))}
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Roll Number</label>
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            {/* Transportation */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Transportation *
              </label>

              {student?.transport_id ? (
                <div className="flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  {/* Current Assigned Transportation */}
                  <div className="flex-1">
                    <div className="font-medium text-blue-900">
                      Currently assigned: {transportations.find(t => t.id === student.transport_id)?.driverName || 'Transportation'}
                    </div>
                    <div className="text-xs text-blue-700">
                      Transport ID: {student.transport_id}
                    </div>
                  </div>

                  {/* Unassign Button */}
                  <button
                    type="button"
                    onClick={() => {
                      if (student?.id) {
                        unAssignMutation.mutate(student.id);
                      }
                    }}
                    disabled={unAssignMutation.isPending || isLoading}
                    className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                  >
                    {unAssignMutation.isPending ? (
                      <>
                        <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Unassigning...
                      </>
                    ) : (
                      'Unassign'
                    )}
                  </button>
                </div>
              ) : (
                /* Original Select Dropdown */
                <select
                  name="transport_id"
                  value={formData.transport_id ?? ""}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.transport_id ? 'border-red-500' : 'border-gray-300'
                    } ${isLoading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                >
                  <option value="">Select transportation</option>
                  {transportations.map((transportation) => (
                    <option key={transportation.id} value={transportation.id}>
                      {transportation.last_location}
                    </option>
                  ))}
                </select>
              )}
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
              {isLoading ? 'Updating...' : 'Update Student'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudentModal;
