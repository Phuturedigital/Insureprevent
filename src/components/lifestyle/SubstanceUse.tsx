import React from 'react';
import { Cigarette, Wine } from 'lucide-react';

interface SubstanceUseProps {
  smokingStatus: boolean;
  smokingYears?: number;
  alcoholUnits: number;
  onChange: (field: 'smoking' | 'smokingYears' | 'alcohol', value: number | boolean) => void;
}

export default function SubstanceUse({
  smokingStatus,
  smokingYears,
  alcoholUnits,
  onChange,
}: SubstanceUseProps) {
  const getAlcoholRisk = (units: number) => {
    if (units > 3) return { color: 'text-red-600', text: 'High Risk' };
    if (units > 1) return { color: 'text-yellow-600', text: 'Moderate Risk' };
    return { color: 'text-green-600', text: 'Low Risk' };
  };

  const alcoholRisk = getAlcoholRisk(alcoholUnits);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Cigarette className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Smoking Status</h3>
        </div>

        <div className="space-y-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              checked={smokingStatus}
              onChange={(e) => onChange('smoking', e.target.checked)}
            />
            <span className="ml-2">Current Smoker</span>
          </label>

          {smokingStatus && (
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Years of Smoking
              </label>
              <input
                type="number"
                min="0"
                max="70"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={smokingYears || ''}
                onChange={(e) => onChange('smokingYears', parseInt(e.target.value) || 0)}
              />
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Wine className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Alcohol Consumption</h3>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Units per Day
          </label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="0"
              max="20"
              step="0.5"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={alcoholUnits}
              onChange={(e) => onChange('alcohol', parseFloat(e.target.value) || 0)}
            />
            <span className={`absolute right-0 top-0 mr-3 mt-2 text-sm ${alcoholRisk.color}`}>
              {alcoholRisk.text}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}