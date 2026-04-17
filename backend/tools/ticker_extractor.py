import requests
import pandas as pd
import io
import os
import shutil
import json
from datetime import datetime

def generate_symbols():
    URLS = [
        "https://archives.nseindia.com/content/indices/ind_nifty500list.csv",
        "https://www.niftyindices.com/IndexConstituent/ind_nifty500list.csv"
    ]
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }

    if os.path.exists('nse_symbols.json'):
        shutil.copy('nse_symbols.json', f'nse_symbols_backup_{datetime.now().strftime("%Y%m%d")}.json')

    for url in URLS:
        try:
            print(f"🔄 Attempting download from: {url}")
            response = requests.get(url, headers=headers, timeout=10)
            if response.status_code == 200:
                df = pd.read_csv(io.StringIO(response.text))
                
                symbols = []
                symbols.append({"name": "Nifty 50", "ticker": "^NSEI", "type": "Index", "sector": "Market", "exchange": "NSE"})
                symbols.append({"name": "Bank Nifty", "ticker": "^NSEBANK", "type": "Index", "sector": "Financials", "exchange": "NSE"})

                for _, row in df.iterrows():
                    symbols.append({
                        "name": row['Company Name'].replace("'", ""),
                        "ticker": f"{row['Symbol']}.NS",
                        "type": "Stock",
                        "sector": row['Industry'],
                        "exchange": "NSE"
                    })

                # 1. Save JSON (Internal Backend Use)
                with open('nse_symbols.json', 'w') as f:
                    json.dump(symbols, f, indent=2)
                
                # 2. AUTOMATION: Generate the .ts file for Frontend
                export_to_frontend(symbols)
                
                print(f"✅ Successfully refreshed {len(symbols)} symbols.")
                return 
        except Exception as e:
            print(f"⚠️ Failed to fetch from {url}: {e}")

    print("❌ All sources failed.")

def export_to_frontend(symbols):
    """
    Automatically creates the symbols_trade.ts file in the frontend folder.
    """
    # Adjust this path if your folder structure is different
    # This assumes we are in backend/tools/ and need to get to frontend/src/constants/
    target_path = r"D:\TradeModel\frontend\src\constants"
    
    if not os.path.exists(target_path):
        os.makedirs(target_path)
        
    file_path = os.path.join(target_path, 'symbols_trade.ts')
    
    # Building the TypeScript file content
    ts_content = "export interface TradeSymbol {\n"
    ts_content += "  name: string;\n  ticker: string;\n  type: 'Index' | 'Stock' | 'Crypto';\n"
    ts_content += "  sector?: string;\n  exchange: 'NSE' | 'BSE' | 'Binance';\n}\n\n"
    ts_content += "export const MASTER_SYMBOLS: TradeSymbol[] = "
    ts_content += json.dumps(symbols, indent=2)
    ts_content += ";"

    with open(file_path, 'w') as f:
        f.write(ts_content)
    
    print(f"🚀 Automated Sync: Generated {file_path}")

if __name__ == "__main__":
    generate_symbols()