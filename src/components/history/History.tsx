import React, { useState } from 'react';
import { FileText, Download, Filter } from 'lucide-react';
import type { HistoricalEvent } from '../../types/history';
import Timeline from './Timeline';
import DataComparison from './DataComparison';

// Mock data for demonstration
const mockEvents: HistoricalEvent[] = [
  {
    id: '1',
    date: '2024-03-01',
    type: 'assessment',
    title: 'Risk Assessment',
    description: 'Initial fracture risk assessment performed',
    severity: 'moderate',
    data: {
      bmdScore: -2.1,
      riskLevel: 'moderate',
      tenYearRisk: 15,
    },
  },
  {
    id: '2',
    date: '2024-02-15',
    type: 'exam',
    title: 'Physical Examination',
    description: 'Regular check-up and bone density measurement',
    data: {
      height: 165,
      weight: 70,
      bmdScore: -2.1,
    },
  },
  // Add more mock events as needed
];

const mockComparisonData = {
  dates: ['2023-09-01', '2023-12-01', '2024-03-01'],
  metrics: {
    bmdScore: {
      label: 'BMD T-Score',
      values: [-1.8, -2.0, -2.1],
    },
    height: {
      label: 'Height',
      values: [166, 165.5, 165],
      unit: 'cm',
    },
    weight: {
      label: 'Weight',
      values: [71, 70.5, 70],
      unit: 'kg',
    },
  },
};

export default function History({ patientId, onExport }: HistoryProps) {
  const [selectedEventId, setSelectedEventId] = useState<string>();
  const [filterType, setFilterType] = useState<string>('all');

  const handleEventSelect = (event: HistoricalEvent) => {
    setSelectedEventId(event.id);
  };

  const filteredEvents = filterType === 'all'
    ? mockEvents
    : mockEvents.filter(event => event.type === filterType);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Patient History</h2>
        <div className="flex space-x-4">
          <div className="relative">
            <select
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm leading-5 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
            >
              <option value="all">All Events</option>
              <option value="assessment">Assessments</option>
              <option value="exam">Examinations</option>
              <option value="treatment">Treatments</option>
              <option value="fracture">Fractures</option>
            </select>
            <Filter className="absolute right-3 top-2.5 h-4 w-4 text-gray-400" />
          </div>
          <button
            onClick={onExport}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Timeline</h3>
          <Timeline
            events={filteredEvents}
            onEventSelect={handleEventSelect}
            selectedEventId={selectedEventId}
          />
        </div>

        <div>
          <DataComparison data={mockComparisonData} />
        </div>
      </div>

      {selectedEventId && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Event Details</h3>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <div className="prose max-w-none">
            {/* Render detailed event information here */}
            <p>Selected event details would be displayed here...</p>
          </div>
        </div>
      )}
    </div>
  );
}