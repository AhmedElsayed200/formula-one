import React from 'react';
import Button from './Button.tsx';

interface HeaderProps {
  title: string;
  h2: React.ReactNode;
  buttonLabel: string;
  onButtonClick: () => void;
  buttonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
}

const Header: React.FC<HeaderProps> = ({
  title,
  h2,
  buttonLabel,
  onButtonClick,
  buttonProps = {},
}) => (
  <>
    <div className="flex flex-col items-center mb-2">
      <div className="flex items-center gap-3">
        <span className="text-4xl">🏁</span>
        <span className="text-4xl font-extrabold text-black-500 bg-clip-text tracking-tight drop-shadow-md" style={{ fontFamily: "'Playwrite DK Loopet', cursive", fontWeight: 800, fontStyle: 'normal' }}>
          {title}
        </span>
      </div>
      <div className="w-2/3 h-1 mt-2 bg-gradient-to-r from-blue-900 via-gray-700 to-gray-900 rounded-full opacity-60"></div>
    </div>
    <div className="flex items-center justify-between mb-6 mt-10 flex-wrap gap-4">
      <h2 className="text-left text-4xl font-extrabold text-black-200 bg-clip-text tracking-tight font-sans m-0">
        {h2}
      </h2>
      <Button onClick={onButtonClick} {...buttonProps}>
        {buttonLabel}
      </Button>
    </div>
  </>
);

export default Header; 