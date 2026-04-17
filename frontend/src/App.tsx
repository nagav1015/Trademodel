import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Activity, 
  ShieldCheck, 
  Play, 
  RefreshCcw, 
  TrendingUp, 
  LayoutDashboard,
  Zap,
  LogOut
} from 'lucide-react';

// Modular Imports
import Sidebar from './components/Sidebar.tsx';
import PredictionCard from './components/PredictionCard';
import PriceChart from './components/PriceChart';
import LoginModal from './components/LoginModal';
import MultiHorizonPrediction from './components/MultiHorizonPrediction';
import TimeframeSelector from './components/TimeframeSelector';
import IntraDayPrediction from './components/IntraDayPrediction';

const App: React.FC = () => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);

  // UI State
  const [selectedSymbol, setSelectedSymbol] = useState("^NSEI");
  const [selectedTimeframe, setSelectedTimeframe] = useState("1h");
  const [prediction, setPrediction] = useState<any>(null);
  const [multiHorizonPredictions, setMultiHorizonPredictions] = useState<any>(null);
  const [intraDayPredictions, setIntraDayPredictions] = useState<any>(null);
  const [chartData, setChartData] = useState<any[]>([]);
  const [topPicks, setTopPicks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [intraDayLoading, setIntraDayLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Helper to get the latest technical data point for the cards
  const latestData = chartData.length > 0 ? chartData[chartData.length - 1] : null;

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    const role = localStorage.getItem('user_role');
    if (token && role) {
      setAuthToken(token);
      setUserRole(role);
      setIsAuthenticated(true);
      // Setup axios interceptor
      setupAxiosInterceptor(token);
    }
  }, []);

  // Setup axios interceptor to include auth token
  const setupAxiosInterceptor = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  // Handle login
  const handleLoginSuccess = (token: string, role: string) => {
    setAuthToken(token);
    setUserRole(role);
    setIsAuthenticated(true);
    setupAxiosInterceptor(token);
    localStorage.setItem('auth_token', token);
    localStorage.setItem('user_role', role);
  };

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setAuthToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    delete axios.defaults.headers.common['Authorization'];
    setPrediction(null);
    setMultiHorizonPredictions(null);
    setChartData([]);
    setTopPicks([]);
  };

  // 1. Load Dashboard Data with Multi-Horizon Predictions
  const loadDashboardData = async (ticker: string) => {
    setLoading(true);
    console.log(`📊 Loading dashboard data for ${ticker}...`);
    try {
      const [predRes, histRes, multiHorizonRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/prediction/${ticker}`).catch(e => {
          console.error(`❌ Daily prediction failed for ${ticker}:`, e.message);
          throw e;
        }),
        axios.get(`http://127.0.0.1:8000/api/history/${ticker}`).catch(e => {
          console.error(`❌ History failed for ${ticker}:`, e.message);
          throw e;
        }),
        axios.get(`http://127.0.0.1:8000/api/prediction/multi/${ticker}`).catch(e => {
          console.error(`❌ Multi-horizon prediction failed for ${ticker}:`, e.message);
          throw e;
        })
      ]);
      
      setPrediction(predRes.data);
      console.log(`✅ Daily predictions loaded for ${ticker}:`, predRes.data);
      
      // Convert time strings to Unix timestamps for lightweight-charts
      const formattedChartData = histRes.data.map((candle: any) => ({
        ...candle,
        time: Math.floor(new Date(candle.time).getTime() / 1000) // Convert to Unix timestamp
      }));
      
      setChartData(formattedChartData);
      console.log(`✅ Chart data loaded: ${formattedChartData.length} candles`);
      
      console.log(`✅ Multi-horizon predictions:`, multiHorizonRes.data);
      setMultiHorizonPredictions(multiHorizonRes.data);
    } catch (err) {
      console.error("❌ Dashboard Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // 1b. Load Intraday Data + Chart for Selected Timeframe
  const loadIntraDayData = async (ticker: string, timeframe: string) => {
    setIntraDayLoading(true);
    try {
      // Fetch both predictions and chart data
      const [predRes, chartRes] = await Promise.all([
        axios.get(`http://127.0.0.1:8000/api/intraday/multi/${ticker}`),
        axios.get(`http://127.0.0.1:8000/api/intraday-history/${ticker}?timeframe=${timeframe}`)
      ]);
      
      setIntraDayPredictions(predRes.data);
      
      // Convert time strings to Unix timestamps for lightweight-charts
      const formattedChartData = chartRes.data.map((candle: any) => ({
        ...candle,
        time: Math.floor(new Date(candle.time).getTime() / 1000) // Convert to Unix timestamp
      }));
      
      setChartData(formattedChartData); // Update chart with timeframe-specific data
      console.log(`✅ Intraday data loaded for ${ticker} (${timeframe}): ${formattedChartData.length} candles`);
    } catch (err) {
      console.error("Intraday Fetch Error:", err);
    } finally {
      setIntraDayLoading(false);
    }
  };

  // 2. Load Market Scan Results
  const loadScanResults = async () => {
    try {
      const res = await axios.get('http://127.0.0.1:8000/api/market-scan/top-picks');
      setTopPicks(res.data.top_picks || []);
    } catch (err) {
      console.error("Scan Load Error:", err);
    }
  };

  // 3. Trigger Full Market Scan (Admin Only)
  const handleStartScan = async () => {
    setIsScanning(true);
    try {
      await axios.post('http://127.0.0.1:8000/api/market-scan/trigger');
      alert("✅ Market Scan Started!\n\nUsing PRE-TRAINED models for FAST analysis of 500+ stocks.\nETA: 2-3 minutes\n\n📊 Horizons: 1D, 5D, 60D, 365D\nResults will appear in 'Top Alpha Picks' shortly.");
      
      // Poll for results every 10 seconds while scanning (faster updates since it's prediction only)
      const pollInterval = setInterval(async () => {
        await loadScanResults();
      }, 10000);
      
      // Stop polling after 5 minutes (max scan time with prediction-only)
      setTimeout(() => clearInterval(pollInterval), 300000);
      
    } catch (err: any) {
      const errorDetail = err.response?.data?.detail || "";
      const statusCode = err.response?.status;
      
      if (statusCode === 403) {
        alert("❌ Admin access required. Only admin users can trigger market scans.");
      } else if (statusCode === 412 || errorDetail.includes("Pre-trained models")) {
        alert("⚠️  Models Need Training First!\n\n🔧 Setup (one-time only):\n1. Click on any stock (e.g., NIFTY)\n2. Wait for AI to train models (~30 sec)\n3. Check backend logs for completion\n4. Then click 'START MARKET SCAN'\n\n⚡ After this, all scans will be FAST (2-3 min for 500+ stocks)!");
      } else if (statusCode === 401) {
        alert("❌ Authentication failed. Please login again.");
      } else {
        alert("❌ Scan failed: " + errorDetail);
      }
    } finally {
      setTimeout(() => setIsScanning(false), 5000); 
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadDashboardData(selectedSymbol);
      loadIntraDayData(selectedSymbol, selectedTimeframe);
      loadScanResults();
    }
  }, [selectedSymbol, selectedTimeframe, isAuthenticated]);

  // Show login modal if not authenticated
  if (!isAuthenticated) {
    return <LoginModal onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-[#0a0e17] text-slate-200 overflow-hidden font-sans">
      <Sidebar selectedSymbol={selectedSymbol} onSelect={setSelectedSymbol} />

      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-[#0a0e17]/80 backdrop-blur-xl z-10">
          <div className="flex items-center gap-6">
            <div>
              <h2 className="text-xl font-bold tracking-tight">
                {selectedSymbol.replace(".NS", "").replace("^", "")}
              </h2>
              <p className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                {selectedTimeframe.toUpperCase()} Timeframe • Multi-Horizon Alpha Analysis
              </p>
            </div>
            {(loading || intraDayLoading) && <RefreshCcw size={18} className="animate-spin text-blue-500" />}
          </div>

          <div className="flex items-center gap-4">
            {/* Market Scan Button - Admin Only */}
            {userRole === 'admin' && (
              <button 
                onClick={handleStartScan}
                disabled={isScanning}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                  isScanning 
                  ? 'bg-slate-800 text-slate-500 border-slate-700 cursor-not-allowed' 
                  : 'bg-blue-600 hover:bg-blue-500 text-white border-blue-400 shadow-lg shadow-blue-900/20'
                }`}
                title="Admin only: Trigger full market scan"
              >
                {isScanning ? <RefreshCcw size={14} className="animate-spin" /> : <Play size={14} fill="currentColor" />}
                {isScanning ? "AI SCANNING..." : "START MARKET SCAN"}
              </button>
            )}
            
            <div className="h-8 w-[1px] bg-slate-800 mx-2" />
            
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 bg-slate-900 px-4 py-2 rounded-full border border-slate-800">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> AI ENGINE ACTIVE
              </div>
              
              {/* User Info & Logout */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-3 py-2 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-colors">
                  <ShieldCheck size={14} />
                  {userRole?.toUpperCase()}
                </button>
                <div className="absolute right-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg text-[10px] font-bold text-slate-400 hover:text-white whitespace-nowrap"
                  >
                    <LogOut size={12} />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-8 grid grid-cols-12 gap-6 overflow-y-auto custom-scrollbar">
          
          {/* Main Content: Chart + Indicators */}
          <div className="col-span-8 space-y-6">
            {/* Timeframe Selector */}
            <TimeframeSelector
              selectedTimeframe={selectedTimeframe}
              onTimeframeChange={setSelectedTimeframe}
              loading={intraDayLoading}
            />

            {/* Price Chart */}
            <div className="bg-[#11161d] h-[500px] rounded-3xl border border-slate-800 p-4 shadow-2xl relative overflow-hidden">
              {chartData.length > 0 ? (
                <PriceChart data={chartData} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                   <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                   <p className="text-slate-500 font-mono text-sm tracking-widest animate-pulse">LOADING CHART...</p>
                </div>
              )}
            </div>

            {/* Quick Indicators */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#11161d] p-5 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors shadow-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Momentum (RSI)</p>
                    <div className="flex items-baseline gap-2">
                        <p className={`text-2xl font-mono font-bold ${latestData?.rsi > 70 ? 'text-red-400' : latestData?.rsi < 30 ? 'text-green-400' : 'text-blue-400'}`}>
                            {latestData ? latestData.rsi.toFixed(2) : "---"}
                        </p>
                        <span className="text-[10px] text-slate-600 font-mono">14p</span>
                    </div>
                </div>

                <div className="bg-[#11161d] p-5 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors shadow-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Trend Strength (ADX)</p>
                    <div className="flex items-baseline gap-2">
                        <p className={`text-2xl font-mono font-bold ${latestData?.adx > 25 ? 'text-yellow-400' : 'text-slate-400'}`}>
                            {latestData ? latestData.adx.toFixed(2) : "---"}
                        </p>
                        <span className="text-[10px] text-slate-600 font-mono uppercase">
                            {latestData?.adx > 25 ? "Strong" : "Weak"}
                        </span>
                    </div>
                </div>

                <div className="bg-[#11161d] p-5 rounded-2xl border border-slate-800/50 hover:border-slate-700 transition-colors shadow-lg">
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">Money Flow (MFI)</p>
                    <div className="flex items-baseline gap-2">
                        <p className={`text-2xl font-mono font-bold ${latestData?.mfi > 80 ? 'text-red-400' : latestData?.mfi < 20 ? 'text-green-400' : 'text-slate-300'}`}>
                            {latestData ? latestData.mfi.toFixed(2) : "---"}
                        </p>
                        <Zap size={14} className={latestData?.mfi > 50 ? "text-yellow-500" : "text-slate-700"} />
                    </div>
                </div>
            </div>
          </div>

          {/* Right Sidebar: Predictions & Top Picks */}
          <div className="col-span-4 space-y-6">
            {/* Multi-Horizon Predictions */}
            {multiHorizonPredictions?.predictions && (
              <MultiHorizonPrediction 
                predictions={multiHorizonPredictions.predictions}
                symbol={multiHorizonPredictions.symbol}
                lastPrice={multiHorizonPredictions.last_price}
              />
            )}

            {/* Intraday Predictions */}
            {intraDayPredictions?.predictions && (
              <IntraDayPrediction
                predictions={intraDayPredictions.predictions}
                selectedTimeframe={selectedTimeframe}
                lastPrice={intraDayPredictions.last_price}
                loading={intraDayLoading}
                symbol={intraDayPredictions.symbol}
              />
            )}

            {/* TOP ALPHA PICKS */}
            <div className="bg-[#11161d] p-6 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                <TrendingUp size={80} />
              </div>
              
              <div className="flex justify-between items-center mb-6 relative z-10">
                <div>
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">AI Top Alpha Picks</h4>
                    <p className="text-[9px] text-blue-400 font-mono">MULTI-HORIZON RESULTS</p>
                </div>
                <div className="bg-blue-500/10 p-2 rounded-lg">
                    <TrendingUp size={16} className="text-blue-500" />
                </div>
              </div>

              <div className="space-y-3 relative z-10 max-h-96 overflow-y-auto">
                {topPicks.length > 0 ? topPicks.map((stock: any) => (
                  <div 
                    key={stock.ticker} 
                    onClick={() => setSelectedSymbol(stock.ticker)}
                    className="flex justify-between items-center p-4 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 hover:border-blue-500/30 rounded-2xl transition-all cursor-pointer group"
                  >
                    <div>
                      <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{stock.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono tracking-tighter uppercase">{stock.sector}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-mono text-green-400 font-bold">{(stock.probability * 100).toFixed(1)}%</p>
                      <p className="text-[10px] text-slate-500 font-mono">₹{stock.last_price?.toLocaleString() || 'N/A'}</p>
                    </div>
                  </div>
                )) : (
                  <div className="flex flex-col items-center justify-center py-12 px-4 border-2 border-dashed border-slate-800 rounded-3xl">
                    <p className="text-xs text-slate-500 text-center italic">
                        {userRole === 'admin' ? 'No scans yet. Click "START MARKET SCAN" to begin.' : 'Contact admin to trigger market scans.'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;