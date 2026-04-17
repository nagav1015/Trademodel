from abc import ABC, abstractmethod
import pandas as pd

class DataProvider(ABC):
    @abstractmethod
    def fetch_history(self, ticker: str, period: str, interval: str) -> pd.DataFrame:
        """Fetch historical price data"""
        pass

class FeatureGenerator(ABC):
    @abstractmethod
    def apply_features(self, df: pd.DataFrame) -> pd.DataFrame:
        """Apply technical/fundamental indicators"""
        pass

class PredictionModel(ABC):
    @abstractmethod
    def train(self, data: pd.DataFrame):
        """Train the model"""
        pass

    @abstractmethod
    def predict(self, recent_data: pd.DataFrame) -> dict:
        """Return probability and direction"""
        pass