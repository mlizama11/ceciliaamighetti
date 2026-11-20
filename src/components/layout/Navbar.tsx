import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Sun, Moon, Globe, Music, Volume2, VolumeX } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useAudio } from '../../context/AudioContext';
import { SignatureLogo } from '../common/SignatureLogo';

export const Navbar: React.FC = () => {
  const { language, toggleLanguage, t, isDark, toggleTheme } = useLanguage();
  const { isPlaying, togglePlay } = useAudio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#obras', label: t.nav.collection },
    { href: '#biografia', label: t.nav.biography },
    { href: '#album', label: t.nav.photos || (language === 'en' ? 'Photo Album' : 'Álbum') },
    { href: '#cronologia', label: t.nav.timeline },
    { href: '#exposiciones', label: t.nav.exhibitions },
    { href: '#consultas', label: t.nav.inquiries }
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const topOffset = 84;
      const elementPosition = target.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'border-b border-[#2C221E]/8 bg-[#F7F3EB]/95 py-3 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#1A1614]/95'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-8">
          {/* Brand Signature - Animated ink handwriting */}
          <SignatureLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden items-center gap-7 min-[1230px]:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans-human group relative mx-0.5 cursor-pointer py-1 text-sm font-medium tracking-wide text-nowrap text-[#2C221E]/80 transition-colors hover:text-[#C86D51] dark:text-[#F5EFEB]/80 dark:hover:text-[#EDB45D]"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-[#C86D51] transition-all duration-300 group-hover:w-full dark:bg-[#EDB45D]" />
              </a>
            ))}
          </nav>

          {/* Controls: Audio Player Button, Language Toggle, Theme & Mobile Hamburger */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Audio Toggle Button (By default OFF, plays on click) */}
            <button
              onClick={togglePlay}
              className={`font-sans-human flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium tracking-wide text-nowrap shadow-xs transition-all duration-200 ${
                isPlaying
                  ? 'border-[#C86D51] bg-[#C86D51] text-white shadow-md'
                  : 'border-[#2C221E]/15 bg-[#FAF7F0]/70 text-[#2C221E] hover:border-[#C86D51] dark:border-white/15 dark:bg-[#241E1B]/80 dark:text-[#F5EFEB]'
              }`}
              title={
                isPlaying
                  ? language === 'en'
                    ? 'Pause Cecilia’s singing'
                    : 'Pausar canto de Cecilia'
                  : language === 'en'
                    ? 'Listen to Cecilia singing (El Colibrí / Rosa de Abril)'
                    : 'Escuchar a Cecilia cantar (El Colibrí / Rosa de Abril)'
              }
              aria-label="Reproducir voz de Cecilia Amighetti"
            >
              {isPlaying ? (
                <div className="flex h-3 items-end gap-0.5">
                  {[40, 90, 60].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 animate-pulse rounded-full bg-white"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              ) : (
                <Music className="h-3.5 w-3.5 text-[#C86D51]" />
              )}
              <span className="hidden text-[11px] sm:inline">
                {isPlaying
                  ? language === 'en'
                    ? 'Playing Voice'
                    : 'Sonando'
                  : language === 'en'
                    ? 'Cecilia Singing'
                    : 'Canto de Cecilia'}
              </span>
            </button>

            {/* Seamless Language Switcher with Cross-Fade */}
            <button
              onClick={toggleLanguage}
              className="relative flex cursor-pointer items-center gap-1.5 rounded-full border border-[#2C221E]/15 bg-[#FAF7F0]/60 px-2.5 py-1.5 text-xs font-semibold tracking-wider text-nowrap text-[#2C221E] shadow-xs transition-all duration-200 hover:border-[#C86D51] sm:px-3 dark:border-white/15 dark:bg-[#241E1B]/80 dark:text-[#F5EFEB]"
              aria-label={`Cambiar a ${language === 'en' ? 'Español' : 'English'}`}
            >
              <Globe className="h-3.5 w-3.5 text-[#C86D51]" />
              <div className="relative flex h-4 w-7 items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={language}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.18, ease: 'easeInOut' }}
                    className="absolute font-mono uppercase"
                  >
                    {language === 'en' ? 'EN' : 'ES'}
                  </motion.span>
                </AnimatePresence>
              </div>
              <span className="hidden text-[10px] text-[#6B5E57] sm:inline dark:text-[#A89B93]">
                / {language === 'en' ? 'ES' : 'EN'}
              </span>
            </button>

            {/* Studio Lighting / Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="cursor-pointer rounded-full border border-[#2C221E]/12 bg-[#FAF7F0]/60 p-2 text-[#2C221E] shadow-xs transition-all hover:text-[#C86D51] dark:border-white/15 dark:bg-[#241E1B]/80 dark:text-[#F5EFEB] dark:hover:text-[#EDB45D]"
              aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
              title={isDark ? t.nav.themeLight : t.nav.themeDark}
            >
              {isDark ? (
                <Sun className="h-4 w-4 text-[#EDB45D]" />
              ) : (
                <Moon className="h-4 w-4 text-[#6B5E57]" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="cursor-pointer rounded-lg p-2 text-[#2C221E] transition-colors hover:bg-[#FAF7F0] min-[1230px]:hidden dark:text-[#F5EFEB] dark:hover:bg-[#241E1B]"
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col justify-between bg-[#F7F3EB] p-8 pt-24 lg:hidden dark:bg-[#1A1614]"
          >
            <div className="absolute top-5 right-6 left-6 flex items-center justify-between">
              <SignatureLogo animated={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="cursor-pointer rounded-full border border-[#2C221E]/15 p-2 text-[#2C221E] dark:border-white/15 dark:text-[#F5EFEB]"
                aria-label={t.nav.close}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-xs font-semibold tracking-widest text-[#C86D51] uppercase">
                {language === 'en' ? 'Site Sections' : 'Secciones del Sitio'}
              </p>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-editorial flex items-center justify-between border-b border-[#2C221E]/10 pb-3 text-2xl text-[#2C221E] transition-colors hover:text-[#C86D51] dark:border-white/10 dark:text-[#F5EFEB] dark:hover:text-[#EDB45D]"
                  >
                    <span>{link.label}</span>
                    <span className="font-sans-human text-xs text-[#6B5E57] dark:text-[#A89B93]">
                      0{idx + 1}
                    </span>
                  </a>
                ))}
              </nav>

              {/* Mobile Audio Prompt */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    togglePlay();
                    setMobileMenuOpen(false);
                  }}
                  className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-semibold tracking-wider uppercase transition-colors ${
                    isPlaying
                      ? 'bg-[#C86D51] text-white'
                      : 'bg-[#EFE9DC] text-[#2C221E] dark:bg-[#241E1B] dark:text-[#F5EFEB]'
                  }`}
                >
                  <Music className="h-4 w-4" />
                  <span>
                    {isPlaying
                      ? language === 'en'
                        ? 'Pause Cecilia’s Song'
                        : 'Pausar Canto de Cecilia'
                      : language === 'en'
                        ? 'Play Cecilia’s Song (El Colibrí)'
                        : 'Escuchar Canto de Cecilia (El Colibrí)'}
                  </span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between border-t border-[#2C221E]/10 pt-6 dark:border-white/10">
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex cursor-pointer items-center gap-2 text-sm font-medium text-[#C86D51]"
              >
                <Globe className="h-4 w-4" />
                <span>{language === 'en' ? 'Cambiar a Español' : 'Switch to English'}</span>
              </button>
              <span className="text-xs text-[#6B5E57] dark:text-[#A89B93]">1934—2016</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
