import json
import os
import logging
from fastapi import FastAPI, BackgroundTasks, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from typing import Optional

# Core Engine Imports
from app.core.data_engine.data_aggregator import DataAggregator
from app.core.feature_engine.technical_features import TechnicalFeatures
from app.core.model_engine.lstm_model import NiftyLSTM
from app.core.model_engine.multi_horizon_lstm import MultiHorizonLSTM
from app.core.model_engine.intraday_lstm import IntraDayLSTM
from app.core.risk_engine import calculate_kelly
from app.core.auth_engine import AuthEngine, get_current_user, get_admin_user

# Tool Import for Market Scanning
from tools.market_scanner import run_full_scan

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = FastAPI(title="TradeModel AI")

# --- Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Persistent Engines ---
model_brain = NiftyLSTM()
multi_horizon_brain = MultiHorizonLSTM()
intraday_brain = IntraDayLSTM()
aggregator = DataAggregator()

# --- Validation Helpers ---
def validate_symbol(symbol: str) -> str:
    """Validate and normalize symbol input."""
    if not symbol or not isinstance(symbol, str):
        raise HTTPException(status_code=400, detail="Symbol must be a non-empty string")
    
    symbol = symbol.strip().upper()
    # Allow formats like: RELIANCE, RELIANCE.NS, ^NSEI
    if len(symbol) < 2 or len(symbol) > 20:
        raise HTTPException(status_code=400, detail="Symbol length must be 2-20 characters")
    
    return symbol

def validate_horizon(horizon: str) -> str:
    """Validate horizon parameter."""
    valid_horizons = list(multi_horizon_brain.HORIZONS.keys())+['all']
    if horizon not in valid_horizons:
        raise HTTPException(status_code=400, detail=f"Invalid horizon. Valid options: {valid_horizons}")
    return horizon

def validate_timeframe(timeframe: str) -> str:
    """Validate timeframe parameter."""
    valid_timeframes = list(intraday_brain.TIMEFRAMES.keys()) + ['all']
    if timeframe not in valid_timeframes:
        raise HTTPException(status_code=400, detail=f"Invalid timeframe. Valid options: {valid_timeframes}")
    return timeframe

# --- Endpoints ---

# ====== AUTHENTICATION ENDPOINTS ======
@app.post("/api/auth/login")
async def login(username: str, password: str):
    """Authenticate user and return JWT token."""
    try:
        logger.debug(f"Login endpoint called with username='{username}', password='{password}'")
        return AuthEngine.authenticate_user(username, password)
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Login error: {str(e)}")
        raise HTTPException(status_code=500, detail="Login failed")

@app.post("/api/auth/logout")
async def logout(authorization: Optional[str] = Header(None)):
    """Logout user (client should discard token)."""
    try:
        user = AuthEngine.verify_user(authorization)
        logger.info(f"User logged out: {user['username']}")
        return {"message": "Logged out successfully"}
    except HTTPException:
        raise

@app.get("/api/auth/me")
async def get_current_user_info(authorization: Optional[str] = Header(None)):
    """Get current user information."""
    try:
        user = AuthEngine.verify_user(authorization)
        return {
            "username": user['username'],
            "role": user['role'],
            "is_admin": user['role'] == 'admin'
        }
    except HTTPException:
        raise

# ====== PREDICTION ENDPOINTS ======

