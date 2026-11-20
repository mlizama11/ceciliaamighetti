import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Landmark, Newspaper, ExternalLink, Award, Bookmark } from 'lucide-react';
import { exhibitions, pressArticles } from '../../data/exhibitions';
import { useLanguage } from '../../context/LanguageContext';

export const ExhibitionsSection: React.FC = () => {
  const { t, language } = useLanguage();

  return (
    <section
      id="exposiciones"
      className="relative border-b border-[#2C221E]/10 bg-[#F7F3EB] py-24 sm:py-32 dark:border-white/10 dark:bg-[#1A1614]"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#9B4A35] uppercase dark:text-[#EDB45D]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.exhibitions.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl leading-tight text-[#2C221E] sm:text-5xl lg:text-6xl dark:text-[#F5EFEB]">
            {t.exhibitions.title}
          </h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
            {t.exhibitions.subtitle}
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#C86D51]" />
        </div>

        {/* Permanent Museum Highlights Callout */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="mb-16 flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#2D5A43]/30 bg-linear-to-br from-[#2D5A43]/15 via-[#FAF7F0] to-[#EFE9DC] p-6 shadow-lg sm:p-10 md:flex-row dark:from-[#2D5A43]/20 dark:via-[#221B18] dark:to-[#1E1815]"
        >
          <div className="flex items-start gap-4">
            <div className="shrink-0 rounded-xl bg-[#2D5A43] p-3.5 text-white shadow-md">
              <Landmark className="h-6 w-6" />
            </div>
            <div>
              <span className="mb-1 block font-mono text-[10px] font-bold tracking-widest text-[#2D5A43] uppercase dark:text-[#4E8A6B]">
                {t.exhibitions.permanentBadge}
              </span>
              <h3 className="font-editorial text-2xl leading-snug text-[#2C221E] sm:text-3xl dark:text-[#F5EFEB]">
                Polyforum Cultural Siqueiros — Ciudad de México
              </h3>
              <p className="font-sans-human mt-1.5 max-w-2xl text-sm text-[#6B5E57] dark:text-[#A89B93]">
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
            className="font-sans-human flex shrink-0 items-center gap-1.5 rounded-md bg-[#2D5A43] px-5 py-2.5 text-xs font-semibold tracking-wider text-white uppercase transition-colors hover:bg-[#234533]"
          >
            <span>{t.exhibitions.viewCatalog}</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </motion.div>

        {/* Two-Column Grid: Exhibitions List & Press Articles */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Column 1: Exhibitions Record */}
          <div className="space-y-6 lg:col-span-7">
            <h3 className="font-editorial flex items-center gap-3 border-b border-[#2C221E]/10 pb-3 text-3xl text-[#2C221E] dark:border-white/10 dark:text-[#F5EFEB]">
              <Award className="h-6 w-6 text-[#C86D51]" />
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
                    className="rounded-xl border border-[#2C221E]/10 bg-[#FAF7F0] p-5 shadow-xs transition-all hover:border-[#C86D51]/50 hover:shadow-md dark:border-white/10 dark:bg-[#221B18]"
                  >
                    <div className="mb-1.5 flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-semibold text-[#C86D51]">
                        {ex.year}
                      </span>
                      <span className="font-sans-human text-[10px] tracking-wider text-[#6B5E57] uppercase dark:text-[#A89B93]">
                        {ex.city}, {ex.country}
                      </span>
                    </div>

                    <h4 className="font-editorial text-xl leading-tight text-[#2C221E] dark:text-[#F5EFEB]">
                      {title}
                    </h4>

                    <p className="font-sans-human mt-0.5 mb-2 text-xs font-medium text-[#2D5A43] dark:text-[#4E8A6B]">
                      {venue}
                    </p>

                    <p className="font-sans-human text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                      {notes}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Column 2: Critical Reception & Cultural Press */}
          <div className="space-y-6 lg:col-span-5">
            <h3 className="font-editorial flex items-center gap-3 border-b border-[#2C221E]/10 pb-3 text-3xl text-[#2C221E] dark:border-white/10 dark:text-[#F5EFEB]">
              <Newspaper className="h-6 w-6 text-[#E09F3E]" />
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
                    className="relative rounded-xl border border-[#2C221E]/10 bg-[#FAF7F0] p-6 shadow-xs dark:border-white/10 dark:bg-[#221B18]"
                  >
                    <div className="mb-2 flex items-center justify-between font-mono text-[11px] font-semibold text-[#E09F3E]">
                      <span>{art.source}</span>
                      <span>{art.year}</span>
                    </div>

                    <h4 className="font-editorial mb-2 text-lg leading-snug text-[#2C221E] dark:text-[#F5EFEB]">
                      {title}
                    </h4>

                    {art.image && (
                      <div className="my-3 flex max-h-48 items-center justify-center overflow-hidden rounded-lg border border-[#2C221E]/10 bg-[#EFE9DC] dark:border-white/10 dark:bg-[#1A1614]">
                        <img
                          src={art.image}
                          alt={title}
                          loading="lazy"
                          className="h-full max-h-48 w-full object-cover object-top"
                        />
                      </div>
                    )}

                    <blockquote className="border-l-2 border-[#C86D51] py-1 pl-3 font-serif text-xs leading-relaxed text-[#6B5E57] italic dark:text-[#A89B93]">
                      {excerpt}
                    </blockquote>

                    {art.author && (
                      <p className="font-sans-human mt-3 text-right text-[10px] tracking-wider text-[#6B5E57] uppercase dark:text-[#A89B93]">
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
