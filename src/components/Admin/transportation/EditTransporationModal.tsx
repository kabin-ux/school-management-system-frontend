import React, { useState, useEffect } from 'react';
import { X, Bus } from 'lucide-react';
import type { Transportation } from '../../../types/admin-transportation.types';

interface EditTransportationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updates: Transportation) => void;
  transportation?: Transportation | null;
  isLoading?: boolean;
}

const EditTransportationModal: React.FC<EditTransportationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  transportation,
  isLoading = false,
}) => {
  const [formData, setFormData] = useState<Transportation>({
    id: '',
    vehicleNumber: '',
    driverName: '',
    driverPhone: '',
    last_location: '',
    capacity: 0,
    price: 0,
    status: 'active',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (isOpen && transportation) {
      setFormData({ ...transportation });
      setErrors({});
      setTouched({});
    } else if (!isOpen) {
      setFormData({
        id: '',
        vehicleNumber: '',
        driverName: '',
        driverPhone: '',
        last_location: '',
        capacity: 0,
        price: 0,
        status: 'active',
      });
      setErrors({});
      setTouched({});
    }
  }, [isOpen, transportation]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'vehicleNumber':
        return !value.trim() ? 'Vehicle number is required' : '';
      case 'driverName':
        return !value.trim() ? 'Driver name is required' : '';
      case 'driverPhone':
        if (!value.trim()) return 'Driver phone is required';
        if (!/^\d{7,15}$/.test(value)) return 'Invalid phone number';
        return '';
      case 'capacity':
        return value <= 0 ? 'Capacity must be greater than 0' : '';
      case 'price':
        return value <= 0 ? 'Price must be greater than 0' : '';
      default:
        return '';
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' ? Number(value) : value,
    }));

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
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof typeof formData]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));
    if (validateForm() && transportation) {
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
            <Bus className="w-5 h-5" />
            <h2 className="text-lg font-semibold">Edit Transportation</h2>
          </div>
          <button onClick={onClose} disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Vehicle Number */}
            <div>
              <label className="block text-sm font-medium">Vehicle Number *</label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.vehicleNumber ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.vehicleNumber && (
                <p className="text-xs text-red-500">{errors.vehicleNumber}</p>
              )}
            </div>

            {/* Driver Name */}
            <div>
              <label className="block text-sm font-medium">Driver Name *</label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.driverName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.driverName && <p className="text-xs text-red-500">{errors.driverName}</p>}
            </div>

            {/* Driver Phone */}
            <div>
              <label className="block text-sm font-medium">Driver Phone *</label>
              <input
                type="text"
                name="driverPhone"
                value={formData.driverPhone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.driverPhone ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.driverPhone && <p className="text-xs text-red-500">{errors.driverPhone}</p>}
            </div>

            {/* Last Location */}
            <div>
              <label className="block text-sm font-medium">Last Location</label>
              <input
                type="text"
                name="last_location"
                value={formData.last_location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Capacity */}
            <div>
              <label className="block text-sm font-medium">Capacity *</label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.capacity ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.capacity && <p className="text-xs text-red-500">{errors.capacity}</p>}
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium">Price *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.price && <p className="text-xs text-red-500">{errors.price}</p>}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium">Status *</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
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
              {isLoading ? 'Updating...' : 'Update Transportation'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTransportationModal;
