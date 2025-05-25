import React from 'react';

interface CardViewProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey: (item: T) => string;
  getBackgroundImage: (item: T) => string;
  containerClassName?: string;
  className?: string;
}

function CardView<T>({
  items,
  renderItem,
  getKey,
  getBackgroundImage,
  containerClassName = 'h-64',
  className = '',
}: CardViewProps<T>) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 ${className}`}>
      {items.map((item, idx) => (
        <div
          key={getKey(item)}
          className={`group relative bg-cover bg-center rounded-xl shadow flex items-end transition-shadow duration-200 ${containerClassName}`}
          style={{ backgroundImage: `url('${getBackgroundImage(item)}')` }}
        >
          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
          {renderItem(item, idx)}
        </div>
      ))}
    </div>
  );
}

export default CardView; 