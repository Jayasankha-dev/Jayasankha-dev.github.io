import React, { useState } from 'react';
import { OPERATOR_PROFILE, SKILL_ITEMS } from '../data/portfolioData';
import { Shield, Brain, Terminal, Binary, Fingerprint, Eye, Award } from 'lucide-react';
import { motion } from 'motion/react';

export const DossierSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'offensive' | 'defensive' | 'systems' | 'core'>('all');

  const filteredSkills = activeCategory === 'all'
    ? SKILL_ITEMS
    : SKILL_ITEMS.filter((s) => s.category === activeCategory);

  return (
    <section id="dossier" className="py-12 relative z-10">
      <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] font-mono text-sm font-bold">[+]</span>
          <h2 className="font-['Orbitron'] text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            OPERATOR_DOSSIER <Fingerprint className="w-5 h-5 text-[#00ff41]" />
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-500 hidden sm:inline">
          SECURITY CLEARANCE: ROOT_ACCESS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cognitive Profile & Bio (5 cols) */}
        <div className="lg:col-span-5 flex flex-col gap-5">
          {/* Main Dossier Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#000f00]/60 border-l-4 border-l-[#00ff41] border-y border-r border-[#003b00] rounded-lg p-6 backdrop-blur-md relative shadow-[0_5px_20px_rgba(0,0,0,0.4)]"
          >
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
              <Shield className="w-4 h-4 text-[#00ff41]" />
              <span className="text-white font-bold">OPERATIONAL CLASSIFICATION</span>
            </div>

            <h3 className="font-['Orbitron'] text-lg font-bold text-white mb-2">
              {OPERATOR_PROFILE.fullName}
            </h3>
            <p className="text-xs font-mono text-[#00ff41] mb-4">
              {OPERATOR_PROFILE.headline}
            </p>

            <div className="text-xs text-gray-300 space-y-3 leading-relaxed font-mono">
              <p>
                <span className="bg-[#00ff41] text-black px-1.5 py-0.5 font-bold rounded mr-1.5">
                  PSYCHOLOGY × CRIMINOLOGY
                </span>
                {OPERATOR_PROFILE.bio1}
              </p>
              <p>
                {OPERATOR_PROFILE.bio2}
              </p>
            </div>

            {/* Quick Badges */}
            <div className="grid grid-cols-2 gap-2 mt-5 pt-4 border-t border-[#003b00] text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-gray-300">
                <Brain className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>Behavioral Modeling</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Binary className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>Binary / Memory Forensics</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Terminal className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>Custom Python/Rust C2</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-300">
                <Award className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>Verified CWS Publisher</span>
              </div>
            </div>
          </motion.div>

          {/* Academic & Forensic Edge Card */}
          <div className="bg-[#000a02]/70 border border-[#003b00] rounded-lg p-5 font-mono text-xs text-gray-300">
            <div className="flex items-center gap-2 text-white font-bold mb-2">
              <Eye className="w-4 h-4 text-[#ff003c]" />
              <span>THE HUMAN THREAT VECTOR ADVANTAGE</span>
            </div>
            <p className="text-gray-400 leading-relaxed text-[11px]">
              Cyber attacks originate in human decision-making and cognitive vulnerabilities. By merging empirical criminology with low-level systems programming, I build toolsets that dissect threat actors' psychological intents, evasion patterns, and social engineering architectures.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Skill Meters & Deep Tech (7 cols) */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          {/* Filter Tabs */}
          <div className="flex items-center gap-2 flex-wrap text-xs font-mono">
            {(['all', 'offensive', 'defensive', 'systems', 'core'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded transition-all capitalize ${
                  activeCategory === cat
                    ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_12px_rgba(0,255,65,0.4)]'
                    : 'bg-black/50 text-gray-400 border border-[#003b00] hover:border-[#00ff41]/50 hover:text-white'
                }`}
              >
                {cat === 'all' ? '[*] ALL_VECTORS' : cat}
              </button>
            ))}
          </div>

          {/* Skills List with Animated Meters */}
          <div className="bg-[#000f00]/60 border border-[#003b00] rounded-lg p-5 backdrop-blur-md flex flex-col gap-4">
            {filteredSkills.map((skill, index) => (
              <div key={skill.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-semibold flex items-center gap-2">
                    <span className="text-[#00ff41]">{`0${index + 1}`}.</span>
                    {skill.name}
                  </span>
                  <span className="text-[#00ff41] font-bold font-['Orbitron']">
                    {skill.percentage}%
                  </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-[#001500] border border-[#003300] rounded-full overflow-hidden p-[1px]">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: 'easeOut', delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-[#003b00] via-[#00ff41] to-[#a3ffb8] rounded-full shadow-[0_0_8px_#00ff41]"
                  />
                </div>

                {/* Tech Chips */}
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-1.5 py-0.5 rounded bg-black/70 border border-[#00ff41]/20 text-gray-400 font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
