import React, { useState, useRef, useEffect } from 'react';
import { OPERATOR_PROFILE, FEATURED_PROJECTS, SKILL_ITEMS } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { generateCVPdf } from '../utils/generateCV';
import { Terminal as TerminalIcon, Send, ShieldCheck, CornerDownLeft, Sparkles } from 'lucide-react';

interface TerminalCLIProps {
  onOpenCV?: () => void;
  onOpenContact?: () => void;
  onTriggerScan?: () => void;
}

export const TerminalCLI: React.FC<TerminalCLIProps> = ({ onOpenCV, onTriggerScan }) => {
  const [history, setHistory] = useState<Array<{ text: string; isUser?: boolean; isError?: boolean; isSuccess?: boolean }>>([
    { text: "Type 'help' to inspect available system vectors or 'send' to transmit encrypted message..." }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyPointer, setHistoryPointer] = useState<number>(-1);
  const [terminalState, setTerminalState] = useState<'normal' | 'awaiting_email' | 'awaiting_message'>('normal');
  const [tempEmail, setTempEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = async (rawInput: string) => {
    const cmd = rawInput.trim();
    const lowerCmd = cmd.toLowerCase();
    soundFX.playExecute();

    if (!cmd && terminalState === 'normal') return;

    // Log command
    setHistory((prev) => [...prev, { text: `visitor@jayasankha:~$ ${cmd}`, isUser: true }]);
    if (cmd && terminalState === 'normal') {
      setCommandHistory((prev) => [cmd, ...prev]);
      setHistoryPointer(-1);
    }

    if (terminalState === 'normal') {
      switch (lowerCmd) {
        case 'help':
          setHistory((prev) => [
            ...prev,
            {
              text: `AVAILABLE SOC CLI COMMANDS:
 • about      : Display Operator identity & behavioral security bio
 • skills     : Audit offensive/defensive competencies & percentages
 • projects   : List flagship published extensions & security tools
 • scan       : Initiate real-time memory & network heuristics scan
 • telemetry  : View active SOC node statistics & DEFCON state
 • send       : Transmit an encrypted contact dispatch to Operator
 • cv         : Extract & view latest engineering curriculum vitae
 • contact    : List verified cryptographic comms channels
 • clear      : Flush CLI buffer
 • whoami     : Display active session security level
 • date       : Return active SOC UTC timestamp`
            }
          ]);
          break;

        case 'about':
          setHistory((prev) => [
            ...prev,
            {
              text: `[OPERATOR DOSSIER]
Name: ${OPERATOR_PROFILE.fullName}
Role: ${OPERATOR_PROFILE.headline}
Focus: ${OPERATOR_PROFILE.subheadline}
Academic: B.A. in Psychology & Criminology & International Relations
Location: ${OPERATOR_PROFILE.location}`
            }
          ]);
          break;

        case 'skills':
          const skillsList = SKILL_ITEMS.map((s) => ` [✓] ${s.name.padEnd(42, '.')} ${s.percentage}%`).join('\n');
          setHistory((prev) => [
            ...prev,
            {
              text: `OPERATIONAL SKILL INDEX:\n${skillsList}`
            }
          ]);
          break;

        case 'projects':
        case 'tools':
          const projList = FEATURED_PROJECTS.map((p) => ` [+] ${p.name.padEnd(25, ' ')} [${p.category.toUpperCase()}] - ${p.status}`).join('\n');
          setHistory((prev) => [
            ...prev,
            {
              text: `PUBLISHED REPOSITORIES & EXTENSIONS:\n${projList}\n\nTip: Scroll down to inspect interactive architecture breakdowns.`
            }
          ]);
          break;

        case 'scan':
        case 'audit':
          setHistory((prev) => [
            ...prev,
            {
              text: `[+] RUNNING MEMORY & THREAT RECON PROTOCOL...
[1/4] Scanning virtual process space (0x00400000 - 0x7FFFFFFF)... [OK]
[2/4] Verifying Chrome Manifest V3 sandbox integrity... [SECURE]
[3/4] Parsing on-chain transaction mempool... [NOMINAL]
[4/4] 0 Injected Hooks / 0 Anomalies detected. System state: CLEAN.`
            }
          ]);
          if (onTriggerScan) onTriggerScan();
          break;

        case 'telemetry':
          setHistory((prev) => [
            ...prev,
            {
              text: `[SYSTEM TELEMETRY]
• Chrome Web Store Extensions: 4 published
• Open-Source GitHub Repos: 37+ repositories
• Memory Forensics Rating: 85%
• Terminal Operability: 100% Nominal
• Active DEFCON State: DEFCON 4 (Guarded)`
            }
          ]);
          break;

        case 'contact':
          setHistory((prev) => [
            ...prev,
            {
              text: `ENCRYPTED COMMS DIRECTORY:
• Email     : ${OPERATOR_PROFILE.email}
• Telegram  : ${OPERATOR_PROFILE.telegram}
• LinkedIn  : ${OPERATOR_PROFILE.linkedin}
• GitHub    : ${OPERATOR_PROFILE.github}
• WhatsApp  : ${OPERATOR_PROFILE.whatsapp}`
            }
          ]);
          break;

        case 'cv':
        case 'cat cv':
        case 'cat cv.pdf':
        case 'download cv':
          try {
            generateCVPdf('D_B_Jayasankha_Madhusith_CV.pdf');
          } catch (e) {
            console.error(e);
          }
          setHistory((prev) => [
            ...prev,
            {
              text: `[✓] Generating and downloading 'D_B_Jayasankha_Madhusith_CV.pdf'...\n[+] Dossier modal opened.`,
              isSuccess: true
            }
          ]);
          if (onOpenCV) onOpenCV();
          break;

        case 'whoami':
          setHistory((prev) => [
            ...prev,
            {
              text: `operator@soc-node-alpha [Privilege Level: SEC_ADMIN / READ_WRITE]`
            }
          ]);
          break;

        case 'date':
          setHistory((prev) => [
            ...prev,
            {
              text: `UTC TIMESTAMP: ${new Date().toUTCString()}`
            }
          ]);
          break;

        case 'clear':
        case 'cls':
          setHistory([{ text: 'CLI output buffer reset.' }]);
          break;

        case 'send':
          setTerminalState('awaiting_email');
          setHistory((prev) => [
            ...prev,
            { text: '[+] DISPATCH SEQUENCE INITIALIZED.\n[?] Please enter your contact email address:' }
          ]);
          break;

        case 'sudo':
        case 'sudo su':
          setHistory((prev) => [
            ...prev,
            {
              text: `[!] Incident reported. Root access already delegated to Operator Jayasankha.`
            }
          ]);
          break;

        default:
          setHistory((prev) => [
            ...prev,
            {
              text: `[!] Command '${cmd}' not recognized in current shell. Type 'help' to inspect valid vectors.`,
              isError: true
            }
          ]);
          break;
      }
    } else if (terminalState === 'awaiting_email') {
      if (!cmd || !cmd.includes('@')) {
        setHistory((prev) => [
          ...prev,
          { text: '[!] Invalid email format. Please enter a valid email address:', isError: true }
        ]);
      } else {
        setTempEmail(cmd);
        setTerminalState('awaiting_message');
        setHistory((prev) => [
          ...prev,
          { text: `[✓] Contact email verified: ${cmd}\n[?] Enter your encrypted message / project requirements:` }
        ]);
      }
    } else if (terminalState === 'awaiting_message') {
      if (!cmd) {
        setHistory((prev) => [
          ...prev,
          { text: '[!] Message content cannot be empty. Enter your message:', isError: true }
        ]);
      } else {
        const userMsg = cmd;
        setTerminalState('normal');
        setIsSubmitting(true);
        setHistory((prev) => [
          ...prev,
          { text: '[+] Transmitting payload over encrypted TLS pipeline to Formspree gateway...' }
        ]);

        try {
          const formData = new FormData();
          formData.append('email', tempEmail);
          formData.append('message', userMsg);
          formData.append('source', 'Terminal CLI v10.5');

          const response = await fetch(OPERATOR_PROFILE.formspreeEndpoint, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
          });

          if (response.ok) {
            soundFX.playSuccess();
            setHistory((prev) => [
              ...prev,
              {
                text: `[✓] PAYLOAD TRANSMITTED SUCCESSFULLY! Operator Jayasankha has received your dispatch at ${OPERATOR_PROFILE.email}.`,
                isSuccess: true
              }
            ]);
          } else {
            setHistory((prev) => [
              ...prev,
              {
                text: `[!] Gateway returned error code. Please transmit directly via Telegram (${OPERATOR_PROFILE.telegram}) or Email (${OPERATOR_PROFILE.email}).`,
                isError: true
              }
            ]);
          }
        } catch {
          setHistory((prev) => [
            ...prev,
            {
              text: `[!] Network transport failed. Fallback comms available via Telegram: ${OPERATOR_PROFILE.telegram}`,
              isError: true
            }
          ]);
        } finally {
          setIsSubmitting(false);
          setTempEmail('');
        }
      }
    }

    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextPtr = Math.min(historyPointer + 1, commandHistory.length - 1);
        setHistoryPointer(nextPtr);
        setInputVal(commandHistory[nextPtr] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyPointer > 0) {
        const prevPtr = historyPointer - 1;
        setHistoryPointer(prevPtr);
        setInputVal(commandHistory[prevPtr] || '');
      } else if (historyPointer === 0) {
        setHistoryPointer(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      // Auto complete suggestions
      const candidates = ['help', 'about', 'skills', 'projects', 'scan', 'telemetry', 'send', 'cv', 'contact', 'clear'];
      const match = candidates.find((c) => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    } else {
      soundFX.playKeyClick();
    }
  };

  const quickCommands = ['help', 'about', 'skills', 'projects', 'scan', 'send', 'cv', 'clear'];

  return (
    <div className="w-full bg-[#010602]/95 border border-[#00ff41]/50 rounded-lg p-3 md:p-4 font-mono text-xs md:text-sm backdrop-blur-md shadow-[0_0_25px_rgba(0,255,65,0.12)] relative overflow-hidden flex flex-col my-4">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-[#00ff41]/30 pb-2 mb-3 select-none text-[11px] text-gray-400">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff003c]/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#00ff41]/80 inline-block" />
          </div>
          <span className="text-[#00ff41] font-bold flex items-center gap-1.5 ml-1">
            <TerminalIcon className="w-3.5 h-3.5" />
            SECURE_INTERACTIVE_CLI // v10.5
          </span>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-gray-400">
          <ShieldCheck className="w-3 h-3 text-[#00ff41]" />
          <span>PORT: 2222 [ENCRYPTED]</span>
        </div>
      </div>

      {/* Output Stream */}
      <div
        ref={containerRef}
        className="max-h-48 md:max-h-56 overflow-y-auto overflow-x-hidden flex flex-col gap-1.5 mb-3 pr-1 custom-scrollbar text-gray-200"
      >
        {history.map((item, idx) => (
          <div
            key={idx}
            className={`whitespace-pre-wrap leading-relaxed ${
              item.isUser
                ? 'text-[#00ff41] font-semibold'
                : item.isError
                ? 'text-[#ff003c]'
                : item.isSuccess
                ? 'text-[#00ff41] font-bold'
                : 'text-gray-300'
            }`}
          >
            {item.text}
          </div>
        ))}
      </div>

      {/* Input Line */}
      <div className="flex items-center gap-2 border-t border-[#00ff41]/20 pt-2 bg-black/40 px-2 py-1.5 rounded">
        <span className="text-[#00ff41] font-bold shrink-0 text-xs">
          {terminalState === 'normal'
            ? 'visitor@jayasankha:~$ '
            : terminalState === 'awaiting_email'
            ? '[EMAIL] > '
            : '[MESSAGE] > '}
        </span>

        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSubmitting}
          placeholder={
            terminalState === 'normal'
              ? "Type command (or 'help', 'send', 'scan')..."
              : terminalState === 'awaiting_email'
              ? 'Enter email address...'
              : 'Type your message...'
          }
          className="flex-1 bg-transparent border-none text-white focus:outline-none font-mono text-xs md:text-sm placeholder-gray-600"
          autoComplete="off"
          spellCheck="false"
        />

        <button
          onClick={() => handleCommand(inputVal)}
          disabled={isSubmitting}
          className="bg-[#00ff41]/10 hover:bg-[#00ff41] text-[#00ff41] hover:text-black border border-[#00ff41]/40 px-2.5 py-1 rounded text-xs transition-colors flex items-center gap-1 font-bold shrink-0"
        >
          {terminalState === 'normal' ? (
            <>
              <CornerDownLeft className="w-3 h-3" />
              <span className="hidden sm:inline">EXEC</span>
            </>
          ) : (
            <>
              <Send className="w-3 h-3" />
              <span>SEND</span>
            </>
          )}
        </button>
      </div>

      {/* Quick Access Command Chips */}
      <div className="flex items-center gap-1.5 mt-2.5 flex-wrap text-[10px] text-gray-400 select-none">
        <span className="flex items-center gap-1 text-gray-500">
          <Sparkles className="w-2.5 h-2.5 text-[#00ff41]" /> Quick:
        </span>
        {quickCommands.map((cmd) => (
          <button
            key={cmd}
            onClick={() => {
              setInputVal(cmd);
              handleCommand(cmd);
            }}
            className="px-2 py-0.5 rounded bg-black/60 border border-[#00ff41]/30 text-[#00ff41]/80 hover:text-[#00ff41] hover:border-[#00ff41] hover:bg-[#00ff41]/10 transition-all cursor-pointer"
          >
            {cmd}
          </button>
        ))}
      </div>
    </div>
  );
};
