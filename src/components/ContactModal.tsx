import React, { useState } from 'react';
import { OPERATOR_PROFILE } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { X, Send, Mail, MessageSquare, Phone, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playExecute();
    setIsSending(true);
    setErrorMsg('');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('subject', subject || 'Security Inquiry / Job Dispatch');
      formData.append('message', message);
      formData.append('origin', 'SOC Dashboard Contact Modal');

      const res = await fetch(OPERATOR_PROFILE.formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        soundFX.playSuccess();
        setSentSuccess(true);
      } else {
        setErrorMsg('Failed to transmit over gateway. Please reach out directly on Telegram or Email.');
      }
    } catch {
      setErrorMsg('Network transport error. Direct email: ' + OPERATOR_PROFILE.email);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-[#020d04] border border-[#00ff41] rounded-xl max-w-lg w-full p-6 shadow-[0_0_40px_rgba(0,255,65,0.2)] font-mono text-gray-200 relative"
      >
        <button
          onClick={() => {
            soundFX.playKeyClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-black/70 border border-[#00ff41]/40 text-[#00ff41] hover:bg-[#00ff41] hover:text-black transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 text-white mb-2">
          <Mail className="w-5 h-5 text-[#00ff41]" />
          <h3 className="font-['Orbitron'] text-lg font-bold">
            TRANSMIT_SECURE_PAYLOAD
          </h3>
        </div>
        <p className="text-xs text-gray-400 mb-6">
          Encrypted TLS channel connected directly to Operator Jayasankha Madhusith.
        </p>

        {sentSuccess ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#00ff41] mx-auto animate-bounce" />
            <h4 className="font-['Orbitron'] text-lg font-bold text-white">
              DISPATCH TRANSMITTED
            </h4>
            <p className="text-xs text-gray-300">
              Payload received by Operator at {OPERATOR_PROFILE.email}. Expect prompt response.
            </p>
            <button
              onClick={() => {
                soundFX.playKeyClick();
                setSentSuccess(false);
                onClose();
              }}
              className="mt-4 bg-[#00ff41] text-black font-bold px-5 py-2 rounded text-xs hover:bg-[#a3ffb8] transition-colors"
            >
              CLOSE TERMINAL
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {errorMsg && (
              <div className="p-2.5 rounded bg-[#ff003c]/10 border border-[#ff003c]/40 text-[#ff003c] flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div>
              <label className="block text-gray-400 mb-1">YOUR EMAIL ADDRESS / COMMS ID *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="client@enterprise-soc.com"
                className="w-full bg-black/70 border border-[#003b00] focus:border-[#00ff41] px-3 py-2 rounded text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">INQUIRY VECTOR / SUBJECT</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Custom Tool Development / Security Contract"
                className="w-full bg-black/70 border border-[#003b00] focus:border-[#00ff41] px-3 py-2 rounded text-white outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1">ENCRYPTED MESSAGE CONTENT *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Detail your requirements, project scope, or contract proposal..."
                className="w-full bg-black/70 border border-[#003b00] focus:border-[#00ff41] px-3 py-2 rounded text-white outline-none custom-scrollbar"
              />
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 rounded bg-[#00ff41] text-black font-bold flex items-center justify-center gap-2 hover:bg-[#a3ffb8] transition-all disabled:opacity-50 shadow-[0_0_15px_rgba(0,255,65,0.3)]"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSending ? 'ENCRYPTING & TRANSMITTING...' : 'DISPATCH TO OPERATOR'}</span>
            </button>

            {/* Direct Quick Channels */}
            <div className="pt-4 border-t border-[#003b00] flex items-center justify-around text-[11px] text-gray-400">
              <a
                href={OPERATOR_PROFILE.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#00ff41] transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>Telegram</span>
              </a>
              <a
                href={OPERATOR_PROFILE.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 hover:text-[#00ff41] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${OPERATOR_PROFILE.email}`}
                className="flex items-center gap-1.5 hover:text-[#00ff41] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#00ff41]" />
                <span>Email</span>
              </a>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
};
