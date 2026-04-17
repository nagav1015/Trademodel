import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout, BatchNormalization
from sklearn.preprocessing import MinMaxScaler
import logging
import os
import pickle

logger = logging.getLogger(__name__)

class MultiHorizonLSTM:
    """Manages multiple LSTM models for different trading horizons."""
    
    # Define the exact 12 features the model expects
    FEATURE_COLS = [
        'close', 'ema_20', 'ema_50', 'ema_200',
        'adx', 'rsi', 'stoch_k', 'obv', 'mfi',
        'bb_upper', 'bb_lower', 'pivot'
    ]
    
    # Trading horizons configuration
    HORIZONS = {
        '1d': {'shift': 1, 'name': 'Day Trading', 'description': '1 day'},
        '5d': {'shift': 5, 'name': 'Very Short Term', 'description': '5-10 days'},
        '60d': {'shift': 60, 'name': 'Short Term', 'description': '3-6 months'},
        '365d': {'shift': 365, 'name': 'Long Term', 'description': '>1 year'}
    }
    
    def __init__(self, input_dim=12, model_dir="model_artifacts"):
        self.models = {}  # Different model for each horizon
        self.scalers = {}  # Different scaler for each horizon (or shared)
        self.global_scaler = MinMaxScaler()  # GLOBAL scaler for all horizons
        self.scaler_fitted = False
        self.input_dim = input_dim
        self.window = 60  # Lookback period
        self.model_dir = model_dir
        
        os.makedirs(model_dir, exist_ok=True)
        
        # Initialize all horizon models
        for horizon_key in self.HORIZONS.keys():
            self.models[horizon_key] = None
            self.scalers[horizon_key] = None
        
        self._load_models()  # Try to load existing models
    
    def build_model(self):
        """Builds a deeper architecture to handle 12+ features across all styles."""
        model = Sequential([
            LSTM(units=100, return_sequences=True, input_shape=(self.window, self.input_dim)),
            BatchNormalization(),
            Dropout(0.2),
            LSTM(units=60, return_sequences=False),
            Dropout(0.2),
            Dense(units=30, activation='relu'),
            Dense(units=1, activation='sigmoid')  # Probability output
        ])
        model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        return model
    
    def train(self, df, epochs=10, horizon='5d'):
        """Train model for specific horizon with GLOBAL scaler."""
        if df.empty or len(df) <= self.window:
            logger.warning(f"Skipping training for {horizon}: insufficient data (len={len(df)}, window={self.window})")
            return
        
        if horizon not in self.HORIZONS:
            logger.error(f"Unknown horizon: {horizon}")
            return
        
        # Get target column for this horizon
        target_col = f'target_{horizon}'
        if target_col not in df.columns:
            logger.warning(f"❌ No {target_col} column found. Available columns: {list(df.columns)}")
            return
        
        target = df[target_col]
        
        # Remove NaN values from target/features before training
        valid_idx = ~target.isna()
        if valid_idx.sum() == 0:
            logger.warning(f"❌ No valid targets for {horizon} after NaN removal")
            return
        
        target = target[valid_idx]
        
        # Extract ONLY the 12 required features
        missing_cols = [col for col in self.FEATURE_COLS if col not in df.columns]
        if missing_cols:
            logger.error(f"Missing required feature columns: {missing_cols}")
            return
        
        features = df.loc[valid_idx, self.FEATURE_COLS].copy()

        # FIX: Fit GLOBAL scaler ONLY once (not per-horizon)
        if not self.scaler_fitted:
            logger.info(f"Fitting global scaler on first dataset with {len(self.FEATURE_COLS)} features")
            self.global_scaler.fit(features)
            self.scaler_fitted = True
        
        # Apply global scaler transformation
        try:
            scaled_data = self.global_scaler.transform(features)
        except Exception as e:
            logger.error(f"Scaler transform failed: {e}")
            return
        
        X, y = [], []
        for i in range(self.window, len(scaled_data)):
            X.append(scaled_data[i-self.window:i])
            y.append(target.iloc[i])
        
        # Safety check
        X, y = np.array(X), np.array(y)
        if len(X) == 0 or len(y) == 0 or len(X) != len(y):
            logger.warning(f"Skipping training for {horizon}: X/y mismatch (X={len(X)}, y={len(y)})")
            return

        self.input_dim = X.shape[2]
        logger.info(f"Training {horizon} model: X={X.shape} on {len(X)} samples for {epochs} epochs")
        
        if self.models[horizon] is None:
            self.models[horizon] = self.build_model()
        
        # Recompile before fit
        self.models[horizon].compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        self.models[horizon].fit(X, y, epochs=epochs, batch_size=32, verbose=0)
        self._save_models()
        logger.info(f"✅ {horizon} model trained successfully")
    
    def predict(self, df, horizon='5d'):
        """Predict using specific horizon model with GLOBAL scaler."""
        if horizon not in self.HORIZONS:
            logger.error(f"Unknown horizon: {horizon}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        model = self.models.get(horizon)
        if model is None or len(df) < self.window:
            logger.warning(f"Prediction skipped for {horizon}: model={model is not None}, len={len(df)}, window={self.window}")
            return {"probability": 0.5, "direction": "NEUTRAL"}

        # Use global scaler
        if not self.scaler_fitted:
            logger.warning("Scaler not fitted, returning neutral prediction")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        # Extract ONLY the 12 required features
        missing_cols = [col for col in self.FEATURE_COLS if col not in df.columns]
        if missing_cols:
            logger.error(f"Missing required feature columns for prediction: {missing_cols}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        features = df[self.FEATURE_COLS].copy()
        
        try:
            scaled_data = self.global_scaler.transform(features)
        except Exception as e:
            logger.error(f"Scaler transform failed in predict: {e}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
            
        # Reshape the last window
        last_window = scaled_data[-self.window:]
        
        try:
            X_input = np.reshape(last_window, (1, self.window, self.input_dim))
        except ValueError as e:
            logger.error(f"Reshape failed: {e}. Last window shape: {last_window.shape}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        prob = float(model.predict(X_input, verbose=0)[0][0])
        
        logger.debug(f"Prediction ({horizon}): probability={prob:.4f}")
        return {
            "probability": prob,
            "direction": "UP" if prob > 0.5 else "DOWN"
        }
    
    def predict_all_horizons(self, df):
        """Predict for all horizons and return results."""
        logger.info(f"🔮 Predicting all horizons. DataFrame shape: {df.shape}, scaler_fitted: {self.scaler_fitted}")
        logger.info(f"   Models state: 1d={self.models['1d'] is not None}, 5d={self.models['5d'] is not None}, 60d={self.models['60d'] is not None}, 365d={self.models['365d'] is not None}")
        
        results = {}
        for horizon_key in self.HORIZONS.keys():
            pred = self.predict(df, horizon=horizon_key)
            horizon_info = self.HORIZONS[horizon_key]
            results[horizon_key] = {
                **pred,
                "name": horizon_info['name'],
                "description": horizon_info['description']
            }
            logger.info(f"   ✅ {horizon_key}: {pred['direction']} ({pred['probability']:.2%})")
        
        return results
    
    def _save_models(self):
        """Save all models to disk for persistence."""
        try:
            for horizon_key, model in self.models.items():
                if model is not None:
                    model_path = os.path.join(self.model_dir, f"lstm_model_{horizon_key}.h5")
                    model.save(model_path)
            
            # Save global scaler
            scaler_path = os.path.join(self.model_dir, "scaler_global.pkl")
            with open(scaler_path, 'wb') as f:
                pickle.dump(self.global_scaler, f)
            
            logger.info("✅ All models and scaler saved to disk")
        except Exception as e:
            logger.error(f"Failed to save models: {e}")
    
    def _load_models(self):
        """Load models from disk if they exist."""
        try:
            # Load global scaler
            scaler_path = os.path.join(self.model_dir, "scaler_global.pkl")
            if os.path.exists(scaler_path):
                with open(scaler_path, 'rb') as f:
                    self.global_scaler = pickle.load(f)
                self.scaler_fitted = True
                logger.info("✅ Global scaler loaded from disk")
            
            # Load models for each horizon
            for horizon_key in self.HORIZONS.keys():
                model_path = os.path.join(self.model_dir, f"lstm_model_{horizon_key}.h5")
                if os.path.exists(model_path):
                    self.models[horizon_key] = load_model(model_path)
                    logger.info(f"✅ Model loaded for horizon: {horizon_key}")
        except Exception as e:
            logger.warning(f"Could not load existing models: {e}")
