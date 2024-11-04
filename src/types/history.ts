export interface HistoricalEvent {
  id: string;
  date: string;
  type: 'assessment' | 'fracture' | 'treatment' | 'exam' | 'note';
  title: string;
  description: string;
  data?: any;
  severity?: 'low' | 'moderate' | 'high';
}

export interface TimelineProps {
  events: HistoricalEvent[];
  onEventSelect: (event: HistoricalEvent) => void;
  selectedEventId?: string;
}

export interface DataComparisonProps {
  data: {
    dates: string[];
    metrics: {
      [key: string]: {
        label: string;
        values: (number | null)[];
        unit?: string;
      };
    };
  };
}

export interface HistoryProps {
  patientId: string;
  onExport: () => void;
}