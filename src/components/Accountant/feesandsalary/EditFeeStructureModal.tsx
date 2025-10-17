import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { FeeStructureAttributes } from '../../../types/fee-salary.types';
import type { Grade } from '../../../types/class.types';
import type { Transportation } from '../../../types/admin-transportation.types';
import type { FeeStructureForm } from './AddFeeStructureModal';

interface EditFeeStructureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (id: string, updates: FeeStructureForm) => void;
  feeStructure: FeeStructureAttributes | null;
  classes: Grade[];
  transportOptions: Transportation[];
  isLoading?: boolean;
}

const EditFeeStructureModal: React.FC<EditFeeStructureModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  feeStructure,
  classes,
  transportOptions,
  isLoading,
}) => {
  const [formData, setFormData] = useState<FeeStructureForm>({
    class_id: '',
    monthly_fee: 0,
    exam_fee: 0,
    tution_fee: 0,
    computer_fee: 0,
    laboratory_fee: 0,
    transport_fee: '',
    other_fee: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen && feeStructure) {
      setFormData({
        class_id: feeStructure.class_id ?? '',
        monthly_fee: feeStructure.monthly_fee ?? 0,
        exam_fee: feeStructure.exam_fee ?? 0,
        tution_fee: feeStructure.tution_fee ?? 0,
        computer_fee: feeStructure.computer_fee ?? 0,
        laboratory_fee: feeStructure.laboratory_fee ?? 0,
        transport_fee: feeStructure.transport_fee ?? '',
        other_fee: feeStructure.other_fee ?? 0,
      });
      setErrors({});
    }
  }, [isOpen, feeStructure]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      if (
        [
          "monthly_fee",
          "exam_fee",
          "tution_fee",
          "computer_fee",
          "laboratory_fee",
          "other_fee",
        ].includes(name)
      ) {
        return { ...prev, [name]: value === "" ? 0 : Number(value) }; // force number
      }

      return { ...prev, [name]: value };
    });

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };


  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.class_id) newErrors.class_id = 'Class is required';
    if (!formData.transport_fee) newErrors.transport_fee = 'Transport is required';
    if (formData.monthly_fee <= 0) newErrors.monthly_fee = 'Monthly fee must be > 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm() && feeStructure) {
      // Coerce numeric fields to numbers before sending
      const payload: FeeStructureForm = {
        ...formData,
        monthly_fee: Number(formData.monthly_fee),
        exam_fee: Number(formData.exam_fee),
        tution_fee: Number(formData.tution_fee),
        computer_fee: Number(formData.computer_fee),
        laboratory_fee: Number(formData.laboratory_fee),
        other_fee: Number(formData.other_fee),
        transport_fee: formData.transport_fee, // if backend expects id keep as string, else convert to number
      };

      onSubmit(feeStructure.id, payload);
      onClose();
    }
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        {/* Header */}
        <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
          <h2 className="text-lg font-semibold">Edit Fee Structure</h2>
          <button onClick={onClose} disabled={isLoading}>
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Class *</label>
              <select
                name="class_id"
                value={formData.class_id}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">Select Class</option>
                {classes?.map(cls => (
                  <option key={cls.id} value={cls.id}>{cls.name}</option>
                ))}
              </select>
              {errors.class_id && <p className="text-xs text-red-500">{errors.class_id}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Transportation *</label>
              <select
                name="transport_fee"
                value={formData.transport_fee}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-lg"
              >
                <option value="">Select Transport</option>
                {transportOptions?.map(tr => (
                  <option key={tr.id} value={tr.id}>{tr.driverName}</option>
                ))}
              </select>
              {errors.transport_fee && <p className="text-xs text-red-500">{errors.transport_fee}</p>}
            </div>

            {/* Fees */}
            {['monthly_fee', 'exam_fee', 'tution_fee', 'computer_fee', 'laboratory_fee', 'other_fee'].map(fee => (
              <div key={fee}>
                <label className="block text-sm font-medium">{fee.replace('_', ' ').toUpperCase()}</label>
                <input
                  type="number"
                  name={fee}
                  value={formData[fee as keyof FeeStructureForm] || 0}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-lg"
                />
              </div>
            ))}
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
              {isLoading ? 'Updating...' : 'Update Fee Structure'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeeStructureModal;
