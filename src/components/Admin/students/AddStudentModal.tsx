import React, { useState } from "react";
import { X, Plus, Trash2 } from "lucide-react";

interface Parent {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  relation: string;
}

interface StudentForm {
  firstName: string;
  lastName: string;
  email: string;
  class: string;
  section: string;
  rollNumber: string;
  gender: string;
  dateOfBirth: string;
  address: string;
  parents: Parent[];
}

interface StudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (studentData: StudentForm) => void;
}

export const AddStudentModal: React.FC<StudentModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<StudentForm>({
    firstName: "",
    lastName: "",
    email: "",
    class: "",
    section: "",
    rollNumber: "",
    gender: "",
    dateOfBirth: "",
    address: "",
    parents: [
      {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        relation: "Father",
      },
    ],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
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

  const handleParentChange = (
    index: number,
    field: keyof Parent,
    value: string
  ) => {
    const updatedParents = [...formData.parents];
    updatedParents[index] = {
      ...updatedParents[index],
      [field]: value,
    };
    setFormData((prev) => ({
      ...prev,
      parents: updatedParents,
    }));

    // Clear error if exists
    const errorKey =
      field === "firstName"
        ? `parent${index}FirstName`
        : field === "lastName"
        ? `parent${index}LastName`
        : field === "phoneNumber"
        ? `parent${index}PhoneNumber`
        : field === "email"
        ? `parent${index}Email`
        : null;

    if (errorKey && errors[errorKey]) {
      setErrors((prev) => ({
        ...prev,
        [errorKey]: "",
      }));
    }
  };

  const addParent = () => {
    setFormData((prev) => ({
      ...prev,
      parents: [
        ...prev.parents,
        {
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          relation: "Mother",
        },
      ],
    }));
  };

  const removeParent = (index: number) => {
    if (formData.parents.length > 1) {
      const updatedParents = formData.parents.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        parents: updatedParents,
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
    if (!formData.class.trim()) newErrors.class = "Class is required";
    if (!formData.section.trim()) newErrors.section = "Section is required";
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

    formData.parents.forEach((parent, index) => {
      if (!parent.firstName.trim()) {
        newErrors[`parent${index}FirstName`] = "Parent first name is required";
      }
      if (!parent.lastName.trim()) {
        newErrors[`parent${index}LastName`] = "Parent last name is required";
      }
      if (!parent.phoneNumber.trim()) {
        newErrors[`parent${index}PhoneNumber`] =
          "Parent phone number is required";
      }
      if (parent.email && !emailRegex.test(parent.email)) {
        newErrors[`parent${index}Email`] =
          "Please enter a valid parent email address";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        class: "",
        section: "",
        rollNumber: "",
        gender: "",
        dateOfBirth: "",
        address: "",
        parents: [
          {
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            relation: "Father",
          },
        ],
      });
      setErrors({});
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Add New Student</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.gender ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
                {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class *
                </label>
                <input
                  type="text"
                  name="class"
                  value={formData.class}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.class ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter class"
                />
                {errors.class && <p className="mt-1 text-sm text-red-600">{errors.class}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Section *
                </label>
                <input
                  type="text"
                  name="section"
                  value={formData.section}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.section ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter section"
                />
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.rollNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
                  }`}
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
                  rows={2}
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${
                    errors.address ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter address"
                />
                {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
              </div>
            </div>
          </div>

          {/* Parent Information */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Parent Information</h3>
              <button
                type="button"
                onClick={addParent}
                className="flex items-center px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Parent
              </button>
            </div>

            {formData.parents.map((parent, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-medium text-gray-800">Parent {index + 1}</h4>
                  {formData.parents.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParent(index)}
                      className="p-1 text-red-600 hover:bg-red-100 rounded transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={parent.firstName}
                      onChange={(e) => handleParentChange(index, 'firstName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`parent${index}FirstName`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter first name"
                    />
                    {errors[`parent${index}FirstName`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`parent${index}FirstName`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={parent.lastName}
                      onChange={(e) => handleParentChange(index, 'lastName', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`parent${index}LastName`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter last name"
                    />
                    {errors[`parent${index}LastName`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`parent${index}LastName`]}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={parent.email}
                      onChange={(e) => handleParentChange(index, 'email', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`parent${index}Email`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter email"
                    />
                    {errors[`parent${index}Email`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`parent${index}Email`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={parent.phoneNumber}
                      onChange={(e) => handleParentChange(index, 'phoneNumber', e.target.value)}
                      className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors[`parent${index}PhoneNumber`] ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="Enter phone number"
                    />
                    {errors[`parent${index}PhoneNumber`] && (
                      <p className="mt-1 text-sm text-red-600">{errors[`parent${index}PhoneNumber`]}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Relation
                    </label>
                    <select
                      value={parent.relation}
                      onChange={(e) => handleParentChange(index, 'relation', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Add Student
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};