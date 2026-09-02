import React, { useState } from 'react';
import { OPERATOR_PROFILE } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { ThemeVariant } from '../types';
import { Shield, Volume2, VolumeX, Monitor, FileText, Mail, Menu, X, Terminal } from 'lucide-react';

interface HUDNavigationProps {
  theme: ThemeVariant;
  onThemeChange: (t: ThemeVariant) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  crtEnabled: boolean;
  onToggleCRT: () => void;
  onOpenCV: () => void;
  onOpenContact: () => void;
}

export const HUDNavigation: React.FC<HUDNavigationProps> = ({
  theme,
  onThemeChange,
  soundEnabled,
  onToggleSound,
  crtEnabled,
  onToggleCRT,
  onOpenCV,
  onOpenContact,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'DOSSIER', href: '#dossier' },
    { label: 'TELEMETRY', href: '#telemetry' },
    { label: 'INTEL & TOOLS', href: '#github-repos' },
    { label: 'SECURITY LAB', href: '#lab' },
    { label: 'OPERATIONS FAQ', href: '#faq' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#010803]/85 backdrop-blur-md border-b border-[#00ff41]/30 font-mono text-xs select-none">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left: Brand Call Sign */}
        <a
          href="#"
          onClick={() => soundFX.playKeyClick()}
          className="flex items-center gap-2.5 group cursor-pointer"
        >
          <div className="w-8 h-8 rounded bg-black border border-[#00ff41] flex items-center justify-center text-[#00ff41] shadow-[0_0_10px_rgba(0,255,65,0.3)] group-hover:bg-[#00ff41] group-hover:text-black transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <div>
            <div className="font-['Orbitron'] font-bold text-white tracking-wider flex items-center gap-1.5 text-xs sm:text-sm">
            </div>
            <div className="text-[10px] text-gray-400 -mt-0.5 tracking-widest hidden sm:block">
              SOC_OPERATOR // ROOT
            </div>
          </div>
        </a>

        {/* Center: Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => soundFX.playKeyClick()}
              className="text-gray-300 hover:text-[#00ff41] transition-colors tracking-widest text-[11px] relative py-1 group"
            >
              <span>{link.label}</span>
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#00ff41] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right: HUD Controls (Theme, Sound, CRT, CV, Comms) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Theme Switcher */}
          <div className="flex items-center gap-1 bg-black/60 border border-[#003b00] p-1 rounded">
            {(['matrix', 'cyan', 'crimson', 'amber'] as const).map((t) => {
              const colorMap = {
                matrix: 'bg-[#00ff41]',
                cyan: 'bg-[#00e5ff]',
                crimson: 'bg-[#ff003c]',
                amber: 'bg-[#ffb800]',
              };
              return (
                <button
                  key={t}
                  onClick={() => {
                    soundFX.playKeyClick();
                    onThemeChange(t);
                  }}
                  title={`Switch theme: ${t}`}
                  className={`w-3.5 h-3.5 rounded-full ${colorMap[t]} transition-all ${
                    theme === t ? 'ring-2 ring-white scale-110' : 'opacity-40 hover:opacity-100'
                  }`}
                />
              );
            })}
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              soundFX.playKeyClick();
            }}
            title={soundEnabled ? 'Disable UI Sound FX' : 'Enable UI Sound FX'}
            className={`p-1.5 rounded border transition-colors ${
              soundEnabled
                ? 'bg-[#00ff41]/15 border-[#00ff41] text-[#00ff41]'
                : 'bg-black/50 border-[#003b00] text-gray-500 hover:text-gray-300'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>

          {/* CRT Overlay Toggle */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onToggleCRT();
            }}
            title={crtEnabled ? 'Disable CRT Scanlines' : 'Enable CRT Scanlines'}
            className={`p-1.5 rounded border transition-colors ${
              crtEnabled
                ? 'bg-[#00ff41]/15 border-[#00ff41] text-[#00ff41]'
                : 'bg-black/50 border-[#003b00] text-gray-500 hover:text-gray-300'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          {/* Extract CV Button */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onOpenCV();
            }}
            className="px-2.5 py-1 rounded bg-black/80 hover:bg-[#00ff41]/10 text-gray-300 hover:text-[#00ff41] border border-[#00ff41]/30 transition-colors flex items-center gap-1.5 text-xs"
          >
            <FileText className="w-3.5 h-3.5 text-[#00ff41]" />
            <span>CV</span>
          </button>

          {/* Transmit Payload CTA */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onOpenContact();
            }}
            className="px-3 py-1 rounded bg-[#00ff41] text-black font-bold hover:bg-[#a3ffb8] transition-colors shadow-[0_0_12px_rgba(0,255,65,0.3)] flex items-center gap-1.5 text-xs"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>SECURE_COMMS</span>
          </button>
        </div>

        {/* Mobile Menu Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onOpenContact();
            }}
            className="px-2 py-1 rounded bg-[#00ff41] text-black font-bold text-[11px]"
          >
            COMMS
          </button>

          <button
            onClick={() => {
              soundFX.playKeyClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-1.5 rounded bg-black border border-[#00ff41]/40 text-[#00ff41]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#010803] border-b border-[#00ff41]/40 p-4 flex flex-col gap-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => {
                soundFX.playKeyClick();
                setMobileMenuOpen(false);
              }}
              className="text-gray-200 hover:text-[#00ff41] py-1 border-b border-[#003b00]/60"
            >
              [+] {link.label}
            </a>
          ))}

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                onOpenCV();
                setMobileMenuOpen(false);
              }}
              className="py-1.5 px-3 rounded bg-black/80 border border-[#00ff41]/40 text-[#00ff41] flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Extract CV</span>
            </button>

            <button
              onClick={() => {
                onToggleSound();
                soundFX.playKeyClick();
              }}
              className="py-1.5 px-3 rounded bg-black/80 border border-[#00ff41]/40 text-gray-300 flex items-center gap-1.5"
            >
              {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-[#00ff41]" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>Sound {soundEnabled ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
