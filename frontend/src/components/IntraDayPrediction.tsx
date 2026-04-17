import React, { useMemo } from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface IntraDayPrediction {
  probability?: number;
  direction?: string;
  name?: string;
  window?: number;
  error?: string;
}

interface IntraDayPredictionProps {
  predictions: Record<string, IntraDayPrediction>;
  selectedTimeframe: string;
  lastPrice?: number;
  loading?: boolean;
  symbol?: string;
}

const getConfidenceColor = (probability?: number) => {
  if (!probability) return 'bg-gray-100';
  if (probability > 0.65) return 'bg-green-100';
  if (probability > 0.55) return 'bg-emerald-100';
  if (probability < 0.35) return 'bg-red-100';
  if (probability < 0.45) return 'bg-orange-100';
  return 'bg-gray-100';
};

const getConfidenceTextColor = (probability?: number) => {
  if (!probability) return 'text-gray-700';
  if (probability > 0.65) return 'text-green-700';
  if (probability > 0.55) return 'text-emerald-700';
  if (probability < 0.35) return 'text-red-700';
  if (probability < 0.45) return 'text-orange-700';
  return 'text-gray-700';
};

const getProgressColor = (probability?: number) => {
  if (!probability) return 'bg-gray-400';
  if (probability > 0.65) return 'bg-green-500';
  if (probability > 0.55) return 'bg-emerald-500';
  if (probability < 0.35) return 'bg-red-500';
  if (probability < 0.45) return 'bg-orange-500';
  return 'bg-blue-500';
};

export const IntraDayPrediction: React.FC<IntraDayPredictionProps> = ({
  predictions,
  selectedTimeframe,
  lastPrice = 0,
  loading = false,
  symbol = '',
}) => {
  const prediction = predictions[selectedTimeframe];

  const displayContent = useMemo(() => {
    if (!prediction) {
      return (
        <div className="flex items-center justify-center h-40 bg-gray-50 rounded-lg">
          <span className="text-gray-500">No prediction data</span>
        </div>
      );
    }

    if (prediction.error) {
      return (
        <div className="flex items-center gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-yellow-600" />
          <div>
            <p className="font-semibold text-yellow-800">Data Loading</p>
            <p className="text-sm text-yellow-700">{prediction.error}</p>
          </div>
        </div>
      );
    }

    const prob = prediction.probability ?? 0.5;
    const direction = prediction.direction ?? 'NEUTRAL';
    const isUp = direction === 'UP';

    return (
      <div className={`p-6 rounded-lg border-2 ${getConfidenceColor(prob)}`}>
        <div className="grid grid-cols-2 gap-4">
          {/* Prediction Direction */}
          <div className="flex items-center gap-3">
            {isUp ? (
              <TrendingUp className="w-8 h-8 text-green-600" />
            ) : (
              <TrendingDown className="w-8 h-8 text-red-600" />
            )}
            <div>
              <p className="text-sm text-gray-600">Direction</p>
              <p className={`text-2xl font-bold ${isUp ? 'text-green-600' : 'text-red-600'}`}>
                {direction}
              </p>
            </div>
          </div>

          {/* Confidence Probability */}
          <div>
            <p className="text-sm text-gray-600">Confidence</p>
            <p className={`text-2xl font-bold ${getConfidenceTextColor(prob)}`}>
              {(prob * 100).toFixed(1)}%
            </p>
          </div>
        </div>

        {/* Probability Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span className="text-xs font-semibold text-gray-600">Strength</span>
            <span className="text-xs text-gray-500">
              {((prob - 0.5) * 100).toFixed(0)}% from neutral
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(prob)}`}
              style={{ width: `${prob * 100}%` }}
            />
          </div>
        </div>

        {/* Metadata */}
        <div className="mt-4 pt-4 border-t border-gray-300 flex justify-between text-xs text-gray-500">
          <span>Timeframe: {selectedTimeframe}</span>
          <span>Window: {prediction.window || 'N/A'} candles</span>
        </div>
      </div>
    );
  }, [prediction, selectedTimeframe]);

  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-lg font-bold text-gray-800">
          {symbol} - Intraday Prediction
        </h3>
        {loading && <span className="text-sm text-gray-500">(Loading...)</span>}
      </div>
      
      {displayContent}

      {lastPrice > 0 && !prediction?.error && (
        <div className="mt-3 p-3 bg-white border border-gray-200 rounded-lg">
          <p className="text-sm text-gray-600">
            Latest Price: <span className="font-bold text-lg text-gray-800">₹{lastPrice.toFixed(2)}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default IntraDayPrediction;
