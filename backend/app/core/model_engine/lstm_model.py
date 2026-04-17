import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential, load_model
from tensorflow.keras.layers import LSTM, Dense, Dropout, BatchNormalization
from sklearn.preprocessing import MinMaxScaler
import logging
import os
import pickle

logger = logging.getLogger(__name__)

class NiftyLSTM:
    # Define the exact 12 features the model expects
    FEATURE_COLS = [
        'close', 'ema_20', 'ema_50', 'ema_200',
        'adx', 'rsi', 'stoch_k', 'obv', 'mfi',
        'bb_upper', 'bb_lower', 'pivot'
    ]
    
    def __init__(self, input_dim=12, model_dir="model_artifacts"):
        self.model = None
        self.scaler = MinMaxScaler()  # GLOBAL scaler - fitted once, reused for all stocks
        self.scaler_fitted = False  # Track if scaler has been fitted
        self.input_dim = input_dim
        self.window = 60  # Lookback period
        self.model_dir = model_dir
        self.model_path = os.path.join(model_dir, "lstm_model.h5")
        self.scaler_path = os.path.join(model_dir, "scaler.pkl")
        
        os.makedirs(model_dir, exist_ok=True)
        self._load_model()  # Try to load existing model

    def build_model(self):
        """Builds a deeper architecture to handle 12+ features across all styles."""
        self.model = Sequential([
            LSTM(units=100, return_sequences=True, input_shape=(self.window, self.input_dim)),
            BatchNormalization(),
            Dropout(0.2),
            LSTM(units=60, return_sequences=False),
            Dropout(0.2),
            Dense(units=30, activation='relu'),
            Dense(units=1, activation='sigmoid')  # Probability output
        ])
        self.model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        logger.info(f"Model built with input_dim={self.input_dim}")

    def train(self, df, epochs=10):
        """Train model with GLOBAL scaler to prevent data mismatch across stocks."""
        if df.empty or len(df) <= self.window:
            logger.warning(f"Skipping training: insufficient data (len={len(df)}, window={self.window})")
            return

        # Check if target exists
        target = df['target'] if 'target' in df.columns else None
        if target is None:
            logger.warning("No target column found, skipping training")
            return
        
        # Extract ONLY the 12 required features
        missing_cols = [col for col in self.FEATURE_COLS if col not in df.columns]
        if missing_cols:
            logger.error(f"Missing required feature columns: {missing_cols}")
            return
        
        features = df[self.FEATURE_COLS].copy()

        # FIX: Fit scaler ONLY once on the first dataset, then reuse it
        if not self.scaler_fitted:
            logger.info(f"Fitting global scaler on first dataset with {len(self.FEATURE_COLS)} features")
            self.scaler.fit(features)
            self.scaler_fitted = True
        
        # Apply global scaler transformation
        try:
            scaled_data = self.scaler.transform(features)
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
            logger.warning(f"Skipping training: X/y mismatch (X={len(X)}, y={len(y)})")
            return

        self.input_dim = X.shape[2] 
        logger.debug(f"Training data shape: X={X.shape} (samples, window, features)")
        
        if self.model is None:
            self.build_model()
        
        # FIX: Recompile model before each fit() to reset optimizer state
        # This prevents "Unknown variable" optimizer errors on subsequent training runs
        self.model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
        
        logger.info(f"Training on {len(X)} samples for {epochs} epochs")
        self.model.fit(X, y, epochs=epochs, batch_size=32, verbose=0)
        self._save_model()  # Persist model after training

    def predict(self, df):
        """Predict using GLOBAL scaler for consistency across all stocks."""
        if self.model is None or len(df) < self.window:
            logger.warning(f"Prediction skipped: model={self.model is not None}, len={len(df)}, window={self.window}")
            return {"probability": 0.5, "direction": "NEUTRAL"}

        # Use global scaler - must have been fitted during training
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
            scaled_data = self.scaler.transform(features)
        except Exception as e:
            logger.error(f"Scaler transform failed in predict: {e}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
            
        # Reshape the last window to (1, 60, input_dim)
        last_window = scaled_data[-self.window:]
        logger.debug(f"Last window shape: {last_window.shape}, expected: ({self.window}, {self.input_dim})")
        
        try:
            X_input = np.reshape(last_window, (1, self.window, self.input_dim))
        except ValueError as e:
            logger.error(f"Reshape failed: {e}. Last window shape: {last_window.shape}")
            return {"probability": 0.5, "direction": "NEUTRAL"}
        
        prob = float(self.model.predict(X_input, verbose=0)[0][0])
        
        logger.debug(f"Prediction: probability={prob:.4f}")
        return {
            "probability": prob,
            "direction": "UP" if prob > 0.5 else "DOWN"
        }
    
    def _save_model(self):
        """Save model and scaler to disk for persistence."""
        try:
            if self.model is not None:
                self.model.save(self.model_path)
                logger.info(f"Model saved to {self.model_path}")
            
            if self.scaler_fitted:
                with open(self.scaler_path, 'wb') as f:
                    pickle.dump(self.scaler, f)
                logger.info(f"Scaler saved to {self.scaler_path}")
        except Exception as e:
            logger.error(f"Failed to save model: {e}")
    
    def _load_model(self):
        """Load model and scaler from disk if they exist."""
        try:
            if os.path.exists(self.model_path):
                self.model = load_model(self.model_path)
                logger.info(f"Model loaded from {self.model_path}")
            
            if os.path.exists(self.scaler_path):
                with open(self.scaler_path, 'rb') as f:
                    self.scaler = pickle.load(f)
                self.scaler_fitted = True
                logger.info(f"Scaler loaded from {self.scaler_path}")
        except Exception as e:
            logger.warning(f"Failed to load model: {e}")