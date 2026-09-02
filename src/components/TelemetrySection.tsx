import React, { useState, useEffect } from 'react';
import { SystemTelemetryData } from '../types';
import { ShieldAlert, Cpu, HardDrive, Network, Radio, Activity, Lock } from 'lucide-react';
import { motion } from 'motion/react';

interface TelemetrySectionProps {
  telemetry: SystemTelemetryData;
}

export const TelemetrySection: React.FC<TelemetrySectionProps> = ({ telemetry }) => {
  const [animatedCounts, setAnimatedCounts] = useState({
    extensions: 0,
    repos: 0,
    forensics: 0,
    operability: 0,
  });

  useEffect(() => {
    const duration = 1800;
    const steps = 36;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setAnimatedCounts({
        extensions: Math.round(telemetry.chromeExtensions * progress),
        repos: Math.round(telemetry.githubRepos * progress),
        forensics: Math.round(telemetry.forensicsProficiency * progress),
        operability: Math.round(telemetry.terminalOperability * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setAnimatedCounts({
          extensions: telemetry.chromeExtensions,
          repos: telemetry.githubRepos,
          forensics: telemetry.forensicsProficiency,
          operability: telemetry.terminalOperability,
        });
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [telemetry]);

  return (
    <section id="telemetry" className="py-12 relative z-10">
      <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] font-mono text-sm font-bold">[+]</span>
          <h2 className="font-['Orbitron'] text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            SYSTEM_TELEMETRY <Activity className="w-5 h-5 text-[#00ff41] animate-pulse" />
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-gray-400">
          <span className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#00ff41]/10 border border-[#00ff41]/30 text-[#00ff41]">
            <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
            NODE STATUS: {telemetry.firewallStatus}
          </span>
          <span className="px-2 py-1 rounded bg-black/60 border border-gray-700 text-[#ff003c]">
            {telemetry.threatLevel}
          </span>
        </div>
      </div>

      {/* 4 Main Animated Metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Metric 1 */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(0, 255, 65, 0.8)' }}
          className="bg-[#000f00]/60 border border-[#003b00] rounded-lg p-5 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-2 right-2 text-gray-600">
            <Radio className="w-4 h-4" />
          </div>
          <span className="font-['Orbitron'] text-3xl md:text-5xl font-black text-white text-glow mb-1">
            {animatedCounts.extensions}+
          </span>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Chrome Store Extensions
          </span>
          <div className="w-12 h-0.5 bg-[#00ff41]/50 mt-3 rounded-full" />
        </motion.div>

        {/* Metric 2 */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(0, 255, 65, 0.8)' }}
          className="bg-[#000f00]/60 border border-[#003b00] rounded-lg p-5 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-2 right-2 text-gray-600">
            <Network className="w-4 h-4" />
          </div>
          <span className="font-['Orbitron'] text-3xl md:text-5xl font-black text-white text-glow mb-1">
            {animatedCounts.repos}+
          </span>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            GitHub Repositories
          </span>
          <div className="w-12 h-0.5 bg-[#00ff41]/50 mt-3 rounded-full" />
        </motion.div>

        {/* Metric 3 */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(0, 255, 65, 0.8)' }}
          className="bg-[#000f00]/60 border border-[#003b00] rounded-lg p-5 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-2 right-2 text-gray-600">
            <HardDrive className="w-4 h-4" />
          </div>
          <span className="font-['Orbitron'] text-3xl md:text-5xl font-black text-white text-glow mb-1">
            {animatedCounts.forensics}%
          </span>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Forensics Proficiency
          </span>
          <div className="w-12 h-0.5 bg-[#00ff41]/50 mt-3 rounded-full" />
        </motion.div>

        {/* Metric 4 */}
        <motion.div
          whileHover={{ y: -4, borderColor: 'rgba(0, 255, 65, 0.8)' }}
          className="bg-[#000f00]/60 border border-[#003b00] rounded-lg p-5 flex flex-col items-center justify-center text-center backdrop-blur-md relative overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
        >
          <div className="absolute top-2 right-2 text-gray-600">
            <Cpu className="w-4 h-4" />
          </div>
          <span className="font-['Orbitron'] text-3xl md:text-5xl font-black text-white text-glow mb-1">
            {animatedCounts.operability}%
          </span>
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">
            Terminal Operability
          </span>
          <div className="w-12 h-0.5 bg-[#00ff41]/50 mt-3 rounded-full" />
        </motion.div>
      </div>

      {/* Live Node Telemetry Sub-Panel */}
      <div className="bg-[#000a02]/80 border border-[#003b00] rounded-lg p-4 font-mono text-xs text-gray-300 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="flex items-center gap-2.5">
          <Lock className="w-4 h-4 text-[#00ff41] shrink-0" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase">ENCRYPTION PROTOCOL</div>
            <div className="text-white font-semibold">{telemetry.encryptionStandard}</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Activity className="w-4 h-4 text-[#00ff41] shrink-0" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase">SOC OPERATIONAL UPTIME</div>
            <div className="text-white font-semibold">{telemetry.systemUptime} [ALL SYSTEMS GO]</div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <ShieldAlert className="w-4 h-4 text-[#ff003c] shrink-0 animate-pulse" />
          <div>
            <div className="text-[10px] text-gray-500 uppercase">ADVERSARIAL DEFENSE STATUS</div>
            <div className="text-[#00ff41] font-semibold">ZERO COMPROMISE // SHIELD UP</div>
          </div>
        </div>
      </div>
    </section>
  );
};
