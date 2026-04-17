import React from 'react';
import { TrendingUp, TrendingDown, Percent } from 'lucide-react';

interface PredictionProps {
  symbol: string;
  probability: number;
  direction: 'UP' | 'DOWN';
  kellyRisk: number;
}

const PredictionCard: React.FC<PredictionProps> = ({ symbol, probability, direction, kellyRisk }) => {
  return (
    <div className="p-6 bg-slate-900 text-white rounded-xl border border-slate-700 shadow-xl">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{symbol} ML Forecast</h3>
        {direction === 'UP' ? 
          <TrendingUp className="text-green-400" size={20} /> : 
          <TrendingDown className="text-red-400" size={20} />
        }
      </div>

      <div className={`text-4xl font-bold flex items-baseline gap-2 ${direction === 'UP' ? 'text-green-400' : 'text-red-400'}`}>
        {direction}
        <span className="text-lg font-medium opacity-80">({(probability * 100).toFixed(1)}%)</span>
      </div>

      <div className="mt-6 p-3 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-md">
            <Percent size={16} className="text-blue-400" />
        </div>
        <div>
            <p className="text-[10px] text-slate-500 uppercase font-bold">Kelly Suggestion</p>
            <p className="font-mono text-sm text-blue-300">Risk {kellyRisk}% of Capital</p>
        </div>
      </div>
    </div>
  );
};

export default PredictionCard;