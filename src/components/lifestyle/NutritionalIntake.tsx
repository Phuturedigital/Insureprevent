import React from 'react';
import { Coffee } from 'lucide-react';

interface NutritionalIntakeProps {
  calciumIntake: number;
  vitaminD: number;
  onChange: (field: 'calcium' | 'vitaminD', value: number) => void;
}

export default function NutritionalIntake({
  calciumIntake,
  vitaminD,
  onChange,
}: NutritionalIntakeProps) {
  const getCalciumStatus = (intake: number) => {
    if (intake >= 1200) return { color: 'text-green-600', text: 'Optimal' };
    if (intake >= 800) return { color: 'text-yellow-600', text: 'Adequate' };
    return { color: 'text-red-600', text: 'Low' };
  };

  const getVitaminDStatus = (level: number) => {
    if (level >= 75) return { color: 'text-green-600', text: 'Optimal' };
    if (level >= 50) return { color: 'text-yellow-600', text: 'Adequate' };
    return { color: 'text-red-600', text: 'Low' };
  };

  const calciumStatus = getCalciumStatus(calciumIntake);
  const vitaminDStatus = getVitaminDStatus(vitaminD);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Coffee className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Nutritional Intake</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Calcium Intake (mg)
          </label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="0"
              max="2000"
              step="50"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={calciumIntake}
              onChange={(e) => onChange('calcium', parseInt(e.target.value) || 0)}
            />
            <span className={`absolute right-0 top-0 mr-3 mt-2 text-sm ${calciumStatus.color}`}>
              {calciumStatus.text}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vitamin D Level (nmol/L)
          </label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="0"
              max="200"
              step="5"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={vitaminD}
              onChange={(e) => onChange('vitaminD', parseInt(e.target.value) || 0)}
            />
            <span className={`absolute right-0 top-0 mr-3 mt-2 text-sm ${vitaminDStatus.color}`}>
              {vitaminDStatus.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}