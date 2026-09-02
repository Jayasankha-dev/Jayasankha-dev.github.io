import React, { useState } from 'react';
import { FAQ_DATA } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { HelpCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const FAQMatrix: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggle = (id: string) => {
    soundFX.playKeyClick();
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-12 relative z-10">
      <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] font-mono text-sm font-bold">[+]</span>
          <h2 className="font-['Orbitron'] text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            OPERATIONS_MATRIX (FAQ) <HelpCircle className="w-5 h-5 text-[#00ff41]" />
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-500 hidden sm:inline">
          PROTOCOL & HIRING SPECS
        </span>
      </div>

      <div className="space-y-3 font-mono">
        {FAQ_DATA.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-[#000f00]/60 border border-[#003b00] hover:border-[#00ff41]/50 rounded-lg overflow-hidden backdrop-blur-md transition-colors"
            >
              <button
                onClick={() => toggle(faq.id)}
                className="w-full p-4 md:p-5 flex items-center justify-between text-left gap-4 cursor-pointer text-white hover:text-[#00ff41] transition-colors"
              >
                <div className="flex items-center gap-3">
                  {faq.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41] shrink-0 font-bold">
                      {faq.badge}
                    </span>
                  )}
                  <span className="text-xs md:text-sm font-semibold">{faq.question}</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-[#00ff41] shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden border-t border-[#003b00] bg-black/40"
                  >
                    <div className="p-4 md:p-5 text-xs md:text-sm text-gray-300 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};
