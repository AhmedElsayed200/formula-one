import React from 'react';

interface HeartButtonProps {
  active: boolean;
  onClick: () => void;
  className?: string;
  absolutePosition?: boolean;
}

const HeartButton: React.FC<HeartButtonProps> = ({ active, onClick, className = '', absolutePosition = false }) => (
  <button
    type="button"
    onClick={e => {
      e.stopPropagation();
      onClick();
    }}
    className={`cursor-pointer ${absolutePosition ? 'absolute bottom-2 right-2 z-10' : ''} p-1 rounded-full bg-white/80 hover:bg-white shadow transition ${className}`}
  >
    {active ? (
      <svg xmlns="http://www.w3.org/2000/svg" fill="#ef4444" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.435 6.582a5.373 5.373 0 00-7.6 0l-.835.836-.835-.836a5.373 5.373 0 00-7.6 7.6l.836.835 7.6 7.6 7.6-7.6.836-.835a5.373 5.373 0 000-7.6z" />
      </svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ef4444" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.435 6.582a5.373 5.373 0 00-7.6 0l-.835.836-.835-.836a5.373 5.373 0 00-7.6 7.6l.836.835 7.6 7.6 7.6-7.6.836-.835a5.373 5.373 0 000-7.6z" />
      </svg>
    )}
  </button>
);

export default HeartButton; 