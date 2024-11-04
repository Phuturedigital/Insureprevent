import React from 'react';
import { Calendar, Circle } from 'lucide-react';
import type { HistoricalEvent } from '../../types/history';

interface TimelineProps {
  events: HistoricalEvent[];
  onEventSelect: (event: HistoricalEvent) => void;
  selectedEventId?: string;
}

export default function Timeline({ events, onEventSelect, selectedEventId }: TimelineProps) {
  const getEventIcon = (type: string) => {
    switch (type) {
      case 'assessment':
        return 'clipboard-list';
      case 'fracture':
        return 'bone';
      case 'treatment':
        return 'pill';
      case 'exam':
        return 'stethoscope';
      default:
        return 'note';
    }
  };

  const getSeverityColor = (severity?: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flow-root">
      <div className="-mb-8">
        {events.map((event, eventIdx) => (
          <div key={event.id} className="relative pb-8">
            {eventIdx !== events.length - 1 ? (
              <span
                className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                aria-hidden="true"
              />
            ) : null}
            <div className="relative flex items-start space-x-3">
              <div
                className={`relative px-1 ${
                  selectedEventId === event.id ? 'bg-indigo-50 rounded-full' : ''
                }`}
              >
                <div
                  className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                    selectedEventId === event.id ? 'bg-indigo-600' : 'bg-gray-400'
                  }`}
                >
                  <Calendar className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="min-w-0 flex-1">
                <div>
                  <div className="text-sm">
                    <button
                      onClick={() => onEventSelect(event)}
                      className={`font-medium ${
                        selectedEventId === event.id
                          ? 'text-indigo-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {event.title}
                    </button>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="mt-2 text-sm text-gray-700">
                  <p>{event.description}</p>
                </div>
                {event.severity && (
                  <div className="mt-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSeverityColor(
                        event.severity
                      )}`}
                    >
                      <Circle className="mr-1 h-2 w-2" />
                      {event.severity.charAt(0).toUpperCase() + event.severity.slice(1)} Risk
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}