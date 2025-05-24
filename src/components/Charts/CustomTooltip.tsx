import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  nameKey?: string;
  valueKey?: string;
  unit?: string;
  colorClass?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, nameKey = 'name', valueKey = 'value', unit = '', colorClass = 'text-blue-700' }) => {
  if (!active || !payload || !payload.length) return null;
  const data = payload[0].payload;
  const name = data[nameKey];
  const value = data[valueKey];
  return (
    <div className="bg-white border border-gray-300 rounded px-2 py-1 text-xs shadow text-gray-800 min-w-[80px]">
      <div className="font-semibold truncate max-w-[120px]">{name}</div>
      <div className={`${colorClass} font-bold`}>{value !== undefined && value !== null ? `${Number(value).toFixed(2)}${unit}` : '-'}</div>
    </div>
  );
};

export default CustomTooltip; 