import React, { useState, useEffect } from "react";
import { X, User } from "lucide-react";
import type { Section } from "./AddSectionModal";

interface EditSectionForm {
  section_name: string;
  id: string;
}

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updates: EditSectionForm) => void;
  section?: Section | null;
  isLoading?: boolean;
}

const EditSectionModal: React.FC<EditSectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  section,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<EditSectionForm>({
    section_name: "",
    id: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen && section) {
      setFormData({
        section_name: section.name,
        id: section.id,
      });
      setErrors({});
      setTouched({});
    } else if (!isOpen) {
      setFormData({
        section_name: "",
        id: "",
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, section]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case "name":
        return !value.trim() ? "Section name is required" : "";
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
    const error = validateField("name", formData.section_name);
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
    if (validateForm()) {
      onSubmit(formData);
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
            <h2 className="text-lg font-semibold">Edit Section</h2>
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
                Section Name *
              </label>
              <input
                type="text"
                name="section_name"
                value={formData.section_name}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter section name"
              />
              {errors.section_name && (
                <p className="mt-1 text-sm text-red-600">{errors.section_name}</p>
              )}
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
              {isLoading ? "Saving..." : "Edit Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSectionModal;
