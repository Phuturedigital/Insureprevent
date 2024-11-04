import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface RiskDisplayProps {
  level: 'low' | 'moderate' | 'high';
  tenYearRisk: number;
  recommendations: string[];
}

export default function RiskDisplay({ level, tenYearRisk, recommendations }: RiskDisplayProps) {
  const getRiskColor = () => {
    switch (level) {
      case 'high':
        return 'text-red-600 border-red-200 bg-red-50';
      case 'moderate':
        return 'text-yellow-600 border-yellow-200 bg-yellow-50';
      case 'low':
        return 'text-green-600 border-green-200 bg-green-50';
    }
  };

  const getCircleColor = () => {
    switch (level) {
      case 'high':
        return 'text-red-600';
      case 'moderate':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <AlertTriangle className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Fracture Risk Assessment</h3>
      </div>

      <div className="flex items-center justify-center">
        <div className="relative w-48 h-48">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={`${(tenYearRisk / 100) * 283} 283`}
              strokeLinecap="round"
              className={`transform -rotate-90 origin-center transition-all duration-1000 ${getCircleColor()}`}
            />
            <text
              x="50"
              y="45"
              textAnchor="middle"
              className="text-2xl font-bold"
              fill="currentColor"
            >
              {tenYearRisk}%
            </text>
            <text
              x="50"
              y="65"
              textAnchor="middle"
              className="text-xs uppercase"
              fill="currentColor"
            >
              10-Year Risk
            </text>
          </svg>
        </div>
      </div>

      <div className={`p-4 rounded-lg border ${getRiskColor()}`}>
        <div className="flex items-center justify-between mb-4">
          <span className="text-lg font-semibold capitalize">
            {level} Risk Level
          </span>
          <span className="text-sm">
            {tenYearRisk}% chance of major osteoporotic fracture
          </span>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium">Recommendations:</h4>
          <ul className="list-disc list-inside space-y-1">
            {recommendations.map((rec, index) => (
              <li key={index} className="text-sm">
                {rec}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}