import React from 'react';
import { Search, Users, AlertTriangle, Calendar, Clock } from 'lucide-react';
import type { PatientProfile, DashboardStats } from '../types/patient';

// Mock data for demonstration
const mockStats: DashboardStats = {
  totalPatients: 156,
  highRiskPatients: 23,
  pendingFollowUps: 12,
  upcomingAppointments: 8,
};

const mockPatients: PatientProfile[] = [
  {
    id: '1',
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: '1965-03-15',
    gender: 'female',
    email: 'jane@example.com',
    phone: '555-0123',
    fractures: { hip: false, wrist: true, vertebrae: false },
    familyHistory: { parentalOsteoporosis: true, familyFractures: false },
    majorHealthConditions: [],
    lastAssessment: '2024-02-15',
    bmdScore: -2.1,
    riskLevel: 'high',
    nextFollowUp: '2024-04-15',
  },
  // Add more mock patients as needed
];

const StatCard = ({ icon: Icon, label, value, color }: { 
  icon: React.ElementType; 
  label: string; 
  value: number;
  color: string;
}) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{label}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

const PatientCard = ({ patient }: { patient: PatientProfile }) => {
  const getRiskBadgeColor = (risk?: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">
            {patient.firstName} {patient.lastName}
          </h3>
          <p className="text-sm text-gray-600">
            Last Assessment: {patient.lastAssessment}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskBadgeColor(patient.riskLevel)}`}>
          {patient.riskLevel?.toUpperCase()}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600">BMD Score</p>
          <p className="font-medium">{patient.bmdScore}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Next Follow-up</p>
          <p className="font-medium">{patient.nextFollowUp}</p>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search patients..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Patients"
          value={mockStats.totalPatients}
          color="bg-indigo-500"
        />
        <StatCard
          icon={AlertTriangle}
          label="High Risk Patients"
          value={mockStats.highRiskPatients}
          color="bg-red-500"
        />
        <StatCard
          icon={Clock}
          label="Pending Follow-ups"
          value={mockStats.pendingFollowUps}
          color="bg-yellow-500"
        />
        <StatCard
          icon={Calendar}
          label="Upcoming Appointments"
          value={mockStats.upcomingAppointments}
          color="bg-green-500"
        />
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Patients</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockPatients.map((patient) => (
            <PatientCard key={patient.id} patient={patient} />
          ))}
        </div>
      </div>
    </div>
  );
}