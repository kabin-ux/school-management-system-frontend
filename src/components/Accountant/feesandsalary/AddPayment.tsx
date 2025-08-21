import React from 'react';
import { calculatePaymentSummary } from '../../../utils/feeSalaryHelpers';

interface AddPaymentProps {
  paymentAmount: string;
  paymentType: string;
  feeCategory: string;
  additionalNotes: string;
  onPaymentAmountChange: (amount: string) => void;
  onPaymentTypeChange: (type: string) => void;
  onFeeCategoryChange: (category: string) => void;
  onAdditionalNotesChange: (notes: string) => void;
  onSubmit: () => void;
  onClear: () => void;
}

export const AddPayment: React.FC<AddPaymentProps> = ({
  paymentAmount,
  paymentType,
  feeCategory,
  additionalNotes,
  onPaymentAmountChange,
  onPaymentTypeChange,
  onFeeCategoryChange,
  onAdditionalNotesChange,
  onSubmit,
  onClear
}) => {
  const summary = calculatePaymentSummary(paymentAmount);

  return (
    <div>
      <h4 className="font-medium text-gray-900 mb-4">Add new Payment</h4>
      <p className="text-sm text-gray-600 mb-6">Record a payment for John Smith</p>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Amount *</label>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-gray-500">$</span>
            <input
              type="number"
              value={paymentAmount}
              onChange={(e) => onPaymentAmountChange(e.target.value)}
              placeholder="0.00"
              className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Type</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentType"
                value="Partial Payment"
                checked={paymentType === 'Partial Payment'}
                onChange={(e) => onPaymentTypeChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Partial</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentType"
                value="Full Payment"
                checked={paymentType === 'Full Payment'}
                onChange={(e) => onPaymentTypeChange(e.target.value)}
                className="mr-2"
              />
              <span className="text-sm">Full Payment</span>
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method *</label>
          <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
            <option>Cash</option>
            <option>Bank Transfer</option>
            <option>Online Payment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fee Category *</label>
          <select
            value={feeCategory}
            onChange={(e) => onFeeCategoryChange(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option>Tuition Fee</option>
            <option>Transport Fee</option>
            <option>Hostel Fee</option>
            <option>Exam Fee</option>
          </select>
        </div>
      </div>

      <div className="mt-6">
        <h5 className="font-medium text-gray-900 mb-4">Payment Summary</h5>
        <div className="bg-gray-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Payment Amount</span>
            <span className="font-medium">${summary.paymentAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Net Amount</span>
            <span className="font-medium">${summary.netAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Remaining After Payment</span>
            <span className="font-medium">${summary.remainingAfterPayment.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
        <textarea
          value={additionalNotes}
          onChange={(e) => onAdditionalNotesChange(e.target.value)}
          placeholder="Any additional remarks about this payment..."
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <div className="flex space-x-4 mt-6">
        <button 
          onClick={onSubmit}
          className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Record Payment
        </button>
        <button 
          onClick={onClear}
          className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Clear Payment
        </button>
      </div>
    </div>
  );
};
