import React from 'react';

export const FeeStructure: React.FC = () => {
  const feeItems = [
    { name: 'Tuition Fee', amount: '$2500.00', remaining: '$0.00' },
    { name: 'Transport Fee', amount: '$500.00', remaining: '$0.00' },
    { name: 'Hostel Fee', amount: '$1000.00', remaining: '$0.00' },
    { name: 'Exam Fee', amount: '$500.00', remaining: '$0.00' }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h4 className="font-medium text-gray-900">Fee Structure Breakdown</h4>
        <span className="text-sm text-gray-600">Academic Year 2024-25</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        {feeItems.map((item, index) => (
          <div key={index} className="p-4 border border-green-200 rounded-lg bg-green-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{item.name}</p>
                <p className="text-lg font-semibold text-gray-900">{item.amount}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Amount Remaining</p>
                <p className="text-lg font-semibold text-green-600">{item.remaining}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Due Annual Fee</p>
            <p className="text-2xl font-bold text-blue-600">$4500.00</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Paid</p>
            <p className="text-2xl font-bold text-green-600">$4500.00</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Outstanding</p>
            <p className="text-2xl font-bold text-red-600">$0.00</p>
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">100% of fees has paid</p>
      </div>
    </div>
  );
};
