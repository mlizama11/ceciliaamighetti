import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Landmark, Newspaper, ExternalLink, Award, Bookmark } from 'lucide-react';
import { exhibitions, pressArticles } from '../../data/exhibitions';
import { useLanguage } from '../../context/LanguageContext';

export const ExhibitionsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section id="exposiciones" className="py-24 sm:py-32 relative bg-[#F7F3EB] dark:bg-[#1A1614] border-b border-[#2C221E]/10 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.exhibitions.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
            {t.exhibitions.title}
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#6B5E57] dark:text-[#A89B93] mt-4 leading-relaxed">
            {t.exhibitions.subtitle}
          </p>
          <div className="w-16 h-0.5 bg-[#C86D51] mx-auto mt-6" />
        </div>

        {/* Permanent Museum Highlights Callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16 p-6 sm:p-10 rounded-2xl bg-linear-to-br from-[#2D5A43]/15 via-[#FAF7F0] to-[#EFE9DC] dark:from-[#2D5A43]/20 dark:via-[#221B18] dark:to-[#1E1815] border border-[#2D5A43]/30 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4">
            <div className="p-3.5 rounded-xl bg-[#2D5A43] text-white shrink-0 shadow-md">
              <Landmark className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest text-[#2D5A43] dark:text-[#4E8A6B] font-mono font-bold block mb-1">
                {t.exhibitions.permanentBadge}
              </span>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#2C221E] dark:text-[#F5EFEB] leading-snug">
                Polyforum Cultural Siqueiros — Ciudad de México
              </h3>
              <p className="font-sans-human text-sm text-[#6B5E57] dark:text-[#A89B93] mt-1.5 max-w-2xl">
                {language === 'en'
                  ? 'Two original oil paintings by Cecilia Amighetti reside in the permanent international archive of this monumental museum and cultural institution founded by David Alfaro Siqueiros.'
                  : 'Dos lienzos al óleo originales de Cecilia Amighetti integran la colección permanente de este templo cultural fundado por David Alfaro Siqueiros en la Ciudad de México.'}
              </p>
            </div>
          </div>
          <a
            href="https://en.wikipedia.org/wiki/Polyforum_Cultural_Siqueiros"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-md bg-[#2D5A43] hover:bg-[#234533] text-white font-sans-human text-xs font-semibold tracking-wider uppercase transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>{t.exhibitions.viewCatalog}</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* Two-Column Grid: Exhibitions List & Press Articles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Column 1: Exhibitions Record */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="font-editorial text-3xl text-[#2C221E] dark:text-[#F5EFEB] flex items-center gap-3 pb-3 border-b border-[#2C221E]/10 dark:border-white/10">
              <Award className="w-6 h-6 text-[#C86D51]" />
              <span>{t.exhibitions.museumHeader}</span>
            </h3>

            <div className="space-y-4">
              {exhibitions.map((ex, i) => {
                const title = language === 'en' ? ex.titleEn : ex.titleEs;
                const venue = language === 'en' ? ex.venueEn : ex.venueEs;
                const notes = language === 'en' ? ex.notesEn : ex.notesEs;

                return (
                  <motion.div
                    key={ex.titleEn + i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="p-5 rounded-xl bg-[#FAF7F0] dark:bg-[#221B18] border border-[#2C221E]/10 dark:border-white/10 hover:border-[#C86D51]/50 shadow-xs hover:shadow-md transition-all"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-xs font-mono font-semibold text-[#C86D51]">
                        {ex.year}
                      </span>
                      <span className="text-[10px] font-sans-human uppercase tracking-wider text-[#6B5E57] dark:text-[#A89B93]">
                        {ex.city}, {ex.country}
                      </span>
                    </div>

                    <h4 className="font-editorial text-xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
                      {title}
                    </h4>

                    <p className="text-xs font-medium text-[#2D5A43] dark:text-[#4E8A6B] mt-0.5 mb-2 font-sans-human">
                      {venue}
                    </p>

                    <p className="text-xs text-[#6B5E57] dark:text-[#A89B93] leading-relaxed font-sans-human">
                      {notes}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Critical Reception & Cultural Press */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-editorial text-3xl text-[#2C221E] dark:text-[#F5EFEB] flex items-center gap-3 pb-3 border-b border-[#2C221E]/10 dark:border-white/10">
              <Newspaper className="w-6 h-6 text-[#E09F3E]" />
              <span>{t.exhibitions.pressHeader}</span>
            </h3>

            <div className="space-y-5">
              {pressArticles.map((art, i) => {
                const title = language === 'en' ? art.titleEn : art.titleEs;
                const excerpt = language === 'en' ? art.excerptEn : art.excerptEs;

                return (
                  <motion.div
                    key={art.titleEn + i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="p-6 rounded-xl bg-[#FAF7F0] dark:bg-[#221B18] border border-[#2C221E]/10 dark:border-white/10 shadow-xs relative"
                  >
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#E09F3E] mb-2 font-semibold">
                      <span>{art.source}</span>
                      <span>{art.year}</span>
                    </div>

                    <h4 className="font-editorial text-lg text-[#2C221E] dark:text-[#F5EFEB] leading-snug mb-2">
                      {title}
                    </h4>

                    {art.image && (
                      <div className="my-3 overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614] border border-[#2C221E]/10 dark:border-white/10 max-h-48 flex items-center justify-center">
                        <img
                          src={art.image}
                          alt={title}
                          loading="lazy"
                          className="w-full h-full object-cover object-top max-h-48"
                        />
                      </div>
                    )}

                    <blockquote className="font-serif italic text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93] border-l-2 border-[#C86D51] pl-3 py-1">
                      {excerpt}
                    </blockquote>

                    {art.author && (
                      <p className="text-[10px] uppercase tracking-wider text-[#6B5E57] dark:text-[#A89B93] mt-3 font-sans-human text-right">
                        — {art.author}
                      </p>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
