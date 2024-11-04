import React from 'react';
import { Pill, Plus, Trash2 } from 'lucide-react';

interface Medication {
  id: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate?: string;
  status: 'current' | 'previous' | 'planned';
  notes?: string;
}

interface MedicationsProps {
  medications: Medication[];
  onChange: (medications: Medication[]) => void;
}

const commonMedications = [
  'Alendronate',
  'Risedronate',
  'Zoledronic acid',
  'Denosumab',
  'Teriparatide',
  'Abaloparatide',
  'Romosozumab',
];

export default function Medications({ medications, onChange }: MedicationsProps) {
  const addMedication = () => {
    const newMedication: Medication = {
      id: Date.now().toString(),
      name: '',
      dosage: '',
      frequency: '',
      startDate: new Date().toISOString().split('T')[0],
      status: 'planned',
    };
    onChange([...medications, newMedication]);
  };

  const updateMedication = (id: string, field: keyof Medication, value: string) => {
    onChange(
      medications.map((med) =>
        med.id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const removeMedication = (id: string) => {
    onChange(medications.filter((med) => med.id !== id));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'current':
        return 'bg-green-100 text-green-800';
      case 'previous':
        return 'bg-gray-100 text-gray-800';
      case 'planned':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Pill className="w-5 h-5 text-indigo-600" />
          <h3 className="text-lg font-medium">Medications</h3>
        </div>
        <button
          type="button"
          onClick={addMedication}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Medication
        </button>
      </div>

      <div className="space-y-4">
        {medications.map((medication) => (
          <div
            key={medication.id}
            className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="grid grid-cols-2 gap-4 flex-grow">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Medication
                  </label>
                  <select
                    value={medication.name}
                    onChange={(e) =>
                      updateMedication(medication.id, 'name', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  >
                    <option value="">Select medication...</option>
                    {commonMedications.map((med) => (
                      <option key={med} value={med}>
                        {med}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    value={medication.status}
                    onChange={(e) =>
                      updateMedication(
                        medication.id,
                        'status',
                        e.target.value as 'current' | 'previous' | 'planned'
                      )
                    }
                    className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 ${getStatusColor(
                      medication.status
                    )}`}
                  >
                    <option value="current">Current</option>
                    <option value="previous">Previous</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Dosage
                  </label>
                  <input
                    type="text"
                    value={medication.dosage}
                    onChange={(e) =>
                      updateMedication(medication.id, 'dosage', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Frequency
                  </label>
                  <input
                    type="text"
                    value={medication.frequency}
                    onChange={(e) =>
                      updateMedication(medication.id, 'frequency', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={medication.startDate}
                    onChange={(e) =>
                      updateMedication(medication.id, 'startDate', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={medication.endDate || ''}
                    onChange={(e) =>
                      updateMedication(medication.id, 'endDate', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <textarea
                    rows={2}
                    value={medication.notes || ''}
                    onChange={(e) =>
                      updateMedication(medication.id, 'notes', e.target.value)
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
              <button
                type="button"
                onClick={() => removeMedication(medication.id)}
                className="ml-4 text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}