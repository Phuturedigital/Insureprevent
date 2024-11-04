import React from 'react';
import { Ruler } from 'lucide-react';

interface HeightWeightProps {
  currentHeight: number;
  historicalHeight?: number;
  weight: number;
  onChange: (field: 'currentHeight' | 'historicalHeight' | 'weight', value: number) => void;
}

export default function HeightWeight({
  currentHeight,
  historicalHeight,
  weight,
  onChange,
}: HeightWeightProps) {
  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(1);
  };

  const calculateHeightLoss = () => {
    if (!historicalHeight || !currentHeight) return null;
    const loss = historicalHeight - currentHeight;
    return loss > 0 ? loss.toFixed(1) : null;
  };

  const heightLoss = calculateHeightLoss();
  const bmi = calculateBMI(currentHeight, weight);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Ruler className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Height & Weight Measurements</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Current Height (cm)
          </label>
          <input
            type="number"
            min="100"
            max="250"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={currentHeight || ''}
            onChange={(e) => onChange('currentHeight', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Historical Height (cm)
          </label>
          <input
            type="number"
            min="100"
            max="250"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={historicalHeight || ''}
            onChange={(e) => onChange('historicalHeight', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Weight (kg)
          </label>
          <input
            type="number"
            min="30"
            max="200"
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={weight || ''}
            onChange={(e) => onChange('weight', parseFloat(e.target.value) || 0)}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700">BMI</span>
            <span className="text-lg font-semibold">{bmi}</span>
          </div>
          {heightLoss && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-700">Height Loss</span>
              <span className={`text-lg font-semibold ${parseFloat(heightLoss) >= 4 ? 'text-red-600' : 'text-gray-900'}`}>
                {heightLoss} cm
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}