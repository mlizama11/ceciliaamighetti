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
      className="relative flex min-h-[90vh] items-center overflow-hidden border-b border-[#2C221E]/10 pt-28 pb-16 lg:min-h-screen lg:py-32 dark:border-white/10"
    >
      {/* Background warm ambient glow */}
      <div className="pointer-events-none absolute top-1/4 left-1/2 h-100 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-r from-[#E09F3E]/10 via-[#C86D51]/10 to-[#2D5A43]/8 blur-[100px]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Left Column: Editorial Tribute Copy */}
          <motion.div
            style={{ y: textY, opacity }}
            className="flex flex-col justify-center lg:col-span-6 xl:col-span-5"
          >
            {/* Archival Badge */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#2C221E]/10 bg-[#EFE9DC] px-3.5 py-1 text-[11px] font-semibold tracking-widest text-[#9B4A35] uppercase shadow-xs dark:border-white/10 dark:bg-[#241E1B] dark:text-[#EDB45D]"
            >
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C86D51]" />
              <span>{t.hero.birthPassing}</span>
            </motion.div>

            {/* Artist Main Heading - "Cecilia Amighetti" without Prieto */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
              className="font-editorial mb-6 text-5xl leading-[1.05] tracking-tight text-[#2C221E] sm:text-6xl xl:text-7xl dark:text-[#F5EFEB]"
            >
              <span>{t.hero.titleLine1}</span>{' '}
              <span className="font-serif font-normal text-[#C86D51] italic dark:text-[#EDB45D]">
                {t.hero.titleLine2}
              </span>
            </motion.h1>

            {/* Poetic bilingual tribute statement */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
              className="mb-8 max-w-xl font-serif text-lg leading-relaxed text-[#6B5E57] sm:text-xl dark:text-[#A89B93]"
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
                className="font-sans-human group flex cursor-pointer items-center gap-2 rounded-md bg-[#2C221E] px-6 py-3.5 text-sm font-medium tracking-wide text-[#F7F3EB] shadow-md transition-all duration-300 hover:bg-[#C86D51] hover:shadow-lg dark:bg-[#F5EFEB] dark:text-[#1A1614] dark:hover:bg-[#EDB45D]"
              >
                <span>{t.hero.ctaPrimary}</span>
                <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
              </a>

              <a
                href="#biografia"
                onClick={handleScrollToBio}
                className="font-sans-human cursor-pointer rounded-md border border-[#2C221E]/20 bg-transparent px-6 py-3.5 text-sm font-medium tracking-wide text-[#2C221E] transition-all duration-300 hover:border-[#C86D51] hover:text-[#C86D51] dark:border-white/20 dark:text-[#F5EFEB] dark:hover:text-[#EDB45D]"
              >
                <span>{t.hero.ctaSecondary}</span>
              </a>
            </motion.div>

            {/* Quick Studio Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.6 }}
              className="font-sans-human mt-10 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 border-t border-[#2C221E]/10 pt-6 text-xs tracking-wider text-[#6B5E57] uppercase max-[450px]:flex-col max-[400px]:items-center max-[400px]:gap-y-1 dark:border-white/10 dark:text-[#A89B93]"
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
            className="flex flex-col items-center justify-center lg:col-span-6 xl:col-span-7"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative w-full max-w-2xl cursor-pointer"
              onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9367')}
            >
              {/* Wooden / studio frame molding illusion */}
              <div className="relative rounded-xl border border-[#2C221E]/12 bg-[#FAF7F0] p-3 shadow-2xl transition-transform duration-500 group-hover:scale-[1.015] sm:p-5 dark:border-white/10 dark:bg-[#221B18]">
                {/* Image container with subtle canvas texture */}
                <div className="relative flex aspect-[1.24/1] items-center justify-center overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614]">
                  <img
                    src="/artworks/IMG_9367-preview.webp"
                    alt={t.hero.featuredPaintingTitle}
                    fetchPriority="high"
                    className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                  />

                  {/* Corner Accent Emblem */}
                  <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F3EB]/90 text-[#C86D51] shadow-xs backdrop-blur-xs dark:bg-[#1A1614]/90">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  {/* Hover overlay hint */}
                  <div className="absolute inset-0 flex items-end bg-linear-to-t from-[#2C221E]/80 via-transparent to-transparent p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="font-sans-human flex items-center gap-2 text-xs text-white sm:text-sm">
                      <Compass className="h-4 w-4 text-[#EDB45D]" />
                      <span>
                        {language === 'en'
                          ? 'Click to inspect brushstrokes in detail'
                          : 'Haz clic para examinar los empastes y detalles'}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Museum Placard / Studio Label */}
                <div className="mt-4 flex flex-col justify-between gap-2 border-t border-[#2C221E]/10 pt-3 text-xs sm:flex-row sm:items-center dark:border-white/10">
                  <div>
                    <span className="block font-semibold tracking-wide text-[#2C221E] sm:inline dark:text-[#F5EFEB]">
                      {t.hero.featuredPaintingTitle}
                    </span>
                    <span className="text-[#6B5E57] sm:ml-2 dark:text-[#A89B93]">
                      ·{' '}
                      {language === 'en'
                        ? 'Oil on canvas · 98 × 122 cm'
                        : 'Óleo sobre lienzo · 98 × 122 cm'}
                    </span>
                    <span className="mt-1 block font-serif text-[11px] text-[#9B4A35] italic dark:text-[#EDB45D]">
                      {language === 'en'
                        ? 'Inspired by her childhood classical ballet studies (c. 1942)'
                        : 'Inspirada en su vivencia infantil del ballet clásico (c. 1942)'}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-[#9B4A35] uppercase dark:text-[#EDB45D]">
                    {t.hero.featuredPaintingTag}
                  </span>
                </div>
              </div>

              {/* Decorative studio shadow */}
              <div className="absolute -inset-2 -z-10 rounded-2xl bg-linear-to-r from-[#E09F3E]/20 to-[#C86D51]/20 opacity-60 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom Gentle Scroll Indicator */}
        <div className="mt-18 flex flex-col items-center justify-center gap-2 text-center text-xs text-[#6B5E57] dark:text-[#A89B93]">
          <span className="font-sans-human text-[10px] tracking-widest uppercase">
            {t.hero.scrollPrompt}
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-4 w-4 text-[#C86D51]" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