@app.get("/api/prediction/{symbol}")
async def get_prediction(symbol: str, horizon: str = "5d"):
    """Fetches 2y data and runs AI inference for specific horizon."""
    try:
        symbol = validate_symbol(symbol)
        horizon = validate_horizon(horizon)
        logger.info(f"Prediction request for {symbol} ({horizon} horizon)")
        
        # Using 2y ensures enough data for EMA 200 even after NaN removal
        df = aggregator.get_history(symbol, period="2y")
        
        if df is None or df.empty:
            logger.warning(f"No data available for {symbol}")
            raise HTTPException(status_code=404, detail=f"No data available for symbol {symbol}")
        
        feat_engine = TechnicalFeatures()
        df_enriched = feat_engine.apply_features(df)
        
        if df_enriched.empty:
            logger.warning(f"Feature engineering failed for {symbol}")
            raise HTTPException(status_code=422, detail=f"Insufficient data after feature engineering for {symbol}")
        
        # Train multi-horizon brain if needed
        if multi_horizon_brain.models['5d'] is None:
            logger.info(f"AI Training Multi-Horizon Model for {symbol}")
            for h in ['1d', '5d', '60d', '365d']:
                multi_horizon_brain.train(df_enriched, epochs=10, horizon=h)
        
        # Get prediction for specified horizon
        if horizon == 'all':
            predictions = multi_horizon_brain.predict_all_horizons(df_enriched)
        else:
            pred = multi_horizon_brain.predict(df_enriched, horizon=horizon)
            horizon_info = multi_horizon_brain.HORIZONS[horizon]
            predictions = {
                horizon: {
                    **pred,
                    "name": horizon_info['name'],
                    "description": horizon_info['description']
                }
            }
        
        # For backward compatibility, extract 5d prediction
        kelly_risk = 0
        if '5d' in predictions:
            kelly_risk = calculate_kelly(predictions['5d']['probability'])
        
        logger.info(f"Prediction for {symbol}: {predictions}")
        return {
            "symbol": symbol,
            "predictions": predictions,
            "Kelly_Risk": kelly_risk,
            "last_price": round(float(df['close'].iloc[-1]), 2),
            "timestamp": pd.Timestamp.now().isoformat(),
            # Backward compatibility - 5d as primary
            "probability": predictions['5d']['probability'] if '5d' in predictions else 0.5,
            "direction": predictions['5d']['direction'] if '5d' in predictions else "NEUTRAL",
            "kellyRisk": kelly_risk
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Prediction error for {symbol}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/api/prediction/multi/{symbol}")
async def get_multi_horizon_prediction(symbol: str):
    """Get predictions for ALL trading horizons at once."""
    try:
        symbol = validate_symbol(symbol)
        logger.info(f"Multi-horizon prediction request for {symbol}")
        
        df = aggregator.get_history(symbol, period="2y")
        
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail=f"No data available for {symbol}")
        
        feat_engine = TechnicalFeatures()
        df_enriched = feat_engine.apply_features(df)
        
        if df_enriched.empty:
            raise HTTPException(status_code=422, detail="Insufficient data after feature engineering")
        
        # Train if needed
        if multi_horizon_brain.models['5d'] is None:
            logger.info(f"Training Multi-Horizon Models for {symbol}")
            for h in ['1d', '5d', '60d', '365d']:
                multi_horizon_brain.train(df_enriched, epochs=10, horizon=h)
        
        predictions = multi_horizon_brain.predict_all_horizons(df_enriched)
        
        return {
            "symbol": symbol,
            "predictions": predictions,
            "last_price": round(float(df['close'].iloc[-1]), 2),
            "timestamp": pd.Timestamp.now().isoformat()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Multi-horizon prediction error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

# ====== INTRADAY PREDICTION ENDPOINTS (Phase 1) ======

@app.get("/api/intraday/{symbol}")
async def get_intraday_prediction(symbol: str, timeframe: str = "1h"):
    """Get intraday prediction for specific timeframe (5m, 15m, 1h, 1d)."""
    try:
        symbol = validate_symbol(symbol)
        timeframe = validate_timeframe(timeframe)
        logger.info(f"Intraday prediction request for {symbol} ({timeframe})")
        
        # Fetch data with timeframe-specific period
        df = aggregator.get_history(symbol, timeframe=timeframe)
        
        if df is None or df.empty:
            logger.warning(f"No intraday data available for {symbol} ({timeframe})")
            raise HTTPException(status_code=404, detail=f"No data available for {symbol} ({timeframe})")
        
        # Apply technical features with timeframe awareness
        feat_engine = TechnicalFeatures()
        df_enriched = feat_engine.apply_features(df, timeframe=timeframe)
        
        if df_enriched.empty:
            logger.warning(f"Feature engineering failed for {symbol} ({timeframe})")
            raise HTTPException(status_code=422, detail=f"Insufficient data for {symbol} ({timeframe})")
        
        # Train intraday model if needed (first request initializes)
        if intraday_brain.models[timeframe] is None:
            logger.info(f"Training Intraday Model ({timeframe}) for {symbol}")
            intraday_brain.train(df_enriched, epochs=10, timeframe=timeframe)
        
        # Get prediction for specified timeframe
        if timeframe == 'all':
            predictions = intraday_brain.predict_all_timeframes(df_enriched)
        else:
            pred = intraday_brain.predict(df_enriched, timeframe=timeframe)
            timeframe_info = intraday_brain.TIMEFRAMES[timeframe]
            predictions = {
                timeframe: {
                    **pred,
                    "window": timeframe_info['window']
                }
            }
        
        logger.info(f"Intraday prediction for {symbol} ({timeframe}): {predictions}")
        return {
            "symbol": symbol,
            "timeframe": timeframe,
            "predictions": predictions,
            "last_price": round(float(df['close'].iloc[-1]), 2),
            "timestamp": pd.Timestamp.now().isoformat(),
            "data_points": len(df_enriched)
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Intraday prediction error for {symbol} ({timeframe}): {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/api/intraday/multi/{symbol}")
async def get_intraday_multi_prediction(symbol: str):
    """Get predictions for ALL intraday timeframes at once."""
    try:
        symbol = validate_symbol(symbol)
        logger.info(f"Multi-timeframe intraday prediction request for {symbol}")
        
        predictions_by_tf = {}
        last_price = None
        
        # Get predictions for all intraday timeframes
        for tf in intraday_brain.TIMEFRAMES.keys():
            try:
                df = aggregator.get_history(symbol, timeframe=tf)
                
                if df is None or df.empty:
                    predictions_by_tf[tf] = {"error": f"No data for {tf}"}
                    continue
                
                feat_engine = TechnicalFeatures()
                df_enriched = feat_engine.apply_features(df, timeframe=tf)
                
                if df_enriched.empty:
                    predictions_by_tf[tf] = {"error": f"Insufficient data for {tf}"}
                    continue
                
                # Train if needed
                if intraday_brain.models[tf] is None:
                    logger.info(f"Training {tf} model for {symbol}")
                    intraday_brain.train(df_enriched, epochs=10, timeframe=tf)
                
                # Predict
                pred = intraday_brain.predict(df_enriched, timeframe=tf)
                tf_info = intraday_brain.TIMEFRAMES[tf]
                predictions_by_tf[tf] = {
                    **pred,
                    "name": tf_info['name'],
                    "window": tf_info['window']
                }
                
                if last_price is None:
                    last_price = float(df['close'].iloc[-1])
                
            except Exception as e:
                logger.warning(f"Error getting prediction for {tf}: {str(e)}")
                predictions_by_tf[tf] = {"error": str(e)}
        
        return {
            "symbol": symbol,
            "predictions": predictions_by_tf,
            "last_price": round(last_price, 2) if last_price else 0,
            "timestamp": pd.Timestamp.now().isoformat()
        }
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Multi-timeframe intraday error: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")

@app.get("/api/intraday-history/{symbol}")
async def get_intraday_history(symbol: str, timeframe: str = "1h"):
    """Get intraday chart data with technical indicators."""
    try:
        symbol = validate_symbol(symbol)
        timeframe = validate_timeframe(timeframe)
        
        if timeframe == 'all':
            raise HTTPException(status_code=400, detail="Please specify a single timeframe for history")
        
        logger.info(f"Intraday history request for {symbol} ({timeframe})")
        
        df = aggregator.get_history(symbol, timeframe=timeframe)
        
        if df is None or df.empty:
            raise HTTPException(status_code=404, detail=f"No history data for {symbol} ({timeframe})")
        
        feat_engine = TechnicalFeatures()
        df_enriched = feat_engine.apply_features(df, timeframe=timeframe)
        
        if df_enriched.empty:
            raise HTTPException(status_code=422, detail=f"Insufficient data for {symbol} ({timeframe})")
        
        chart_data = []
        for index, row in df_enriched.iterrows():
            chart_data.append({
                "time": index.strftime('%Y-%m-%d %H:%M:%S'),
                "open": float(row.get('open', 0)),
                "high": float(row.get('high', 0)),
                "low": float(row.get('low', 0)),
                "close": float(row.get('close', 0)),
                "ema_20": float(row.get('ema_20', 0)),
                "ema_50": float(row.get('ema_50', 0)),
                "ema_200": float(row.get('ema_200', 0)),
                "rsi": float(row.get('rsi', 0)),
                "adx": float(row.get('adx', 0)),
                "mfi": float(row.get('mfi', 0)),
                "stoch_k": float(row.get('stoch_k', 0)),
                "bb_upper": float(row.get('bb_upper', 0)),
                "bb_lower": float(row.get('bb_lower', 0))
            })
        
        logger.info(f"Returned {len(chart_data)} intraday data points for {symbol} ({timeframe})")
        return chart_data
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Intraday history error for {symbol} ({timeframe}): {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"History fetch failed: {str(e)}")

@app.get("/api/history/{symbol}")
async def get_history(symbol: str):
    """Syncs chart data and technical indicators for UI cards with error handling."""
    try:
        symbol = validate_symbol(symbol)
        logger.info(f"History request for {symbol}")
        
        # 1y is enough for a 6mo chart view even after NaN removal
        df = aggregator.get_history(symbol, period="1y")
        
        if df is None or df.empty:
            logger.warning(f"No history data for {symbol}")
            raise HTTPException(status_code=404, detail=f"No history data for {symbol}")
        
        feat_engine = TechnicalFeatures()
        df_enriched = feat_engine.apply_features(df)
        
        if df_enriched.empty:
            logger.warning(f"No enriched data for {symbol}")
            raise HTTPException(status_code=422, detail=f"Insufficient history data for {symbol}")
        
        chart_data = []
        for index, row in df_enriched.iterrows():
            chart_data.append({
                "time": index.strftime('%Y-%m-%d'),
                "open": float(row.get('open', 0)),
                "high": float(row.get('high', 0)),
                "low": float(row.get('low', 0)),
                "close": float(row.get('close', 0)),
                # FIX: Standardized column names (snake_case)
                "ema_20": float(row.get('ema_20', 0)), 
                "ema_50": float(row.get('ema_50', 0)),
                "ema_200": float(row.get('ema_200', 0)),
                "rsi": float(row.get('rsi', 0)),
                "adx": float(row.get('adx', 0)),
                "mfi": float(row.get('mfi', 0)),
                "stoch_k": float(row.get('stoch_k', 0)),
                "bb_upper": float(row.get('bb_upper', 0)),
                "bb_lower": float(row.get('bb_lower', 0))
            })
        
        logger.info(f"Returned {len(chart_data)} data points for {symbol}")
        return chart_data
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"History error for {symbol}: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"History fetch failed: {str(e)}")

@app.post("/api/market-scan/trigger")
async def trigger_scan(background_tasks: BackgroundTasks, authorization: str = Header(None)):
    """Trigger background market scan - ADMIN ONLY."""
    try:
        # Verify admin access
        admin_user = AuthEngine.verify_admin(authorization=authorization)
        
        # Check if models are trained before starting scan
        if multi_horizon_brain.models.get('5d') is None:
            raise HTTPException(
                status_code=412,
                detail="Pre-trained models not found. Please view a stock (e.g., NIFTY) first to train the models, then trigger market scan."
            )
        
        logger.info(f"🔐 Market scan triggered by admin: {admin_user['username']}")
        logger.info(f"✅ Using pre-trained models - starting fast market scan...")
        background_tasks.add_task(run_full_scan)
        return {
            "status": "scanning",
            "message": "Market scan started in background (using pre-trained models - ~2-3 minutes)",
            "timestamp": pd.Timestamp.now().isoformat(),
            "triggered_by": admin_user['username'],
            "mode": "prediction_only"
        }
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Failed to trigger scan: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to trigger scan: {str(e)}")

@app.get("/api/market-scan/top-picks")
async def get_top_picks():
    """Get top market scan results with proper error handling."""
    try:
        base_dir = os.path.dirname(os.path.abspath(__file__))
        file_path = os.path.join(base_dir, "../../frontend/src/constants/market_scan.json")
        
        if not os.path.exists(file_path):
            logger.info(f"Scan results file not found yet: {file_path}")
            return {
                "top_picks": [],
                "message": "No scan data available yet. Trigger a market scan with /api/market-scan/trigger",
                "scan_date": None,
                "total_scanned": 0,
                "total_failed": 0,
                "total_results": 0
            }
        
        # Check file is not empty
        if os.path.getsize(file_path) == 0:
            logger.info(f"Scan results file is empty (scan in progress): {file_path}")
            return {
                "top_picks": [],
                "message": "Market scan in progress... please wait",
                "scan_date": None,
                "total_scanned": 0,
                "total_failed": 0,
                "total_results": 0
            }
        
        with open(file_path, 'r') as f:
            data = json.load(f)
            logger.info(f"Returned {len(data.get('top_picks', []))} top picks from scan")
            return data
    
    except json.JSONDecodeError as e:
        logger.error(f"Invalid JSON in scan results: {e}")
        return {
            "top_picks": [],
            "message": "Scan results file corrupted. Please trigger a new market scan.",
            "error": str(e),
            "scan_date": None,
            "total_scanned": 0,
            "total_failed": 0,
            "total_results": 0
        }
    except Exception as e:
        logger.error(f"Failed to load top picks: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=f"Failed to load top picks: {str(e)}")

@app.get("/api/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "online",
        "model_loaded": model_brain.model is not None,
        "scaler_fitted": model_brain.scaler_fitted if hasattr(model_brain, 'scaler_fitted') else False,
        "timestamp": pd.Timestamp.now().isoformat()
    }

@app.on_event("startup")
async def startup_event():
    logger.info("🚀 TradeModel AI server starting...")
    logger.info(f"Model loaded: {model_brain.model is not None}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info("🛑 TradeModel AI server shutting down...")