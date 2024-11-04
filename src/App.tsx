import React, { useState } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PatientProfile from './components/PatientProfile';
import LifestyleReview from './components/lifestyle/LifestyleReview';
import PhysicalExam from './components/physical/PhysicalExam';
import RiskAssessment from './components/risk/RiskAssessment';
import Treatment from './components/treatment/Treatment';
import History from './components/history/History';
import type { Step } from './types/patient';
import type { LifestyleData } from './types/lifestyle';
import type { PhysicalExamData } from './types/physical';
import type { RiskAssessmentData } from './types/risk';
import type { TreatmentData } from './types/treatment';

function App() {
  const [currentStep, setCurrentStep] = useState<Step>('dashboard');
  const [lifestyleData, setLifestyleData] = useState<LifestyleData | null>(null);
  const [riskData, setRiskData] = useState<RiskAssessmentData | null>(null);

  const handleStepChange = (step: Step) => {
    setCurrentStep(step);
  };

  const handleSaveProfile = (data: any) => {
    console.log('Profile data:', data);
    setCurrentStep('lifestyle');
  };

  const handleSaveLifestyle = (data: LifestyleData) => {
    console.log('Lifestyle data:', data);
    setLifestyleData(data);
    setCurrentStep('physical');
  };

  const handleSavePhysical = (data: PhysicalExamData) => {
    console.log('Physical exam data:', data);
    setCurrentStep('risk');
  };

  const handleSaveRisk = (data: RiskAssessmentData) => {
    console.log('Risk assessment data:', data);
    setRiskData(data);
    setCurrentStep('treatment');
  };

  const handleSaveTreatment = (data: TreatmentData) => {
    console.log('Treatment data:', data);
    setCurrentStep('history');
  };

  const handleExportHistory = () => {
    console.log('Exporting history report...');
    // Implement export functionality
  };

  return (
    <Layout currentStep={currentStep} onStepChange={handleStepChange}>
      {currentStep === 'dashboard' && <Dashboard />}
      {currentStep === 'profile' && <PatientProfile onSave={handleSaveProfile} />}
      {currentStep === 'lifestyle' && <LifestyleReview onSave={handleSaveLifestyle} />}
      {currentStep === 'physical' && <PhysicalExam onSave={handleSavePhysical} />}
      {currentStep === 'risk' && (
        <RiskAssessment
          onSave={handleSaveRisk}
          lifestyleData={lifestyleData ? {
            smokingStatus: lifestyleData.smokingStatus,
            alcoholUnits: lifestyleData.alcoholUnits,
          } : undefined}
        />
      )}
      {currentStep === 'treatment' && (
        <Treatment
          onSave={handleSaveTreatment}
          patientRiskLevel={riskData?.calculatedRisk.level || 'low'}
        />
      )}
      {currentStep === 'history' && (
        <History patientId="123" onExport={handleExportHistory} />
      )}
    </Layout>
  );
}

export default App;