import yfinance as yf
import pandas as pd
import logging
from ..base_module import DataProvider

logger = logging.getLogger(__name__)

class YFinanceProvider(DataProvider):
    def fetch_history(self, ticker: str, period: str = "5y", interval: str = "1d"):
        """Fetch historical data from Yahoo Finance with error handling."""
        try:
            # Mapping for Nifty
            symbol = "^NSEI" if ticker.upper() == "NIFTY" else ticker
            
            logger.debug(f"Fetching {symbol} from yfinance with period={period}")
            
            # Download data
            df = yf.download(symbol, period=period, interval=interval, progress=False)
            
            if df is None or df.empty:
                logger.warning(f"yfinance returned no data for {symbol}")
                return pd.DataFrame()
            
            # --- FIX STARTS HERE ---
            # If yfinance returns multi-level columns, flatten them
            if isinstance(df.columns, pd.MultiIndex):
                df.columns = [col[0] for col in df.columns]
                
            # Standardizing column names to lowercase
            df.columns = [str(col).lower() for col in df.columns]
            # --- FIX ENDS HERE ---
            
            logger.info(f"yfinance returned {len(df)} rows for {ticker}")
            return df
            
        except Exception as e:
            logger.error(f"yfinance fetch failed for {ticker}: {e}")
            return pd.DataFrame()