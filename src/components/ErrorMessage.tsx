import React from 'react';

interface ErrorMessageProps {
  message: string;
  className?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, className = '' }) => (
  <div className={`text-center text-red-600 text-lg font-semibold my-4 ${className}`} role="alert">
    {message}
  </div>
);

export default ErrorMessage; 