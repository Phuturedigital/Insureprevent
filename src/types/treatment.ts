export interface TreatmentData {
  riskLevel: 'low' | 'moderate' | 'high';
  lifestyle: {
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
  };
  medications: {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    status: 'current' | 'previous' | 'planned';
    notes?: string;
  }[];
  physicalTherapy: {
    exercises: string[];
    frequency: number;
    duration: number;
    specialInstructions?: string;
  };
  followUp: {
    nextBmdTest?: string;
    nextAssessment?: string;
    reminderEnabled: boolean;
    reminderNotes?: string;
  };
  customNotes?: string;
}

export interface TreatmentProps {
  onSave: (data: TreatmentData) => void;
  initialData?: Partial<TreatmentData>;
  patientRiskLevel: 'low' | 'moderate' | 'high';
}