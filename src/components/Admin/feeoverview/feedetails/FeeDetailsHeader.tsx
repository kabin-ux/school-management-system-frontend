import { ArrowLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const FeeDetailsHeader: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {

    navigate(`/admin/fee-overview`)
  };
  return (
    <div className="flex justify-between items-center mb-8">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fee & Payment Overview of Ramesh Poudel</h1>
          <p className="text-gray-600">Monitor student fee status, payments, and collections</p>
        </div>
      </div>
    </div>
  );
};