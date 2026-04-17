import json
import pandas as pd
import os
import numpy as np
from datetime import datetime
import logging
from app.core.data_engine.data_aggregator import DataAggregator
from app.core.feature_engine.technical_features import TechnicalFeatures
from app.core.model_engine.lstm_model import NiftyLSTM
from app.core.model_engine.multi_horizon_lstm import MultiHorizonLSTM

logger = logging.getLogger(__name__)

# --- Custom JSON Encoder to handle NaN/Infinity values ---
class NanAwareJSONEncoder(json.JSONEncoder):
    """JSON encoder that converts NaN and Infinity to null."""
    def encode(self, o):
        if isinstance(o, float):
            if np.isnan(o) or np.isinf(o):
                return 'null'
        return super().encode(o)
    
    def iterencode(self, o, _one_shot=False):
        """Encode the given object and yield each string representation as available."""
        for chunk in super().iterencode(o, _one_shot):
            yield chunk

# --- Path Configuration ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SYMBOLS_JSON_PATH = os.path.join(BASE_DIR, 'nse_symbols.json')
FRONTEND_OUTPUT_PATH = os.path.abspath(os.path.join(BASE_DIR, '..', '..', 'frontend', 'src', 'constants', 'market_scan.json'))

def sanitize_value(value):
    """Convert NaN/Infinity to None for valid JSON serialization."""
    if isinstance(value, float):
        if np.isnan(value) or np.isinf(value):
            return None
    return value

def run_full_scan():
    """Market Scanner using PRE-TRAINED Multi-Horizon models for FAST predictions.
    
    Strategy:
    1. Load pre-trained models from disk (trained models from previous requests)
    2. Skip training - only PREDICT for all 500+ stocks
    3. Use global scaler from training phase
    4. Output top 10 picks by probability for each horizon
    5. Result: ~2-3 minutes for 500+ stocks (vs 15-20 minutes if training)
    """
    aggregator = DataAggregator()
    feat_engine = TechnicalFeatures()
    
    # Initialize the multi-horizon model (loads pre-trained weights from disk)
    model = MultiHorizonLSTM()
    
    # Check if models are trained - if not, return early
    if model.models.get('5d') is None:
        logger.warning("⚠️  Pre-trained models not found. Train models first via single stock predictions.")
        logger.info("💡 Tip: Click on a stock to trigger initial model training, then run market scan.")
        return
    
    try:
        with open(SYMBOLS_JSON_PATH, 'r') as f:
            master_list = json.load(f)
    except FileNotFoundError:
        logger.error(f"❌ Error: {SYMBOLS_JSON_PATH} not found.")
        return

    scan_results_by_horizon = {h: [] for h in model.HORIZONS.keys()}
    logger.info(f"🚀 Starting Multi-Horizon Market Scan: {len(master_list)} symbols (PREDICTION ONLY - using pre-trained models)...")
    logger.info(f"📊 Framework: 12-Parameter LSTM | Horizons: {', '.join([model.HORIZONS[h]['name'] for h in model.HORIZONS.keys()])} | Global Scaler: Enabled | Mode: FAST PREDICTION")

    stocks_to_scan = [s for s in master_list if s.get('type') == 'Stock']

    stocks_processed = 0
    stocks_failed = 0

    for index, item in enumerate(stocks_to_scan):
        ticker = item['ticker']
        try:
            # 2y Period ensures RSI and ADX settle with Wilder's Smoothing accuracy
            df = aggregator.get_history(ticker, period="2y")
            
            if df is None or df.empty or len(df) < 200:  # Require 200 days minimum for EMA_200
                logger.debug(f"Skipping {ticker}: insufficient data ({len(df) if df is not None else 0} rows)")
                stocks_failed += 1
                continue
            
            # 1. Indicator Generation
            df_enriched = feat_engine.apply_features(df)
            
            if df_enriched is None or df_enriched.empty:
                logger.debug(f"Skipping {ticker}: feature engineering failed")
                stocks_failed += 1
                continue
            
            # 2. Validation - check required columns exist (including all horizon targets)
            required_cols = ['close', 'ema_20', 'ema_50', 'ema_200', 'rsi', 'target_1d', 'target_5d', 'target_60d', 'target_365d']
            missing_cols = [col for col in required_cols if col not in df_enriched.columns]
            if missing_cols:
                logger.debug(f"Skipping {ticker}: missing columns {missing_cols}")
                stocks_failed += 1
                continue
            
            # 3. PREDICTION ONLY - No training during market scan
            # Using pre-trained models with global scaler
            predictions = model.predict_all_horizons(df_enriched)
            
            # Get last price with fallback to None if NaN
            last_price = df['close'].iloc[-1]
            last_price = sanitize_value(last_price)
            if last_price is not None:
                last_price = round(last_price, 2)
            
            # Store results for each horizon
            for horizon_key, horizon_pred in predictions.items():
                prob = float(horizon_pred['probability'])
                scan_results_by_horizon[horizon_key].append({
                    "name": item['name'],
                    "ticker": ticker,
                    "sector": item.get('sector', 'General'),
                    "probability": round(prob, 4),
                    "direction": horizon_pred['direction'],
                    "last_price": last_price,
                    "horizon": horizon_pred['name']
                })
            
            # Visual Feedback (5d as primary)
            prob_5d = float(predictions['5d']['probability'])
            color = "🟢" if prob_5d > 0.51 else "🔴" if prob_5d < 0.49 else "⚪"
            logger.info(f"{color} {ticker.ljust(12)} | 5D: {round(prob_5d*100, 1)}% | 1D: {round(float(predictions['1d']['probability'])*100, 1)}% | 60D: {round(float(predictions['60d']['probability'])*100, 1)}% | RSI: {round(df_enriched['rsi'].iloc[-1], 1)}")
            stocks_processed += 1

        except Exception as e:
            logger.warning(f"Error processing {ticker}: {str(e)}")
            stocks_failed += 1
            continue

    # 5. SORT BY ALPHA for each horizon
    top_picks_by_horizon = {}
    for horizon_key, results in scan_results_by_horizon.items():
        top_picks_by_horizon[horizon_key] = sorted(
            results,
            key=lambda x: x['probability'],
            reverse=True
        )[:10]

    output = {
        "scan_date": datetime.now().strftime("%Y-%m-%d %H:%M"),
        "top_picks": top_picks_by_horizon['5d'],  # Default to 5d for backward compatibility
        "top_picks_by_horizon": top_picks_by_horizon,  # All horizons data
        "total_scanned": stocks_processed,
        "total_failed": stocks_failed,
        "total_results": sum(len(v) for v in scan_results_by_horizon.values())
    }
    
    # Save results for the Frontend Dashboard
    try:
        os.makedirs(os.path.dirname(FRONTEND_OUTPUT_PATH), exist_ok=True)
        with open(FRONTEND_OUTPUT_PATH, 'w') as f:
            # Use custom encoder and ensure no NaN values in output
            json.dump(output, f, indent=2, cls=NanAwareJSONEncoder)
        logger.info(f"✅ Multi-horizon scan results saved to {FRONTEND_OUTPUT_PATH}")
    except Exception as e:
        logger.error(f"Failed to save scan results: {e}")

    logger.info(f"\n🎯 Scan Complete!")
    for h_key, picks in top_picks_by_horizon.items():
        logger.info(f"   📊 {h_key.upper()}: {len(picks)} Top Picks | {stocks_processed} processed | {stocks_failed} failed")

if __name__ == "__main__":
    run_full_scan()