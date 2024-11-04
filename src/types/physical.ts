export interface PhysicalExamData {
  height: {
    current: number;
    historical?: number;
    heightLoss?: number;
  };
  weight: number;
  bmi: number;
  balance: {
    tugTest: number;
    chairRise: boolean;
    steadyGait: boolean;
  };
  vertebralScreening: {
    ribPelvisDistance: number;
    occipitWallDistance: number;
    xrayDate?: string;
    xrayFindings?: string;
  };
  additionalTests: {
    gripStrength?: number;
    rangeOfMotion?: string;
    notes?: string;
  };
  flagForFollowUp: boolean;
  followUpNotes?: string;
}

export interface PhysicalExamProps {
  onSave: (data: PhysicalExamData) => void;
  initialData?: Partial<PhysicalExamData>;
}