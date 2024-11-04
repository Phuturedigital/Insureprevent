import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { LifestyleData, LifestyleReviewProps } from '../../types/lifestyle';
import ActivityLevel from './ActivityLevel';
import NutritionalIntake from './NutritionalIntake';
import SubstanceUse from './SubstanceUse';

const defaultLifestyleData: LifestyleData = {
  smokingStatus: false,
  smokingYears: 0,
  alcoholUnits: 0,
  physicalActivity: 'sedentary',
  exerciseFrequency: 0,
  exerciseDuration: 0,
  calciumIntake: 0,
  vitaminD: 0,
  medications: [],
};

export default function LifestyleReview({ onSave, initialData }: LifestyleReviewProps) {
  const [formData, setFormData] = useState<LifestyleData>({
    ...defaultLifestyleData,
    ...initialData,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleSubstanceChange = (field: 'smoking' | 'smokingYears' | 'alcohol', value: number | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field === 'smoking' ? 'smokingStatus' : field === 'alcohol' ? 'alcoholUnits' : 'smokingYears']: value,
    }));
  };

  const handleActivityChange = (value: 'sedentary' | 'light' | 'moderate' | 'high') => {
    setFormData((prev) => ({ ...prev, physicalActivity: value }));
  };

  const handleExerciseChange = (field: 'frequency' | 'duration', value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field === 'frequency' ? 'exerciseFrequency' : 'exerciseDuration']: value,
    }));
  };

  const handleNutritionalChange = (field: 'calcium' | 'vitaminD', value: number) => {
    setFormData((prev) => ({
      ...prev,
      [field === 'calcium' ? 'calciumIntake' : 'vitaminD']: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-6">
          <SubstanceUse
            smokingStatus={formData.smokingStatus}
            smokingYears={formData.smokingYears}
            alcoholUnits={formData.alcoholUnits}
            onChange={handleSubstanceChange}
          />
        </div>

        <div className="p-6">
          <ActivityLevel
            value={formData.physicalActivity}
            onChange={handleActivityChange}
            exerciseFrequency={formData.exerciseFrequency}
            exerciseDuration={formData.exerciseDuration}
            onExerciseChange={handleExerciseChange}
          />
        </div>

        <div className="p-6">
          <NutritionalIntake
            calciumIntake={formData.calciumIntake}
            vitaminD={formData.vitaminD}
            onChange={handleNutritionalChange}
          />
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
              Regular exercise and proper nutrition can help improve bone health and reduce fracture risk.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}