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
    <section id="cronologia" className="py-24 sm:py-32 relative overflow-hidden bg-[#FAF7F0] dark:bg-[#1E1815] border-b border-[#2C221E]/10 dark:border-white/10">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.timeline.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight">
            {t.timeline.title}
          </h2>
          <p className="font-serif text-base sm:text-lg text-[#6B5E57] dark:text-[#A89B93] mt-4 leading-relaxed">
            {t.timeline.subtitle}
          </p>
          <div className="w-16 h-0.5 bg-[#C86D51] mx-auto mt-6" />
        </div>

        {/* Vertical Timeline with Line & Milestones */}
        <div className="relative">
          {/* Animated Central Vertical Guide Line */}
          <div className="absolute left-4 sm:left-1/2 top-4 bottom-4 w-0.5 -translate-x-1/2 bg-linear-to-b from-[#C86D51] via-[#E09F3E] to-[#2D5A43] opacity-30 dark:opacity-40" />

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
                  className={`relative flex flex-col sm:flex-row items-start sm:items-center ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Central Node Badge */}
                  <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 top-0 sm:top-auto z-20 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      className="w-10 h-10 rounded-full bg-[#FAF7F0] dark:bg-[#1E1815] border-2 border-[#C86D51] flex items-center justify-center shadow-lg"
                    >
                      <span className="w-3.5 h-3.5 rounded-full bg-[#E09F3E]" />
                    </motion.div>
                  </div>

                  {/* Left or Right Content Card */}
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    className={`ml-12 sm:ml-0 sm:w-1/2 ${
                      isEven ? 'sm:pl-12 text-left' : 'sm:pr-12 sm:text-right'
                    }`}
                  >
                    <div className="p-6 sm:p-8 rounded-2xl bg-[#F7F3EB] dark:bg-[#241E1B] border border-[#2C221E]/10 dark:border-white/10 shadow-md hover:shadow-xl transition-all">
                      {/* Year & Period Header */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${
                          isEven ? 'justify-start' : 'justify-start sm:justify-end'
                        }`}
                      >
                        <span className="px-3 py-1 rounded-full bg-[#C86D51] text-white font-mono text-xs font-semibold tracking-wider">
                          {milestone.year}
                        </span>
                        <span className="text-xs uppercase tracking-widest text-[#E09F3E] font-semibold">
                          {period}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="font-editorial text-2xl sm:text-3xl text-[#2C221E] dark:text-[#F5EFEB] mb-2 leading-tight">
                        {title}
                      </h3>

                      {/* Location */}
                      <div
                        className={`flex items-center gap-1.5 text-xs text-[#6B5E57] dark:text-[#A89B93] mb-4 font-sans-human ${
                          isEven ? 'justify-start' : 'justify-start sm:justify-end'
                        }`}
                      >
                        <MapPin className="w-3.5 h-3.5 text-[#2D5A43]" />
                        <span>{location}</span>
                      </div>

                      {/* Description */}
                      <p className="font-sans-human text-sm sm:text-base leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                        {desc}
                      </p>

                      {/* Linked Artwork Callout if available */}
                      {linkedArtwork && (
                        <div
                          onClick={() =>
                            onOpenArtworkModal && onOpenArtworkModal(linkedArtwork.id)
                          }
                          className={`mt-4 pt-3 border-t border-[#2C221E]/10 dark:border-white/10 flex items-center gap-3 cursor-pointer group hover:opacity-90 ${
                            isEven ? 'justify-start' : 'justify-start sm:justify-end'
                          }`}
                        >
                          <img
                            src={`/artworks/${linkedArtwork.image}`}
                            alt={language === 'en' ? linkedArtwork.titleEn : linkedArtwork.titleEs}
                            className="w-12 h-12 object-cover rounded shadow-xs border border-[#2C221E]/10"
                          />
                          <div className={isEven ? 'text-left' : 'text-left sm:text-right'}>
                            <span className="text-[10px] uppercase tracking-wider text-[#C86D51] block font-semibold">
                              {t.timeline.seriesRefLabel}
                            </span>
                            <span className="text-xs font-medium text-[#2C221E] dark:text-[#F5EFEB] group-hover:text-[#C86D51] transition-colors">
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
