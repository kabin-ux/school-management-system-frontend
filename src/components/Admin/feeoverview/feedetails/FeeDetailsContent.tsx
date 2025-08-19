import React from 'react';

export const FeeDetailsContent: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Left Column */}
      <div className="space-y-6">
        {/* Previous Month Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Previous Month Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Fee:</span>
              <span className="font-medium">Rs 30,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium text-green-600">Rs 18,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Charge:</span>
              <span className="font-medium text-red-600">Rs 12,000</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Download Bill
          </button>
        </div>

        {/* Current Month Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Month Details</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Fee:</span>
              <span className="font-medium">Rs 30,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Paid:</span>
              <span className="font-medium text-green-600">Rs 0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Charge:</span>
              <span className="font-medium text-red-600">Rs 12,000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Charge:</span>
              <span className="font-medium text-green-600">Rs 42,00</span>
            </div>
          </div>
          <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors">
            Download Bill
          </button>
        </div>

        {/* Others Details */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Others Details</h3>
          <div className="text-sm mb-4">
            <span className="text-gray-600">ALL THE OTHER FEES ARE CLEARED : </span>
            <span className="font-medium text-green-600">Rs 0</span>
          </div>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg transition-colors">
            Cleared
          </button>
        </div>
      </div>

      {/* Right Column - Bill */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">This Month Bill</h2>
          <div className="border-2 border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">AROMA ENGLISH PRIVATE SCHOOL</h3>
            <p className="text-sm text-gray-600 mb-4">DIGITAL BILL</p>
            
            <div className="flex justify-between items-start mb-6">
              <div className="text-left text-sm">
                <p><strong>Name :</strong> Mustafijure Rehman</p>
                <p><strong>Class :</strong> 12 "B"</p>
                <p><strong>Student ID :</strong> 778535</p>
              </div>
              <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                <div className="text-xs text-gray-500">QR Code</div>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between text-sm font-medium mb-2">
                <span>Description</span>
                <span>Amount (NPR)</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Base Fee</span>
                  <span>20,000.00 /</span>
                </div>
                <div className="flex justify-between">
                  <span>Exam Fee</span>
                  <span>2000.00 /</span>
                </div>
                <div className="flex justify-between">
                  <span>Bus Charge</span>
                  <span>2500.00 /</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-medium">
                  <span>Sub Total</span>
                  <span>24,500.00 /</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Charge</span>
                  <span>12,000.00 /</span>
                </div>
                <div className="text-xs text-red-500 mt-1">
                  As per previous bill Rs 12,000.00 was<br/>
                  due from the student (Previous Bill<br/>
                  Date/Cut-off Date)
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>Rs 36,500.00 /</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};