import React, { useState, useEffect } from 'react';
import { X, Phone, Hash, DollarSign, MapPin, Car, CheckCircle } from 'lucide-react';
import type { Transportation } from '../../../types/admin-transportation.types';

interface AddTransportationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transport: Omit<Transportation, 'id'>) => void;
  isLoading?: boolean;
}

const AddTransportationModal: React.FC<AddTransportationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const [formData, setFormData] = useState<Omit<Transportation, 'id'>>({
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

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({
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
  }, [isOpen]);

  const validateField = (name: string, value: any) => {
    switch (name) {
      case 'vehicleNumber':
        if (!value.trim()) return 'Vehicle number is required';
        return '';
      case 'driverName':
        if (!value.trim()) return 'Driver name is required';
        return '';
      case 'driverPhone':
        if (!value.trim()) return 'Phone number is required';
        if (!/^\+?\d{7,15}$/.test(value)) return 'Invalid phone number';
        return '';
      case 'capacity':
        if (!value || Number(value) <= 0) return 'Capacity must be greater than 0';
        return '';
      case 'price':
        if (!value || Number(value) <= 0) return 'Price must be greater than 0';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'capacity' || name === 'price' ? Number(value) : value
    }));

    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, (formData as any)[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;


    setTouched(Object.keys(formData).reduce((acc, field) => ({ ...acc, [field]: true }), {}));

    if (validateForm()) {
      onSubmit(formData);

      setFormData({
        vehicleNumber: '',
        driverName: '',
        driverPhone: '',
        last_location: '',
        capacity: 0,
        price: 0,
        status: 'active',
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Car className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Add New Transportation</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.vehicleNumber ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., BA-2-CHA-4567"
              />
              {errors.vehicleNumber && <p className="text-red-500 text-xs mt-1">{errors.vehicleNumber}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="driverName"
                value={formData.driverName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.driverName ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="Enter driver name"
              />
              {errors.driverName && <p className="text-red-500 text-xs mt-1">{errors.driverName}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Driver Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="driverPhone"
                value={formData.driverPhone}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.driverPhone ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 9801234567"
              />
              {errors.driverPhone && <p className="text-red-500 text-xs mt-1">{errors.driverPhone}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Last Location <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="last_location"
                value={formData.last_location}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.last_location ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., Kathmandu"
              />
              {errors.last_location && <p className="text-red-500 text-xs mt-1">{errors.last_location}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Hash className="w-4 h-4 inline mr-1" />
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="capacity"
                value={formData.capacity}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.capacity ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 40"
              />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`}
                placeholder="e.g., 5000"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Adding...
                </>
              ) : (
                'Add Transportation'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTransportationModal;
