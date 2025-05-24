import React from 'react';
import Button from './Button.tsx';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange, className = '' }) => {
  return (
    <div className={`mt-4 text-center ${className}`}>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
        <Button
          onClick={() => onPageChange(Math.max(1, page - 1))}
          disabled={page === 1}
          className={`text-base ${page === 1 ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer hover:bg-gray-800'}`}
        >
          Previous
        </Button>
        <div className="mx-2 text-base">
          Page {page} of {totalPages}
        </div>
        <Button
          onClick={() => onPageChange(Math.min(totalPages, page + 1))}
          disabled={page === totalPages}
          className={`text-base ${page === totalPages ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer hover:bg-gray-800'}`}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Pagination; 