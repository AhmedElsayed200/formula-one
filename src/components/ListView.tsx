import React from 'react';

interface ListViewProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  getKey: (item: T) => string;
  getBackgroundImage: (item: T) => string;
  containerClassName?: string;
  className?: string;
}

function ListView<T>({
  items,
  renderItem,
  getKey,
  getBackgroundImage,
  containerClassName = '',
  className = '',
}: ListViewProps<T>) {
  return (
    <ul className={`list-none p-0 mb-8 flex flex-col gap-6 ${className}`}>
      {items.map(item => (
        <li
          key={getKey(item)}
          className={`flex flex-col sm:flex-row items-center bg-white/90 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow ${containerClassName}`}
          style={{ minHeight: 80 }}
        >
          <div className="flex-shrink-0 w-full h-32 sm:w-32 sm:h-24 overflow-hidden rounded-t-lg sm:rounded-l-lg sm:rounded-t-none">
            <img
              src={getBackgroundImage(item)}
              alt="Season thumbnail"
              className="object-cover w-full h-full"
              style={{ display: 'block' }}
            />
          </div>
          <div className="flex-1 w-full px-4 flex flex-col items-center sm:items-start">
            {renderItem(item)}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ListView; 