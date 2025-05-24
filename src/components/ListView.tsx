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
  containerClassName = 'h-40',
  className = '',
}: ListViewProps<T>) {
  return (
    <ul className={`list-none p-0 mb-8 flex flex-col gap-6 ${className}`}>
      {items.map(item => (
        <li
          key={getKey(item)}
          className={`relative bg-cover bg-center rounded-xl shadow-md flex items-end overflow-hidden hover:shadow-lg transition-shadow ${containerClassName}`}
          style={{ backgroundImage: `url('${getBackgroundImage(item)}')` }}
        >
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}

export default ListView; 