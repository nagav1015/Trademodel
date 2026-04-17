import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout, BatchNormalization
from sklearn.preprocessing import MinMaxScaler
import logging
import os
import pickle

logger = logging.getLogger(__name__)

class IntraDayLSTM:
    """Multi-timeframe LSTM for intraday + daily trading."""
    
    # Define the exact 12 features the model expects
    FEATURE_COLS = [
        'close', 'ema_20', 'ema_50', 'ema_200',
        'adx', 'rsi', 'stoch_k', 'obv', 'mfi',
        'bb_upper', 'bb_lower', 'pivot'
    ]
    
    # Trading timeframes configuration
    TIMEFRAMES = {
        '5m': {'name': 'Ultra Short (5min)', 'window': 30},   # 30 candles lookback = ~2.5 hours
        '15m': {'name': 'Intraday (15min)', 'window': 40},    # 40 candles lookback = ~10 hours
        '1h': {'name': 'Hourly (1H)', 'window': 48},          # 48 candles lookback = 2 days
        '1d': {'name': 'Daily (1D)', 'window': 60},           # 60 candles lookback = 3 months
    }
    
    def __init__(self, input_dim=12, model_dir="model_artifacts"):
        self.models = {}  # Different model for each timeframe
        self.global_scaler = MinMaxScaler()  # Global scaler for consistency
        self.scaler_fitted = False
        self.input_dim = input_dim
        self.model_dir = model_dir
        
        os.makedirs(model_dir, exist_ok=True)
        
        # Initialize all timeframe models
        for timeframe_key in self.TIMEFRAMES.keys():
            self.models[timeframe_key] = None
        
        self._load_models()  # Try to load existing models
    
    def build_model(self, window_size=60):
        """Builds LSTM architecture for intraday prediction."""
        model = Sequential([
            LSTM(units=64, return_sequences=True, input_shape=(window_size, self.input_dim)),
            BatchNormalization(),
            Dropout(0.2),
            LSTM(units=32, return_sequences=False),
            Dropout(0.2),
            Dense(units=16, activation='relu'),
            Dense(units=1, activation='sigmoid')  # Probability output
        ])
        model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        return model
    
    def train(self, df, epochs=10, timeframe='1d'):
        """Train model for specific timeframe with GLOBAL scaler."""
        if df.empty or len(df) < 50:
            logger.warning(f"Skipping training for {timeframe}: insufficient data (len={len(df)})")
            return
        
        if timeframe not in self.TIMEFRAMES:
            logger.error(f"Unknown timeframe: {timeframe}")
            return
        
        # Check if target exists
        if 'target' not in df.columns:
            logger.warning(f"No target column found for {timeframe}, skipping training")
            return
        
        target = df['target']
        
        # Extract ONLY the 12 required features
        missing_cols = [col for col in self.FEATURE_COLS if col not in df.columns]
        if missing_cols:
            logger.error(f"Missing required feature columns for {timeframe}: {missing_cols}")
            return
        
        features = df[self.FEATURE_COLS].copy()

        # FIX: Fit GLOBAL scaler ONLY once (not per-timeframe)
        if not self.scaler_fitted:
            logger.info(f"Fitting global scaler on first dataset with {len(self.FEATURE_COLS)} features")
            self.global_scaler.fit(features)
            self.scaler_fitted = True
        
        # Apply global scaler transformation
        try:
            scaled_data = self.global_scaler.transform(features)
        except Exception as e:
            logger.error(f"Scaler transform failed for {timeframe}: {e}")
            return
        
        window = self.TIMEFRAMES[timeframe]['window']
        X, y = [], []
        for i in range(window, len(scaled_data)):
            X.append(scaled_data[i-window:i])
            y.append(target.iloc[i])
        
        # Safety check
        X, y = np.array(X), np.array(y)
        if len(X) == 0 or len(y) == 0 or len(X) != len(y):
            logger.warning(f"Skipping training for {timeframe}: X/y mismatch (X={len(X)}, y={len(y)})")
            return

        self.input_dim = X.shape[2]
        logger.info(f"Training {timeframe} model: X={X.shape} on {len(X)} samples for {epochs} epochs")
        
        if self.models[timeframe] is None:
            self.models[timeframe] = self.build_model(window)
        
        # Recompile before fit
        self.models[timeframe].compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        self.models[timeframe].fit(X, y, epochs=epochs, batch_size=16, verbose=0)
        self._save_models()
        logger.info(f"✅ {timeframe} model trained successfully")
    
    def predict(self, df, timeframe='1d'):
        """Predict using specific timeframe model with GLOBAL scaler."""
        if timeframe not in self.TIMEFRAMES:
            logger.error(f"Unknown timeframe: {timeframe}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        model = self.models.get(timeframe)
        window = self.TIMEFRAMES[timeframe]['window']
        
        if model is None or len(df) < window:
            logger.warning(f"Prediction skipped for {timeframe}: model={model is not None}, len={len(df)}, window={window}")
            return {"probability": 0.5, "direction": "NEUTRAL"}

        # Use global scaler
        if not self.scaler_fitted:
            logger.warning("Scaler not fitted, returning neutral prediction")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        # Extract ONLY the 12 required features
        missing_cols = [col for col in self.FEATURE_COLS if col not in df.columns]
        if missing_cols:
            logger.error(f"Missing required feature columns for {timeframe}: {missing_cols}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        features = df[self.FEATURE_COLS].copy()
        
        try:
            scaled_data = self.global_scaler.transform(features)
        except Exception as e:
            logger.error(f"Scaler transform failed in predict for {timeframe}: {e}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
            
        # Reshape the last window
        last_window = scaled_data[-window:]
        
        try:
            X_input = np.reshape(last_window, (1, window, self.input_dim))
        except ValueError as e:
            logger.error(f"Reshape failed for {timeframe}: {e}. Last window shape: {last_window.shape}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        prob = float(model.predict(X_input, verbose=0)[0][0])
        
        logger.debug(f"Prediction ({timeframe}): probability={prob:.4f}")
        return {
            "probability": prob,
            "direction": "UP" if prob > 0.5 else "DOWN"
        }
    
    def predict_all_timeframes(self, df):
        """Predict for all timeframes and return results."""
        results = {}
        for timeframe_key in self.TIMEFRAMES.keys():
            pred = self.predict(df, timeframe=timeframe_key)
            timeframe_info = self.TIMEFRAMES[timeframe_key]
            results[timeframe_key] = {
                **pred,
                "name": timeframe_info['name']
            }
        return results
    
    def _save_models(self):
        """Save all models to disk for persistence."""
        try:
            for timeframe_key, model in self.models.items():
                if model is not None:
                    model_path = os.path.join(self.model_dir, f"intraday_lstm_{timeframe_key}.h5")
                    model.save(model_path)
            
            # Save global scaler
            scaler_path = os.path.join(self.model_dir, "scaler_intraday.pkl")
            with open(scaler_path, 'wb') as f:
                pickle.dump(self.global_scaler, f)
            
            logger.info("✅ All intraday models and scaler saved to disk")
        except Exception as e:
            logger.error(f"Failed to save intraday models: {e}")
    
    def _load_models(self):
        """Load models from disk if they exist."""
        try:
            # Load global scaler
            scaler_path = os.path.join(self.model_dir, "scaler_intraday.pkl")
            if os.path.exists(scaler_path):
                with open(scaler_path, 'rb') as f:
                    self.global_scaler = pickle.load(f)
                self.scaler_fitted = True
                logger.info("✅ Global intraday scaler loaded from disk")
            
            # Load models for each timeframe
            for timeframe_key in self.TIMEFRAMES.keys():
                model_path = os.path.join(self.model_dir, f"intraday_lstm_{timeframe_key}.h5")
                if os.path.exists(model_path):
                    self.models[timeframe_key] = load_model(model_path)
                    logger.info(f"✅ Model loaded for timeframe: {timeframe_key}")
        except Exception as e:
            logger.warning(f"Could not load existing intraday models: {e}")
