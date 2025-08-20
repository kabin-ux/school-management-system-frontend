import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  return (
    <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
      <div className="text-sm text-gray-700">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
        >
          Previous
        </button>
        <span className="mx-2">{currentPage}</span>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="text-blue-600 hover:text-blue-700 font-medium disabled:text-gray-400"
        >
          Next
        </button>
      </div>
      <div className="text-sm text-gray-700">
        Page {currentPage} of {totalPages}
      </div>
    </div>
  );
};
