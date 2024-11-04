import React from 'react';
import { Calendar, Bell } from 'lucide-react';

interface FollowUpProps {
  followUp: {
    nextBmdTest?: string;
    nextAssessment?: string;
    reminderEnabled: boolean;
    reminderNotes?: string;
  };
  onChange: (followUp: any) => void;
}

export default function FollowUp({ followUp, onChange }: FollowUpProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Calendar className="w-5 h-5 text-indigo-600" />
        <h3 className="text-lg font-medium">Follow-up Schedule</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Next BMD Test
          </label>
          <input
            type="date"
            value={followUp.nextBmdTest || ''}
            onChange={(e) =>
              onChange({ ...followUp, nextBmdTest: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Next Assessment
          </label>
          <input
            type="date"
            value={followUp.nextAssessment || ''}
            onChange={(e) =>
              onChange({ ...followUp, nextAssessment: e.target.value })
            }
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>

        <div className="col-span-2">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={followUp.reminderEnabled}
              onChange={(e) =>
                onChange({ ...followUp, reminderEnabled: e.target.checked })
              }
              className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-sm text-gray-700">Enable Reminders</span>
            <Bell className="w-4 h-4 text-gray-400" />
          </label>
        </div>

        {followUp.reminderEnabled && (
          <div className="col-span-2">
            <label className="block text-sm font-medium text-gray-700">
              Reminder Notes
            </label>
            <textarea
              rows={2}
              value={followUp.reminderNotes || ''}
              onChange={(e) =>
                onChange({ ...followUp, reminderNotes: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              placeholder="Add any specific instructions for follow-up..."
            />
          </div>
        )}
      </div>
    </div>
  );
}