import React, { useState } from 'react';
import { OPERATOR_PROFILE } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { CV_DETAILS, generateCVPdf, CVTemplateType } from '../utils/generateCV';
import {
  X,
  Download,
  Printer,
  Shield,
  GraduationCap,
  Briefcase,
  Code,
  Award,
  Users,
  CheckCircle2,
  FileDown,
  Sparkles,
  ExternalLink,
  FileText,
  Terminal,
  Copy,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  const [template, setTemplate] = useState<CVTemplateType>('ats-executive');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPdf = (selectedTemplate: CVTemplateType = template) => {
    soundFX.playSuccess();
    setIsGenerating(true);
    setTimeout(() => {
      try {
        const filename =
          selectedTemplate === 'ats-executive'
            ? 'D_B_Jayasankha_Madhusith_CV_ATS.pdf'
            : 'D_B_Jayasankha_Madhusith_Cyber_Dossier.pdf';
        generateCVPdf(filename, selectedTemplate);
      } catch (err) {
        console.error('PDF Generation failed:', err);
      } finally {
        setIsGenerating(false);
      }
    }, 200);
  };

  const handlePrint = () => {
    soundFX.playKeyClick();
    window.print();
  };

  const handleCopyPlainText = () => {
    soundFX.playKeyClick();
    const plainText = `${CV_DETAILS.fullName}
${CV_DETAILS.headline}
Email: ${CV_DETAILS.email} | Phone: ${CV_DETAILS.phone} | Location: ${CV_DETAILS.location}
GitHub: ${CV_DETAILS.github} | LinkedIn: ${CV_DETAILS.linkedin}

PROFESSIONAL SUMMARY
${CV_DETAILS.summary}

TECHNICAL SKILLS & EXPERTISE
• Languages & Core: ${CV_DETAILS.technicalSkills.languages}
• Cybersecurity & Malware: ${CV_DETAILS.technicalSkills.cyberMalware}
• Security Tools: ${CV_DETAILS.technicalSkills.toolsDev}

FEATURED PROJECTS
${CV_DETAILS.featuredProjects.map((p) => `• ${p.name} [${p.tag}]\n  ${p.desc}`).join('\n')}

EDUCATION
${CV_DETAILS.education.map((e) => `• ${e.degree} (${e.year})\n  ${e.institution} - ${e.details}`).join('\n')}

WORK EXPERIENCE
${CV_DETAILS.workExperience.map((w) => `• ${w.role} - ${w.company} (${w.period})\n  ${w.responsibilities.map((r) => `- ${r}`).join('\n  ')}`).join('\n')}

REFEREES
${CV_DETAILS.referees.map((r) => `• ${r.name} - ${r.title}\n  Email: ${r.email} | Phone: ${r.phone}`).join('\n')}
`;

    navigator.clipboard.writeText(plainText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isATS = template === 'ats-executive';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 15 }}
        className="bg-[#020d04] border border-[#00ff41]/50 rounded-xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-[0_0_60px_rgba(0,255,65,0.25)] relative my-auto overflow-hidden"
      >
        {/* Top Control Bar */}
        <div className="bg-[#041208]/95 border-b border-[#00ff41]/30 p-3 sm:p-4 flex flex-wrap items-center justify-between gap-2 z-20 backdrop-blur-md">
          {/* Template Selectors */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={() => {
                soundFX.playKeyClick();
                setTemplate('ats-executive');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                isATS
                  ? 'bg-white text-slate-900 shadow-md font-bold'
                  : 'bg-black/50 text-gray-400 hover:text-white border border-gray-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>ATS Executive Clean</span>
              <span className="hidden md:inline text-[10px] bg-emerald-100 text-emerald-800 px-1 rounded font-mono">
                ATS Pass
              </span>
            </button>

            <button
              onClick={() => {
                soundFX.playKeyClick();
                setTemplate('cyber-dark');
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                !isATS
                  ? 'bg-[#00ff41] text-black shadow-[0_0_15px_rgba(0,255,65,0.4)] font-bold'
                  : 'bg-black/50 text-gray-400 hover:text-[#00ff41] border border-gray-800'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Cyber Dossier</span>
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <button
              onClick={handleCopyPlainText}
              className="p-1.5 px-2.5 rounded-lg bg-black/60 border border-gray-700 hover:border-[#00ff41] text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Copy plain text for job applications"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#00ff41]" />
                  <span className="text-[#00ff41] font-bold">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Copy Text</span>
                </>
              )}
            </button>

            <button
              onClick={handlePrint}
              className="p-1.5 px-2.5 rounded-lg bg-black/60 border border-gray-700 hover:border-[#00ff41] text-gray-300 hover:text-white text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Print standard A4 format"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={() => handleDownloadPdf(template)}
              disabled={isGenerating}
              className="p-1.5 px-3 rounded-lg bg-[#00ff41] text-black font-bold text-xs flex items-center gap-1.5 hover:bg-[#96ffaf] transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)] cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={() => {
                soundFX.playKeyClick();
                onClose();
              }}
              className="p-1.5 rounded-full bg-black/70 border border-gray-700 text-gray-400 hover:bg-[#00ff41] hover:text-black transition-colors ml-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable CV Document View */}
        <div className="p-3 sm:p-6 overflow-y-auto custom-scrollbar flex-1 bg-black/40">
          <AnimatePresence mode="wait">
            {isATS ? (
              /* ==================== ATS EXECUTIVE CLEAN TEMPLATE ==================== */
              <motion.div
                key="ats-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="cv-print-container bg-white text-slate-900 rounded-lg p-6 sm:p-10 shadow-2xl max-w-3xl mx-auto font-sans leading-relaxed border border-slate-200 text-sm"
              >
                {/* Header */}
                <div className="border-b-2 border-slate-200 pb-5">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                      {CV_DETAILS.fullName.toUpperCase()}
                    </h1>
                    <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Official Executive Resume
                    </span>
                  </div>

                  <p className="text-sm sm:text-[15px] font-bold text-emerald-700 mt-1 tracking-wide">
                    {CV_DETAILS.headline}
                  </p>

                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs sm:text-sm text-slate-600 mt-3 pt-2 border-t border-slate-100">
                    <span className="font-medium">📧 {CV_DETAILS.email}</span>
                    <span>•</span>
                    <span className="font-medium">📱 {CV_DETAILS.phone}</span>
                    <span>•</span>
                    <span>📍 {CV_DETAILS.location}</span>
                    <span>•</span>
                    <a
                      href={CV_DETAILS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      GitHub
                    </a>
                    <span>•</span>
                    <a
                      href={CV_DETAILS.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline font-semibold"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>

                {/* 1. PROFESSIONAL SUMMARY */}
                <section className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2">
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Professional Summary
                    </h2>
                    <span className="w-14 h-0.5 bg-emerald-600 rounded"></span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    {CV_DETAILS.summary}
                  </p>
                </section>

                {/* 2. TECHNICAL SKILLS & CORE COMPETENCIES */}
                <section className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2.5">
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Technical Skills & Core Competencies
                    </h2>
                    <span className="w-14 h-0.5 bg-emerald-600 rounded"></span>
                  </div>
                  <div className="space-y-2 text-xs sm:text-[13px]">
                    <div>
                      <span className="font-bold text-slate-900">
                        • Languages & Core Systems:
                      </span>{' '}
                      <span className="text-slate-700">
                        {CV_DETAILS.technicalSkills.languages}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">
                        • Cybersecurity & Malware Dev:
                      </span>{' '}
                      <span className="text-slate-700">
                        {CV_DETAILS.technicalSkills.cyberMalware}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-900">
                        • Security Tools & Platforms:
                      </span>{' '}
                      <span className="text-slate-700">
                        {CV_DETAILS.technicalSkills.toolsDev}
                      </span>
                    </div>
                  </div>
                </section>

                {/* 3. FEATURED PROJECTS & EXTENSIONS */}
                <section className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2.5">
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Featured Security Projects & Extensions
                    </h2>
                    <span className="w-14 h-0.5 bg-emerald-600 rounded"></span>
                  </div>
                  <div className="space-y-3">
                    {CV_DETAILS.featuredProjects.map((p) => (
                      <div key={p.name} className="text-xs sm:text-[13px]">
                        <div className="flex items-baseline justify-between">
                          <span className="font-bold text-slate-900 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block"></span>
                            <span>{p.name}</span>
                          </span>
                          <span className="text-[11px] sm:text-xs font-semibold text-emerald-800 italic">
                            [{p.tag}]
                          </span>
                        </div>
                        <p className="text-slate-600 mt-0.5 leading-relaxed pl-3">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 bg-slate-50 p-2.5 rounded border border-slate-200 flex items-center justify-between">
                    <span>Explore complete source code & live releases on GitHub.</span>
                    <a
                      href={CV_DETAILS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 font-bold hover:underline"
                    >
                      View GitHub &rarr;
                    </a>
                  </div>
                </section>

                {/* 4. EDUCATION & ACADEMIC CREDENTIALS */}
                <section className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2.5">
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Education & Academic Credentials
                    </h2>
                    <span className="w-14 h-0.5 bg-emerald-600 rounded"></span>
                  </div>
                  <div className="space-y-3">
                    {CV_DETAILS.education.map((edu, idx) => (
                      <div key={idx} className="text-xs sm:text-[13px]">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>• {edu.degree}</span>
                          <span className="text-emerald-700 font-mono text-xs">
                            {edu.year}
                          </span>
                        </div>
                        <div className="text-slate-600 text-xs pl-3 mt-0.5">
                          {edu.institution} — {edu.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. PROFESSIONAL EXPERIENCE */}
                <section className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2.5">
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Professional Work Experience
                    </h2>
                    <span className="w-14 h-0.5 bg-emerald-600 rounded"></span>
                  </div>
                  <div className="space-y-3">
                    {CV_DETAILS.workExperience.map((exp, idx) => (
                      <div key={idx} className="text-xs sm:text-[13px]">
                        <div className="flex items-center justify-between font-bold text-slate-900">
                          <span>
                            • {exp.role} —{' '}
                            <span className="font-semibold text-emerald-800 italic">
                              {exp.company}
                            </span>
                          </span>
                          <span className="text-slate-500 font-mono text-xs">
                            {exp.period}
                          </span>
                        </div>
                        <ul className="mt-1 space-y-0.5 text-slate-600 pl-3">
                          {exp.responsibilities.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <span className="text-emerald-600 font-bold">•</span>
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 6. NON-RELATED REFEREES */}
                <section className="mt-5">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1 mb-2.5">
                    <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-900">
                      Non-Related Referees
                    </h2>
                    <span className="w-14 h-0.5 bg-emerald-600 rounded"></span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {CV_DETAILS.referees.map((ref, idx) => (
                      <div
                        key={idx}
                        className="bg-slate-50 border border-slate-200 rounded p-3 text-xs sm:text-[13px]"
                      >
                        <div className="font-bold text-slate-900">{ref.name}</div>
                        <div className="text-emerald-700 font-medium text-xs mb-1.5">
                          {ref.title}
                        </div>
                        <div className="text-xs text-slate-600 space-y-0.5">
                          <div>
                            Email:{' '}
                            <a
                              href={`mailto:${ref.email}`}
                              className="text-slate-800 hover:underline"
                            >
                              {ref.email}
                            </a>
                          </div>
                          <div>
                            Phone:{' '}
                            <a
                              href={`tel:${ref.phone}`}
                              className="text-slate-800 font-mono"
                            >
                              {ref.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </motion.div>
            ) : (
              /* ==================== CYBER SPECIALIST DARK THEME ==================== */
              <motion.div
                key="cyber-view"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="font-mono text-gray-200 space-y-6 max-w-3xl mx-auto"
              >
                {/* Header Contact Block */}
                <div className="bg-[#031407] border border-[#00ff41]/40 rounded-xl p-5 shadow-[0_0_30px_rgba(0,255,65,0.1)]">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div>
                      <h1 className="font-['Orbitron'] text-xl sm:text-2xl font-black text-white tracking-tight">
                        {CV_DETAILS.fullName}
                      </h1>
                      <p className="text-xs sm:text-sm font-semibold text-[#00ff41] mt-1">
                        {CV_DETAILS.headline}
                      </p>
                    </div>

                    <button
                      onClick={() => handleDownloadPdf('cyber-dark')}
                      className="bg-[#00ff41]/10 border border-[#00ff41]/60 hover:bg-[#00ff41] hover:text-black text-[#00ff41] p-2 px-3 rounded-lg flex items-center justify-center gap-1.5 font-bold text-xs transition-all cursor-pointer self-start sm:self-auto"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download Cyber PDF</span>
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400 mt-3 pt-3 border-t border-[#003b00]">
                    <span className="text-gray-300">📧 {CV_DETAILS.email}</span>
                    <span>📱 {CV_DETAILS.phone}</span>
                    <span>📍 {CV_DETAILS.location}</span>
                    <a
                      href={CV_DETAILS.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#00ff41] hover:underline flex items-center gap-1"
                    >
                      GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>

                {/* 1. SUMMARY */}
                <div>
                  <h2 className="font-['Orbitron'] text-xs font-bold text-[#00ff41] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" /> PROFESSIONAL SUMMARY
                  </h2>
                  <div className="bg-black/60 border border-[#003b00] p-4 rounded-lg text-gray-300 leading-relaxed text-xs">
                    {CV_DETAILS.summary}
                  </div>
                </div>

                {/* 2. TECHNICAL SKILLS & EXPERTISE */}
                <div>
                  <h2 className="font-['Orbitron'] text-xs font-bold text-[#00ff41] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Code className="w-3.5 h-3.5" /> TECHNICAL SKILLS & EXPERTISE
                  </h2>
                  <div className="space-y-2 text-xs">
                    <div className="bg-black/50 border border-[#003b00] p-3 rounded-lg">
                      <div className="text-[#00ff41] font-bold mb-1">
                        • Languages & Core Systems:
                      </div>
                      <div className="text-gray-300 pl-3">
                        {CV_DETAILS.technicalSkills.languages}
                      </div>
                    </div>

                    <div className="bg-black/50 border border-[#003b00] p-3 rounded-lg">
                      <div className="text-[#00ff41] font-bold mb-1">
                        • Cybersecurity & Malware Dev:
                      </div>
                      <div className="text-gray-300 pl-3">
                        {CV_DETAILS.technicalSkills.cyberMalware}
                      </div>
                    </div>

                    <div className="bg-black/50 border border-[#003b00] p-3 rounded-lg">
                      <div className="text-[#00ff41] font-bold mb-1">
                        • Security Tools & Platforms:
                      </div>
                      <div className="text-gray-300 pl-3">
                        {CV_DETAILS.technicalSkills.toolsDev}
                      </div>
                    </div>
                  </div>
                </div>

                {/* 3. FEATURED PROJECTS */}
                <div>
                  <h2 className="font-['Orbitron'] text-xs font-bold text-[#00ff41] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> FEATURED PROJECTS & TOOLS
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {CV_DETAILS.featuredProjects.map((p) => (
                      <div
                        key={p.name}
                        className="bg-black/50 border border-[#003b00] p-3 rounded-lg"
                      >
                        <div className="flex items-center justify-between font-bold text-white text-xs mb-1">
                          <span className="text-[#00ff41]">{p.name}</span>
                          <span className="text-[10px] text-gray-400 bg-black/60 px-1.5 py-0.5 rounded border border-[#00ff41]/20">
                            {p.tag}
                          </span>
                        </div>
                        <p className="text-[11px] text-gray-300 leading-relaxed mt-1">
                          {p.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. EDUCATION */}
                <div>
                  <h2 className="font-['Orbitron'] text-xs font-bold text-[#00ff41] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5" /> EDUCATION QUALIFICATIONS
                  </h2>
                  <div className="space-y-2">
                    {CV_DETAILS.education.map((edu, idx) => (
                      <div
                        key={idx}
                        className="bg-black/50 border border-[#003b00] p-3 rounded-lg text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>{edu.degree}</span>
                          <span className="text-[#00ff41] font-mono">{edu.year}</span>
                        </div>
                        <div className="text-gray-400 text-[11px] mt-0.5">
                          {edu.institution} — {edu.details}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. WORK EXPERIENCE */}
                <div>
                  <h2 className="font-['Orbitron'] text-xs font-bold text-[#00ff41] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Briefcase className="w-3.5 h-3.5" /> WORK EXPERIENCE
                  </h2>
                  <div className="space-y-2">
                    {CV_DETAILS.workExperience.map((exp, idx) => (
                      <div
                        key={idx}
                        className="bg-black/50 border border-[#003b00] p-3.5 rounded-lg text-xs"
                      >
                        <div className="flex items-center justify-between font-bold text-white">
                          <span>
                            {exp.role}, {exp.company}
                          </span>
                          <span className="text-[#00ff41] font-mono">
                            ({exp.period})
                          </span>
                        </div>
                        <ul className="mt-2 space-y-1 text-[11px] text-gray-300">
                          {exp.responsibilities.map((r, rIdx) => (
                            <li key={rIdx} className="flex items-start gap-1.5">
                              <CheckCircle2 className="w-3 h-3 text-[#00ff41] shrink-0 mt-0.5" />
                              <span>{r}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. REFEREES */}
                <div>
                  <h2 className="font-['Orbitron'] text-xs font-bold text-[#00ff41] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" /> NON-RELATED REFEREES
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    {CV_DETAILS.referees.map((ref, idx) => (
                      <div
                        key={idx}
                        className="bg-black/60 border border-[#00ff41]/30 p-3.5 rounded-lg"
                      >
                        <div className="font-bold text-white">{ref.name}</div>
                        <div className="text-[#00ff41] text-[11px] mb-2">
                          {ref.title}
                        </div>
                        <div className="text-[11px] text-gray-300 space-y-0.5">
                          <div>Email: {ref.email}</div>
                          <div>Phone: {ref.phone}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer info bar */}
        <div className="bg-[#030d05] border-t border-[#003b00] px-4 py-2 text-[11px] text-gray-400 flex flex-wrap items-center justify-between gap-2">
          <span className="text-gray-400">
            Current Template:{' '}
            <strong className="text-white">
              {isATS ? 'ATS Executive (Corporate Light)' : 'Cyber Specialist (Dark)'}
            </strong>
          </span>
          <span className="text-emerald-400 font-mono">
            ATS Parsing Score: 98% (High Pass Rate)
          </span>
        </div>
      </motion.div>
    </div>
  );
};


