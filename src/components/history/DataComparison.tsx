import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import type { DataComparisonProps } from '../../types/history';

export default function DataComparison({ data }: DataComparisonProps) {
  const formatData = () => {
    return data.dates.map((date, index) => {
      const dataPoint: any = { date };
      Object.keys(data.metrics).forEach((metric) => {
        dataPoint[metric] = data.metrics[metric].values[index];
      });
      return dataPoint;
    });
  };

  const chartData = formatData();

  const colors = [
    '#4F46E5', // indigo-600
    '#DC2626', // red-600
    '#2563EB', // blue-600
    '#7C3AED', // purple-600
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Metrics Over Time</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(date) => new Date(date).toLocaleDateString()}
                formatter={(value, name) => [
                  value,
                  data.metrics[name]?.label || name,
                ]}
              />
              <Legend />
              {Object.keys(data.metrics).map((metric, index) => (
                <Line
                  key={metric}
                  type="monotone"
                  dataKey={metric}
                  name={data.metrics[metric].label}
                  stroke={colors[index % colors.length]}
                  activeDot={{ r: 8 }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              {Object.keys(data.metrics).map((metric) => (
                <th
                  key={metric}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {data.metrics[metric].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.dates.map((date, index) => (
              <tr key={date}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {new Date(date).toLocaleDateString()}
                </td>
                {Object.keys(data.metrics).map((metric) => (
                  <td key={metric} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {data.metrics[metric].values[index]?.toFixed(2)}
                    {data.metrics[metric].unit && ` ${data.metrics[metric].unit}`}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}