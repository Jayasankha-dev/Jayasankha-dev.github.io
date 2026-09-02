import React from 'react';
import { TICKER_ITEMS } from '../data/portfolioData';
import { ShieldAlert } from 'lucide-react';

export const CyberTicker: React.FC = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-[#010a03]/95 backdrop-blur-md border-t border-[#00ff41]/40 text-[#00ff41] text-xs py-1.5 px-3 z-40 overflow-hidden flex items-center shadow-[0_-4px_20px_rgba(0,255,65,0.15)] select-none">
      <div className="flex items-center gap-2 bg-[#00ff41]/10 px-2 py-0.5 rounded text-[11px] font-bold shrink-0 border border-[#00ff41]/30 mr-3">
        <ShieldAlert className="w-3.5 h-3.5 text-[#ff003c] animate-pulse" />
        <span className="text-[#00ff41] tracking-wider">LIVE_FEED:</span>
      </div>

      <div className="overflow-hidden relative w-full flex">
        <div className="animate-ticker flex whitespace-nowrap gap-12 font-mono text-[11px] md:text-xs">
          {TICKER_ITEMS.concat(TICKER_ITEMS).map((item, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-[#ff003c] font-bold">{item.tag}</span>
              <span className="text-gray-300">{item.text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
