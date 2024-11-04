import React, { useState, useRef } from 'react';
import { Timer, Check } from 'lucide-react';

interface BalanceTestsProps {
  tugTest: number;
  chairRise: boolean;
  steadyGait: boolean;
  onChange: (field: 'tugTest' | 'chairRise' | 'steadyGait', value: number | boolean) => void;
}

export default function BalanceTests({
  tugTest,
  chairRise,
  steadyGait,
  onChange,
}: BalanceTestsProps) {
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const startTimer = () => {
    setIsTimerRunning(true);
    startTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTimeRef.current) / 1000));
    }, 100);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      setIsTimerRunning(false);
      onChange('tugTest', elapsedTime);
    }
  };

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsTimerRunning(false);
    setElapsedTime(0);
  };

  const getTugTestStatus = (time: number) => {
    if (time === 0) return { color: 'text-gray-600', text: 'Not Tested' };
    if (time > 20) return { color: 'text-red-600', text: 'High Risk' };
    if (time > 12) return { color: 'text-yellow-600', text: 'Moderate Risk' };
    return { color: 'text-green-600', text: 'Low Risk' };
  };

  const tugStatus = getTugTestStatus(tugTest);

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Timer className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Balance & Gait Assessment</h3>
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">
            Timed Up and Go Test
          </label>
          <div className="flex items-center space-x-4">
            <div className="text-3xl font-mono font-bold w-20 text-center">
              {elapsedTime.toFixed(1)}s
            </div>
            <div className="space-x-2">
              <button
                type="button"
                onClick={isTimerRunning ? stopTimer : startTimer}
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ${
                  isTimerRunning
                    ? 'bg-red-600 hover:bg-red-700'
                    : 'bg-green-600 hover:bg-green-700'
                }`}
              >
                {isTimerRunning ? 'Stop' : 'Start'}
              </button>
              <button
                type="button"
                onClick={resetTimer}
                className="px-4 py-2 rounded-md text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200"
              >
                Reset
              </button>
            </div>
          </div>
          <div className={`text-sm font-medium ${tugStatus.color}`}>
            {tugStatus.text}
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={chairRise}
                onChange={(e) => onChange('chairRise', e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span>Able to rise from chair without support</span>
            </label>
          </div>

          <div>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={steadyGait}
                onChange={(e) => onChange('steadyGait', e.target.checked)}
                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
              <span>Demonstrates steady gait</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}