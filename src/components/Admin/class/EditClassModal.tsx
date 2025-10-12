import React, { useState, useEffect } from "react";
import { X, User } from "lucide-react";
import type { Grade } from "../../../types/class.types";

interface EditClassForm {
  name: string;
  has_section: boolean;
}

interface EditClassModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, updates: EditClassForm) => void;
  cls: Grade | null;
  isLoading?: boolean;
}

const EditClassModal: React.FC<EditClassModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  cls,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<EditClassForm>({
    name: "",
    has_section: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen && cls) {
      setFormData({
        name: cls.name,
        has_section: cls.has_section,
      });
      setErrors({});
      setTouched({});
    } else if (!isOpen) {
      setFormData({
        name: "",
        has_section: false,
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, cls]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "name":
        return !value.trim() ? "Class name is required" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, type } = e.target;
    const value = type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    const error = validateField("name", formData.name);
    if (error) newErrors["name"] = error;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(
      Object.keys(formData).reduce(
        (acc, field) => ({ ...acc, [field]: true }),
        {}
      )
    );
    if (validateForm() && cls) {
      onSubmit(cls.id, formData);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Edit Class</h2>
          </div>
          <button onClick={onClose} disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Class Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                placeholder="Enter class name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="has_section"
                checked={formData.has_section}
                onChange={handleInputChange}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="text-sm font-medium text-gray-700">
                Has Sections
              </label>
            </div>
          </div>

          <div className="flex justify-end space-x-4 p-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              {isLoading ? "Saving..." : "Edit Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditClassModal;
