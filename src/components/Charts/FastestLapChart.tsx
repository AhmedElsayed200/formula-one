import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LabelList } from 'recharts';

interface FastestLapChartProps {
  fastestLapData: { name: string; seconds: number | null }[];
}

const FastestLapChart: React.FC<FastestLapChartProps> = ({ fastestLapData }) => {
  if (!fastestLapData.length) return null;
  return (
    <div style={{ flex: 1, minWidth: 320, maxWidth: 800, background: '#f8fafc', borderRadius: 12, padding: 20, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
      <h3 style={{ textAlign: 'center', color: '#1976d2', marginBottom: 12 }}>Fastest Lap Time (seconds)</h3>
      <ResponsiveContainer width="100%" height={600}>
        <BarChart
          data={fastestLapData}
          layout="vertical"
          margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
        >
          <XAxis type="number" dataKey="seconds" domain={['auto', 'auto']} tick={{ fontSize: 12 }} tickFormatter={(value: any) => value !== null && value !== undefined ? Number(value).toFixed(2) : '-'} />
          <YAxis type="category" dataKey="name" width={180} tick={{ fontSize: 14 }} interval={0} />
          <Tooltip formatter={(value) => value !== null && value !== undefined ? `${Number(value).toFixed(2)} s` : '-'} />
          <Legend />
          <Bar dataKey="seconds" fill="#1976d2">
            <LabelList dataKey="seconds" position="right" formatter={(value: any, _idx: number): string => {
              if (value === null || value === undefined || isNaN(Number(value))) return '-';
              return String(Number(value).toFixed(2));
            }} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default FastestLapChart; 