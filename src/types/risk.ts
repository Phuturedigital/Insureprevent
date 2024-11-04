export interface RiskFactors {
  age: number;
  gender: 'male' | 'female';
  bmdTScore: number;
  parentalHipFracture: boolean;
  previousFracture: boolean;
  glucocorticoidUse: boolean;
  rheumatoidArthritis: boolean;
  secondaryOsteoporosis: boolean;
  currentSmoking: boolean;
  alcoholUse: boolean;
}

export interface RiskAssessmentData {
  factors: RiskFactors;
  calculatedRisk: {
    level: 'low' | 'moderate' | 'high';
    tenYearRisk: number;
    recommendations: string[];
  };
}

export interface RiskAssessmentProps {
  onSave: (data: RiskAssessmentData) => void;
  initialData?: Partial<RiskAssessmentData>;
  lifestyleData?: {
    smokingStatus: boolean;
    alcoholUnits: number;
  };
}