import React from 'react';
import { ProjectItem } from '../types';
import { soundFX } from '../utils/soundEffects';
import { X, ExternalLink, Github, Shield, Layers, Check, Copy } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copied, setCopied] = React.useState(false);

  if (!project) return null;

  const handleCopyClone = () => {
    soundFX.playKeyClick();
    const cloneCmd = `git clone ${project.githubUrl || 'https://github.com/Jayasankha-dev'}.git`;
    navigator.clipboard.writeText(cloneCmd).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#020d04] border border-[#00ff41] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar relative shadow-[0_0_40px_rgba(0,255,65,0.25)] text-gray-200 font-mono"
      >
        {/* Modal Header Image Banner */}
        <div className="relative h-44 sm:h-52 w-full overflow-hidden border-b border-[#003b00]">
          <img
            src={project.imageUrl}
            alt={project.name}
            className="w-full h-full object-cover filter grayscale sepia hue-rotate-[70deg] brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020d04] via-transparent to-black/60" />

          {/* Close button */}
          <button
            onClick={() => {
              soundFX.playKeyClick();
              onClose();
            }}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/70 border border-[#00ff41]/50 text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Badges */}
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-[#00ff41] text-black uppercase">
                {project.category}
              </span>
              <span className="px-2 py-0.5 rounded text-[11px] bg-black/80 border border-[#00ff41]/40 text-[#00ff41]">
                {project.status}
              </span>
            </div>
            {project.version && (
              <span className="text-xs text-gray-300 bg-black/60 px-2 py-0.5 rounded border border-gray-700">
                RELEASE: {project.version}
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 text-xs sm:text-sm">
          <div>
            <h3 className="font-['Orbitron'] text-xl sm:text-2xl font-black text-white mb-1">
              {project.name}
            </h3>
            <p className="text-[#00ff41] text-xs sm:text-sm font-mono">
              {project.title}
            </p>
          </div>

          <div className="space-y-3 leading-relaxed text-gray-300">
            <p>{project.description}</p>
            {project.fullDetails && (
              <div className="bg-[#001500]/70 border-l-2 border-l-[#00ff41] p-3 rounded-r text-xs text-gray-300">
                <div className="text-[#00ff41] font-bold mb-1 flex items-center gap-1.5">
                  <Shield className="w-3.5 h-3.5" /> TECHNICAL ARCHITECTURE DEPLOYMENT
                </div>
                <p>{project.fullDetails}</p>
              </div>
            )}
          </div>

          {/* Architecture Pillars if available */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="space-y-2">
              <div className="text-xs text-gray-400 font-bold uppercase flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#00ff41]" /> Core System Components:
              </div>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {project.architecture.map((item, idx) => (
                  <li key={idx} className="bg-black/60 border border-[#003b00] p-2 rounded flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff41]" />
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] px-2 py-0.5 rounded bg-black/80 border border-[#00ff41]/30 text-gray-300"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action Links & Git Clone */}
          <div className="pt-4 border-t border-[#003b00] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <button
              onClick={handleCopyClone}
              className="bg-black/80 hover:bg-[#00ff41]/10 border border-[#00ff41]/40 text-gray-300 px-3 py-2 rounded text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-[#00ff41]" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Command Copied!' : 'Copy Clone Command'}</span>
            </button>

            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none bg-[#00ff41]/10 hover:bg-[#00ff41] text-[#00ff41] hover:text-black border border-[#00ff41]/40 px-4 py-2 rounded font-bold transition-all flex items-center justify-center gap-2 text-xs"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository</span>
                </a>
              )}

              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none bg-[#00ff41] hover:bg-[#a3ffb8] text-black font-bold px-4 py-2 rounded transition-all flex items-center justify-center gap-2 text-xs shadow-[0_0_15px_rgba(0,255,65,0.3)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Store / Demo</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
