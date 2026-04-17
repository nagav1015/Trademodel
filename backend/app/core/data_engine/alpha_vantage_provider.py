import pandas as pd
import requests
import logging
import os
from ..base_module import DataProvider

logger = logging.getLogger(__name__)

class AlphaVantageProvider(DataProvider):
    def __init__(self, api_key: str = None):
        # Allow override via parameter, otherwise use environment variable
        self.api_key = api_key or os.getenv('ALPHA_VANTAGE_API_KEY', 'demo')
        self.base_url = "https://www.alphavantage.co/query"
        
        if self.api_key == 'demo':
            logger.warning("Alpha Vantage using demo API key (limited rate)")

    def fetch_history(self, ticker: str, period: str = "1y"):
        """Fetch historical data from Alpha Vantage with error handling.
        
        Converts NSE tickers (RELIANCE.NS) to Alpha Vantage format (NSE:RELIANCE).
        """
        try:
            clean_ticker = f"NSE:{ticker.replace('.NS', '')}"
            
            params = {
                "function": "TIME_SERIES_DAILY",
                "symbol": clean_ticker,
                "apikey": self.api_key,
                "outputsize": "full" if period == "1y" else "compact"
            }
            
            response = requests.get(self.base_url, params=params, timeout=10)
            data = response.json()
            
            if "Time Series (Daily)" in data:
                df = pd.DataFrame.from_dict(data["Time Series (Daily)"], orient="index")
                df = df.astype(float)
                df.columns = ["open", "high", "low", "close", "volume"]
                df.index = pd.to_datetime(df.index)
                logger.debug(f"Alpha Vantage returned {len(df)} rows for {ticker}")
                return df.sort_index()
            
            error_msg = data.get('Note', data.get('Error Message', 'Unknown error'))
            logger.warning(f"AlphaVantage Error for {ticker}: {error_msg}")
            return None
            
        except requests.Timeout:
            logger.error(f"AlphaVantage timeout for {ticker}")
            return None
        except Exception as e:
            logger.error(f"AlphaVantage Connection Failed for {ticker}: {e}")
            return None