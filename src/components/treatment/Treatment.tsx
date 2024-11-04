import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { TreatmentData, TreatmentProps } from '../../types/treatment';
import LifestyleModifications from './LifestyleModifications';
import Medications from './Medications';
import PhysicalTherapy from './PhysicalTherapy';
import FollowUp from './FollowUp';

const defaultTreatmentData: TreatmentData = {
  riskLevel: 'low',
  lifestyle: {
    exercise: {
      type: [],
      frequency: 3,
      duration: 30,
    },
    nutrition: {
      calciumIntake: 1000,
      vitaminD: 800,
      supplements: [],
    },
  },
  medications: [],
  physicalTherapy: {
    exercises: [],
    frequency: 2,
    duration: 45,
  },
  followUp: {
    reminderEnabled: false,
  },
};

export default function Treatment({
  onSave,
  initialData,
  patientRiskLevel,
}: TreatmentProps) {
  const [formData, setFormData] = useState<TreatmentData>({
    ...defaultTreatmentData,
    ...initialData,
    riskLevel: patientRiskLevel,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleLifestyleChange = (field: 'exercise' | 'nutrition', value: any) => {
    setFormData((prev) => ({
      ...prev,
      lifestyle: {
        ...prev.lifestyle,
        [field]: value,
      },
    }));
  };

  const handleMedicationsChange = (medications: any[]) => {
    setFormData((prev) => ({
      ...prev,
      medications,
    }));
  };

  const handlePhysicalTherapyChange = (therapy: any) => {
    setFormData((prev) => ({
      ...prev,
      physicalTherapy: therapy,
    }));
  };

  const handleFollowUpChange = (followUp: any) => {
    setFormData((prev) => ({
      ...prev,
      followUp,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-6">
          <LifestyleModifications
            exercise={formData.lifestyle.exercise}
            nutrition={formData.lifestyle.nutrition}
            onChange={handleLifestyleChange}
          />
        </div>

        <div className="p-6">
          <Medications
            medications={formData.medications}
            onChange={handleMedicationsChange}
          />
        </div>

        <div className="p-6">
          <PhysicalTherapy
            therapy={formData.physicalTherapy}
            onChange={handlePhysicalTherapyChange}
          />
        </div>

        <div className="p-6">
          <FollowUp
            followUp={formData.followUp}
            onChange={handleFollowUpChange}
          />
        </div>

        <div className="p-6">
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              rows={4}
              value={formData.customNotes || ''}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  customNotes: e.target.value,
                }))
              }
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add any additional treatment notes or observations..."
            />
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
          Save Treatment Plan
        </button>
      </div>

      <div className="mt-4 bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Treatment plans should be reviewed and adjusted based on patient response and any changes in risk factors.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}