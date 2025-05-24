import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import useBreakpoint from '../../hooks/useBreakpoint';
import CustomTooltip from './CustomTooltip';

interface TotalRaceTimeChartProps {
  totalTimeData: { name: string; seconds: number | null }[];
}

const TotalRaceTimeChart: React.FC<TotalRaceTimeChartProps> = ({ totalTimeData }) => {
  const isVerySmallScreen = useBreakpoint(350);
  if (!totalTimeData.length) return null;
  const height = Math.max(240, Math.min(600, totalTimeData.length * 48));
  return (
    <div className="w-full" style={{ flex: 1, maxWidth: 800, background: '#f8fafc', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 className="text-center text-lg font-bold mb-2 text-red-700">Total Race Time (seconds)</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart
          data={totalTimeData}
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
          <Tooltip content={<CustomTooltip valueKey="seconds" unit=" s" colorClass="text-red-700" />} cursor={{ fill: 'rgba(211, 47, 47, 0.08)' }} />
          <Bar dataKey="seconds" fill="#d32f2f" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalRaceTimeChart; 