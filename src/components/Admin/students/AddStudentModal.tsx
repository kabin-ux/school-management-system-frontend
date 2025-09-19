import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { Grade } from "../../../types/class.types";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { getSectionsByClass } from "../../../features/sectionSlice";

interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  class_id: string;
  section_id: string;
  rollNumber: string;
  gender: string;
  dateOfBirth: string;
  address: string;
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: StudentForm) => void;
  classes: Grade[];
  loading: boolean;
}

export const AddStudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  classes,
  loading
}) => {
  const [formData, setFormData] = useState<StudentForm>({
    firstName: "",
    lastName: "",
    email: "",
    class_id: "",
    section_id: "",
    rollNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
  });
  
  const { sections } = useAppSelector(state => state.section)
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Load sections when class changes
  useEffect(() => {
    if (formData.class_id) {
      const selectedClass = classes.find(cls => cls.id === formData.class_id);
      if (selectedClass) {
        dispatch(getSectionsByClass(selectedClass?.id));
      }
    }
  }, [formData.class_id, classes, dispatch]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Prevent input changes during loading
    if (loading) return;
    
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim())
      newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!formData.class_id) newErrors.class = "Class is required";
    if (!formData.section_id.trim()) newErrors.section = "Section is required";
    if (!formData.rollNumber.trim())
      newErrors.rollNumber = "Roll number is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dateOfBirth)
      newErrors.dateOfBirth = "Date of birth is required";
    if (!formData.address.trim())
      newErrors.address = "Address is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    // Prevent multiple submissions
    if (loading) return;
    
    if (validateForm()) {
      onSubmit(formData);
      // Reset form only on successful validation
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        class_id: "",
        section_id: "",
        rollNumber: "",
        gender: "",
        dateOfBirth: "",
        address: "",
      });
      setErrors({});
    }
  };

  // Handle modal close - prevent closing during loading
  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className={`p-2 rounded-full transition-colors ${
              loading 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-gray-500 hover:bg-gray-100'
            }`}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          {/* Student Information */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Information</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter first name"
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name *
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter last name"
                />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter email address"
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class *
                </label>
                <select
                  name="class_id"
                  value={formData.class_id}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.class ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                >
                  <option value="">Select class</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name}
                    </option>
                  ))}
                </select>
                {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section *
                </label>
                <select
                  name="section_id"
                  value={formData.section_id}
                  onChange={handleInputChange}
                  disabled={loading || !formData.class_id}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.section ? 'border-red-500' : 'border-gray-300'
                  } ${(loading || !formData.class_id) ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                >
                  <option value="">Select section</option>
                  {sections.map((section: any) => (
                    <option key={section.id} value={section.id}>
                      {section.section_name}
                    </option>
                  ))}
                </select>
                {errors.section && <p className="mt-1 text-sm text-red-600">{errors.section}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roll Number *
                </label>
                <input
                  type="text"
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.rollNumber ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter roll number"
                />
                {errors.rollNumber && <p className="mt-1 text-sm text-red-600">{errors.rollNumber}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date of Birth *
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  disabled={loading}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={loading}
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  } ${loading ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''}`}
                  placeholder="Enter address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className={`px-6 py-2 border border-gray-300 rounded-md transition-colors ${
                loading 
                  ? 'text-gray-400 border-gray-200 cursor-not-allowed bg-gray-50'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={handleSubmit}
              className={`px-6 py-2 rounded-md transition-colors ${
                loading
                  ? 'bg-blue-400 cursor-not-allowed text-white'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? "Adding..." : "Add Student"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
