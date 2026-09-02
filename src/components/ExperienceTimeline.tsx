import React from 'react';
import { TIMELINE_DATA } from '../data/portfolioData';
import { History, Calendar, MapPin, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const ExperienceTimeline: React.FC = () => {
  return (
    <section className="py-12 relative z-10">
      <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] font-mono text-sm font-bold">[+]</span>
          <h2 className="font-['Orbitron'] text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            OPERATIONAL_TIMELINE <History className="w-5 h-5 text-[#00ff41]" />
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-500 hidden sm:inline">
          CHRONOLOGICAL TRACK RECORD
        </span>
      </div>

      <div className="relative border-l-2 border-[#003b00] ml-4 md:ml-6 space-y-8 pl-6 md:pl-8">
        {TIMELINE_DATA.map((event, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            className="relative font-mono"
          >
            {/* Pulsing Node */}
            <div className="absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-[#00ff41] shadow-[0_0_12px_#00ff41] border-2 border-black flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-black" />
            </div>

            {/* Event Box */}
            <div className="bg-[#000f00]/60 border border-[#003b00] hover:border-[#00ff41]/50 rounded-lg p-5 backdrop-blur-md transition-colors">
              <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <Calendar className="w-3.5 h-3.5 text-[#00ff41]" />
                  <span className="text-white font-bold">{event.year}</span>
                  <span>•</span>
                  <MapPin className="w-3.5 h-3.5 text-[#ff003c]" />
                  <span>{event.location}</span>
                </div>

                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#00ff41]/10 text-[#00ff41] border border-[#00ff41]/30">
                  {event.badge}
                </span>
              </div>

              <h3 className="font-['Orbitron'] text-base md:text-lg font-bold text-white mb-1">
                {event.title}
              </h3>
              <p className="text-xs text-[#00ff41] mb-3">
                {event.role}
              </p>

              <ul className="space-y-1.5 text-xs text-gray-300">
                {event.highlights.map((h, hIdx) => (
                  <li key={hIdx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff41] shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
