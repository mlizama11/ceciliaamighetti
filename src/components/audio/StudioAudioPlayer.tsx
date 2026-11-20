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

  const { language } = useLanguage();

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
    <div className="fixed right-3 bottom-3 z-40 select-none sm:right-5 sm:bottom-5">
      <AnimatePresence mode="wait">
        {playerExpanded ? (
          /* Expanded Studio Player Card */
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[320px] space-y-3 rounded-2xl border border-[#2C221E]/15 bg-[#FAF7F0]/95 p-4 shadow-2xl backdrop-blur-xl sm:w-90 sm:p-5 dark:border-white/15 dark:bg-[#221B18]/95"
          >
            {/* Header: Title, Archival Badge, Minimize button */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Rotating Vinyl/Palette Disc */}
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#E09F3E]/40 bg-[#2C221E] text-[#E09F3E] shadow-sm dark:bg-[#1A1614] ${
                    isPlaying ? 'animate-spin' : ''
                  }`}
                  style={{ animationDuration: '6s' }}
                >
                  <Disc3 className="h-5 w-5 text-[#E09F3E]" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C86D51]" />
                    <span className="font-mono text-[10px] font-bold tracking-widest text-[#C86D51] uppercase dark:text-[#EDB45D]">
                      {language === 'en' ? 'Archival Audio' : 'Archivo Sonoro'}
                    </span>
                  </div>
                  <h4 className="font-editorial text-lg leading-tight font-semibold text-[#2C221E] dark:text-[#F5EFEB]">
                    Cecilia Amighetti
                  </h4>
                  <p className="font-serif text-xs text-[#6B5E57] italic dark:text-[#A89B93]">
                    El Colibrí & Rosa de Abril
                  </p>
                </div>
              </div>

              {/* Minimize */}
              <button
                onClick={() => setPlayerExpanded(false)}
                className="cursor-pointer rounded-full p-1.5 text-[#6B5E57] transition-colors hover:bg-[#EFE9DC] hover:text-[#2C221E] dark:hover:bg-[#1A1614] dark:hover:text-[#F5EFEB]"
                aria-label="Minimizar reproductor"
              >
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>

            {/* Scrub / Progress Bar */}
            <div className="space-y-1">
              <input
                type="range"
                min="0"
                max="100"
                value={progressPercent || 0}
                onChange={handleSeekChange}
                className="h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-[#EFE9DC] accent-[#C86D51] dark:bg-[#1A1614]"
              />
              <div className="flex justify-between font-mono text-[10px] text-[#6B5E57] dark:text-[#A89B93]">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between pt-1">
              {/* Animated Equalizer Wave Bars */}
              <div className="flex h-5 items-end gap-1 px-1">
                {[45, 90, 60, 100, 70].map((h, i) => (
                  <span
                    key={i}
                    className="w-1 rounded-full bg-[#C86D51] transition-all duration-300"
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
                className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-[#C86D51] text-white shadow-md transition-all hover:scale-105 hover:bg-[#B3593F]"
                aria-label={isPlaying ? 'Pausar audio' : 'Reproducir audio'}
              >
                {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="ml-0.5 h-5 w-5" />}
              </button>

              {/* Mute Button */}
              <button
                onClick={toggleMute}
                className="cursor-pointer rounded-full p-2 text-[#6B5E57] transition-colors hover:text-[#C86D51]"
                aria-label={isMuted ? 'Activar sonido' : 'Silenciar sonido'}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4 text-red-500" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
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
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => setPlayerExpanded(true)}
            className={`relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[#2C221E]/15 shadow-lg backdrop-blur-md transition-colors dark:border-white/15 ${
              isPlaying
                ? 'bg-[#C86D51] text-white'
                : 'bg-[#FAF7F0] text-[#2C221E] dark:bg-[#221B18] dark:text-[#F5EFEB]'
            }`}
            aria-label={
              language === 'en' ? 'Open the music player' : 'Abrir el reproductor de música'
            }
            title={language === 'en' ? 'Open music player' : 'Abrir reproductor de música'}
            aria-expanded={playerExpanded}
          >
            {isPlaying ? (
              <div className="flex h-4 items-end gap-0.5" aria-hidden="true">
                {[40, 95, 60, 85].map((h, i) => (
                  <span
                    key={i}
                    className="w-0.5 animate-pulse rounded-full bg-white"
                    style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            ) : (
              <Music className="h-5 w-5 text-[#C86D51]" aria-hidden="true" />
            )}
            <ChevronUp className="absolute right-0 bottom-0 h-3.5 w-3.5 rounded-full bg-[#FAF7F0] p-0.5 text-[#6B5E57] shadow-sm dark:bg-[#221B18] dark:text-[#A89B93]" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
