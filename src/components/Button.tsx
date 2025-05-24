import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`w-28 h-10 font-semibold rounded-full bg-gray-700 text-white shadow-md hover:bg-gray-800 focus:outline-none flex items-center justify-center ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;