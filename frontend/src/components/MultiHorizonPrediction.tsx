import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

interface HorizonPrediction {
  probability: number;
  direction: string;
  name: string;
  description: string;
}

interface MultiHorizonPredictionProps {
  predictions: {
    [key: string]: HorizonPrediction;
  };
  symbol: string;
  lastPrice: number;
}

const MultiHorizonPrediction: React.FC<MultiHorizonPredictionProps> = ({ predictions, symbol, lastPrice }) => {
  // Define order for display
  const horizonOrder = ['1d', '5d', '60d', '365d'];
  
  const getHorizonColor = (probability: number) => {
    if (probability > 0.65) return 'text-green-400 border-green-500/30 bg-green-500/5';
    if (probability > 0.55) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/5';
    if (probability < 0.35) return 'text-red-400 border-red-500/30 bg-red-500/5';
    if (probability < 0.45) return 'text-orange-400 border-orange-500/30 bg-orange-500/5';
    return 'text-slate-400 border-slate-500/30 bg-slate-500/5';
  };

  return (
    <div className="bg-[#11161d] p-6 rounded-3xl border border-slate-800 shadow-2xl">
      <div className="mb-6">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
          {symbol} - Multi-Horizon Forecast
        </h3>
        <p className="text-[9px] text-slate-600 font-mono">Price: ₹{lastPrice.toLocaleString()}</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {horizonOrder.map((horizon_key) => {
          const pred = predictions[horizon_key];
          if (!pred) return null;
          
          const prob = pred.probability;
          const confPercent = (prob * 100).toFixed(1);
          const colorClass = getHorizonColor(prob);
          
          return (
            <div
              key={horizon_key}
              className={`p-4 border rounded-2xl transition-all ${colorClass}`}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{horizon_key} Horizon</p>
                  <p className="text-[8px] text-slate-600">{pred.name}</p>
                </div>
                {pred.direction === 'UP' ? 
                  <TrendingUp size={16} className="flex-shrink-0" /> : 
                  <TrendingDown size={16} className="flex-shrink-0" />
                }
              </div>
              
              <div className="flex items-baseline gap-2">
                <p className="text-lg font-mono font-bold">{pred.direction}</p>
                <p className="text-sm font-bold">{confPercent}%</p>
              </div>
              
              <div className="mt-3 h-1 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-current opacity-70 transition-all"
                  style={{
                    width: `${Math.abs(prob * 100)}%`,
                    opacity: 0.7
                  }}
                />
              </div>
              
              <p className="text-[7px] text-slate-600 mt-2">{pred.description}</p>
            </div>
          );
        })}
      </div>
      
      <div className="mt-4 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-[8px] text-slate-400">
        <p><span className="text-slate-500 font-bold">Note:</span> Green = Bullish signal, Red = Bearish signal. Predictions are probabilistic and not financial advice.</p>
      </div>
    </div>
  );
};

export default MultiHorizonPrediction;
