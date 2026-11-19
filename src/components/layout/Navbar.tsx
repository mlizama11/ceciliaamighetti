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
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F7F3EB]/95 dark:bg-[#1A1614]/95 backdrop-blur-md shadow-sm border-b border-[#2C221E]/8 dark:border-white/10 py-3'
            : 'bg-transparent py-4 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-8 flex items-center justify-between">
          {/* Brand Signature - Animated ink handwriting */}
          <SignatureLogo />

          {/* Desktop Navigation Links */}
          <nav className="hidden min-[1230px]:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sans-human text-sm font-medium tracking-wide text-[#2C221E]/80 dark:text-[#F5EFEB]/80 hover:text-[#C86D51] dark:hover:text-[#EDB45D] transition-colors relative py-1 group cursor-pointer text-nowrap mx-0.5"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#C86D51] dark:bg-[#EDB45D] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Controls: Audio Player Button, Language Toggle, Theme & Mobile Hamburger */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-2 lg:gap-3">
            {/* Audio Toggle Button (By default OFF, plays on click) */}
            <button
              onClick={togglePlay}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-sans-human font-medium tracking-wide transition-all duration-200 cursor-pointer text-nowrap shadow-xs ${
                isPlaying
                  ? 'bg-[#C86D51] text-white border-[#C86D51] shadow-md'
                  : 'bg-[#FAF7F0]/70 dark:bg-[#241E1B]/80 text-[#2C221E] dark:text-[#F5EFEB] border-[#2C221E]/15 dark:border-white/15 hover:border-[#C86D51]'
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
                <div className="flex items-end gap-0.5 h-3">
                  {[40, 90, 60].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 bg-white rounded-full animate-pulse"
                      style={{ height: `${h}%`, animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              ) : (
                <Music className="w-3.5 h-3.5 text-[#C86D51]" />
              )}
              <span className="hidden sm:inline text-[11px]">
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
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-full border border-[#2C221E]/15 dark:border-white/15 hover:border-[#C86D51] bg-[#FAF7F0]/60 dark:bg-[#241E1B]/80 text-[#2C221E] dark:text-[#F5EFEB] text-xs font-semibold tracking-wider transition-all duration-200 cursor-pointer shadow-xs text-nowrap"
              aria-label={`Cambiar a ${language === 'en' ? 'Español' : 'English'}`}
            >
              <Globe className="w-3.5 h-3.5 text-[#C86D51]" />
              <div className="relative w-7 h-4 overflow-hidden flex items-center justify-center">
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
              <span className="hidden sm:inline text-[10px] text-[#6B5E57] dark:text-[#A89B93]">
                / {language === 'en' ? 'ES' : 'EN'}
              </span>
            </button>

            {/* Studio Lighting / Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[#2C221E]/12 dark:border-white/15 bg-[#FAF7F0]/60 dark:bg-[#241E1B]/80 text-[#2C221E] dark:text-[#F5EFEB] hover:text-[#C86D51] dark:hover:text-[#EDB45D] transition-all cursor-pointer shadow-xs"
              aria-label={isDark ? t.nav.themeLight : t.nav.themeDark}
              title={isDark ? t.nav.themeLight : t.nav.themeDark}
            >
              {isDark ? <Sun className="w-4 h-4 text-[#EDB45D]" /> : <Moon className="w-4 h-4 text-[#6B5E57]" />}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="min-[1230px]:hidden p-2 rounded-lg text-[#2C221E] dark:text-[#F5EFEB] hover:bg-[#FAF7F0] dark:hover:bg-[#241E1B] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? t.nav.close : t.nav.menu}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
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
            className="fixed inset-0 z-50 bg-[#F7F3EB] dark:bg-[#1A1614] flex flex-col justify-between p-8 pt-24 lg:hidden"
          >
            <div className="flex justify-between items-center absolute top-5 left-6 right-6">
              <SignatureLogo animated={false} />
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-[#2C221E] dark:text-[#F5EFEB] border border-[#2C221E]/15 dark:border-white/15 cursor-pointer"
                aria-label={t.nav.close}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6 mt-4">
              <p className="text-xs uppercase tracking-widest text-[#C86D51] font-semibold">
                {language === 'en' ? 'Site Sections' : 'Secciones del Sitio'}
              </p>
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, idx) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="font-editorial text-2xl text-[#2C221E] dark:text-[#F5EFEB] hover:text-[#C86D51] dark:hover:text-[#EDB45D] transition-colors flex items-center justify-between pb-3 border-b border-[#2C221E]/10 dark:border-white/10"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs font-sans-human text-[#6B5E57] dark:text-[#A89B93]">
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
                  className={`w-full py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                    isPlaying
                      ? 'bg-[#C86D51] text-white'
                      : 'bg-[#EFE9DC] dark:bg-[#241E1B] text-[#2C221E] dark:text-[#F5EFEB]'
                  }`}
                >
                  <Music className="w-4 h-4" />
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

            <div className="pt-6 border-t border-[#2C221E]/10 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  toggleLanguage();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-sm font-medium text-[#C86D51] cursor-pointer"
              >
                <Globe className="w-4 h-4" />
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
