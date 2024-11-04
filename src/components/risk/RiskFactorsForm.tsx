import React from 'react';
import { ClipboardList } from 'lucide-react';
import type { RiskFactors } from '../../types/risk';

interface RiskFactorsFormProps {
  factors: RiskFactors;
  onChange: (field: keyof RiskFactors, value: any) => void;
}

export default function RiskFactorsForm({ factors, onChange }: RiskFactorsFormProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ClipboardList className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Risk Factors</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            min="40"
            max="90"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={factors.age || ''}
            onChange={(e) => onChange('age', parseInt(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={factors.gender}
            onChange={(e) => onChange('gender', e.target.value)}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">BMD T-Score</label>
          <input
            type="number"
            step="0.1"
            min="-4"
            max="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={factors.bmdTScore || ''}
            onChange={(e) => onChange('bmdTScore', parseFloat(e.target.value))}
          />
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="text-sm font-medium text-gray-700">Additional Risk Factors</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { key: 'parentalHipFracture', label: 'Parental Hip Fracture' },
            { key: 'previousFracture', label: 'Previous Fracture' },
            { key: 'glucocorticoidUse', label: 'Glucocorticoid Use' },
            { key: 'rheumatoidArthritis', label: 'Rheumatoid Arthritis' },
            { key: 'secondaryOsteoporosis', label: 'Secondary Osteoporosis' },
            { key: 'currentSmoking', label: 'Current Smoking' },
            { key: 'alcoholUse', label: 'Alcohol Use (>3 units/day)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                checked={factors[key as keyof RiskFactors] || false}
                onChange={(e) => onChange(key as keyof RiskFactors, e.target.checked)}
              />
              <span className="text-sm text-gray-700">{label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}