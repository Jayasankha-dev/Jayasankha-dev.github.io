import React, { useState, useEffect } from 'react';
import {
  OPERATOR_PROFILE,
  TELEMETRY_INITIAL,
} from './data/portfolioData';
import { ThemeVariant, SystemTelemetryData } from './types';
import { soundFX } from './utils/soundEffects';

// Subcomponents
import { HUDNavigation } from './components/HUDNavigation';
import { CyberMatrixCanvas } from './components/CyberMatrixCanvas';
import { BackgroundStream } from './components/BackgroundStream';
import { CyberTicker } from './components/CyberTicker';
import { AudioPlayer } from './components/AudioPlayer';
import { TerminalCLI } from './components/TerminalCLI';
import { TelemetrySection } from './components/TelemetrySection';
import { DossierSection } from './components/DossierSection';
import { SecurityLabSimulator } from './components/SecurityLabSimulator';
import { ProjectsGrid } from './components/ProjectsGrid';
import { ExperienceTimeline } from './components/ExperienceTimeline';
import { FAQMatrix } from './components/FAQMatrix';
import { ContactModal } from './components/ContactModal';
import { CVModal } from './components/CVModal';

// Icons
import {
  Github,
  Linkedin,
  Send as SendIcon,
  Mail,
  Shield,
  Phone,
  ArrowUpRight,
  Sparkles,
  FileText,
  Activity,
  KeyRound,
  CheckCircle2,
} from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [theme, setTheme] = useState<ThemeVariant>('matrix');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [crtEnabled, setCrtEnabled] = useState(true);
  const [telemetry, setTelemetry] = useState<SystemTelemetryData>(TELEMETRY_INITIAL);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Typewriter effect in Hero
  const [typewriterText, setTypewriterText] = useState('');
  const fullTypewriterString = './execute_cyber_security_profile.sh --fetch-github-intel --defcon-nominal';

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx <= fullTypewriterString.length) {
        setTypewriterText(fullTypewriterString.slice(0, currentIdx));
        currentIdx++;
      } else {
        clearInterval(interval);
      }
    }, 45);

    return () => clearInterval(interval);
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    soundFX.enabled = next;
  };

  const handleTriggerSimulatedScan = () => {
    setTelemetry((prev) => ({
      ...prev,
      forensicsProficiency: 88,
      terminalOperability: 100,
    }));
  };

  return (
    <div className={`min-h-screen relative selection:bg-[#00ff41] selection:text-black ${crtEnabled ? 'crt-overlay' : ''}`}>
      {/* Dynamic Interactive Matrix Rain & Constellation Canvas */}
      <CyberMatrixCanvas theme={theme} />

      {/* Background Animated Decompiled Code Streams */}
      <BackgroundStream />

      {/* Top HUD Navigation Bar */}
      <HUDNavigation
        theme={theme}
        onThemeChange={setTheme}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        crtEnabled={crtEnabled}
        onToggleCRT={() => setCrtEnabled(!crtEnabled)}
        onOpenCV={() => setIsCVModalOpen(true)}
        onOpenContact={() => setIsContactModalOpen(true)}
      />

      {/* Persistent Top-Right Cyber Playlist Audio Player */}
      <AudioPlayer />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-20 pb-24 relative z-10 font-mono">
        {/* HERO INTRO TERMINAL */}
        <section className="min-h-[85vh] flex flex-col justify-center items-center py-10">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="w-full max-w-4xl bg-[#010903]/90 border border-[#00ff41] rounded-xl p-5 md:p-8 backdrop-blur-md shadow-[0_0_35px_rgba(0,255,65,0.2)] relative"
          >
            {/* Top Root Banner Badge */}
            <div className="absolute -top-3.5 left-6 bg-[#020703] border border-[#00ff41]/50 px-3 py-0.5 rounded text-[11px] text-[#00ff41] font-bold tracking-wider flex items-center gap-1.5 shadow-[0_0_10px_rgba(0,255,65,0.2)]">
              <span className="w-2 h-2 rounded-full bg-[#00ff41] animate-ping" />
              ROOT_SESSION_ACTIVE // v10.5
            </div>

            {/* Sys Log Boot Output */}
            <div className="text-[11px] text-gray-400 space-y-1 mb-4 border-b border-[#003b00] pb-3 select-none">
              <div className="flex items-center gap-2">
                <span className="text-[#00ff41]">[SYS_INIT]</span> Initializing secure cryptographically signed session... <span className="text-[#00ff41]">OK</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[#00ff41]">[AUTH_HASH]</span> Verifying Operator Identity Hash... MATCH: [D.B. Jayasankha Madhusith]
              </div>
              <div className="text-[#00ff41] font-bold flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#00ff41]" />
                Authentication Successful. Welcome Operator.
              </div>
            </div>

            {/* Operator Main Name & Tagline */}
            <div className="my-3">
              <h1 className="font-['Orbitron'] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white uppercase text-glow leading-none">
                JAYASANKHA MADHUSITH
              </h1>
              <p className="text-sm md:text-base text-[#00ff41] font-semibold mt-2 tracking-wide flex items-center gap-2">
                <span>{OPERATOR_PROFILE.headline}</span>
                <span className="hidden sm:inline text-gray-500">•</span>
                <span className="hidden sm:inline text-xs text-gray-400 font-normal">Psychology & Criminology Graduate</span>
              </p>
            </div>

            {/* Shell Prompt Typewriter */}
            <div className="bg-black/80 border border-[#003b00] rounded p-2.5 my-3 text-xs flex items-center gap-2 overflow-x-auto text-gray-300">
              <span className="text-[#00ff41] font-bold shrink-0">root@sys-admin:~#</span>
              <span className="text-white font-semibold">{typewriterText}</span>
              <span className="w-2 h-4 bg-[#00ff41] inline-block animate-pulse shrink-0" />
            </div>

            {/* Integrated Interactive CLI Shell */}
            <TerminalCLI
              onOpenCV={() => setIsCVModalOpen(true)}
              onOpenContact={() => setIsContactModalOpen(true)}
              onTriggerScan={handleTriggerSimulatedScan}
            />

            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              <a
                href="#dossier"
                onClick={() => soundFX.playKeyClick()}
                className="py-2.5 px-3 rounded bg-[#00ff41]/10 hover:bg-[#00ff41] border border-[#00ff41]/50 text-[#00ff41] hover:text-black font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,255,65,0.1)]"
              >
                <span>&gt; View Dossier</span>
              </a>

              <a
                href="#telemetry"
                onClick={() => soundFX.playKeyClick()}
                className="py-2.5 px-3 rounded bg-[#00ff41]/10 hover:bg-[#00ff41] border border-[#00ff41]/50 text-[#00ff41] hover:text-black font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,255,65,0.1)]"
              >
                <span>&gt; System Metrics</span>
              </a>

              <a
                href="#github-repos"
                onClick={() => soundFX.playKeyClick()}
                className="py-2.5 px-3 rounded bg-[#00ff41]/10 hover:bg-[#00ff41] border border-[#00ff41]/50 text-[#00ff41] hover:text-black font-bold text-xs uppercase tracking-wider text-center transition-all flex items-center justify-center gap-1.5 shadow-[0_0_12px_rgba(0,255,65,0.1)]"
              >
                <span>&gt; Access Intel</span>
              </a>

              <button
                onClick={() => {
                  soundFX.playKeyClick();
                  setIsCVModalOpen(true);
                }}
                className="py-2.5 px-3 rounded bg-[#00ff41] text-black font-bold text-xs uppercase tracking-wider text-center hover:bg-[#a3ffb8] transition-all flex items-center justify-center gap-1.5 shadow-[0_0_15px_rgba(0,255,65,0.3)]"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Extract_CV.pdf</span>
              </button>
            </div>

            {/* Social Links & Comms Badges */}
            <div className="flex items-center justify-between flex-wrap gap-4 mt-6 pt-4 border-t border-[#003b00] text-xs text-gray-400">
              <div className="flex items-center gap-4">
                <a
                  href={OPERATOR_PROFILE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:scale-110 transition-transform"
                  title="GitHub Profile"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={OPERATOR_PROFILE.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:scale-110 transition-transform"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={OPERATOR_PROFILE.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white hover:scale-110 transition-transform"
                  title="Telegram Comms"
                >
                  <SendIcon className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${OPERATOR_PROFILE.email}`}
                  className="hover:text-white hover:scale-110 transition-transform"
                  title="Direct Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>

              <div className="text-[11px] text-gray-400 flex items-center gap-2 font-mono">
                <KeyRound className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>PGP KEY: [VALIDATED]</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* 1. SYSTEM TELEMETRY */}
        <TelemetrySection telemetry={telemetry} />

        {/* 2. OPERATOR DOSSIER & ANIMATED SKILL METERS */}
        <DossierSection />

        {/* 3. INTERACTIVE SECURITY RECON LAB SIMULATOR */}
        <div id="lab">
          <SecurityLabSimulator />
        </div>

        {/* 4. OPEN SOURCE INTEL & EXTENSIONS (LIVE REPOS) */}
        <ProjectsGrid />

        {/* 5. OPERATIONAL TIMELINE & ACADEMICS */}
        <ExperienceTimeline />

        {/* 6. OPERATIONS MATRIX (FAQ) */}
        <FAQMatrix />

        {/* FOOTER */}
        <footer className="mt-20 pt-8 border-t border-[#003b00] text-center text-xs text-gray-400 space-y-2">
          <p className="tracking-widest">
            DATA_STREAM_TERMINATED. // &copy; {new Date().getFullYear()} {OPERATOR_PROFILE.fullName.toUpperCase()}.
          </p>
          <p className="text-[11px] text-gray-400">
            Engineered with React 19, Tailwind CSS, Motion & Low-Level Cyber Architecture.
          </p>
        </footer>
      </main>

      {/* Floating Action Button for Instant Comms (WhatsApp) */}
      <a
        href={OPERATOR_PROFILE.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        title="Establish Secure WhatsApp Comms"
        onClick={() => soundFX.playKeyClick()}
        className="fixed bottom-10 left-5 z-40 w-12 h-12 rounded-full bg-black/90 border border-[#00ff41] text-[#00ff41] hover:bg-[#00ff41] hover:text-black flex items-center justify-center text-xl shadow-[0_0_20px_rgba(0,255,65,0.4)] transition-all hover:scale-110 cursor-pointer"
      >
        <Phone className="w-5 h-5" />
      </a>

      {/* Live Bottom Cyber Threat Feed Ticker */}
      <CyberTicker />

      {/* Modals */}
      <CVModal isOpen={isCVModalOpen} onClose={() => setIsCVModalOpen(false)} />
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}
