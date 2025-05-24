import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ message = 'Loading...' }) => (
  <div className="flex flex-col items-center justify-center min-h-[120px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-gray-800 border-solid border-r-transparent mb-4" />
    <div className="text-lg font-medium text-gray-800">{message}</div>
  </div>
);

export default LoadingSpinner; 