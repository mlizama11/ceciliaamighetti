import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowDown, Sparkles, Compass } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface HeroTributeProps {
  onOpenArtworkModal?: (artworkId: string) => void;
}

export const HeroTribute: React.FC<HeroTributeProps> = ({ onOpenArtworkModal }) => {
  const { t, language } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const artY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 30]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  const handleScrollToGallery = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const galleryEl = document.querySelector('#obras');
    if (galleryEl) {
      const topOffset = 84;
      window.scrollTo({
        top: galleryEl.getBoundingClientRect().top + window.scrollY - topOffset,
        behavior: 'smooth'
      });
    }
  };

  const handleScrollToBio = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const bioEl = document.querySelector('#biografia');
    if (bioEl) {
      const topOffset = 84;
      window.scrollTo({
        top: bioEl.getBoundingClientRect().top + window.scrollY - topOffset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section
      ref={heroRef}
      id="top"
      className="relative min-h-[90vh] lg:min-h-screen pt-28 pb-16 lg:py-32 flex items-center overflow-hidden border-b border-[#2C221E]/10 dark:border-white/10"
    >
      {/* Background warm ambient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-linear-to-r from-[#E09F3E]/10 via-[#C86D51]/10 to-[#2D5A43]/8 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Left Column: Editorial Tribute Copy */}
          <motion.div
            style={{ y: textY, opacity }}
            className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
          >
            {/* Archival Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#EFE9DC] dark:bg-[#241E1B] border border-[#2C221E]/10 dark:border-white/10 text-[#C86D51] dark:text-[#EDB45D] text-[11px] font-semibold tracking-widest uppercase mb-6 w-fit shadow-xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#C86D51] animate-pulse" />
              <span>{t.hero.birthPassing}</span>
            </motion.div>

            {/* Artist Main Heading - "Cecilia Amighetti" without Prieto */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="font-editorial text-5xl sm:text-6xl xl:text-7xl leading-[1.05] tracking-tight text-[#2C221E] dark:text-[#F5EFEB] mb-6"
            >
              <span>{t.hero.titleLine1}</span>{' '}
              <span className="italic font-normal font-serif text-[#C86D51] dark:text-[#EDB45D]">
                {t.hero.titleLine2}
              </span>
            </motion.h1>

            {/* Poetic bilingual tribute statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="font-serif text-lg sm:text-xl leading-relaxed text-[#6B5E57] dark:text-[#A89B93] mb-8 max-w-xl"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: 'easeOut' }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <a
                href="#obras"
                onClick={handleScrollToGallery}
                className="px-6 py-3.5 rounded-md bg-[#2C221E] dark:bg-[#F5EFEB] text-[#F7F3EB] dark:text-[#1A1614] hover:bg-[#C86D51] dark:hover:bg-[#EDB45D] font-sans-human font-medium text-sm tracking-wide transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 group cursor-pointer"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href="#biografia"
                onClick={handleScrollToBio}
                className="px-6 py-3.5 rounded-md border border-[#2C221E]/20 dark:border-white/20 hover:border-[#C86D51] text-[#2C221E] dark:text-[#F5EFEB] hover:text-[#C86D51] dark:hover:text-[#EDB45D] font-sans-human font-medium text-sm tracking-wide transition-all duration-300 cursor-pointer bg-transparent"
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </motion.div>

            {/* Quick Studio Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="mt-10 pt-6 border-t border-[#2C221E]/10 dark:border-white/10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-[#6B5E57] dark:text-[#A89B93] font-sans-human tracking-wider uppercase max-[450px]:flex-col max-[400px]:items-center max-[400px]:gap-y-1"
            >
              <span>San José</span>
              <span className="text-[#C86D51]">·</span>
              <span>Quito</span>
              <span className="text-[#C86D51]">·</span>
              <span>Ciudad de México</span>
              <span className="text-[#C86D51]">·</span>
              <span>Caracas</span>
            </motion.div>
          </motion.div>

          {/* Right Column: Tactile Studio Framed Masterpiece */}
          <motion.div
            style={{ y: artY }}
            className="lg:col-span-6 xl:col-span-7 flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-2xl group cursor-pointer"
              onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9367')}
            >
              {/* Wooden / studio frame molding illusion */}
              <div className="relative p-3 sm:p-5 bg-[#FAF7F0] dark:bg-[#221B18] rounded-xl shadow-2xl border border-[#2C221E]/12 dark:border-white/10 transition-transform duration-500 group-hover:scale-[1.015]">
                {/* Image container with subtle canvas texture */}
                <div className="relative overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614] aspect-[1.24/1] flex items-center justify-center">
                  <img
                    src="/artworks/IMG_9367.jpg"
                    alt={t.hero.featuredPaintingTitle}
                    fetchPriority="high"
                    className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Corner Accent Emblem */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#F7F3EB]/90 dark:bg-[#1A1614]/90 backdrop-blur-xs flex items-center justify-center text-[#C86D51] shadow-xs">
                    <Sparkles className="w-4 h-4" />
                  </div>

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 bg-linear-to-t from-[#2C221E]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <p className="text-white text-xs sm:text-sm font-sans-human flex items-center gap-2">
                      <Compass className="w-4 h-4 text-[#EDB45D]" />
                      <span>{language === 'en' ? 'Click to inspect brushstrokes in detail' : 'Haz clic para examinar los empastes y detalles'}</span>
                    </p>
                  </div>
                </div>

                {/* Museum Placard / Studio Label */}
                <div className="mt-4 pt-3 border-t border-[#2C221E]/10 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-[#2C221E] dark:text-[#F5EFEB] tracking-wide block sm:inline">
                      {t.hero.featuredPaintingTitle}
                    </span>
                    <span className="text-[#6B5E57] dark:text-[#A89B93] sm:ml-2">
                      · {language === 'en' ? 'Oil on canvas · 98 × 122 cm' : 'Óleo sobre lienzo · 98 × 122 cm'}
                    </span>
                    <span className="block mt-1 text-[11px] text-[#C86D51] dark:text-[#EDB45D] font-serif italic">
                      {language === 'en'
                        ? 'Inspired by her childhood classical ballet studies (c. 1942)'
                        : 'Inspirada en su vivencia infantil del ballet clásico (c. 1942)'}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#C86D51] dark:text-[#EDB45D] font-mono">
                    {t.hero.featuredPaintingTag}
                  </span>
                </div>
              </div>

              {/* Decorative studio shadow */}
              <div className="absolute -inset-2 bg-linear-to-r from-[#E09F3E]/20 to-[#C86D51]/20 -z-10 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gentle Scroll Indicator */}
        <div className="mt-12 lg:mt-16 text-center flex flex-col items-center justify-center gap-2 text-xs text-[#6B5E57] dark:text-[#A89B93]">
          <span className="font-sans-human tracking-widest uppercase text-[10px]">
            {t.hero.scrollPrompt}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4 text-[#C86D51]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
