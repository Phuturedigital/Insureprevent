import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { PhysicalExamData, PhysicalExamProps } from '../../types/physical';
import HeightWeight from './HeightWeight';
import BalanceTests from './BalanceTests';
import VertebralScreening from './VertebralScreening';

const defaultPhysicalData: PhysicalExamData = {
  height: {
    current: 0,
    historical: undefined,
    heightLoss: 0,
  },
  weight: 0,
  bmi: 0,
  balance: {
    tugTest: 0,
    chairRise: false,
    steadyGait: false,
  },
  vertebralScreening: {
    ribPelvisDistance: 0,
    occipitWallDistance: 0,
  },
  additionalTests: {},
  flagForFollowUp: false,
};

export default function PhysicalExam({ onSave, initialData }: PhysicalExamProps) {
  const [formData, setFormData] = useState<PhysicalExamData>({
    ...defaultPhysicalData,
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleHeightWeightChange = (
    field: 'currentHeight' | 'historicalHeight' | 'weight',
    value: number
  ) => {
    setFormData((prev) => ({
      ...prev,
      height: {
        ...prev.height,
        [field === 'currentHeight' ? 'current' : 'historical']: value,
      },
      weight: field === 'weight' ? value : prev.weight,
    }));
  };

  const handleBalanceChange = (
    field: 'tugTest' | 'chairRise' | 'steadyGait',
    value: number | boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      balance: {
        ...prev.balance,
        [field]: value,
      },
    }));
  };

  const handleVertebralChange = (
    field: 'ribPelvisDistance' | 'occipitWallDistance' | 'xrayDate' | 'xrayFindings',
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      vertebralScreening: {
        ...prev.vertebralScreening,
        [field]: value,
      },
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-6">
          <HeightWeight
            currentHeight={formData.height.current}
            historicalHeight={formData.height.historical}
            weight={formData.weight}
            onChange={handleHeightWeightChange}
          />
        </div>

        <div className="p-6">
          <BalanceTests
            tugTest={formData.balance.tugTest}
            chairRise={formData.balance.chairRise}
            steadyGait={formData.balance.steadyGait}
            onChange={handleBalanceChange}
          />
        </div>

        <div className="p-6">
          <VertebralScreening
            ribPelvisDistance={formData.vertebralScreening.ribPelvisDistance}
            occipitWallDistance={formData.vertebralScreening.occipitWallDistance}
            xrayDate={formData.vertebralScreening.xrayDate}
            xrayFindings={formData.vertebralScreening.xrayFindings}
            onChange={handleVertebralChange}
          />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.flagForFollowUp}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      flagForFollowUp: e.target.checked,
                    }))
                  }
                  className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Flag for Follow-up</span>
              </label>
            </div>

            {formData.flagForFollowUp && (
              <textarea
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                value={formData.followUpNotes || ''}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    followUpNotes: e.target.value,
                  }))
                }
                placeholder="Enter follow-up notes..."
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Save & Continue
        </button>
      </div>

      <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Regular physical assessments help track changes in bone health and mobility over time.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}