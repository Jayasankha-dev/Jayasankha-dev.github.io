import React, { useState } from 'react';
import { soundFX } from '../utils/soundEffects';
import { Cpu, Play, CheckCircle2, ShieldCheck, Terminal, Layers, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

export const SecurityLabSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'memory' | 'entropy' | 'hash'>('memory');
  const [isScanning, setIsScanning] = useState(false);
  const [scanOutput, setScanOutput] = useState<string[]>([
    'Lab ready. Select vector and click "EXECUTE HEURISTIC SCAN" to simulate live inspection.'
  ]);
  const [entropyInput, setEntropyInput] = useState('payload_stage2_xor_encrypted_v4.bin');
  const [entropyScore, setEntropyScore] = useState<number | null>(7.94);
  const [hashInput, setHashInput] = useState('D.B. Jayasankha Madhusith - Cybersecurity Specialist');
  const [generatedHash, setGeneratedHash] = useState('8f4a21e69b0c41d73a88fb0362c9381ea67b34d284f18e9a1172a0c6e834b921');

  const runMemoryScan = () => {
    soundFX.playScanBeep();
    setIsScanning(true);
    setScanOutput([
      '[*] Initializing MemVault v1.2 VirtualAlloc memory inspector...',
      '[*] Attaching debugger hook to PID 4096 (Simulated Target Subsystem)...',
    ]);

    const sequence = [
      '[+] Inspecting .text section header offsets: 0x00400000 - 0x0040E000',
      '[+] Scanning for unbacked executable memory pages (RWX permission)...',
      '[+] Pattern Matching signature: 48 8B ?? ?? 48 85 C0 74 ?? 48 8B ... [CLEAN]',
      '[+] Checking IAT (Import Address Table) hooks against kernel32.dll ... [VERIFIED]',
      '[✓] ANALYSIS COMPLETE: 0 Process injections detected. Memory integrity 100% nominal.'
    ];

    sequence.forEach((line, index) => {
      setTimeout(() => {
        soundFX.playKeyClick();
        setScanOutput((prev) => [...prev, line]);
        if (index === sequence.length - 1) {
          setIsScanning(false);
          soundFX.playSuccess();
        }
      }, (index + 1) * 450);
    });
  };

  const calculateEntropy = () => {
    soundFX.playScanBeep();
    setIsScanning(true);
    setTimeout(() => {
      // Pseudo Shannon Entropy
      const len = entropyInput.length;
      const score = Math.min(7.98, Math.max(3.2, 4.5 + (len % 5) * 0.72));
      setEntropyScore(parseFloat(score.toFixed(2)));
      setIsScanning(false);
      soundFX.playSuccess();
    }, 600);
  };

  const computeSimulatedHash = () => {
    soundFX.playKeyClick();
    let hash = 0;
    for (let i = 0; i < hashInput.length; i++) {
      hash = (hash << 5) - hash + hashInput.charCodeAt(i);
      hash |= 0;
    }
    const hex = Math.abs(hash).toString(16).padStart(16, '0') + 'f89e41b37a620c45';
    setGeneratedHash('sha256:' + hex.repeat(2).slice(0, 64));
    soundFX.playSuccess();
  };

  return (
    <section className="py-12 relative z-10">
      <div className="flex items-center justify-between mb-8 border-b border-[#003b00] pb-3">
        <div className="flex items-center gap-3">
          <span className="text-[#00ff41] font-mono text-sm font-bold">[+]</span>
          <h2 className="font-['Orbitron'] text-xl md:text-2xl font-bold tracking-wider text-white uppercase flex items-center gap-2">
            INTERACTIVE_SECURITY_LAB <Cpu className="w-5 h-5 text-[#00ff41]" />
          </h2>
        </div>
        <span className="text-xs font-mono text-gray-500 hidden sm:inline">
          LIVE HEURISTIC SIMULATION MODULE
        </span>
      </div>

      <div className="bg-[#000f00]/70 border border-[#003b00] rounded-lg p-5 md:p-6 backdrop-blur-md relative overflow-hidden">
        {/* Lab Subnav */}
        <div className="flex items-center justify-between gap-3 border-b border-[#003b00] pb-4 mb-5 flex-wrap">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundFX.playKeyClick();
                setActiveTab('memory');
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'memory'
                  ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_12px_rgba(0,255,65,0.4)]'
                  : 'bg-black/40 text-gray-400 border border-[#003b00] hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>MemVault Memory Scanner</span>
            </button>

            <button
              onClick={() => {
                soundFX.playKeyClick();
                setActiveTab('entropy');
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'entropy'
                  ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_12px_rgba(0,255,65,0.4)]'
                  : 'bg-black/40 text-gray-400 border border-[#003b00] hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Shannon Entropy Radar</span>
            </button>

            <button
              onClick={() => {
                soundFX.playKeyClick();
                setActiveTab('hash');
              }}
              className={`px-3 py-1.5 rounded text-xs font-mono transition-all flex items-center gap-1.5 ${
                activeTab === 'hash'
                  ? 'bg-[#00ff41] text-black font-bold shadow-[0_0_12px_rgba(0,255,65,0.4)]'
                  : 'bg-black/40 text-gray-400 border border-[#003b00] hover:text-white'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Cryptographic Checksum</span>
            </button>
          </div>

          <span className="text-[11px] font-mono text-gray-400 hidden lg:inline">
            SIMULATED SANDBOX // ZERO PERSISTENCE RISK
          </span>
        </div>

        {/* Tab 1: Memory Scanner */}
        {activeTab === 'memory' && (
          <div className="space-y-4 font-mono">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="text-xs text-gray-300">
                <span className="text-[#00ff41] font-bold">Target Process:</span> 0x7FFF8A20 (MemVault Heuristic Engine)
              </div>
              <button
                onClick={runMemoryScan}
                disabled={isScanning}
                className="bg-[#00ff41]/20 hover:bg-[#00ff41] text-[#00ff41] hover:text-black border border-[#00ff41] px-4 py-1.5 rounded text-xs font-bold transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>SCANNING VIRTUAL MEMORY...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>EXECUTE HEURISTIC SCAN</span>
                  </>
                )}
              </button>
            </div>

            {/* Scan Output Console */}
            <div className="bg-black/80 border border-[#003b00] rounded p-4 text-xs font-mono space-y-1.5 max-h-44 overflow-y-auto custom-scrollbar">
              {scanOutput.map((line, idx) => (
                <div
                  key={idx}
                  className={`${
                    line.includes('[✓]')
                      ? 'text-[#00ff41] font-bold'
                      : line.includes('[+]')
                      ? 'text-gray-300'
                      : 'text-gray-400'
                  }`}
                >
                  {line}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Entropy Calculator */}
        {activeTab === 'entropy' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="text-gray-300">
              Measure byte randomness (0.0 to 8.0). Values &gt; 7.2 usually indicate XOR obfuscation, packing, or encryption:
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={entropyInput}
                onChange={(e) => setEntropyInput(e.target.value)}
                className="flex-1 bg-black/70 border border-[#003b00] focus:border-[#00ff41] px-3 py-2 rounded text-white text-xs outline-none"
                placeholder="Enter binary / payload name to evaluate..."
              />
              <button
                onClick={calculateEntropy}
                disabled={isScanning}
                className="bg-[#00ff41] text-black font-bold px-4 py-2 rounded text-xs hover:bg-[#a3ffb8] transition-colors shrink-0"
              >
                EVALUATE
              </button>
            </div>

            {entropyScore !== null && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/60 border border-[#003b00] p-4 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="text-gray-400 text-[11px]">SHANNON ENTROPY SCORE:</div>
                  <div className="text-2xl font-['Orbitron'] font-bold text-white mt-1">
                    {entropyScore} <span className="text-xs text-gray-500 font-mono">/ 8.00</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-gray-400">HEURISTIC VERDICT:</div>
                  <div className={`font-bold mt-1 ${entropyScore > 7.0 ? 'text-[#ff003c]' : 'text-[#00ff41]'}`}>
                    {entropyScore > 7.0 ? 'HIGH RANDOMNESS (LIKELY ENCRYPTED/OBFUSCATED)' : 'STANDARD CODE PLAINTEXT'}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        )}

        {/* Tab 3: Cryptographic Checksum */}
        {activeTab === 'hash' && (
          <div className="space-y-4 font-mono text-xs">
            <div className="text-gray-300">
              Verify cryptographic integrity string:
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={hashInput}
                onChange={(e) => {
                  setHashInput(e.target.value);
                  computeSimulatedHash();
                }}
                className="flex-1 bg-black/70 border border-[#003b00] focus:border-[#00ff41] px-3 py-2 rounded text-white text-xs outline-none"
                placeholder="Type text to generate SHA checksum..."
              />
            </div>

            <div className="bg-black/60 border border-[#003b00] p-3.5 rounded text-[11px] break-all">
              <div className="text-gray-400 mb-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>COMPUTED CRYPTOGRAPHIC CHECKSUM:</span>
              </div>
              <div className="text-[#00ff41] font-mono select-all">
                {generatedHash}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
