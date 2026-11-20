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
    <section
      id="biografia"
      className="relative overflow-hidden bg-[#FAF7F0] py-24 sm:py-32 dark:bg-[#1E1815]"
    >
      {/* Decorative ambient studio washes */}
      <div className="pointer-events-none absolute top-1/3 -left-48 h-96 w-96 rounded-full bg-[#2D5A43]/5 blur-3xl" />
      <div className="pointer-events-none absolute right-0 bottom-10 h-125 w-125 rounded-full bg-[#C86D51]/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center sm:mb-20">
          <div className="mb-3 inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#C86D51] uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            <span>{t.bio.tag}</span>
          </div>
          <h2 className="font-editorial text-4xl leading-tight tracking-tight text-[#2C221E] sm:text-5xl lg:text-6xl dark:text-[#F5EFEB]">
            {t.bio.title}
          </h2>
          <div className="mx-auto mt-6 h-0.5 w-16 bg-[#C86D51]" />
        </div>

        {/* Featured Pull Quote Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20 rounded-2xl border border-[#2C221E]/10 bg-[#EFE9DC]/70 p-8 shadow-md sm:p-12 dark:border-white/10 dark:bg-[#251E1A]"
        >
          <Quote className="pointer-events-none absolute top-6 left-6 h-12 w-12 -scale-x-100 text-[#C86D51]/20" />
          <blockquote className="relative z-10 mx-auto max-w-4xl text-center font-serif text-xl leading-snug text-[#2C221E] italic sm:text-2xl lg:text-3xl dark:text-[#F5EFEB]">
            {t.bio.quote}
          </blockquote>
          <p className="font-sans-human mt-4 text-center text-xs tracking-widest text-[#6B5E57] uppercase dark:text-[#A89B93]">
            — Cecilia Amighetti Prieto
          </p>
        </motion.div>

        {/* Editorial Story Grid: Alternating Chapters */}
        <div className="space-y-24">
          {/* Chapter 1: The Heritage & The Iconic Self-Portrait */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Visual: Self Portrait */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div
                className="group relative cursor-pointer rounded-xl border border-[#2C221E]/12 bg-[#F7F3EB] p-4 shadow-xl dark:border-white/10 dark:bg-[#201916]"
                onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9364')}
              >
                <div className="aspect-[0.85/1] overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614]">
                  <img
                    src="/artworks/IMG_9364.jpg"
                    alt="Autorretrato de Cecilia Amighetti"
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-serif text-xs text-[#2C221E] italic dark:text-[#F5EFEB]">
                    {t.bio.portraitCaption}
                  </p>
                  <span className="mt-0.5 block text-[10px] tracking-wider text-[#C86D51] uppercase">
                    {language === 'en'
                      ? 'Click to inspect in gallery'
                      : 'Clic para examinar la obra'}
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
              className="space-y-6 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#2D5A43] uppercase dark:text-[#4E8A6B]">
                <Heart className="h-4 w-4" />
                <span>01 · {language === 'en' ? 'Ancestry & Heritage' : 'Linaje y Orígenes'}</span>
              </div>
              <h3 className="font-editorial text-3xl text-[#2C221E] sm:text-4xl dark:text-[#F5EFEB]">
                {t.bio.heritageTitle}
              </h3>
              <p className="font-sans-human text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
                {t.bio.heritageText}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <span className="rounded-md bg-[#EFE9DC] px-3 py-1 text-xs font-medium text-[#2C221E] dark:bg-[#261E1A] dark:text-[#F5EFEB]">
                  Francisco "Paco" Amighetti
                </span>
                <span className="rounded-md bg-[#EFE9DC] px-3 py-1 text-xs font-medium text-[#2C221E] dark:bg-[#261E1A] dark:text-[#F5EFEB]">
                  Emilia Prieto Tugores
                </span>
                <span className="rounded-md bg-[#EFE9DC] px-3 py-1 text-xs font-medium text-[#2C221E] dark:bg-[#261E1A] dark:text-[#F5EFEB]">
                  Barrio Amón, San José
                </span>
              </div>

              {/* Archival Photo Callout: Folkloric Roots */}
              <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-[#2C221E]/10 bg-[#EFE9DC]/60 p-3.5 dark:border-white/10 dark:bg-[#251E1A]">
                <img
                  src="/photos/cecilia09.jpg"
                  alt="Cecilia con traje típico"
                  className="h-22 w-16 shrink-0 rounded-lg border border-[#2C221E]/10 object-cover shadow-xs dark:border-white/10"
                />
                <div className="text-xs">
                  <span className="block text-sm font-semibold text-[#2C221E] dark:text-[#F5EFEB]">
                    {language === 'en'
                      ? 'Archival Memory · Folkloric Roots'
                      : 'Memoria de Archivo · Raíz Costarricense'}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
                    {language === 'en'
                      ? 'Adolescent Cecilia wearing traditional Costa Rican dress and flower crown (c. 1946), carrying forward the cultural research of her mother Emilia Prieto.'
                      : 'Cecilia en su adolescencia con traje típico tradicional bordado y corona de rosas (c. 1946), continuando el legado cultural de su madre Emilia Prieto.'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chapter 2: The Portrait of Don Paco & Formative Studies */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Narrative */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="order-2 space-y-6 lg:order-1 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#E09F3E] uppercase dark:text-[#EDB45D]">
                <BookOpen className="h-4 w-4" />
                <span>
                  02 · {language === 'en' ? 'Formative Wandering' : 'Formación e Itinerancia'}
                </span>
              </div>
              <h3 className="font-editorial text-3xl text-[#2C221E] sm:text-4xl dark:text-[#F5EFEB]">
                {t.bio.studiesTitle}
              </h3>
              <p className="font-sans-human text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
                {t.bio.studiesText}
              </p>
              <div className="rounded-xl border-l-4 border-[#E09F3E] bg-[#F7F3EB] p-4 text-sm text-[#6B5E57] dark:bg-[#201916] dark:text-[#A89B93]">
                <p className="italic">
                  {language === 'en'
                    ? 'In Mexico City, Cecilia absorbed the monumental human scale of post-revolutionary muralism while safeguarding the tender vulnerability of domestic emotion.'
                    : 'En la Ciudad de México, Cecilia asimiló la escala humana del muralismo postrevolucionario sin renunciar jamás a la ternura vulnerable de la vida íntima.'}
                </p>
              </div>

              {/* Archival Photo Callout: Sculpting in the atelier */}
              <div className="mt-4 flex items-center gap-3.5 rounded-xl border border-[#2C221E]/10 bg-[#EFE9DC]/60 p-3.5 dark:border-white/10 dark:bg-[#251E1A]">
                <img
                  src="/photos/cecilia16.jpg"
                  alt="Cecilia modelando en el taller de escultura"
                  className="h-22 w-16 shrink-0 rounded-lg border border-[#2C221E]/10 object-cover shadow-xs dark:border-white/10"
                />
                <div className="text-xs">
                  <span className="block text-sm font-semibold text-[#2C221E] dark:text-[#F5EFEB]">
                    {language === 'en'
                      ? 'Fine Arts Atelier · Clay Sculpture'
                      : 'Taller de Bellas Artes · Modelado en Barro'}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
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
              className="order-1 lg:order-2 lg:col-span-5"
            >
              <div
                className="group relative cursor-pointer rounded-xl border border-[#2C221E]/12 bg-[#F7F3EB] p-4 shadow-xl dark:border-white/10 dark:bg-[#201916]"
                onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9375')}
              >
                <div className="aspect-[1.28/1] overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614]">
                  <img
                    src="/artworks/IMG_9375.jpg"
                    alt="Retrato de Don Paco Amighetti por Cecilia Amighetti"
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-serif text-xs font-medium text-[#2C221E] dark:text-[#F5EFEB]">
                    {language === 'en'
                      ? 'Portrait of Francisco "Paco" Amighetti at Age 90 (1997)'
                      : 'Retrato de Francisco "Paco" Amighetti a sus 90 años (1997)'}
                  </p>
                  <p className="text-[11px] text-[#6B5E57] dark:text-[#A89B93]">
                    {language === 'en'
                      ? 'Oil on canvas by Cecilia Amighetti'
                      : 'Óleo sobre lienzo por Cecilia Amighetti'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Chapter 3: Social Justice at the COF & Pioneering Women’s Rights */}
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Visual: Street Vendor / Dignity */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5"
            >
              <div
                className="group relative cursor-pointer rounded-xl border border-[#2C221E]/12 bg-[#F7F3EB] p-4 shadow-xl dark:border-white/10 dark:bg-[#201916]"
                onClick={() => onOpenArtworkModal && onOpenArtworkModal('IMG_9355')}
              >
                <div className="aspect-[0.77/1] overflow-hidden rounded-lg bg-[#EFE9DC] dark:bg-[#1A1614]">
                  <img
                    src="/artworks/IMG_9355.jpg"
                    alt="Vendedora de mangos floridos"
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-3 text-center">
                  <p className="font-serif text-xs text-[#2C221E] italic dark:text-[#F5EFEB]">
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
              className="space-y-6 lg:col-span-7"
            >
              <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-wider text-[#C86D51] uppercase">
                <Award className="h-4 w-4" />
                <span>
                  03 · {language === 'en' ? 'Social Bravery & COF' : 'Valentía Civil y Activismo'}
                </span>
              </div>
              <h3 className="font-editorial text-3xl text-[#2C221E] sm:text-4xl dark:text-[#F5EFEB]">
                {t.bio.activismTitle}
              </h3>
              <p className="font-sans-human text-base leading-relaxed text-[#6B5E57] sm:text-lg dark:text-[#A89B93]">
                {t.bio.activismText}
              </p>
              <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
                <div className="rounded-lg border border-[#2C221E]/10 bg-[#EFE9DC]/70 p-4 dark:border-white/10 dark:bg-[#241E1A]">
                  <span className="mb-1 block text-xs font-semibold tracking-widest text-[#C86D51] uppercase">
                    {language === 'en' ? 'Educational Pioneer' : 'Pionera Educativa'}
                  </span>
                  <p className="text-xs text-[#6B5E57] dark:text-[#A89B93]">
                    {language === 'en'
                      ? 'Introduced official comprehensive sex education curricula into Costa Rican classrooms.'
                      : 'Lideró la inclusión formal de la educación sexual en las escuelas y colegios del país.'}
                  </p>
                </div>
                <div className="rounded-lg border border-[#2C221E]/10 bg-[#EFE9DC]/70 p-4 dark:border-white/10 dark:bg-[#241E1A]">
                  <span className="mb-1 block text-xs font-semibold tracking-widest text-[#2D5A43] uppercase dark:text-[#4E8A6B]">
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
              <div className="flex items-center gap-3.5 rounded-xl border border-[#2C221E]/10 bg-[#EFE9DC]/60 p-3.5 dark:border-white/10 dark:bg-[#251E1A]">
                <img
                  src="/photos/cecilia04.jpg"
                  alt="Reunión Latinoamericana y del Caribe sobre Educación"
                  className="h-16 w-20 shrink-0 rounded-lg border border-[#2C221E]/10 object-cover shadow-xs dark:border-white/10"
                />
                <div className="text-xs">
                  <span className="block text-sm font-semibold text-[#2C221E] dark:text-[#F5EFEB]">
                    {language === 'en'
                      ? 'Historic Education Summit'
                      : 'Cumbre Latinoamericana de Educación'}
                  </span>
                  <p className="mt-1 text-xs leading-relaxed text-[#6B5E57] dark:text-[#A89B93]">
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
