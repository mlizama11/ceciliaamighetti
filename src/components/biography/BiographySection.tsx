import React from 'react';
import { motion } from 'motion/react';
import { Quote, Sparkles, BookOpen, Heart, Award, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface BiographySectionProps {
  onOpenArtworkModal?: (artworkId: string) => void;
}

export const BiographySection: React.FC<BiographySectionProps> = ({ onOpenArtworkModal }) => {
  const { t, language } = useLanguage();

  return (
    <section id="biografia" className="py-24 sm:py-32 relative overflow-hidden bg-[#FAF7F0] dark:bg-[#1E1815]">
      {/* Decorative ambient studio washes */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-[#2D5A43]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-125 h-125 bg-[#C86D51]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#C86D51] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{t.bio.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#2C221E] dark:text-[#F5EFEB] leading-tight tracking-tight">
            {t.bio.title}
          </h2>
          <div className="w-16 h-0.5 bg-[#C86D51] mx-auto mt-6" />
        </div>

        {/* Featured Pull Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-20 p-8 sm:p-12 rounded-2xl bg-[#EFE9DC]/70 dark:bg-[#251E1A] border border-[#2C221E]/10 dark:border-white/10 relative shadow-md"
        >
          <Quote className="absolute top-6 left-6 w-12 h-12 text-[#C86D51]/20 -scale-x-100 pointer-events-none" />
          <blockquote className="relative z-10 max-w-4xl mx-auto text-center font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#2C221E] dark:text-[#F5EFEB] leading-snug">
            {t.bio.quote}
          </blockquote>
          <p className="text-center text-xs uppercase tracking-widest text-[#6B5E57] dark:text-[#A89B93] mt-4 font-sans-human">
            — Cecilia Amighetti Prieto
          </p>
        </motion.div>

        {/* Editorial Story Grid: Alternating Chapters */}
        <div className="space-y-24">
          {/* Chapter 1: The Heritage & The Iconic Self-Portrait */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual: Self Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div
                className="relative rounded-xl p-4 bg-[#F7F3EB] dark:bg-[#201916] shadow-xl border border-[#2C221E]/12 dark:border-white/10 cursor-pointer group"
                onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9364')}
              >
                <div className="overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614] aspect-[0.85/1]">
                  <img
                    src="/artworks/IMG_9364.jpg"
                    alt="Autorretrato de Cecilia Amighetti"
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-serif italic text-[#2C221E] dark:text-[#F5EFEB]">
                    {t.bio.portraitCaption}
                  </p>
                  <span className="text-[10px] text-[#C86D51] uppercase tracking-wider block mt-0.5">
                    {language === 'en' ? 'Click to inspect in gallery' : 'Clic para examinar la obra'}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#2D5A43] dark:text-[#4E8A6B]">
                <Heart className="w-4 h-4" />
                <span>01 · {language === 'en' ? 'Ancestry & Heritage' : 'Linaje y Orígenes'}</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#2C221E] dark:text-[#F5EFEB]">
                {t.bio.heritageTitle}
              </h3>
              <p className="font-sans-human text-base sm:text-lg leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                {t.bio.heritageText}
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <span className="px-3 py-1 rounded-md bg-[#EFE9DC] dark:bg-[#261E1A] text-xs font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                  Francisco "Paco" Amighetti
                </span>
                <span className="px-3 py-1 rounded-md bg-[#EFE9DC] dark:bg-[#261E1A] text-xs font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                  Emilia Prieto Tugores
                </span>
                <span className="px-3 py-1 rounded-md bg-[#EFE9DC] dark:bg-[#261E1A] text-xs font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                  Barrio Amón, San José
                </span>
              </div>

              {/* Archival Photo Callout: Folkloric Roots */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#EFE9DC]/60 dark:bg-[#251E1A] border border-[#2C221E]/10 dark:border-white/10 flex items-center gap-3.5">
                <img
                  src="/photos/cecilia09.jpg"
                  alt="Cecilia con traje típico"
                  className="w-16 h-22 object-cover rounded-lg border border-[#2C221E]/10 dark:border-white/10 shrink-0 shadow-xs"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#2C221E] dark:text-[#F5EFEB] block text-sm">
                    {language === 'en' ? 'Archival Memory · Folkloric Roots' : 'Memoria de Archivo · Raíz Costarricense'}
                  </span>
                  <p className="text-xs text-[#6B5E57] dark:text-[#A89B93] mt-1 leading-relaxed">
                    {language === 'en'
                      ? 'Adolescent Cecilia wearing traditional Costa Rican dress and flower crown (c. 1946), carrying forward the cultural research of her mother Emilia Prieto.'
                      : 'Cecilia en su adolescencia con traje típico tradicional bordado y corona de rosas (c. 1946), continuando el legado cultural de su madre Emilia Prieto.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chapter 2: The Portrait of Don Paco & Formative Studies */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6 order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#E09F3E] dark:text-[#EDB45D]">
                <BookOpen className="w-4 h-4" />
                <span>02 · {language === 'en' ? 'Formative Wandering' : 'Formación e Itinerancia'}</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#2C221E] dark:text-[#F5EFEB]">
                {t.bio.studiesTitle}
              </h3>
              <p className="font-sans-human text-base sm:text-lg leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                {t.bio.studiesText}
              </p>
              <div className="p-4 rounded-xl bg-[#F7F3EB] dark:bg-[#201916] border-l-4 border-[#E09F3E] text-sm text-[#6B5E57] dark:text-[#A89B93]">
                <p className="italic">
                  {language === 'en'
                    ? 'In Mexico City, Cecilia absorbed the monumental human scale of post-revolutionary muralism while safeguarding the tender vulnerability of domestic emotion.'
                    : 'En la Ciudad de México, Cecilia asimiló la escala humana del muralismo postrevolucionario sin renunciar jamás a la ternura vulnerable de la vida íntima.'}
                </p>
              </div>

              {/* Archival Photo Callout: Sculpting in the atelier */}
              <div className="mt-4 p-3.5 rounded-xl bg-[#EFE9DC]/60 dark:bg-[#251E1A] border border-[#2C221E]/10 dark:border-white/10 flex items-center gap-3.5">
                <img
                  src="/photos/cecilia16.jpg"
                  alt="Cecilia modelando en el taller de escultura"
                  className="w-16 h-22 object-cover rounded-lg border border-[#2C221E]/10 dark:border-white/10 shrink-0 shadow-xs"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#2C221E] dark:text-[#F5EFEB] block text-sm">
                    {language === 'en' ? 'Fine Arts Atelier · Clay Sculpture' : 'Taller de Bellas Artes · Modelado en Barro'}
                  </span>
                  <p className="text-xs text-[#6B5E57] dark:text-[#A89B93] mt-1 leading-relaxed">
                    {language === 'en'
                      ? 'Historic photograph of young Cecilia in her artist apron sculpting a clay portrait bust on the modeling stand (c. 1954).'
                      : 'Fotografía histórica de Cecilia joven en delantal esculpiendo un busto de arcilla sobre el atril en el taller de Bellas Artes (c. 1954).'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Visual: Portrait of Don Paco Amighetti (1997) */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 order-1 lg:order-2"
            >
              <div
                className="relative rounded-xl p-4 bg-[#F7F3EB] dark:bg-[#201916] shadow-xl border border-[#2C221E]/12 dark:border-white/10 cursor-pointer group"
                onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9375')}
              >
                <div className="overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614] aspect-[1.28/1]">
                  <img
                    src="/artworks/IMG_9375.jpg"
                    alt="Retrato de Don Paco Amighetti por Cecilia Amighetti"
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-serif font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                    {language === 'en'
                      ? 'Portrait of Francisco "Paco" Amighetti at Age 90 (1997)'
                      : 'Retrato de Francisco "Paco" Amighetti a sus 90 años (1997)'}
                  </p>
                  <p className="text-[11px] text-[#6B5E57] dark:text-[#A89B93]">
                    {language === 'en' ? 'Oil on canvas by Cecilia Amighetti' : 'Óleo sobre lienzo por Cecilia Amighetti'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chapter 3: Social Justice at the COF & Pioneering Women’s Rights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Visual: Street Vendor / Dignity */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div
                className="relative rounded-xl p-4 bg-[#F7F3EB] dark:bg-[#201916] shadow-xl border border-[#2C221E]/12 dark:border-white/10 cursor-pointer group"
                onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9355')}
              >
                <div className="overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614] aspect-[0.77/1]">
                  <img
                    src="/artworks/IMG_9355.jpg"
                    alt="Vendedora de mangos floridos"
                    loading="lazy"
                    className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="text-xs font-serif italic text-[#2C221E] dark:text-[#F5EFEB]">
                    {language === 'en'
                      ? 'Mango Blossom Vendor (1988) · Gente de México'
                      : 'Vendedora de mangos floridos (1988) · Gente de México'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#C86D51]">
                <Award className="w-4 h-4" />
                <span>03 · {language === 'en' ? 'Social Bravery & COF' : 'Valentía Civil y Activismo'}</span>
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#2C221E] dark:text-[#F5EFEB]">
                {t.bio.activismTitle}
              </h3>
              <p className="font-sans-human text-base sm:text-lg leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                {t.bio.activismText}
              </p>
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-[#EFE9DC]/70 dark:bg-[#241E1A] border border-[#2C221E]/10 dark:border-white/10">
                  <span className="text-xs uppercase tracking-widest text-[#C86D51] font-semibold block mb-1">
                    {language === 'en' ? 'Educational Pioneer' : 'Pionera Educativa'}
                  </span>
                  <p className="text-xs text-[#6B5E57] dark:text-[#A89B93]">
                    {language === 'en'
                      ? 'Introduced official comprehensive sex education curricula into Costa Rican classrooms.'
                      : 'Lideró la inclusión formal de la educación sexual en las escuelas y colegios del país.'}
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-[#EFE9DC]/70 dark:bg-[#241E1A] border border-[#2C221E]/10 dark:border-white/10">
                  <span className="text-xs uppercase tracking-widest text-[#2D5A43] dark:text-[#4E8A6B] font-semibold block mb-1">
                    {language === 'en' ? 'Women’s Autonomy' : 'Autonomía Femenina'}
                  </span>
                  <p className="text-xs text-[#6B5E57] dark:text-[#A89B93]">
                    {language === 'en'
                      ? 'Fought tirelessly for maternal rights, equality, and dignity without moralistic stigma.'
                      : 'Defendió los derechos reproductivos y la salud integral de las mujeres costarricenses.'}
                  </p>
                </div>
              </div>

              {/* Archival Photo Callout: Latin American Education Summit */}
              <div className="p-3.5 rounded-xl bg-[#EFE9DC]/60 dark:bg-[#251E1A] border border-[#2C221E]/10 dark:border-white/10 flex items-center gap-3.5">
                <img
                  src="/photos/cecilia04.jpg"
                  alt="Reunión Latinoamericana y del Caribe sobre Educación"
                  className="w-20 h-16 object-cover rounded-lg border border-[#2C221E]/10 dark:border-white/10 shrink-0 shadow-xs"
                />
                <div className="text-xs">
                  <span className="font-semibold text-[#2C221E] dark:text-[#F5EFEB] block text-sm">
                    {language === 'en' ? 'Historic Education Summit' : 'Cumbre Latinoamericana de Educación'}
                  </span>
                  <p className="text-xs text-[#6B5E57] dark:text-[#A89B93] mt-1 leading-relaxed">
                    {language === 'en'
                      ? 'Official photo of Cecilia Amighetti at the Latin American and Caribbean Meeting on New Forms of Post-Secondary Education (c. 1976).'
                      : 'Fotografía oficial de Cecilia Amighetti en la Reunión Latinoamericana y del Caribe sobre Nuevas Formas de Educación Post-Secundaria (c. 1976).'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
