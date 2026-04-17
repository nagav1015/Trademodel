import React, { useState } from 'react';
import { MASTER_SYMBOLS } from '../constants/symbols_trade';
import { Activity, ChevronRight, LayoutDashboard, Search } from 'lucide-react';

interface SidebarProps {
  selectedSymbol: string;
  onSelect: (ticker: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ selectedSymbol, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter symbols based on search query
  const filteredSymbols = MASTER_SYMBOLS.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.ticker.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displaySymbols = searchQuery ? filteredSymbols : MASTER_SYMBOLS.slice(0, 15);

  return (
    <aside className="w-64 border-r border-slate-800 p-6 flex flex-col gap-8 bg-[#0a0e17]">
      <div className="flex items-center gap-2 text-blue-500 font-bold text-xl">
        <Activity size={28} />
        <span>TradeModel Pro</span>
      </div>

      <nav className="flex flex-col gap-2">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-2">Navigation</h3>
        <div className="flex items-center gap-3 text-white bg-blue-600/10 p-3 rounded-lg border border-blue-500/20 cursor-pointer">
          <LayoutDashboard size={18} />
          <span className="text-sm font-medium">Dashboard</span>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-4">
        {/* Symbol Search */}
        <div className="sticky top-0 bg-[#0a0e17] pb-4 border-b border-slate-800">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Search Stocks</h3>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search symbol or name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 bg-slate-900 text-white text-sm rounded-lg border border-slate-700 focus:outline-none focus:border-blue-500 transition-colors placeholder-slate-600"
            />
          </div>
          {searchQuery && (
            <p className="text-[10px] text-slate-500 mt-2 px-2">
              Found {filteredSymbols.length} result{filteredSymbols.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>

        {/* Symbols List */}
        <div className="flex flex-col gap-1">
          {displaySymbols.length > 0 ? (
            displaySymbols.map((item) => (
              <div 
                key={item.ticker}
                onClick={() => {
                  onSelect(item.ticker);
                  setSearchQuery(''); // Clear search after selection
                }}
                className={`group p-3 rounded-xl cursor-pointer flex justify-between items-center transition-all border ${
                  selectedSymbol === item.ticker 
                  ? 'bg-blue-600/20 border-blue-500/50 text-white' 
                  : 'hover:bg-slate-800/50 border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>
                  <p className="text-sm font-semibold">{item.name}</p>
                  <p className="text-[10px] opacity-60 font-mono">{item.ticker}</p>
                </div>
                <ChevronRight size={14} className={selectedSymbol === item.ticker ? 'opacity-100' : 'opacity-0'} />
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-xs text-slate-500">No symbols found</p>
              <p className="text-[10px] text-slate-600 mt-1">Try a different search</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;