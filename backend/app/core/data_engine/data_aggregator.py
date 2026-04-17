import pandas as pd
import os
from datetime import datetime
import logging
from .yfinance_provider import YFinanceProvider
from app.core.data_engine.alpha_vantage_provider import AlphaVantageProvider

logger = logging.getLogger(__name__)

class DataAggregator:
    # Timeframe to yfinance interval mapping
    TIMEFRAME_MAP = {
        '5m': '5m',
        '15m': '15m',
        '1H': '1h',
        '1h': '1h',
        '1D': '1d',
        '1d': '1d',
    }
    
    # Period mapping for different timeframes (how much history to fetch)
    TIMEFRAME_PERIODS = {
        '5m': '7d',      # 7 days of 5-min candles
        '15m': '30d',    # 30 days of 15-min candles
        '1h': '90d',     # 90 days of hourly candles
        '1d': '1y',      # 1 year of daily candles
    }
    
    def __init__(self, alpha_vantage_key=None):
        self.yfinance = YFinanceProvider()
        # FIX: Make API key configurable via environment variable
        api_key = alpha_vantage_key or os.getenv('ALPHA_VANTAGE_API_KEY', 'demo')  
        self.alpha_vantage = AlphaVantageProvider(api_key=api_key)
        self.cache_dir = os.getenv('DATA_CACHE_DIR', 'data_cache')
        
        if not os.path.exists(self.cache_dir):
            os.makedirs(self.cache_dir)
            logger.info(f"Created cache directory: {self.cache_dir}")

    def get_history(self, ticker: str, period="1y", timeframe: str = "1d"):
        """The multi-layer fetch strategy with input validation.
        
        Args:
            ticker: Stock symbol (e.g., "RELIANCE.NS", "^NSEI")
            period: Time period (e.g., "1y", "30d", "7d")
            timeframe: Candlestick interval (5m, 15m, 1h, 1d)
        
        1. Validate input
        2. Try Yahoo Finance (Fastest & Free)
        3. Try Alpha Vantage (Reliable Fallback)
        4. Try Local CSV Cache (Emergency Last Resort)
        """
        # FIX: Input validation
        if not ticker or not isinstance(ticker, str):
            logger.error(f"Invalid ticker: {ticker}")
            return pd.DataFrame()
        
        ticker = ticker.strip().upper()
        
        # Normalize and validate timeframe
        timeframe = timeframe.lower()
        if timeframe not in self.TIMEFRAME_MAP:
            logger.warning(f"Invalid timeframe {timeframe}, using 1d")
            timeframe = '1d'
        
        # Auto-adjust period if not specified for intraday
        if period == "1y" and timeframe in ['5m', '15m', '1h']:
            period = self.TIMEFRAME_PERIODS.get(timeframe, '1y')
            logger.info(f"Auto-adjusted period to {period} for timeframe {timeframe}")
        
        interval = self.TIMEFRAME_MAP[timeframe]
        
        # Check cache first
        cache_key = f"{ticker}_{timeframe}"
        cached_df = self._fetch_from_cache(cache_key)
        if cached_df is not None and not cached_df.empty and len(cached_df) > 100:
            logger.info(f"✅ Using cached data for {cache_key}")
            return cached_df

        # --- LAYER 1: YFINANCE ---
        try:
            logger.info(f"📡 Layer 1: Attempting yfinance for {ticker} ({timeframe})...")
            df = self.yfinance.fetch_history(ticker, period, interval)
            if df is not None and not df.empty:
                self._save_to_cache(cache_key, df)
                logger.info(f"✅ Successfully fetched {len(df)} rows from yfinance for {ticker} ({timeframe})")
                return df
        except Exception as e:
            logger.warning(f"⚠️ Layer 1 Failed: {e}")

        # --- LAYER 2: Alpha Vantage (only for daily) ---
        if timeframe == '1d':
            try:
                logger.info(f"📡 Layer 2: Attempting Alpha Vantage fallback for {ticker}...")
                df = self.alpha_vantage.fetch_history(ticker, period)
                if df is not None and not df.empty:
                    self._save_to_cache(cache_key, df)
                    logger.info(f"✅ Successfully fetched {len(df)} rows from Alpha Vantage for {ticker}")
                    return df
            except Exception as e:
                logger.warning(f"⚠️ Layer 2 Failed: {e}")

        # --- LAYER 3: LOCAL CACHE ---
        logger.info(f"📡 Layer 3: Attempting Local Cache recovery for {ticker}...")
        return self._fetch_from_cache(cache_key)

    def _save_to_cache(self, cache_key, df):
        """Saves successful fetches so we always have a backup.
        
        Args:
            cache_key: Should be "ticker_timeframe" (e.g., "RELIANCE.NS_5m")
            df: DataFrame to cache
        """
        try:
            file_path = os.path.join(self.cache_dir, f"{cache_key}.csv")
            df.to_csv(file_path)
            logger.debug(f"Cached {len(df)} rows for {cache_key}")
        except Exception as e:
            logger.error(f"Failed to cache {cache_key}: {e}")

    def _fetch_from_cache(self, cache_key):
        """Loads data from the last successful session.
        
        Args:
            cache_key: Should be "ticker_timeframe" (e.g., "RELIANCE.NS_5m")
        """
        file_path = os.path.join(self.cache_dir, f"{cache_key}.csv")
        if os.path.exists(file_path):
            try:
                df = pd.read_csv(file_path, index_col=0, parse_dates=True)
                logger.info(f"✅ Recovery: Loaded {len(df)} rows from cache for {cache_key}")
                return df
            except Exception as e:
                logger.error(f"Failed to load cache for {cache_key}: {e}")
        
        logger.warning(f"❌ No cache available for {cache_key}")
        return pd.DataFrame()  # Return empty to prevent crash