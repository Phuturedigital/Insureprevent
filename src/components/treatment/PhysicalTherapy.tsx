import React from 'react';
import { Activity } from 'lucide-react';

interface PhysicalTherapyProps {
  therapy: {
    exercises: string[];
    frequency: number;
    duration: number;
    specialInstructions?: string;
  };
  onChange: (therapy: any) => void;
}

const commonExercises = [
  'Weight-bearing exercises',
  'Balance training',
  'Posture correction',
  'Core strengthening',
  'Gait training',
  'Fall prevention exercises',
  'Range of motion exercises',
];

export default function PhysicalTherapy({ therapy, onChange }: PhysicalTherapyProps) {
  const handleExerciseChange = (exercise: string) => {
    const newExercises = therapy.exercises.includes(exercise)
      ? therapy.exercises.filter((e) => e !== exercise)
      : [...therapy.exercises, exercise];
    onChange({ ...therapy, exercises: newExercises });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Physical Therapy Program</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Recommended Exercises
          </label>
          <div className="grid grid-cols-2 gap-2">
            {commonExercises.map((exercise) => (
              <label key={exercise} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={therapy.exercises.includes(exercise)}
                  onChange={() => handleExerciseChange(exercise)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">{exercise}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequency (sessions/week)
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={therapy.frequency}
              onChange={(e) =>
                onChange({ ...therapy, frequency: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Duration (minutes/session)
            </label>
            <input
              type="number"
              min="15"
              max="120"
              step="15"
              value={therapy.duration}
              onChange={(e) =>
                onChange({ ...therapy, duration: parseInt(e.target.value) })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Special Instructions
          </label>
          <textarea
            rows={3}
            value={therapy.specialInstructions || ''}
            onChange={(e) =>
              onChange({ ...therapy, specialInstructions: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter any special instructions or precautions..."
          />
        </div>
      </div>
    </div>
  );
}