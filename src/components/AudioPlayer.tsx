import React, { useState, useEffect, useRef } from 'react';
import { PLAYLIST } from '../data/portfolioData';
import { soundFX } from '../utils/soundEffects';
import { Volume2, VolumeX, SkipBack, SkipForward, Play, Pause, Radio, Music, RadioTower } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const AudioPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const currentTrack = PLAYLIST[currentTrackIndex];

  useEffect(() => {
    const audio = new Audio(currentTrack.url);
    audio.volume = isMuted ? 0 : volume;
    audioRef.current = audio;

    const handleEnded = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % PLAYLIST.length);
    };

    const handleError = () => {
      setHasError(true);
      setIsPlaying(false);
    };

    const handleCanPlay = () => {
      setHasError(false);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    return () => {
      audio.pause();
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
    };
  }, [currentTrack.url]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    soundFX.playKeyClick();
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          setHasError(false);
        })
        .catch((err) => {
          console.log('Audio playback prevented or failed:', err);
          setHasError(true);
          setIsPlaying(false);
        });
    }
  };

  const handleNext = () => {
    soundFX.playKeyClick();
    const nextIdx = (currentTrackIndex + 1) % PLAYLIST.length;
    setCurrentTrackIndex(nextIdx);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }, 100);
  };

  const handlePrev = () => {
    soundFX.playKeyClick();
    const prevIdx = (currentTrackIndex - 1 + PLAYLIST.length) % PLAYLIST.length;
    setCurrentTrackIndex(prevIdx);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setTimeout(() => {
      if (audioRef.current && isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    }, 100);
  };

  return (
    <div className="fixed top-16 md:top-20 right-4 z-40">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#020b04]/90 border border-[#00ff41]/50 rounded-lg p-2.5 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,65,0.15)] flex flex-col gap-2 max-w-[290px] text-xs font-mono select-none"
      >
        {/* Controls Row */}
        <div className="flex items-center justify-between gap-1.5">
          <button
            onClick={handlePrev}
            title="Previous Track"
            className="p-1.5 rounded hover:bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 transition-colors"
          >
            <SkipBack className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={togglePlay}
            className={`flex-1 py-1 px-3 rounded flex items-center justify-center gap-2 font-bold transition-all ${
              isPlaying
                ? 'bg-[#00ff41] text-black shadow-[0_0_15px_#00ff41]'
                : 'bg-[#00ff41]/10 text-[#00ff41] hover:bg-[#00ff41]/20 border border-[#00ff41]/40'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>AUDIO: ON</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>AUDIO: OFF</span>
              </>
            )}
          </button>

          <button
            onClick={handleNext}
            title="Next Track"
            className="p-1.5 rounded hover:bg-[#00ff41]/20 text-[#00ff41] border border-[#00ff41]/30 transition-colors"
          >
            <SkipForward className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              soundFX.playKeyClick();
              setIsExpanded(!isExpanded);
            }}
            title="Toggle playlist expand"
            className={`p-1.5 rounded border transition-colors ${
              isExpanded ? 'bg-[#00ff41]/20 border-[#00ff41]' : 'border-[#00ff41]/30 hover:bg-[#00ff41]/10'
            } text-[#00ff41]`}
          >
            <RadioTower className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Visualizer & Track Info */}
        <div className="flex items-center justify-between gap-2 border-t border-[#00ff41]/20 pt-1.5 text-[11px]">
          <div className="flex items-center gap-1.5 truncate">
            {currentTrack.type === 'radio' ? (
              <Radio className="w-3 h-3 text-[#ff003c] shrink-0 animate-pulse" />
            ) : (
              <Music className="w-3 h-3 text-[#00ff41] shrink-0" />
            )}
            <span className="truncate text-gray-300">
              {isPlaying ? (
                <span className="text-[#00ff41] font-semibold">{currentTrack.name}</span>
              ) : (
                <span className="text-gray-500">SYS.AUDIO_STANDBY</span>
              )}
            </span>
          </div>

          {/* Simulated Equalizer Bars */}
          {isPlaying && (
            <div className="flex items-end gap-[2px] h-3 shrink-0">
              <span className="w-[2px] bg-[#00ff41] animate-[pulse_0.4s_infinite_alternate] h-full" />
              <span className="w-[2px] bg-[#00ff41] animate-[pulse_0.6s_infinite_alternate] h-2/3" />
              <span className="w-[2px] bg-[#00ff41] animate-[pulse_0.3s_infinite_alternate] h-5/6" />
              <span className="w-[2px] bg-[#00ff41] animate-[pulse_0.5s_infinite_alternate] h-1/2" />
            </div>
          )}
        </div>

        {/* Error Fallback Notice */}
        {hasError && (
          <div className="text-[10px] text-[#ff003c] flex items-center gap-1 bg-[#ff003c]/10 p-1 rounded border border-[#ff003c]/30">
            <span>[!] Stream buffering / click to retry</span>
          </div>
        )}

        {/* Expanded Playlist Drawer */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-[#00ff41]/30 pt-2 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-[10px] text-gray-400">
                <span>SECURE AUDIO FREQUENCIES</span>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[#00ff41] transition-colors"
                >
                  {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
                </button>
              </div>

              {/* Volume Slider */}
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={isMuted ? 0 : volume}
                onChange={(e) => {
                  setVolume(parseFloat(e.target.value));
                  setIsMuted(false);
                }}
                className="w-full accent-[#00ff41] h-1 bg-black/60 rounded cursor-pointer"
              />

              {/* Playlist items */}
              <div className="max-h-32 overflow-y-auto flex flex-col gap-1 pr-1 custom-scrollbar">
                {PLAYLIST.map((track, idx) => (
                  <button
                    key={track.id}
                    onClick={() => {
                      soundFX.playKeyClick();
                      setCurrentTrackIndex(idx);
                      setIsPlaying(true);
                    }}
                    className={`text-left p-1 rounded text-[10px] flex items-center justify-between transition-colors ${
                      idx === currentTrackIndex
                        ? 'bg-[#00ff41]/20 text-[#00ff41] font-bold border border-[#00ff41]/40'
                        : 'text-gray-400 hover:text-[#00ff41] hover:bg-white/5'
                    }`}
                  >
                    <span className="truncate">{track.name}</span>
                    <span className="text-[9px] uppercase opacity-60 ml-2">{track.type}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
