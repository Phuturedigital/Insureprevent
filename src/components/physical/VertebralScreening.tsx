import React from 'react';
import { ActivitySquare } from 'lucide-react';

interface VertebralScreeningProps {
  ribPelvisDistance: number;
  occipitWallDistance: number;
  xrayDate?: string;
  xrayFindings?: string;
  onChange: (
    field: 'ribPelvisDistance' | 'occipitWallDistance' | 'xrayDate' | 'xrayFindings',
    value: string | number
  ) => void;
}

export default function VertebralScreening({
  ribPelvisDistance,
  occipitWallDistance,
  xrayDate,
  xrayFindings,
  onChange,
}: VertebralScreeningProps) {
  const getDistanceStatus = (distance: number, type: 'rib' | 'occipit') => {
    if (type === 'rib') {
      if (distance > 4) return { color: 'text-red-600', text: 'High Risk' };
      if (distance > 2) return { color: 'text-yellow-600', text: 'Moderate Risk' };
      return { color: 'text-green-600', text: 'Low Risk' };
    } else {
      if (distance > 5) return { color: 'text-red-600', text: 'High Risk' };
      if (distance > 3) return { color: 'text-yellow-600', text: 'Moderate Risk' };
      return { color: 'text-green-600', text: 'Low Risk' };
    }
  };

  const ribStatus = getDistanceStatus(ribPelvisDistance, 'rib');
  const occipitStatus = getDistanceStatus(occipitWallDistance, 'occipit');

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <ActivitySquare className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Vertebral Fracture Screening</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Rib-Pelvis Distance (cm)
          </label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={ribPelvisDistance || ''}
              onChange={(e) => onChange('ribPelvisDistance', parseFloat(e.target.value) || 0)}
            />
            <span className={`absolute right-0 top-0 mr-3 mt-2 text-sm ${ribStatus.color}`}>
              {ribStatus.text}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Occipit-Wall Distance (cm)
          </label>
          <div className="mt-1 relative">
            <input
              type="number"
              min="0"
              max="10"
              step="0.1"
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              value={occipitWallDistance || ''}
              onChange={(e) => onChange('occipitWallDistance', parseFloat(e.target.value) || 0)}
            />
            <span className={`absolute right-0 top-0 mr-3 mt-2 text-sm ${occipitStatus.color}`}>
              {occipitStatus.text}
            </span>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            X-Ray Date
          </label>
          <input
            type="date"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={xrayDate || ''}
            onChange={(e) => onChange('xrayDate', e.target.value)}
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">
            X-Ray Findings
          </label>
          <textarea
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={xrayFindings || ''}
            onChange={(e) => onChange('xrayFindings', e.target.value)}
            placeholder="Enter any relevant X-ray findings..."
          />
        </div>
      </div>
    </div>
  );
}