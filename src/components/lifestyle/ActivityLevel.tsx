import React from 'react';
import { Activity } from 'lucide-react';

interface ActivityLevelProps {
  value: string;
  onChange: (value: 'sedentary' | 'light' | 'moderate' | 'high') => void;
  exerciseFrequency: number;
  exerciseDuration: number;
  onExerciseChange: (field: 'frequency' | 'duration', value: number) => void;
}

export default function ActivityLevel({
  value,
  onChange,
  exerciseFrequency,
  exerciseDuration,
  onExerciseChange,
}: ActivityLevelProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Activity className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Physical Activity Level</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Activity Level</label>
          <select
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={value}
            onChange={(e) => onChange(e.target.value as 'sedentary' | 'light' | 'moderate' | 'high')}
          >
            <option value="sedentary">Sedentary</option>
            <option value="light">Light Activity</option>
            <option value="moderate">Moderate Activity</option>
            <option value="high">High Activity</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Exercise Sessions per Week</label>
          <input
            type="number"
            min="0"
            max="7"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={exerciseFrequency}
            onChange={(e) => onExerciseChange('frequency', parseInt(e.target.value) || 0)}
          />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700">Average Exercise Duration (minutes)</label>
          <input
            type="number"
            min="0"
            max="240"
            step="5"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            value={exerciseDuration}
            onChange={(e) => onExerciseChange('duration', parseInt(e.target.value) || 0)}
          />
        </div>
      </div>
    </div>
  );
}