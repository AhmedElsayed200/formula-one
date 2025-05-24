import React from 'react';

interface CardViewProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
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
      {items.map(item => (
        <div
          key={getKey(item)}
          className={`relative bg-cover bg-center rounded-xl shadow-md flex items-end overflow-hidden hover:shadow-lg transition-shadow ${containerClassName}`}
          style={{ backgroundImage: `url('${getBackgroundImage(item)}')` }}
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
}

export default CardView; 