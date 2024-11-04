export interface LifestyleData {
  smokingStatus: boolean;
  smokingYears?: number;
  alcoholUnits: number;
  physicalActivity: 'sedentary' | 'light' | 'moderate' | 'high';
  exerciseFrequency: number;
  exerciseDuration: number;
  calciumIntake: number;
  vitaminD: number;
  medications: string[];
}

export interface LifestyleReviewProps {
  onSave: (data: LifestyleData) => void;
  initialData?: Partial<LifestyleData>;
}