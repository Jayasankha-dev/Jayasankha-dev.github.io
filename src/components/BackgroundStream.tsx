import React from 'react';
import { CODE_STREAMS } from '../data/portfolioData';

export const BackgroundStream: React.FC = () => {
  return (
    <div className="fixed top-12 left-0 w-full h-[85vh] z-0 overflow-hidden opacity-[0.07] pointer-events-none flex flex-col justify-around text-xs md:text-sm font-mono select-none">
      {CODE_STREAMS.map((stream, idx) => {
        const isLeft = idx % 2 === 0;
        return (
          <div
            key={idx}
            className={`flex gap-12 whitespace-nowrap text-[#00ff41] ${
              isLeft ? 'animate-stream-left' : 'animate-stream-right'
            }`}
          >
            {stream.concat(stream).map((item, itemIdx) => (
              <span key={itemIdx} className="tracking-widest">
                {item}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
};
