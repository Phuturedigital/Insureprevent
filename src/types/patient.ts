export interface PatientProfile {
  id?: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  email: string;
  phone: string;
  fractures: {
    hip: boolean;
    wrist: boolean;
    vertebrae: boolean;
  };
  familyHistory: {
    parentalOsteoporosis: boolean;
    familyFractures: boolean;
  };
  menopauseAge?: number;
  majorHealthConditions: string[];
  notes?: string;
  lastAssessment?: string;
  bmdScore?: number;
  riskLevel?: 'low' | 'moderate' | 'high';
  nextFollowUp?: string;
}

export interface DashboardStats {
  totalPatients: number;
  highRiskPatients: number;
  pendingFollowUps: number;
  upcomingAppointments: number;
}

export type Step = 'dashboard' | 'profile' | 'lifestyle' | 'physical' | 'risk' | 'treatment' | 'history';