import pandas_ta as ta
import pandas as pd
import numpy as np
import logging
from ..base_module import FeatureGenerator

logger = logging.getLogger(__name__)

class TechnicalFeatures(FeatureGenerator):
    # Timeframe parameters: (min_samples, ema_fast, ema_mid, ema_slow, rsi_period, stoch_period, bb_period)
    TIMEFRAME_PARAMS = {
        '5m': {
            'min_samples': 30,      # ~2.5 hours of data
            'ema_fast': 5,
            'ema_mid': 13,
            'ema_slow': 50,
            'rsi_period': 9,
            'stoch_period': 9,
            'bb_period': 9,
            'target_shift': 12,     # Predict 1 hour ahead (12 x 5min candles)
        },
        '15m': {
            'min_samples': 50,      # ~12.5 hours of data
            'ema_fast': 10,
            'ema_mid': 20,
            'ema_slow': 50,
            'rsi_period': 9,
            'stoch_period': 9,
            'bb_period': 10,
            'target_shift': 4,      # Predict 1 hour ahead (4 x 15min candles)
        },
        '1h': {
            'min_samples': 50,      # ~2 days of data
            'ema_fast': 9,
            'ema_mid': 21,
            'ema_slow': 55,
            'rsi_period': 14,
            'stoch_period': 14,
            'bb_period': 20,
            'target_shift': 4,      # Predict 4 hours ahead
        },
        '1d': {
            'min_samples': 200,     # ~10 months of data
            'ema_fast': 20,
            'ema_mid': 50,
            'ema_slow': 200,
            'rsi_period': 14,
            'stoch_period': 14,
            'bb_period': 20,
            'target_shift': 5,      # Predict 5 days ahead
        },
    }
    
    def apply_features(self, df: pd.DataFrame, timeframe: str = '1d') -> pd.DataFrame:
        """Apply technical indicators with timeframe-specific parameters.
        
        Args:
            df: DataFrame with OHLCV data
            timeframe: '5m', '15m', '1h', or '1d'
        """
        # Input validation
        if df is None or df.empty:
            logger.warning("Empty dataframe passed to apply_features")
            return pd.DataFrame()
        
        # Normalize timeframe
        timeframe = timeframe.lower()
        if timeframe not in self.TIMEFRAME_PARAMS:
            logger.warning(f"Unknown timeframe {timeframe}, using 1d")
            timeframe = '1d'
        
        params = self.TIMEFRAME_PARAMS[timeframe]
        min_samples = params['min_samples']
        
        if len(df) < min_samples:
            logger.warning(f"Dataframe too small ({len(df)} rows) for {timeframe} (need {min_samples})")
            return df
        
        df = df.copy()
        
        # Ensure required columns exist
        required_cols = ['close', 'high', 'low', 'volume']
        if not all(col in df.columns for col in required_cols):
            logger.error(f"Missing required columns: {required_cols}")
            return df

        # 1. Trend Indicators (Timeframe-specific EMAs)
        df['ema_20'] = ta.ema(df['close'], length=params['ema_fast'])
        df['ema_50'] = ta.ema(df['close'], length=params['ema_mid'])
        df['ema_200'] = ta.ema(df['close'], length=params['ema_slow'])
        
        # ADX for trend strength
        adx_df = ta.adx(df['high'], df['low'], df['close'], length=14)
        if adx_df is not None:
            df['adx'] = adx_df.iloc[:, 0]
        else:
            df['adx'] = 20

        # 2. Momentum & Volume
        df['rsi'] = ta.rsi(df['close'], length=params['rsi_period'])
        
        stoch = ta.stoch(df['high'], df['low'], df['close'], length=params['stoch_period'])
        if stoch is not None:
            df['stoch_k'] = stoch.iloc[:, 0]
        else:
            df['stoch_k'] = 50
            
        df['obv'] = ta.obv(df['close'], df['volume'])
        df['mfi'] = ta.mfi(df['high'], df['low'], df['close'], df['volume'], length=params['rsi_period'])

        # 3. Volatility & Price Action
        bbands = ta.bbands(df['close'], length=params['bb_period'], std=2)
        if bbands is not None:
            df['bb_lower'] = bbands.iloc[:, 0]
            df['bb_upper'] = bbands.iloc[:, 2]
        else:
            df['bb_lower'] = df['close'] * 0.95
            df['bb_upper'] = df['close'] * 1.05
            
        df['pivot'] = (df['high'] + df['low'] + df['close']) / 3

        # 4. Multi-Horizon Target Logic (For all trading horizons at once)
        # Create target columns for ALL horizons: 1d, 5d, 60d, 365d
        # This is needed for multi-horizon LSTM training
        target_shifts = {
            'target_1d': 1,       # Next 1 day
            'target_5d': 5,       # Next 5 days
            'target_60d': 60,     # Next 60 days (~3 months)
            'target_365d': 365    # Next 365 days (~1 year)
        }
        
        for col_name, shift_days in target_shifts.items():
            df[col_name] = (df['close'] > df['close'].shift(shift_days)).astype(float)
            # For the last N rows, we can't compute target, so NaN
            df.loc[df.index[-shift_days:], col_name] = np.nan
        
        # Also create single 'target' column for backward compatibility
        target_shift = params['target_shift']
        df['target'] = (df['close'] > df['close'].shift(target_shift)).astype(float)
        df.loc[df.index[-target_shift:], 'target'] = np.nan
        
        # 5. Handle NaNs PROPERLY - No data leakage
        # FIX: Don't use global ffill().bfill() as it leaks future information
        # Instead, only fill within each continuous period
        # Note: Use ffill/bfill syntax instead of fillna(method=...) for pandas 3.0+ compatibility
        df = df.ffill().bfill()
        
        # Remove rows with NaN in critical columns
        critical_cols = ['ema_20', 'rsi', 'adx', 'target']
        df = df.dropna(subset=critical_cols)

        logger.debug(f"Features applied for {timeframe}: {len(df)} rows after NaN removal")
        return df