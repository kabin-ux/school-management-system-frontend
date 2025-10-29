import React, { useEffect } from 'react';
import { X, Phone, Hash, DollarSign, MapPin, Car, CheckCircle } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { transportationSchema, type TransportationSchema } from '../../../zod-schema/transportation';

interface AddTransportationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (transport: TransportationSchema) => void;
  isLoading?: boolean;
}

const AddTransportationModal: React.FC<AddTransportationModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  isLoading
}) => {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting }, clearErrors, setError } = useForm<TransportationSchema>({
    resolver: zodResolver(transportationSchema),
    mode: 'onChange',
    defaultValues: {
      vehicleNumber: '',
      driverName: '',
      driverPhone: '',
      last_location: '',
      capacity: 1,
      price: 0,
      status: 'active',
    },
  });

  useEffect(() => {
    if (!isOpen) {
      reset();
      clearErrors();
    }
  }, [isOpen, reset, clearErrors]);

  const onFormSubmit = async (data: TransportationSchema) => {
    try {
      await onSubmit(data);
      reset();
      onClose();
    } catch (error) {
      console.error("Form submission error:", error);
      setError("root", {
        message: "Failed to add subject. Please try again.",
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
        <form onSubmit={handleSubmit(onFormSubmit)} className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vehicle Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("vehicleNumber")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.vehicleNumber ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., BA-2-CHA-4567"
              />
              {errors.vehicleNumber && <p className="mt-1 text-sm text-red-600">{errors.vehicleNumber.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Driver Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("driverName")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.driverName ? "border-red-500" : "border-gray-300"}`}
                placeholder="Enter Driver Name"
              />
              {errors.driverName && <p className="mt-1 text-sm text-red-600">{errors.driverName.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4 inline mr-1" />
                Driver Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                {...register("driverPhone")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.driverPhone ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., 9801234567"
              />
              {errors.driverPhone && <p className="text-red-500 text-xs mt-1">{errors.driverPhone.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4 inline mr-1" />
                Destination <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("last_location")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.last_location ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., Kathmandu"
              />
              {errors.last_location && <p className="text-red-500 text-xs mt-1">{errors.last_location.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Hash className="w-4 h-4 inline mr-1" />
                Capacity <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("capacity", { valueAsNumber: true })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.capacity ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., 40"
              />
              {errors.capacity && <p className="text-red-500 text-xs mt-1">{errors.capacity.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <DollarSign className="w-4 h-4 inline mr-1" />
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                {...register("price" , { valueAsNumber: true })}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.price ? "border-red-500" : "border-gray-300"}`}
                placeholder="e.g., 5000"
              />
              {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <CheckCircle className="w-4 h-4 inline mr-1" />
                Status
              </label>
              <select
                {...register("status")}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.status ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                {errors.status && <p className="text-red-500 text-xs mt-1">{errors.status.message}</p>}
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
              disabled={isLoading || isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 flex items-center gap-2"
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
        </form>
      </div>
    </div>
  );
};

export default AddTransportationModal;
