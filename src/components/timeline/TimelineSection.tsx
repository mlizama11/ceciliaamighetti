import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Calendar, Compass, ArrowRight } from 'lucide-react';
import { timelineMilestones } from '../../data/timeline';
import { artworks } from '../../data/artworks';
import { useLanguage } from '../../context/LanguageContext';

interface TimelineSectionProps {
  onOpenArtworkModal?: (artworkId: string) => void;
}

export const TimelineSection: React.FC<TimelineSectionProps> = ({ onOpenArtworkModal }) => {
  const { t, language } = useLanguage();

  return (
    <section
      id="cronologia"
      className="relative overflow-hidden border-b border-[#2C221E]/10 bg-[#FAF7F0] py-24 sm:py-32 dark:border-white/10 dark:bg-[#1E1815]"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-20 max-w-3xl text-center">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#9B4A35] uppercase dark:text-[#EDB45D]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.timeline.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl leading-tight text-[#2C221E] sm:text-5xl lg:text-6xl dark:text-[#F5EFEB]">
            {t.timeline.title}
          </h2>
          <p className="mt-4 font-serif text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
            {t.timeline.subtitle}
          </p>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#C86D51]" />
        </div>

        {/* Vertical Timeline with Line & Milestones */}
        <div className="relative">
          {/* Animated Central Vertical Guide Line */}
          <div className="absolute top-4 bottom-4 left-4 w-0.5 -translate-x-1/2 bg-linear-to-b from-[#C86D51] via-[#E09F3E] to-[#2D5A43] opacity-30 sm:left-1/2 dark:opacity-40" />

          <div className="space-y-16 sm:space-y-24">
            {timelineMilestones.map((milestone, idx) => {
              const isEven = idx % 2 === 0;
              const title = language === 'en' ? milestone.titleEn : milestone.titleEs;
              const period = language === 'en' ? milestone.periodEn : milestone.periodEs;
              const desc = language === 'en' ? milestone.descEn : milestone.descEs;
              const location = language === 'en' ? milestone.locationEn : milestone.locationEs;
              const tag = language === 'en' ? milestone.tagEn : milestone.tagEs;

              // Find associated artwork if any
              const linkedArtwork = milestone.artworkRef
                ? artworks.find((a) => a.id === milestone.artworkRef)
                : null;

              return (
                <div
                  key={milestone.year + idx}
                  className={`relative flex flex-col items-start sm:flex-row sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute top-0 left-4 z-20 flex -translate-x-1/2 items-center justify-center sm:top-auto sm:left-1/2">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-[#C86D51] bg-[#FAF7F0] shadow-lg dark:bg-[#1E1815]"
                    >
                      <span className="h-3.5 w-3.5 rounded-full bg-[#E09F3E]" />
                    </motion.div>
                  </div>

                  {/* Left or Right Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'text-left sm:pl-12' : 'sm:pr-12 sm:text-right'
                    }`}
                  >
                    <div className="rounded-2xl border border-[#2C221E]/10 bg-[#F7F3EB] p-6 shadow-md transition-all hover:shadow-xl sm:p-8 dark:border-white/10 dark:bg-[#241E1B]">
                      {/* Year & Period Header */}
                      <div
                        className={`mb-3 flex flex-wrap items-center gap-2 ${
                          isEven ? 'justify-start' : 'justify-start sm:justify-end'
                        }`}
                      >
                        <span className="rounded-full bg-[#C86D51] px-3 py-1 font-mono text-xs font-semibold tracking-wider text-white">
                          {milestone.year}
                        </span>
                        <span className="text-xs font-semibold tracking-widest text-[#E09F3E] uppercase">
                          {period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-editorial mb-2 text-2xl leading-tight text-[#2C221E] sm:text-3xl dark:text-[#F5EFEB]">
                        {title}
                      </h3>

                      {/* Location */}
                      <div
                        className={`font-sans-human mb-4 flex items-center gap-1.5 text-xs text-[#6B5E57] dark:text-[#A89B93] ${
                          isEven ? 'justify-start' : 'justify-start sm:justify-end'
                        }`}
                      >
                        <MapPin className="h-3.5 w-3.5 text-[#2D5A43]" />
                        <span>{location}</span>
                      </div>

                      {/* Description */}
                      <p className="font-sans-human text-sm leading-relaxed text-[#6B5E57] sm:text-base dark:text-[#A89B93]">
                        {desc}
                      </p>

                      {/* Linked Artwork Callout if available */}
                      {linkedArtwork && (
                        <div
                          onClick={() => onOpenArtworkModal && onOpenArtworkModal(linkedArtwork.id)}
                          className={`group mt-4 flex cursor-pointer items-center gap-3 border-t border-[#2C221E]/10 pt-3 hover:opacity-90 dark:border-white/10 ${
                            isEven ? 'justify-start' : 'justify-start sm:justify-end'
                          }`}
                        >
                          <img
                            src={`/artworks/${linkedArtwork.imagePreview ?? linkedArtwork.image}`}
                            alt={language === 'en' ? linkedArtwork.titleEn : linkedArtwork.titleEs}
                            className="h-12 w-12 rounded border border-[#2C221E]/10 object-cover shadow-xs"
                          />
                          <div className={isEven ? 'text-left' : 'text-left sm:text-right'}>
                            <span className="block text-[10px] font-semibold tracking-wider text-[#C86D51] uppercase">
                              {t.timeline.seriesRefLabel}
                            </span>
                            <span className="text-xs font-medium text-[#2C221E] transition-colors group-hover:text-[#C86D51] dark:text-[#F5EFEB]">
                              {language === 'en' ? linkedArtwork.titleEn : linkedArtwork.titleEs}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
