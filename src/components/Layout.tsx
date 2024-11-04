import React from 'react';
import { CircleUserRound, Activity, Heart, Calculator, Pill, History, LayoutDashboard } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  currentStep: string;
  onStepChange: (step: string) => void;
}

const steps = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'profile', icon: CircleUserRound, label: 'Patient Profile' },
  { id: 'lifestyle', icon: Activity, label: 'Lifestyle Review' },
  { id: 'physical', icon: Heart, label: 'Physical Exam' },
  { id: 'risk', icon: Calculator, label: 'Risk Assessment' },
  { id: 'treatment', icon: Pill, label: 'Treatment' },
  { id: 'history', icon: History, label: 'History' },
];

export default function Layout({ children, currentStep, onStepChange }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Heart className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">
                Osteoporosis Assessment Tool
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-8 overflow-x-auto pb-4">
          {steps.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onStepChange(id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                currentStep === id
                  ? 'bg-indigo-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-indigo-50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="whitespace-nowrap">{label}</span>
            </button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-xl p-6">
          {children}
        </div>
      </div>
    </div>
  );
}