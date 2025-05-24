import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useBreakpoint from '../../hooks/useBreakpoint';
import CustomTooltip from './CustomTooltip';

interface FastestLapChartProps {
  fastestLapData: { name: string; seconds: number | null }[];
}

const FastestLapChart: React.FC<FastestLapChartProps> = ({ fastestLapData }) => {
  const isVerySmallScreen = useBreakpoint(350);
  if (!fastestLapData.length) return null;
  const height = Math.max(240, Math.min(600, fastestLapData.length * 48));
  return (
    <div className="w-full" style={{ flex: 1, maxWidth: 800, background: '#f8fafc', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 className="text-center text-lg font-bold mb-2 text-blue-700">Fastest Lap Time (seconds)</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={fastestLapData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
          barSize={32}
        >
          <XAxis type="number" dataKey="seconds" domain={['auto', 'auto']} tick={{ fontSize: 12 }} tickFormatter={(value: any) => value !== null && value !== undefined ? Number(value).toFixed(2) : '-'} />
          <YAxis
            type="category"
            dataKey="name"
            width={isVerySmallScreen ? 0 : 180}
            tick={isVerySmallScreen ? false : { fontSize: 14 }}
            axisLine={false}
            tickLine={false}
            interval={0}
          />
          <Tooltip content={<CustomTooltip valueKey="seconds" unit=" s" colorClass="text-blue-700" />} cursor={{ fill: 'rgba(25, 118, 210, 0.08)' }} />
          <Bar dataKey="seconds" fill="#1976d2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FastestLapChart; 