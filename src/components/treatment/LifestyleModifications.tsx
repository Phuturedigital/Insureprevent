import React from 'react';
import { Dumbbell, Coffee } from 'lucide-react';

interface LifestyleModificationsProps {
  exercise: {
    type: string[];
    frequency: number;
    duration: number;
    notes?: string;
  };
  nutrition: {
    calciumIntake: number;
    vitaminD: number;
    supplements: string[];
  };
  onChange: (field: 'exercise' | 'nutrition', value: any) => void;
}

const exerciseTypes = [
  'Weight-bearing exercises',
  'Resistance training',
  'Balance exercises',
  'Flexibility training',
  'Walking',
  'Swimming',
  'Yoga',
];

export default function LifestyleModifications({
  exercise,
  nutrition,
  onChange,
}: LifestyleModificationsProps) {
  const handleExerciseTypeChange = (type: string) => {
    const newTypes = exercise.type.includes(type)
      ? exercise.type.filter(t => t !== type)
      : [...exercise.type, type];
    onChange('exercise', { ...exercise, type: newTypes });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Dumbbell className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Exercise Recommendations</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Exercise Types
            </label>
            <div className="grid grid-cols-2 gap-2">
              {exerciseTypes.map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={exercise.type.includes(type)}
                    onChange={() => handleExerciseTypeChange(type)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Frequency (sessions/week)
            </label>
            <input
              type="number"
              min="1"
              max="7"
              value={exercise.frequency}
              onChange={(e) =>
                onChange('exercise', {
                  ...exercise,
                  frequency: parseInt(e.target.value),
                })
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
              min="10"
              max="120"
              step="5"
              value={exercise.duration}
              onChange={(e) =>
                onChange('exercise', {
                  ...exercise,
                  duration: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Additional Notes
            </label>
            <textarea
              value={exercise.notes || ''}
              onChange={(e) =>
                onChange('exercise', { ...exercise, notes: e.target.value })
              }
              rows={2}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Coffee className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Nutritional Recommendations</h3>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily Calcium Intake (mg)
            </label>
            <input
              type="number"
              min="500"
              max="2000"
              step="100"
              value={nutrition.calciumIntake}
              onChange={(e) =>
                onChange('nutrition', {
                  ...nutrition,
                  calciumIntake: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Daily Vitamin D (IU)
            </label>
            <input
              type="number"
              min="400"
              max="4000"
              step="100"
              value={nutrition.vitaminD}
              onChange={(e) =>
                onChange('nutrition', {
                  ...nutrition,
                  vitaminD: parseInt(e.target.value),
                })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>

          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Recommended Supplements
            </label>
            <input
              type="text"
              value={nutrition.supplements.join(', ')}
              onChange={(e) =>
                onChange('nutrition', {
                  ...nutrition,
                  supplements: e.target.value.split(',').map((s) => s.trim()),
                })
              }
              placeholder="Enter supplements separated by commas"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}