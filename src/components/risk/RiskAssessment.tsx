import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import type { RiskAssessmentData, RiskFactors } from '../../types/risk';
import RiskFactorsForm from './RiskFactorsForm';
import RiskDisplay from './RiskDisplay';

const defaultRiskFactors: RiskFactors = {
  age: 0,
  gender: 'female',
  bmdTScore: 0,
  parentalHipFracture: false,
  previousFracture: false,
  glucocorticoidUse: false,
  rheumatoidArthritis: false,
  secondaryOsteoporosis: false,
  currentSmoking: false,
  alcoholUse: false,
};

const calculateRisk = (factors: RiskFactors) => {
  // This is a simplified risk calculation for demonstration
  // In practice, you would implement the actual FRAX/CAROC algorithm
  let riskScore = 0;
  
  // Age factor
  riskScore += (factors.age - 50) * 0.5;
  
  // BMD factor
  riskScore += Math.abs(factors.bmdTScore) * 10;
  
  // Additional risk factors
  if (factors.parentalHipFracture) riskScore += 5;
  if (factors.previousFracture) riskScore += 10;
  if (factors.glucocorticoidUse) riskScore += 7;
  if (factors.rheumatoidArthritis) riskScore += 4;
  if (factors.secondaryOsteoporosis) riskScore += 3;
  if (factors.currentSmoking) riskScore += 2;
  if (factors.alcoholUse) riskScore += 3;

  // Normalize to percentage (0-100)
  const normalizedRisk = Math.min(Math.max(riskScore, 0), 100);

  // Determine risk level
  let level: 'low' | 'moderate' | 'high';
  if (normalizedRisk < 10) level = 'low';
  else if (normalizedRisk < 20) level = 'moderate';
  else level = 'high';

  // Generate recommendations based on risk level
  const recommendations = [
    `Schedule ${level === 'high' ? 'frequent' : 'regular'} BMD screenings`,
    level !== 'low' ? 'Consider pharmacological intervention' : 'Focus on preventive measures',
    'Maintain adequate calcium and vitamin D intake',
    'Engage in weight-bearing exercises',
  ];

  return {
    level,
    tenYearRisk: Math.round(normalizedRisk),
    recommendations,
  };
};

export default function RiskAssessment({ onSave, initialData, lifestyleData }: RiskAssessmentProps) {
  const [factors, setFactors] = useState<RiskFactors>({
    ...defaultRiskFactors,
    ...initialData?.factors,
  });

  useEffect(() => {
    if (lifestyleData) {
      setFactors(prev => ({
        ...prev,
        currentSmoking: lifestyleData.smokingStatus,
        alcoholUse: lifestyleData.alcoholUnits > 3,
      }));
    }
  }, [lifestyleData]);

  const handleFactorChange = (field: keyof RiskFactors, value: any) => {
    setFactors(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const calculatedRisk = calculateRisk(factors);
    onSave({ factors, calculatedRisk });
  };

  const calculatedRisk = calculateRisk(factors);

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-lg shadow divide-y divide-gray-200">
        <div className="p-6">
          <RiskFactorsForm factors={factors} onChange={handleFactorChange} />
        </div>

        <div className="p-6">
          <RiskDisplay {...calculatedRisk} />
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
              This risk assessment is based on established FRAX/CAROC guidelines. Regular reassessment is recommended as risk factors may change over time.
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}