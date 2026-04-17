import React from 'react';
import { Clock, TrendingUp } from 'lucide-react';

export interface TimeframeOption {
  value: string;
  label: string;
  description: string;
}

interface TimeframeSelectorProps {
  selectedTimeframe: string;
  onTimeframeChange: (timeframe: string) => void;
  loading?: boolean;
}

const TIMEFRAMES: TimeframeOption[] = [
  {
    value: '5m',
    label: '5 Min',
    description: 'Ultra Short Term',
  },
  {
    value: '15m',
    label: '15 Min',
    description: 'Intraday Trading',
  },
  {
    value: '1h',
    label: '1 Hour',
    description: 'Hourly Analysis',
  },
  {
    value: '1d',
    label: '1 Day',
    description: 'Daily Swing',
  },
];

export const TimeframeSelector: React.FC<TimeframeSelectorProps> = ({
  selectedTimeframe,
  onTimeframeChange,
  loading = false,
}) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-bold text-gray-800">Timeframe</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {TIMEFRAMES.map((tf) => (
          <button
            key={tf.value}
            onClick={() => onTimeframeChange(tf.value)}
            disabled={loading}
            className={`
              px-4 py-2 rounded-lg font-semibold transition-all
              flex flex-col items-center justify-center min-w-fit
              ${
                selectedTimeframe === tf.value
                  ? 'bg-blue-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
              ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            <div className="text-sm font-bold">{tf.label}</div>
            <div className="text-xs opacity-75">{tf.description}</div>
          </button>
        ))}
      </div>
      
      <div className="mt-3 p-2 bg-blue-50 border-l-4 border-blue-600 rounded">
        <p className="text-sm text-gray-600">
          <TrendingUp className="inline w-4 h-4 mr-1" />
          Switch between different timeframes to view predictions for intraday and daily trading strategies.
        </p>
      </div>
    </div>
  );
};

export default TimeframeSelector;
