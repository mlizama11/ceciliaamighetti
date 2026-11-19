import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  ChevronUp,
  ChevronDown,
  Sparkles,
  Disc3
} from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import { useLanguage } from '../../context/LanguageContext';

export const StudioAudioPlayer: React.FC = () => {
  const {
    isPlaying,
    togglePlay,
    currentTime,
    duration,
    seek,
    isMuted,
    toggleMute,
    playerExpanded,
    setPlayerExpanded
  } = useAudio();

  const { language, t } = useLanguage();

  const formatTime = (secs: number) => {
    if (isNaN(secs) || secs < 0) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = (parseFloat(e.target.value) / 100) * duration;
    seek(nextTime);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 select-none">
      <AnimatePresence mode="wait">
        {playerExpanded ? (
          /* Expanded Studio Player Card */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[320px] sm:w-90 p-4 sm:p-5 rounded-2xl bg-[#FAF7F0]/95 dark:bg-[#221B18]/95 backdrop-blur-xl border border-[#2C221E]/15 dark:border-white/15 shadow-2xl space-y-3"
          >
            {/* Header: Title, Archival Badge, Minimize button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Rotating Vinyl/Palette Disc */}
                <div
                  className={`w-10 h-10 rounded-full bg-[#2C221E] dark:bg-[#1A1614] border border-[#E09F3E]/40 flex items-center justify-center text-[#E09F3E] shrink-0 shadow-sm ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                >
                  <Disc3 className="w-5 h-5 text-[#E09F3E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-mono text-[#C86D51] dark:text-[#EDB45D] font-bold">
                      {language === 'en' ? 'Archival Audio' : 'Archivo Sonoro'}
                    </span>
                  </div>
                  <h4 className="font-editorial text-lg text-[#2C221E] dark:text-[#F5EFEB] leading-tight font-semibold">
                    Cecilia Amighetti
                  </h4>
                  <p className="font-serif italic text-xs text-[#6B5E57] dark:text-[#A89B93]">
                    El Colibrí & Rosa de Abril
                  </p>
                </div>
              </div>

              {/* Minimize */}
              <button
                onClick={() => setPlayerExpanded(false)}
                className="p-1.5 rounded-full text-[#6B5E57] hover:text-[#2C221E] dark:hover:text-[#F5EFEB] hover:bg-[#EFE9DC] dark:hover:bg-[#1A1614] transition-colors cursor-pointer"
                aria-label="Minimizar reproductor"
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* Archival Photo of Cecilia singing with guitar */}
            <div className="flex items-center gap-3 p-2 rounded-xl bg-[#EFE9DC]/60 dark:bg-[#1A1614]/60 border border-[#2C221E]/8 dark:border-white/5">
              <img
                src="/photos/cecilia05.jpg"
                alt="Cecilia Amighetti con guitarra"
                className="w-14 h-14 rounded-lg object-cover shrink-0 border border-[#2C221E]/10 dark:border-white/10"
              />
              <div className="text-[11px] text-[#6B5E57] dark:text-[#A89B93] leading-snug font-sans-human">
                <span className="font-semibold text-[#2C221E] dark:text-[#F5EFEB] block">
                  {language === 'en' ? 'Original Archival Recording' : 'Grabación Original de Archivo'}
                </span>
                {language === 'en'
                  ? 'Cecilia singing with acoustic guitar at a gathering.'
                  : 'Cecilia cantando con su guitarra acústica en una tertulia íntima.'}
              </div>
            </div>

            {/* Scrub / Progress Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercent || 0}
                onChange={handleSeekChange}
                className="w-full h-1.5 bg-[#EFE9DC] dark:bg-[#1A1614] rounded-lg appearance-none cursor-pointer accent-[#C86D51]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#6B5E57] dark:text-[#A89B93]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between pt-1">
              {/* Animated Equalizer Wave Bars */}
              <div className="flex items-end gap-1 h-5 px-1">
                {[45, 90, 60, 100, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 bg-[#C86D51] rounded-full transition-all duration-300"
                    style={{
                      height: isPlaying ? `${h}%` : '20%',
                      animation: isPlaying
                        ? `pulse 0.8s ease-in-out infinite alternate ${i * 0.15}s`
                        : 'none'
                    }}
                  />
                ))}
              </div>

              {/* Main Play / Pause Circle */}
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-[#C86D51] hover:bg-[#B3593F] text-white flex items-center justify-center shadow-md hover:scale-105 transition-all cursor-pointer"
                aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="p-2 rounded-full text-[#6B5E57] hover:text-[#C86D51] transition-colors cursor-pointer"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-red-500" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Minimized Floating Audio Pill */
          <motion.button
            key="minimized"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.04 }}
            onClick={() => setPlayerExpanded(true)}
            className={`flex items-center gap-2.5 px-3.5 py-2 rounded-full shadow-xl border border-[#2C221E]/15 dark:border-white/15 cursor-pointer backdrop-blur-md transition-colors ${
              isPlaying
                ? 'bg-[#C86D51] text-white'
                : 'bg-[#FAF7F0] dark:bg-[#221B18] text-[#2C221E] dark:text-[#F5EFEB]'
            }`}
          >
            {/* Equalizer or Music icon */}
            {isPlaying ? (
              <div className="flex items-end gap-0.5 h-3.5">
                {[40, 95, 60, 85].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 bg-white rounded-full animate-pulse"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            ) : (
              <Music className="w-4 h-4 text-[#C86D51]" />
            )}

            <div className="text-left">
              <span className="text-[11px] font-sans-human font-semibold block leading-tight">
                {language === 'en' ? 'Cecilia Singing' : 'Canto de Cecilia'}
              </span>
              <span
                className={`text-[9px] uppercase tracking-wider font-mono block ${
                  isPlaying ? 'text-white/80' : 'text-[#6B5E57] dark:text-[#A89B93]'
                }`}
              >
                {isPlaying ? formatTime(currentTime) : t.audio.offPrompt}
              </span>
            </div>

            <ChevronUp className="w-3.5 h-3.5 opacity-70 ml-0.5" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
