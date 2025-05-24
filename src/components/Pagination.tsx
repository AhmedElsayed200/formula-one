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
      <Button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`mr-3 text-base ${page === 1 ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer hover:bg-gray-800'}`}
      >
        Previous
      </Button>
      <span className="mx-2 text-base">
        Page {page} of {totalPages}
      </span>
      <Button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`ml-3 text-base ${page === totalPages ? 'cursor-not-allowed opacity-50 grayscale' : 'cursor-pointer hover:bg-gray-800'}`}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination; 